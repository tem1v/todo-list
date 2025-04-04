import { createElement } from "../src/framework/render.js";

function createTasksListComponentTemplate(task){
	const {status} = task;
	return `<section class="${status}-container" >
				<span class="${status}-label">${status}</span>
				<ul class="${status}-list">

				</ul>
			</section>`;
}

export default class TasksListComponent{
	constructor({task}){
		this.task = task;
    }
	getTemplate(){
		return createTasksListComponentTemplate(this.task);
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