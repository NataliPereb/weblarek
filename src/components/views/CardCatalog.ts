import { Card } from "./base/Card";
import { IProduct } from "../../types/index";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";

export class CardCatalog extends Card<IProduct> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    constructor(container: HTMLElement, onClick: () => void) {
        super(container);
        this.categoryElement = ensureElement(".card__category", container);
        this.imageElement = ensureElement<HTMLImageElement>(
            ".card__image",
            container,
        );

        container.addEventListener("click", onClick);
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        const modifier = categoryMap[value];
        if (modifier) {
            this.categoryElement.classList.add(modifier);
        }
    }

    set image(value: string) {
        this.setImage(this.imageElement, value);
    }
}
