import { Form } from "./base/Form";
import { TContactsForm } from "../../types";
import { EventEmitter } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class ContactsForm extends Form<TContactsForm> {
    protected emailElement: HTMLInputElement;
    protected phoneElement: HTMLInputElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);

        this.emailElement = ensureElement<HTMLInputElement>(
            'input[name="email"]',
            container,
        );
        this.phoneElement = ensureElement<HTMLInputElement>(
            'input[name="phone"]',
            container,
        );

        this.container.addEventListener("submit", (e) => {
            e.preventDefault();
            events.emit("contacts:submit");
        });
    }

    set email(value: string) {
        this.emailElement.value = value;
    }

    set phone(value: string) {
        this.phoneElement.value = value;
    }
}
