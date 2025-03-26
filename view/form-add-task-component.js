import { createElement } from "../src/framework/render.js";

function createFormAddTaskComponentTemplate(){
	return(
		`<div class="form-container">
			<span class="form-label">Новая задача</span>
			<form class="task-form" action="/" method="post">
            	<input type="text" name="title" placeholder="Название задачи...">
            	<input type="submit" value="+  Добавить">
        	</form>
		</div>`
	)
}

export default class FormAddTaskComponent{
	getTemplate(){
		return createFormAddTaskComponentTemplate();
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