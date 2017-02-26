import {trigger_call, settings} from '../public'
import {NodeQuery} from './nodequery'

export const startup = () => {
    // Object.defineProperty(NodeList.prototype, "addEventListener", {
    //     value: function (event, callback, useCapture) {
    //         useCapture = ( !! useCapture) | false
    //         for (var i = 0; i < this.length; ++i) {
    //             let node = this[i]
    //             if (node instanceof Node) {
    //                 new NodeListener(node, event, callback, useCapture)
    //             }
    //         }
    //         return this
    //     }
    // })
    // Object.defineProperty(NodeList.prototype, "removeEventListener", {
    //     value: function 
    // })
    // // TODO:
    // // - Document addition of innerHTML to prototype
    // Object.defineProperty(NodeList.prototype, "innerHTML", {
    //     set: function (value) {
    //         for (var i = 0; i < this.length; ++i) {
    //             let node = this[i]
    //             if (node instanceof Node) {
    //                 node.innerHTML = value
    //             }
    //         }
    //     }
    // })
    // // TODO:
    // // - Document addition of removeClass to prototype
    // Object.defineProperty(NodeList.prototype, "removeClass", {
    //     value: function (value) {
    //         for (var i = 0; i < this.length; ++i) {
    //             let node = this[i]
    //             if (node instanceof Node) {
    //                 node.removeClass(value)
    //             }
    //         }
    //     }
    // })
    // // TODO:
    // // - Document addition of addClass to prototype
    // Object.defineProperty(NodeList.prototype, "addClass", {
    //     value: function (value) {
    //         for (var i = 0; i < this.length; ++i) {
    //             let node = this[i]
    //             if (node instanceof Node) {
    //                 node.addClass(value)
    //             }
    //         }
    //     }
    // })
    // // TODO:
    // // - Document addition to prototype
    // Object.defineProperty(NodeList.prototype, "one", {
    //     value: function (querySelector) {
    //         let list = []
    //         this.forEach( function(node) {
    //             const item = node.one(querySelector)
    //             if (item !== null) {
    //                 list.push(item)
    //             }
    //         })
    //         return list
    //     }
    // })
    // // TODO:
    // // - Document addition to prototype
    // Object.defineProperty(NodeList.prototype, "all", {
    //     value: function (querySelector) {
    //         let list = []
    //         this.forEach( function(node) {
    //             const items = node.all(querySelector)
    //             if (items !== null) {
    //                 items.forEach(function (item) {
    //                     list.push(item)
    //                 })
    //             }
    //         })
    //         return list
    //     }
    // })
    // TODO:
    // - Document addition to prototype
    Object.defineProperty(Object.prototype, "getProperty", {
        value: function (desc) {
            return desc.split('.').reduce((o, i) => o[i], this)
        }
    })
    // TODO:
    // - Document addition to prototype
    Object.defineProperty(Object.prototype, "setProperty", {
        value: function (desc, value) {
            const arr = desc.split('.')
            const last = arr.pop()
            let obj = this
            while (arr.length && (obj = obj[arr.shift()]))
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
                trigger_call(null, url)
            }
        })
    }   
}