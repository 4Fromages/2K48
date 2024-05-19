class TileComponant extends Componant {
    #tileContainer = null
    #tileInner = null
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
        for (const className of this.#tileContainer.classList) {
            if (className.startsWith("tile-position")) {
                this.#tileContainer.classList.remove(className)
            }
        }
        this.#tileContainer.classList.add(`tile-position-${this.#x}-${this.#y}`)
    }

    getValue() {
        return this.#value
    }

    setValue(value) {
        this.#value = value
        for (const className of this.#tileContainer.classList) {
            if (className.startsWith("tile-value")) {
                this.#tileContainer.classList.remove(className)
            }
        }
        this.#tileContainer.classList.add(`tile-value-${value}`)
        this.#tileInner.innerHTML = Utils.parseK4Number(value)
    }

    doubleValue() {
        this.setValue(this.#value * 2)
    }

    getElement() {
        return this.#tileContainer
    }

    create() {
        this.#tileContainer = document.createElement("div")
        this.#tileContainer.classList.add("tile")
        this.#tileContainer.classList.add("tile-spawn")

        this.#tileInner = document.createElement("div")
        this.#tileInner.classList.add("tile-inner")
        this.#tileContainer.appendChild(this.#tileInner)

        this.setCoords(this.#x, this.#y)
        this.setValue(this.#value)
    }
}
