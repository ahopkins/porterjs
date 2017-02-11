export class Route {
    constructor (path, callback, history) {
        this.path = path
        this.callback = callback
        this.history = history || false
    }

    trigger (e) {
        this.callback(e)
    }
}