import {trigger_call} from './triggers'
import {Dispatcher} from './helpers'
import {DataStack} from './stacks'
import {Request} from './requests'
import {load} from './loaders'
// import {debounce} from 'lodash'

export const one = document.querySelector.bind(document)
export const all = document.querySelectorAll.bind(document)
export const events = new Dispatcher()
export const stack = new DataStack()
export { trigger_call, Request, load }

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