import {events, getProperty, setProperty} from '../public'

export class DataStack {
    constructor () {
        this.storage = new Proxy({}, {
            set: function(target, prop, value) {
                const reflect = Reflect.set(target, prop, value)
                return reflect
            }
        })
    }

    set (key, value, callback) {
        this.storage[key] = value
        if (callback !== undefined) {
            callback.apply()
        }
        const label = `${key}StackChange`
        events.dispatch(label, value)
    }

    push (key, value, callback) {
        if (this.storage[key] == undefined) {
            this.storage[key] = []
        }
        this.storage[key].push(value)
        if (callback !== undefined) {
            callback.apply()
        }
        const label = `${key}StackChange`
        events.dispatch(label, value)
    }

    get (key, def) {
        def = def || null
        if (this.storage[key] == undefined) {
            return def
        }
        return this.storage[key]
    }

    keys () {
        return Object.keys(this.storage)
    }

    // TODO:
    // - Add to documentation
    update (key, property, value, callback) {
        let obj = this.get(key)
        // TODO:
        // - Raise error if the object does not exist.
        obj.setProperty(property, value)
        if (callback !== undefined) {
            callback.apply()
        }
        const label = `${key}StackChange`
        events.dispatch(label, value)
    }
}