import {trigger_call} from './triggers'
import {Dispatcher} from './helpers'
import {DataStack} from './stacks'
import {Request} from './requests'
import {load} from './loaders'
import {ready, debounce} from './utils'

export const one = document.querySelector.bind(document)
export const all = document.querySelectorAll.bind(document)
export const events = new Dispatcher()
export const stack = new DataStack()
export { trigger_call, Request, load, ready, debounce }

export const settings = {
  pushPath: true,
  pushPathId: "content"
}