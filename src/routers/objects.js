export class Route {
    constructor (path, callback, history, fallback=null) {
        this.path = path
        this.name = name
        this.callback = callback
        this.rendered = null
        this.history = history || false
        this.fallback = fallback
    }

    trigger (e) {
        this.callback(e)
    }
}