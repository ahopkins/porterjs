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

// export const debounce = (fn, delay) => {
//   let timer = null
//   return () => {
//     let context = this,
//         args = arguments
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.apply(context, args)
//     }, delay)
//   }
// }

export const debounce = function(callback, wait, context = this) {
    console.log(1)
  let timeout = null 
  let callbackArgs = null
  
  const later = () => callback.apply(context, callbackArgs)
  
  return function() {
    console.log(2)
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}