import { StatusLabel } from "../src/const.js";
import { createElement } from "../src/framework/render.js";
import { AbstractComponent } from "../src/framework/view/abstract-component.js";

function createTasksListComponentTemplate(status, statusLabel) {
	return `<section class="${status}-container" >
				<span class="${status}-label">${statusLabel}</span>
				<ul class="${status}-list">

				</ul>
			</section>`;
}

export default class TasksListComponent extends AbstractComponent{
	constructor({status, statusLabel, task, onTaskDrop}){
		super();
		this.status = status;
		this.statusLabel = statusLabel;        
		this.task = task;
		this.#setDropHandler(onTaskDrop);
    }
	get template(){
		return createTasksListComponentTemplate(this.status, this.statusLabel);
	}
	
	#setDropHandler(onTaskDrop){
		const container = this.element;

        container.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        container.addEventListener("drop", (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData("text/plain");
            const taskElements = Array.from(
                this.element.querySelectorAll("li")
            );
            const dropY = event.clientY;

            let insertIndex = 0;
            let found = false;

            for (let i = 0; i < taskElements.length; i++) {
                const taskEl = taskElements[i];
                const rect = taskEl.getBoundingClientRect();
                const middleY = rect.top + rect.height / 2;

                if (dropY < middleY) {
                    insertIndex = i;
                    found = true;
                    break;
                }
            }

            if (!found) {
                insertIndex = taskElements.length;
            }

            onTaskDrop(taskId, this.status, insertIndex);
        });
	}

}