import { createElement } from "../src/framework/render.js";
import { AbstractComponent } from "../src/framework/view/abstract-component.js";

function createClearButtonComponentTemplate() {
    return `<button class="clear-btn">✕  Очистить</button>`;
}

export default class ClearButtonComponent extends AbstractComponent{
    get template() {
        return createClearButtonComponentTemplate();
    }
}
