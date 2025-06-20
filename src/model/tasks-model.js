import { generateID } from "../utils.js";
import Observable from "../framework/observable.js";
import { UserAction, UpdateType } from "../const.js";

export default class TasksModel extends Observable {
    #boardtasks = [];
    #isLoaded = false;
    #tasksApiService = null;

    constructor({ tasksApiService }) {
        super();
        this.#tasksApiService = tasksApiService;
    }

    get tasks() {
        return this.#boardtasks;
    }

    get isLoaded() {
        return this.#isLoaded;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter((task) => task.status === status);
    }

    removeTask(taskId) {
        this.#boardtasks = this.#boardtasks.filter(
            (task) => task.id !== taskId
        );
        this._notify(UserAction.DELETE_TASK, { id: taskId });
    }
    async clearBasketTasks() {
        const basketTasks = this.#boardtasks.filter(
            (task) => task.status === "basket"
        );

        try {
            await Promise.all(
                basketTasks.map((task) =>
                    this.#tasksApiService.removeTask(task.id)
                )
            );

            this.#boardtasks = this.#boardtasks.filter(
                (task) => task.status !== "basket"
            );
            this._notify(UserAction.DELETE_TASK, { status: "basket" });
        } catch (err) {
            console.error(
                "Ошибка при удалении задач из корзины на сервере ",
                err
            );
            throw err;
        }
    }

    hasBasketTasks() {
        return this.#boardtasks.some((task) => task.status === "basket");
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardtasks = tasks;
        } catch (err) {
            this.#boardtasks = [];
        }
        this.#isLoaded = true;
        this._notify(UpdateType.INIT);
    }


    async addTask(title) {
        const newTask = {
            title,
            status: "backlog",
            id: generateID(),
        };
        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch (err) {
            console.error("Ошибка при добавлении задачи на сервер:", err);
            throw err;
        }
    }

    async updateTaskStatus(taskId, newStatus, insertIndex = 0) {
        const taskIndex = this.#boardtasks.findIndex(
            (task) => task.id === taskId
        );
        if (taskIndex === -1) return;

        const task = this.#boardtasks[taskIndex];
        const previousStatus = task.status;

        let count = 0;
        let insertPos = this.#boardtasks.length;

        for (let i = 0; i < this.#boardtasks.length; i++) {
            if (this.#boardtasks[i].status === newStatus) {
                if (count === insertIndex) {
                    insertPos = i;
                    break;
                }
                count++;
            }
        }

        const [movedTask] = this.#boardtasks.splice(taskIndex, 1);
        movedTask.status = newStatus;

        if (taskIndex < insertPos) {
            insertPos -= 1;
        }
        this.#boardtasks.splice(insertPos, 0, movedTask);

        try {
            const updatedTask = await this.#tasksApiService.updateTask(task);
            Object.assign(task, updatedTask);
            this._notify(UserAction.UPDATE_TASK, updatedTask);
        } catch (err) {
            console.error(
                "Ошибка при обновлении статуса задачи на сервере:",
                err
            );
            task.status = previousStatus;
            throw err;
        }
    }
}