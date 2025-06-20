import TasksListComponent from "../../view/tasks-list-component.js";
import TaskComponent from "../../view/task-component.js";
import TasksBoardComponent from "../../view/tasks-board-component.js";
import {render, RenderPosition} from "../framework/render.js";
import ClearButtonComponent from "../../view/clear-button-component.js";
import { Status, StatusLabel, UserAction} from "../const.js";
import TasksPlaceholderComponent from "../../view/task-placeholder-component.js";
import LoadingViewComponent from "../../view/loading-view-component.js";

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TasksBoardComponent();

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
        this.#renderBoard();
    }

    async init() {
        await this.#tasksModel.init();
        this.#clearBoard();
        this.#renderBoard();
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);

        const statuses = Object.values(Status);

        statuses.forEach((status) => {
            const filteredTasks = this.tasks.filter(
                (task) => task.status === status
            );
            this.#renderTaskslist(
                status,
                this.#tasksBoardComponent.element,
                filteredTasks
            );
        });
    }
    #renderTaskslist(status, container, filteredTasks) {
        const tasksListComponent = new TasksListComponent({
            status: status,
            statusLabel: StatusLabel[status],
            task: filteredTasks,
            onTaskDrop: this.#handleTaskDrop.bind(this),
        });
        render(tasksListComponent, container);

		if (!this.#tasksModel.isLoaded) {
            this.#renderLoadingView(tasksListComponent.element.querySelector(
				".tasks-categories ul"))
        } else { 
			if (filteredTasks.length != 0) {
                filteredTasks.forEach((task) => {
                    this.#renderTask(
                        task,
                        tasksListComponent.element.querySelector(
                            ".tasks-categories ul"
                        )
                    );
                });
        	} else {
            this.#renderPlaceholder(
                tasksListComponent.element.querySelector(".tasks-categories ul")
            );
        	}
			if (
				status === Status.BASKET &&
				this.tasks.some((task) => task.status == Status.BASKET) != false
			) {
				this.#renderClearButton(tasksListComponent.element);
			}
		}
    }
    #renderClearButton(container) {
        render(
            new ClearButtonComponent({
                onClick: () => this.#handleClearBasketClick(),
            }),
            container,
            RenderPosition.BEFOREEND
        );
    }

    #renderPlaceholder(container) {
        render(new TasksPlaceholderComponent(), container);
    }

    #renderLoadingView(container) {
        const loadingView = new LoadingViewComponent();
        render(loadingView, container, RenderPosition.BEFOREEND);
    }

    async createTask() {
        const taskTitle = document.querySelector("#task-input").value.trim();
        if (!taskTitle) {
            return;
        }
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector("#task-input").value = "";
        } catch (err) {
            console.log("Ошибка при создании задачи", err);
        }
    }

    clearTask() {
        this.#tasksModel.removeTask();
        this.#tasksModel._notifyObservers();
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = "";
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    async #handleTaskDrop(taskID, newStatus, insertIndex) {
        try {
            await this.#tasksModel.updateTaskStatus(
                taskID,
                newStatus,
                insertIndex
            );
        } catch (err) {
            console.log("Ошибка при обновлении статуса задачи", err);
        }
    }

    #handleModelEvent(event, payload) {
        switch (event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                break;
            default:
                break;
        }
    }
    async #handleClearBasketClick() {
        try {
            await this.#tasksModel.clearBasketTasks();
        } catch (err) {
            console.error("Ошибка при очистке корзины", err);
        }
    }
}