import { createElement } from "../src/framework/render.js";

function createTaskComponentTemplate(task) {
	const {title} = task;
    return `<li>${title}</li>`;
}

export default class TaskComponent {
	constructor({task}) {
        this.task = task;
    }
    getTemplate() {
        return createTaskComponentTemplate(this.task);
    }
    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }
    removeElement() {
        this.element = null;
    }
}
