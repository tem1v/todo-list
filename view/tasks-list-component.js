import { createElement } from "../src/framework/render.js";

function createTasksListComponentTemplate(){
	return `<section class="backlog-container" >
				<span class="backlog-label">Название блока</span>
				<ul class="backlog-list">

				</ul>
			</section>`;
}

export default class TasksListComponent{
	getTemplate(){
		return createTasksListComponentTemplate();
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