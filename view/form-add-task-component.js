import { createElement } from "../src/framework/render.js";
import { AbstractComponent } from "../src/framework/view/abstract-component.js";

function createFormAddTaskComponentTemplate(){
	return `<div class="form-container">
			<span class="form-label">Новая задача</span>
			<form class="task-form" action="submit" method="post">
            	<input id="task-input" type="text" name="title" placeholder="Название задачи...">
            	<input type="submit" value="+  Добавить">
        	</form>
		</div>`;
}

export default class FormAddTaskComponent extends AbstractComponent{
	#handleClick = null;

	constructor({ onClick }){
		super();
		this.#handleClick = onClick;
		this.element.addEventListener('submit', this.#clickHandler)
	}
	get template(){
		return createFormAddTaskComponentTemplate();
	}

	#clickHandler = (evt) => {
		evt.preventDefault();
		this.#handleClick();
	}
}