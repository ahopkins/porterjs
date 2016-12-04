
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


    Element.prototype.one = function() {
      return this.querySelector.apply(this, arguments)
    }

    Element.prototype.all = function() {
      return this.querySelectorAll.apply(this, arguments)
    }

}