import {default as process_callbacks} from './processors/process_callbacks'
import {NodeQuery} from './modifiers/nodequery'
import {trigger_call} from './triggers'
import {Dispatcher} from './helpers'
import {DataStack} from './stacks'
import {Router} from './routers'
import {Request} from './requests'
import {load} from './loaders'
import {ready, debounce, range, randomCharacters, findAttribute, getTarget} from './utils'

export const one = NodeQuery.one.bind(document)
export const all = NodeQuery.all.bind(document)
export const events = new Dispatcher()
export const router = new Router()
export const stack = new DataStack()
export { process_callbacks, trigger_call, Request, load, ready, debounce, range, randomCharacters, findAttribute, getTarget }

export const settings = {
  pushPath: true,
  pushPathId: "content"
}