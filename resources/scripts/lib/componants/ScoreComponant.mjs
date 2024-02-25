import { Componant } from "./Componant.mjs";

export class ScoreComponant extends Componant {
    #scoreContainer = null
    #scoreInner = null
    #value = 0

    constructor(value = 0) {
        super()
        this.#value = value
        this.create()
    }

    getElement() {
        return this.#scoreContainer
    }

    getValue() {
        return this.#value
    }

    setValue(value) {
        this.#value = value
        this.#scoreInner.innerHTML = value.toString()
    }

    addValue(value) {
        this.setValue(this.#value + value)
    }

    create() {
        this.#scoreContainer = document.createElement("div")
        this.#scoreContainer.classList.add("score-container")

        this.#scoreInner = document.createElement("div")
        this.#scoreInner.classList.add("score-inner")
        this.#scoreInner.innerHTML = this.#value

        this.#scoreContainer.appendChild(this.#scoreInner)
    }

    remove() {
        this.#scoreContainer.remove()
    }
}