import TasksListComponent from "../../view/tasks-list-component.js";
import TaskComponent from "../../view/task-component.js";
import TasksBoardComponent from "../../view/tasks-board-component.js";
import {render, RenderPosition} from "../framework/render.js";
import ClearButtonComponent from "../../view/clear-button-component.js";
import { Status, StatusLabel } from "../const.js";

export default class TasksBoardPresenter {
    #boardContainer = null;
	#tasksModel = null;

	#tasksBoardComponent = new TasksBoardComponent();
	#boardTasks = [];

    constructor({ boardContainer, tasksModel }) {
		this.#boardContainer = boardContainer;
		this.#tasksModel = tasksModel;
	}

    init() {
		this.#boardTasks = [...this.#tasksModel.getTasks()];
        render(this.#tasksBoardComponent, this.#boardContainer, RenderPosition.AFTEREND);

		const statuses = Object.values(Status);
		statuses.forEach((status) => {
			const filteredTasks = this.#boardTasks.filter((task) => task.status === status)
			const tasksListComponent = new TasksListComponent({
				status: status,
				statusLabel: StatusLabel[status],
                task: filteredTasks,
            });

            render(tasksListComponent, this.#tasksBoardComponent.getElement());

			filteredTasks.forEach((task)=>{
				const taskComponent = new TaskComponent({ task });
                render(taskComponent, tasksListComponent.getElement().querySelector(".tasks-categories ul"));
				
			})
			if (status === Status.BASKET) {
                render(
                    new ClearButtonComponent(),
                    tasksListComponent.getElement(),
                    RenderPosition.BEFOREEND
                );
            }
		})

        // for (let i = 0; i < Object.keys(Status).length; i++) {
        //     const tasksListComponent = new TasksListComponent({
        //         task: this.#boardTasks,
        //     });
        //     render(tasksListComponent, this.#tasksBoardComponent.getElement());

        //     for (let j = 0; j < this.#boardTasks.length; j++) {
        //         const taskComponent = new TaskComponent({
        //             task: this.#boardTasks[j],
        //         });
        //         render(
        //             taskComponent,
        //             tasksListComponent
        //                 .getElement()
        //                 .querySelector(".tasks-categories ul")
        //         );
        //     }

        // }
		
    }
}