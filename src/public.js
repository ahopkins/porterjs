import {default as process_callbacks} from './processors/process_callbacks'
import {NodeQuery} from './modifiers/nodequery'
import {trigger_call} from './triggers'
import {Dispatcher, middleware} from './helpers'
import {DataStack} from './stacks'
import {Router} from './routers'
import {Request} from './requests'
import {load} from './loaders'
import {ready, debounce, range, randomCharacters, findAttribute, getTarget, findElementWithAttribute} from './utils'
import {render, node } from './renderers'
import {Component} from './components'

export const one = NodeQuery.one.bind(document)
export const all = NodeQuery.all.bind(document)
export const events = (new Dispatcher())
export const router = (new Router())
export const stack = (new DataStack())
export { process_callbacks, trigger_call, Request, load, ready, debounce, range, randomCharacters, findAttribute, getTarget, render, node, Component, middleware, findElementWithAttribute }

export const settings = {
  pushPath: true,
  pushPathId: "content"
}