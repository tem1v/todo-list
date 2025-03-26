import { createElement } from "../src/framework/render.js";

function createTasksBoardComponentTemplate(){
	return(
        `<section class="tasks-categories">

        </section>`
    );
}

export default class TasksBoardComponent{
	getTemplate(){
        return createTasksBoardComponentTemplate();
    }
    getElement(){
        if(!this.element){
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }
    removeElement(){
		this.element = null;
    }
}