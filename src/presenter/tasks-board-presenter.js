import TasksListComponent from "../../view/tasks-list-component.js";
import TaskComponent from "../../view/task-component.js";
import TasksBoardComponent from "../../view/tasks-board-component.js";
import {render, RenderPosition} from "../framework/render.js";
import ClearButtonComponent from "../../view/clear-button-component.js";
import { Status, StatusLabel } from "../const.js";
import TasksPlaceholderComponent from "../../view/task-placeholder-component.js";

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TasksBoardComponent();
    #boardTasks = [];

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        render(
            this.#tasksBoardComponent,
            this.#boardContainer,
            RenderPosition.AFTEREND
        );
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
        });
        render(tasksListComponent, container);
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
        if (status === Status.BASKET && this.tasks.some((task) => task.status == Status.BASKET) != false) {
            this.#renderClearButton(tasksListComponent.element);
        }
    }
    #renderClearButton(container) {
        render(
            new ClearButtonComponent({
                onClick: ()=>this.clearTask(),
            }),
            container,
            RenderPosition.BEFOREEND
        );
    }

    #renderPlaceholder(container) {
        render(new TasksPlaceholderComponent(), container);
    }

    createTask() {
        const taskTitle = document.querySelector("#task-input").value.trim();
        if (!taskTitle) {
            return;
        }
        this.#tasksModel.addTask(taskTitle);

        document.querySelector("#task-input").value = '';
    }

    clearTask() {
		this.#tasksModel.removeTask();
	}

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }
    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = "";
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

}