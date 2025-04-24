import { createElement } from "../src/framework/render.js";
import { AbstractComponent } from "../src/framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
	const {title} = task;
    return `<li>${title}</li>`;
}

export default class TaskComponent extends AbstractComponent {
	constructor({task}) {
		super();
        this.task = task;
		this.#afterCreateElement();
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }

	#afterCreateElement(){
		this.#makeTaskDraggable();
	}

	#makeTaskDraggable(){
		this.element.setAttribute(`draggable`, true);

		this.element.addEventListener('dragstart', (event)=>{
			event.dataTransfer.setData('text/plain', this.task.id);
		})
	}
}
