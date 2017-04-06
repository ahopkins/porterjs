export class Route {
    constructor (path, callback, history, fallback=null) {
        this.path = path
        this.name = name
        this.callback = callback
        this.rendered = null
        this.history = history || false
        // this.fallback = fallback
        this._fallback = fallback
    }

    trigger (e, items=null) {
        this.callback(e, items)
    }

    get fallback () {
        if (this.params && this._fallback) {
            return this._fallback.replace('finder', this.params[0])
        }
        return this._fallback
    }

    set fallback (value) {
        this._fallback = value
    }
}