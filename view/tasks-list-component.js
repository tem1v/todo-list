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
	constructor({status, statusLabel, task}){
		super();
		this.status = status;
		this.statusLabel = statusLabel;        
		this.task = task;
    }
	get template(){
		return createTasksListComponentTemplate(this.status, this.statusLabel);
	}
}