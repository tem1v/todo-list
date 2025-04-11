// import createElement from "../src/framework/render.js";
import { AbstractComponent } from "../src/framework/view/abstract-component.js";

function createTasksPlaceholderComponentTemplate() {
    return `<li class="placeholder-task">Перетащите карточку</li>`;
}

export default class TasksPlaceholderComponent extends AbstractComponent{
    get template() {
        return createTasksPlaceholderComponentTemplate();
    }
}
