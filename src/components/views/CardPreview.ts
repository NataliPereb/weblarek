import { Card } from "./base/Card";
import { categoryMap } from "../../utils/constants";
import { IProduct } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";

export class CardPreview extends Card<IProduct> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        protected events: EventEmitter,
    ) {
        super(container);
        this.categoryElement = ensureElement(".card__category", container);
        this.descriptionElement = ensureElement(".card__text", container);
        this.imageElement = ensureElement<HTMLImageElement>(
            ".card__image",
            container,
        );
        this.buttonElement = ensureElement<HTMLButtonElement>(
            ".button",
            container,
        );

        this.buttonElement.addEventListener("click", () => {
            this.events.emit("card:action");
        });
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        this.categoryElement.className = `card__category ${categoryMap[value]}`;
    }

    set image(value: string) {
        this.setImage(this.imageElement, value);
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set buttonText(value: string) {
        this.buttonElement.textContent = value;
    }

    set buttonDisabled(disabled: boolean) {
        this.buttonElement.disabled = disabled;
    }
}
