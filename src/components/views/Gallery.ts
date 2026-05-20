import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IGallery {
    items: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    protected container: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.container = container;
    }

    set items(items: HTMLElement[]) {
        this.container.innerHTML = "";
        this.container.append(...items);
    }
}
