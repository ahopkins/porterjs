import {events} from '../public'

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
}