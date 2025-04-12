import { createElement } from "../src/framework/render.js";
import { AbstractComponent } from "../src/framework/view/abstract-component.js";

function createClearButtonComponentTemplate() {
    return `<button class="clear-btn">✕  Очистить</button>`;
}

export default class ClearButtonComponent extends AbstractComponent {
    #handleClick = null;

    constructor({ onClick }) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener("click", this.#clickHandler);
    }
    get template() {
        return createClearButtonComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
}
