import {trigger_call, settings, router} from '../public'
import {NodeQuery} from './nodequery'
import {CONFIG} from '../config'

export const startup = () => {
    Object.defineProperty(Object.prototype, "getProperty", {
        value: function (desc) {
            return desc.split('.').reduce((o, i) => o[i], this)
        }
    })
    Object.defineProperty(Object.prototype, "setProperty", {
        value: function (desc, value) {
            const arr = desc.split('.')
            const last = arr.pop()
            let obj = this
            if (arr.length > 0) {
                while (arr.length && (obj = obj[arr.shift()])) {}
            }
            obj[last] = value
        }
    })

    Object.prototype[Symbol.iterator] = function*() {
        for(let key of Object.keys(this)) {
            yield([ key, this[key] ])
        } 
    }

    Node.prototype.remove = function () {
        // TODO:
        // - Add to documentation
        const element = this,
              parent = this.parentNode
        parentNode.removeChild(element)
    }


    // Element.prototype.one = function () { return this.querySelector.apply(this, arguments) }
    Element.prototype.one = function () { return NodeQuery.one.apply(this, arguments) }
    Element.prototype.all = function () { return this.querySelectorAll.apply(this, arguments) }
    Element.prototype.addClass = function (className) {
        if (this.classList) {
            for (let cls in className.split(' ')) {
                this.classList.add(className)
            }
        } else {
           this.className += ' ' + className
        }
        return this
    }
    Element.prototype.removeClass = function (className) {
        if (this.classList) {
            this.classList.remove(className)
        } else {
            this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
        }
        return this
    }
    // TODO:
    // - Add to documentation
    Element.prototype.hasClass = function (className) {
        if (this.classList) {
            return this.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className)
        }
    }
    Element.prototype.toggleClass = function (className) {
        if (this.classList) {
           this.classList.toggle(className)
        } else {
            const classes = this.className.split(' ')
            const existingIndex = classes.indexOf(className)

            if (existingIndex >= 0) {
                classes.splice(existingIndex, 1)
            }
            else {
                classes.push(className)
            }

            this.className = classes.join(' ')
        }
    }

    if (settings.pushPath) {
        window.addEventListener('popstate', function(e) {
            if( !!window.history.state ){
                var url = window.history.state.url;
                console.log('popstate', url)

                if (CONFIG.render == 'server') {
                    trigger_call(null, url)
                } else {
                    router.trigger(null, url)
                }
            }
        })
    }   
}