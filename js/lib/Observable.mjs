export class Observable {
    #eventHandlers = new Map()

    constructor(events = []) {
        events.forEach(eventName => {
            this.#setEventHandler(eventName)
        })
    }

    /**
     * Emits an event with attached data
     * @param {String} eventName 
     * @param {object} data 
     */
    emitEvent(eventName, data = {}) {
        this.#setEventHandler(eventName)
        
        if (data) {
            data.eventName = eventName
            data.emittedAt = Date.now()
        }
        this.#eventHandlers.get(eventName).forEach(handler => handler(data));
    }

    /**
     * Adds a event handler, the handle will be performs when the event
     * with the event specified name will be emitted
     * @param {String} eventName 
     * @param {Function} handler 
     */
    addEventHandler(eventName, handler) {
        this.#setEventHandler(eventName)
        this.#eventHandlers.get(eventName).push(handler);
    }

    /**
     * Emits to an event when the specified observable emit
     * @param {String} eventName 
     * @param {Observable} observable 
     */
    spreadEvent(eventName, observable) {
        this.#setEventHandler(eventName)
        observable.addEventHandler(eventName, data => {
            this.emitEvent(eventName, data)
        })
    }

    /**
     * Removes all eventHandlers of the event with the specified name
     * @param {String} eventName 
     */
    removeEventHandler(eventName) {
        if (this.#eventHandlers.has(eventName)) {
            this.#eventHandlers.get(eventName).clear();
        }
    }

    /**
     * Set an event handler
     * @param {String} eventName 
     */
    #setEventHandler(eventName) {
        if (!this.#eventHandlers.has(eventName)) {
            this.#eventHandlers.set(eventName, new Array())
        }
    }
}