export class Componant {
    #parent = null

    constructor() {
    }

    create() {}

    remove() {
        this.getElement().remove()
    }

    append(componant) {
        this.getElement().appendChild(componant.getElement())
    }

    mount(element) {
        this.#parent = element
        this.#parent.appendChild(this.getElement())
    }

    getParent() {
        return this.#parent
    }

    getElement() {}
}
