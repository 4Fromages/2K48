export class Observable {
    #handlers = new Map()

    constructor() {}

    /**
     * Emits an event with attached data
     * @param {String} eventName 
     * @param {object} data 
     */
    emitEvent(eventName, data) {
        if (this.#handlers.has(eventName)) {
            if (data) {
                data.eventName = eventName
                data.emittedAt = Date.now()
            }
            this.#handlers.get(eventName).forEach(handler => handler(data));
        }
    }

    /**
     * Adds a event handler, the handle will be performs when the event
     * with the event specified name will be emitted
     * @param {String} eventName 
     * @param {Function} handler 
     */
    addEventHandler(eventName, handler) {
        if (!this.#handlers.has(eventName)) {
            this.#handlers.set(eventName, new Array())
        }
        this.#handlers.get(eventName).push(handler);
    }

    /**
     * Removes all handlers of the event with the specified name
     * @param {String} eventName 
     */
    removeEventHandler(eventName) {
        if (this.#handlers.has(eventName)) {
            this.#handlers.get(eventName).clear();
        }
    }
}