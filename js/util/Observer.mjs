/**
 * Observer class is used to emits and handle events when the observed
 * object changes state.
 * @constructor
 * @public
 */
export class Observer {
    /**
     * Map associating handlers with their event name.
     * @type {Map<string, Function}
     * @private
     */
    #handlers = new Map()

    constructor(...events) {
        if (events.length < 1 || events.some(e => typeof e !== "string"))
            throw TypeError("Observer constructor needs strings as arguments")

        events.forEach(e => {
            this.#handlers.set(e, [])
        })
    }

    /**
     * Emits an event with the specified name with attached data
     * @param {string} event - The event name
     * @param {object} data  - The data attached to the event
     */
    fire(event, data = {}) {
        if (typeof event !== "string")
            throw new TypeError("Observer.fire method needs a string as a first argument")
        if (!this.#handlers.has(event))
            throw new Error("The specified event is not set")

        const d = { ...data, event, firedAt: Date.now() }
        this.#handlers.get(event).forEach(handler => handler(d))
    }

    /**
     * Adds a event handler to the event with the specified name. The handle
     * will be performs when the event with the event specified name will be emitted.
     * @param {string} event     - The event name
     * @param {Function} handler - The handler to add
     */
    on(event, handler) {
        if (typeof event !== "string")
            throw new TypeError("Observer.on method needs a string as first argument")
        if (!(handler instanceof Function))
            throw new TypeError("Observer.on method needs a function as second argument")
        if (!this.#handlers.has(event))
            throw new Error("The specified event is not set")

        const handlers = this.#handlers.get(event)
        handlers.push(handler)
    }

    /**
     * Emits an event when the specified Observer emits
     * @param {string} event          - The event name
     * @param {Observer} Observer - The Observer
     */
    spread(event, observer) {
        if (typeof event !== "string")
            throw new TypeError("Observer.spread method needs a string as first argument")
        if (!(observer instanceof Observer))
            throw new TypeError("Observer.spread method needs an instance of Observer object")
        if (!this.#handlers.has(event))
            throw new Error("The specified event is not set")

        Observer.on(event, data => this.fire(event, data))
    }

    /**
     * Removes the specified handler of the event with the specified name.
     * @param {string} event     - The event name
     * @param {Function} handler - The handler to remove
     */
    off(event, handler) {
        if (typeof event !== "string")
            throw new TypeError("Observer.off method needs a string as first argument")
        if (!(handler instanceof Function))
            throw new TypeError("Observer.off method needs a function as second argument")
        if (!this.#handlers.has(event))
            throw new Error("The specified event is not set")

        const handlers = this.#handlers.get(event)
        const index = handlers.indexOf(handler)
        handlers.splice(index, 1)
    }

    /**
     * Removes all handlers of the event with the specified name.
     * @param {string} event - The event name
     */
    offAll(event) {
        if (typeof event !== "string")
            throw new TypeError("Observer.offAll method needs a string as first argument")
        if (!this.#handlers.has(event))
            throw new Error("The specified event is not set")

        const handlers = this.#handlers.get(event)
        handlers.clear()
    }
}
