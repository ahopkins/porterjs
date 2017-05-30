import {events, getProperty, setProperty} from '../public'
import {CONFIG} from '../config'
import {randomCharacters} from '../utils'

export const datastacks = {}

export class DataStack {
    constructor (dispatcher=null) {
        this.label = randomCharacters(18)
        this.events = dispatcher || events
        this.storage = new Proxy({}, {
            set: function(target, prop, value) {
                const reflect = Reflect.set(target, prop, value)
                return reflect
            }
        })

        datastacks[this.label] = this
    }

    set (key, value, callback) {
        // this.storage[key] = value
        this.storage.setProperty(key, value)
        if (callback !== undefined) {
            callback.apply()
        }
        const label = `StackChange||${key}||${this.events.label}`
        this.events.dispatch(label, value)
    }

    // TODO:
    // - Documentation
    establish (key, value, callback) {
        this.set(key, value, callback)
        events.dispatch(CONFIG.buildTrigger)
    }

    push (key, value, callback) {
        if (this.storage.getProperty(key) == undefined) {
            this.storage.setProperty(key, [])
        }
        this.storage.getProperty(key).push(value)
        if (callback !== undefined) {
            callback.apply()
        }
        const label = `StackChange||${key}||${this.events.label}`
        this.events.dispatch(label, value)
        console.log(CONFIG.buildTrigger)
        events.dispatch(CONFIG.buildTrigger)
    }

    get (key, def=null) {
        const retrieve = this.storage.getProperty(key) || def
        // if (!retrieve) {
        //     return def
        // }
        return retrieve
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
        const label = `StackChange||${key}||${this.events.label}`
        this.events.dispatch(label, value, property, obj)
        events.dispatch(CONFIG.buildTrigger)
    }
}