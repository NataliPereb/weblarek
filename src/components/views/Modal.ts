import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IModal {
    catalogElement: HTMLElement[];
}

export class Modal extends Component<IModal> {
    protected closeButtonModal: HTMLButtonElement;
    protected modalContent: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.closeButtonModal = ensureElement<HTMLButtonElement>(
            ".modal__close",
            container,
        );
        this.modalContent = ensureElement(".modal__content", container);
        this.closeButtonModal.addEventListener("click", () => this.close());
        this.container.addEventListener("click", (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });
    }

    open() {
        this.container.classList.add("modal_active");
    }

    close() {
        this.container.classList.remove("modal_active");
        this.modalContent.innerHTML = "";
    }

    setContent(content: HTMLElement) {
        this.modalContent.innerHTML = "";
        this.modalContent.appendChild(content);
    }
}
