import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";

interface ISuccessView {
    totalSpent: number;
}

export class SuccessView extends Component<ISuccessView> {
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        protected events: EventEmitter,
    ) {
        super(container);

        this.descriptionElement = ensureElement(
            ".order-success__description",
            container,
        );
        this.closeButton = ensureElement(
            ".order-success__close",
            container,
        ) as HTMLButtonElement;

        this.closeButton.addEventListener("click", () => {
            this.events.emit("success:close");
        });
    }

    set totalSpent(value: number) {
        this.descriptionElement.textContent = `Списано ${value} синапсов`;
    }
}
