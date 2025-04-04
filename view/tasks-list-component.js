import { StatusLabel } from "../src/const.js";
import { createElement } from "../src/framework/render.js";

function createTasksListComponentTemplate(status, statusLabel) {
	return `<section class="${status}-container" >
				<span class="${status}-label">${statusLabel}</span>
				<ul class="${status}-list">

				</ul>
			</section>`;
}

export default class TasksListComponent{
	constructor({status, statusLabel, task}){
		this.status = status;
		this.statusLabel = statusLabel;        
		this.task = task;
    }
	getTemplate(){
		return createTasksListComponentTemplate(this.status, this.statusLabel);
	}
	getElement(){
		if (!this.element){
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }
	removeElement(){
        this.element = null;
    }
}