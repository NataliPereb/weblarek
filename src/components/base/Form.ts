import { Component } from "./Component";
import { EventEmitter } from "./Events";

export class Form<T> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsContainer: HTMLElement;
    protected inputs: HTMLInputElement[];

    constructor(
        container: HTMLElement,
        protected events: EventEmitter,
    ) {
        super(container);

        this.submitButton = container.querySelector(
            'button[type="submit"]',
        ) as HTMLButtonElement;
        this.errorsContainer = container.querySelector(
            ".form__errors",
        ) as HTMLElement;
        this.inputs = Array.from(container.querySelectorAll("input"));

        container.addEventListener("submit", (event) => {
            event.preventDefault();
            this.events.emit("submit", this.getData() as object);
        });

        this.inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this.setButtonDisabled(!this.isValid());
            });
        });
    }

    setValue(data: Partial<T>) {
        // Перебираем все ключи в data
        for (const [key, value] of Object.entries(data)) {
            // Ищем поле с таким именем
            const input = this.container.querySelector(
                `[name="${key}"]`,
            ) as HTMLInputElement;
            if (input) {
                input.value = String(value);
            }
        }
    }

    // Показать ошибки
    setErrors(errors: Partial<Record<keyof T, string>>) {
        // Превращаем объект ошибок в строку
        const errorText = Object.values(errors).filter(Boolean).join(", ");
        this.errorsContainer.textContent = errorText;

        // Если есть ошибки - блокируем кнопку
        this.submitButton.disabled = Object.values(errors).some(Boolean);
    }

    // Получить все данные формы
    getData(): T {
        const data: Record<string, string> = {};
        this.inputs.forEach((input) => {
            data[input.name] = input.value;
        });
        return data as T;
    }

    // Заблокировать/разблокировать кнопку
    setButtonDisabled(disabled: boolean) {
        this.submitButton.disabled = disabled;
    }

    protected isValid(): boolean {
        return this.inputs.every((input) => input.value.trim() !== "");
    }
}
