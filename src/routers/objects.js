export class Route {
    constructor (path, callback, history, fallback=null) {
        this.path = path
        this.name = name
        this.callback = callback
        this.rendered = null
        this.history = history || false
        this.labels = {}
        this.parts = []
        this.test = this._compile()
        // this.fallback = fallback
        this._fallback = fallback
    }

    trigger (e, items=null) {
        this.callback(e, items)
    }

    get fallback () {
        return this.rendered
        // if (this.params) {
        //     console.log(this)
        //     // return this._fallback.replace('finder', this.params[0])
        // }
        // return this._fallback
    }

    set fallback (value) {
        this._fallback = value
    }

    _compile () {
        if (this.path) {
            const regex = /\{([a-zA-Z]+)\:(.*)\}/g;
            let parts = []
            try {

                parts = this.path.split('/')
            } catch(err) {
                console.warn("This is not a string")
            }
            // console.log('parts', parts)

            let m;
            let label;

            for (let [index, part] of parts.entries()) {
                // console.log(index, part)
                while ((m = regex.exec(part)) !== null) {
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++
                    }

                    this.labels[index] = m[1]
                    parts[index] = `(${m[2]})`
                }
            }
            
            this.parts = parts

            const expression = parts.join('\/')

            return new RegExp(expression);
        }
    }
}