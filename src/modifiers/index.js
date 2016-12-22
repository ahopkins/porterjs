
export const startup = () => {
    Object.defineProperty(NodeList.prototype, "addEventListener", {
        value: function (event, callback, useCapture) {
            useCapture = ( !! useCapture) | false
            for (var i = 0; i < this.length; ++i) {
                if (this[i] instanceof Node) {
                    this[i].addEventListener(event, callback, useCapture)
                }
            }
            return this
        }
    })

    Object.prototype[Symbol.iterator] = function*() {
        for(let key of Object.keys(this)) {
            yield([ key, this[key] ])
        } 
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
}