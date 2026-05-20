import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";

interface IHeader {
    counter: number;
}

export class Header extends Component<IHeader> {
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;

    constructor(
        container: HTMLElement,
        protected events: EventEmitter,
    ) {
        super(container);
        this.basketButton = ensureElement(
            ".header__basket",
            container,
        ) as HTMLButtonElement;
        this.counterElement = ensureElement(
            ".header__basket-counter",
            container,
        );

        this.basketButton.addEventListener("click", () => {
            this.events.emit("basket:open");
        });
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}
