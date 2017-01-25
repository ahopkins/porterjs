import {one} from '../public'

export const findAttribute = (element, attribute) => {
    // let a = element.getAttribute(attribute)
    // if (a !== undefined) return a
    if (element != null) {
        while (element.parentNode) {
            let a = element.getAttribute(attribute)
            if (a !== undefined && a !== null) {
                return a
            }
            element = element.parentNode
        }
    }
    return null
}

export const getTarget = (e) => {
    const attr = findAttribute(e.srcElement, 'data-target')
    if (attr == 'self') {
        return e.srcElement
    } else {
        return one(`#${attr}`)
    }
}

export const ready = (fn) => {
  if (document.readyState != 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

export const debounce = function(callback, wait, context = this) {
  let timeout = null 
  let callbackArgs = null
  
  const later = () => callback.apply(context, callbackArgs)
  
  return function() {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}