import {one} from '../public'
import * as loaders from '../loaders'

export const startup = (config) => {
  loaders.startup()
}

export function findAttribute (element, attribute) {
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

// TODO:
// - Add to documentation
export function findElementWithAttribute (element, attribute, value=null) {
    // let a = element.getAttribute(attribute)
    // if (a !== undefined) return a
    if (element != null) {
        while (element.parentNode) {
            let a = element.getAttribute(attribute)
            if (a !== undefined && a !== null) {
                if ((value !== null && a === value) || value === null) {
                  return element
                }
            }
            element = element.parentNode
        }
    }
    return null
}

export function getTarget (e) {
    const attr = findAttribute(e.srcElement, 'data-target')
    if (attr == 'self') {
        return e.srcElement
    } else {
        return one(`#${attr}`)
    }
}

// Check if element is a string or an Element. If string, get Element
export function getElement (e) {
    return typeof e == 'string' ? one(e) : e
}

export function ready (fn) {
  if (document.readyState != 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

export function debounce (callback, wait, context = this) {
  let timeout = null 
  let callbackArgs = null
  
  const later = () => callback.apply(context, callbackArgs)
  
  return function() {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function* range(count, start) {
    start = start || 0
    for (let i=0; i<count; i++) {
        yield start + delta
    }
}

export function randomCharacters (num) {
    return new Array(num).join().replace(/(.|$)/g, function () {
        return ((Math.random() * 36) | 0).toString(36)
    });
}