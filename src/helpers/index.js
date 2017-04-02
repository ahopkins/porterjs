export class Check {
    constructor (subject) {
        self.subject = subject
    }

    isFunction () { 
        return typeof self.subject == 'function' || false
    }
}

export class Dispatcher {  
    constructor () {
        this.listeners = new Map();
    }

    add (label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push(callback);
    }

    remove (label, callback) {
        let listeners = this.listeners.get(label),
            index

        if (listeners && listeners.length) {
            index = listeners.reduce((i, listener, index) => {
                return (Check(listener).isFunction() && listener === callback) ? i = index : i
            }, -1)

            if (index > -1) {
                listeners.splice(index, 1);
                this.listeners.set(label, listeners)
                return true
            }
        }
        return false
    }

    dispatch (label, ...args) {
        let listeners = this.listeners.get(label)

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener(...args)
            });
            return true
        }
        return false
    }
}

export {default as middleware} from './middleware'

// http://www.datchley.name/es6-eventemitter/
// https://davidwalsh.name/customevent