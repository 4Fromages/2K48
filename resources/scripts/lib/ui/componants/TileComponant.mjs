import { Componant } from "./Componant.mjs"

export class TileComponant extends Componant {
    #element = null
    #x = null
    #y = null
    #value = 2

    constructor(x, y, value) {
        super()
        this.#x = x
        this.#y = y
        this.#value = value

        this.create()
    }

    getX() {
        return this.#x
    }

    getY() {
        return this.#y
    }

    setCoords(x, y) {
        this.#x = x
        this.#y = y
        for (const className of this.#element.classList) {
            if (className.startsWith("tile-position")) {
                this.#element.classList.remove(className)
            }
        }
        this.#element.classList.add(`tile-position-${this.#x}-${this.#y}`)
    }

    getValue() {
        return this.#value
    }

    setValue(value) {
        this.#value = value
        for (const className of this.#element.classList) {
            if (className.startsWith("tile-value")) {
                this.#element.classList.remove(className)
            }
        }
        this.#element.classList.add(`tile-value-${value}`)
        this.#element.innerHTML = value.toString().replace("0", "&Kopf;")
    }

    doubleValue() {
        this.setValue(this.#value * 2)
    }

    getElement() {
        return this.#element
    }

    create() {
        this.#element = document.createElement("div")
        this.#element.classList.add("tile")
        this.setCoords(this.#x, this.#y)
        this.setValue(this.#value)
        this.#element.classList.add("tile-spawn")
    }

    remove() {
        return this.#element.remove()
    }
}
