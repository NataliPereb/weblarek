import { Component } from "../../base/Component";
import { EventEmitter } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";

export class Form<T> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsContainer: HTMLElement;
    protected inputs: HTMLInputElement[];

    constructor(
        container: HTMLElement,
        protected events: EventEmitter,
    ) {
        super(container);

        this.submitButton = ensureElement<HTMLButtonElement>(
            'button[type="submit"]',
            container,
        );
        this.errorsContainer = ensureElement(".form__errors", container);
        this.inputs = Array.from(container.querySelectorAll("input"));

        container.addEventListener("submit", (event) => {
            event.preventDefault();
            this.events.emit("submit");
        });

        this.inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this.events.emit("form.changed", {
                    name: input.name,
                    value: input.value,
                });
            });
        });
    }

    render(data?: Partial<T>): HTMLElement {
        if (data) {
            if ("errors" in data && typeof data.errors === "string") {
                this.errorsContainer.textContent = data.errors;
            }
            if ("valid" in data && typeof data.valid === "boolean") {
                this.submitButton.disabled = !data.valid;
            }
        }
        return this.container;
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set error(value: string) {
        this.errorsContainer.textContent = value;
    }
}
