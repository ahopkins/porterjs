import {events, getProperty, setProperty} from '../public'
import {CONFIG} from '../config'

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

    // TODO:
    // - Documentation
    establish (key, value, callback) {
        this.set(key, value, callback)
        const label = CONFIG.buildTrigger
        events.dispatch(label)
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
        obj.setProperty(property, value)
        if (callback !== undefined) {
            callback.apply()
        }
        const label = `${key}StackChange`
        events.dispatch(label, value, property, obj)
    }
}