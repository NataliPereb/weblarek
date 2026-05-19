import { Component } from "./Component";

interface IModal {
    catalogElement: HTMLElement[];
}

export class Modal extends Component<IModal> {
    protected closeButtonModal: HTMLButtonElement;
    protected modalContent: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.closeButtonModal = container.querySelector(
            ".modal__close",
        ) as HTMLButtonElement;
        this.modalContent = container.querySelector(
            ".modal__content",
        ) as HTMLElement;
        this.closeButtonModal.addEventListener("click", () => this.close());
        this.container.addEventListener("click", (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });
    }

    open() {
        this.container.classList.add("modal_active");
        document.body.style.overflow = "hidden";
    }

    close() {
        this.container.classList.remove("modal_active");
        document.body.style.overflow = "";
        this.modalContent.innerHTML = "";
    }

    setContent(content: HTMLElement) {
        this.modalContent.innerHTML = "";
        this.modalContent.appendChild(content);
    }
}
