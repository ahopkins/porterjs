import {NodeListener} from '../helpers/listeners'

export class NodeQuery {
    constructor () {
        // super()
        this.queryset = []
        // return this.queryset
    }

    set innerHTML (value) {
        for (let node of this) {
            if (node instanceof Node) {
                node.innerHTML = value
            }
        }
    }

    one (selector) {
        this.queryset = this.queryset
            .map((n) => n.one(selector))
            .filter((n) => n !== null)
        if (this.queryset.length == 1) {
            return this.queryset[0]
        }
        return this
    }

    all (selector) {
        let q = []
        this.queryset
            .map((n) => {
                q = q.concat(NodeQuery.from(n.all(selector)).queryset)
            })
        this.queryset = q.filter((n) => n !== null)
        return this
    }

    addEventListener (event, callback, useCapture) {
        useCapture = ( !! useCapture) | false
        for (let node of this) {
            if (node instanceof Node) {
                new NodeListener(node, event, callback, useCapture)
            }
        }
        return this
    }

    removeEventListener (event, callback, useCapture) {
        useCapture = ( !! useCapture) | false
        for (let node of this) {
            // let node = this[i]
            if (node instanceof Node) {
                node.removeEventListener(event, callback, useCapture)
            }
        }
        return this
    }

    addClass (value) {
        for (let node of this) {
            if (node instanceof Node) {
                node.addClass(value)
            }
        }
    }

    removeClass (value) {
        for (let node of this) {
            if (node instanceof Node) {
                node.removeClass(value)
            }
        }
    }

    forEach (callback) {
        for (let node of this) {
            callback(node)
        }
    }

    remove () {
        for (let node of this) {
            if (node instanceof Node) {
                node.remove()
            }
        }
    }

    *[Symbol.iterator]() {
        // yield this.queryset
        for (let key in this.queryset) {
            yield this.queryset[key]
        }
    }

    static one (selector) {
        // console.log(this.constructor.name)
        return this.querySelector(selector)
        // return NodeQuery.from(this.querySelectorAll(selector))
    }
    static all (selector) {
        // console.log(this.constructor.name)
        // let nodequery = new NodeQuery()
        return NodeQuery.from(this.querySelectorAll(selector))
    }
    static from (...args) {
        const query = new NodeQuery()
        query.queryset = Array.from(...args)
        return query
    }
}