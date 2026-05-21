import { Component } from "../base/Component";

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
        this.container.replaceChildren(...items);
    }
}
