import {CONFIG} from '../config'
import {one} from '../public'
import * as loaders from '../loaders'
import {clientSideStartup} from '../methodologies/client'
import {serverSideStartup} from '../methodologies/server'

export const startup = (config) => {
  loaders.startup()
  if (CONFIG.render == 'client') {
        clientSideStartup()
  } else {
        serverSideStartup()
  }
}

export function findAttribute (element, attribute) {
    // let a = element.getAttribute(attribute)
    // if (a !== undefined) return a
    if (element != null) {
        while (element.parentNode) {
            let a = element.getAttribute(attribute)
            if (a) {
                return a
            }
            element = element.parentNode
        }
    }
    return null
}

export function getLocation (element) {
  let location = findAttribute(element, 'href')
  if (!location) {
    location = findAttribute(element, 'data-url')
  } else if (!location) {
    location = findAttribute(element, 'action')
  }
  return location
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
    const attr = findAttribute(e.target, 'data-target')
    if (attr == 'self') {
        return e.target
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