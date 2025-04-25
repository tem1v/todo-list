import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter((task) => task.status === status);
    }
    addTask(title) {
        const newTask = {
            title,
            status: "backlog",
            id: generateID(),
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }
    removeTask() {
        this.#boardtasks = this.#boardtasks.filter(
            (task) => task.status !== "basket"
        );
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }
    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }
    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }
    updateTaskStatus(taskID, newStatus, insertIndex = 0) {
		const taskIndex = this.#boardtasks.findIndex(
			(task) => task.id === taskID
		);
		if (taskIndex === -1) return;

		const task = this.#boardtasks[taskIndex];

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
		this._notifyObservers();
    }
}