import {default as process_callbacks} from './processors/process_callbacks'
import {trigger_call} from './triggers'
import {Dispatcher} from './helpers'
import {DataStack} from './stacks'
import {Router} from './routers'
import {Request} from './requests'
import {load} from './loaders'
import {ready, debounce} from './utils'

export const one = document.querySelector.bind(document)
export const all = document.querySelectorAll.bind(document)
export const events = new Dispatcher()
export const router = new Router()
export const stack = new DataStack()
export { process_callbacks, trigger_call, Request, load, ready, debounce }

export const settings = {
  pushPath: true,
  pushPathId: "content"
}