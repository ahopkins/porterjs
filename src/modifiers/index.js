import {trigger_call, settings} from '../public'
import {NodeListener} from '../helpers/listeners'

export const startup = () => {
    Object.defineProperty(NodeList.prototype, "addEventListener", {
        value: function (event, callback, useCapture) {
            useCapture = ( !! useCapture) | false
            for (var i = 0; i < this.length; ++i) {
                let node = this[i]
                if (node instanceof Node) {
                    new NodeListener(node, event, callback, useCapture)
                }
            }
            return this
        }
    })
    Object.defineProperty(NodeList.prototype, "removeEventListener", {
        value: function (event, callback, useCapture) {
            useCapture = ( !! useCapture) | false
            for (var i = 0; i < this.length; ++i) {
                let node = this[i]
                if (node instanceof Node) {
                    node.removeEventListener(event, callback, useCapture)
                }
            }
            return this
        }
    })
    // TODO:
    // - Document addition of innerHTML to prototype
    Object.defineProperty(NodeList.prototype, "innerHTML", {
        set: function (value) {
            for (var i = 0; i < this.length; ++i) {
                let node = this[i]
                if (node instanceof Node) {
                    node.innerHTML = value
                }
            }
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


    Element.prototype.one = function () { return this.querySelector.apply(this, arguments) }
    Element.prototype.all = function () { return this.querySelectorAll.apply(this, arguments) }
    Element.prototype.addClass = function (className) {
        if (this.classList) {
            this.classList.add(className)
        } else {
           this.className += ' ' + className
        }
    }
    Element.prototype.removeClass = function (className) {
        if (this.classList) {
            this.classList.remove(className)
        } else {
            this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
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
                trigger_call(null, url)
            }
        })
    }   
}