import { createElement } from "../src/framework/render.js";
import { AbstractComponent } from "../src/framework/view/abstract-component.js";

function createTasksBoardComponentTemplate(){
	return(
        `<section class="tasks-categories">

        </section>`
    );
}

export default class TasksBoardComponent extends AbstractComponent{
	get template(){
        return createTasksBoardComponentTemplate();
    }

}