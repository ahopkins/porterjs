/*global Object*/
import {CONFIG} from '../config'
import {stack} from '../public'
import {Dispatcher, dispatchers} from '../helpers'
import {DataStack, datastacks} from '../stacks'
import {model} from './utils'

const porterNodeIdentifier = CONFIG.porterNodeIdentifier
const porterDispatcherIdentifier = CONFIG.porterDispatcherIdentifier

const componentDispatcherKeys = {}
const componentDataStackKeys = {}

export class Component {
    constructor (props, children) {
        // this._dirty = true


        this.children = children
        this.props = props
        this.identifier = this.props[porterNodeIdentifier]
        this.dispatcherIdentifier = componentDispatcherKeys[this.identifier]
        this.datastackIdentifier = componentDataStackKeys[this.identifier]
        this.events = dispatchers[this.dispatcherIdentifier] || new Dispatcher()
        this.state = datastacks[this.datastackIdentifier] || new DataStack(this.events)

        componentDispatcherKeys[this.identifier] = this.events.label
        componentDataStackKeys[this.identifier] = this.state.label



        // this.state = Object.assign(stack, {})
        // stack.push('components', )
    }

    actions (state) {
        return {}
    }

    action (key) {
        const path = ['p', 'componentActions', this.props[porterNodeIdentifier], key]
        return path.join('.')
    }

    model (key) {
        return model(key, this.state, this.events.label)
    }

    preMount (props, state) {
        // console.log('preMount')
    }

    postMount (props, state) {
        // console.log('postMount')
    }

    preUnMount (props, state) {
        // console.log('preUnMount')
    }

    postUnMount (props, state) {
        // console.log('postUnMount')
    }

    preUpdate (props, state) {
        // console.log('preUpdate')
    }

    postUpdate (props, state) {
        // console.log('postUpdate')
    }

    shouldUpdate (props, state) {
        return true
    }

    shouldModel (props, state) {
        return false
    }

    render (props, state) {}

    renderItem (identifier=null) {
        let item = this.render(this.props, this.state)
        if ((identifier || this.identifier) && !(['svg', 'use'].includes(item.nodeName))) {
            item.attributes[CONFIG.porterNodeIdentifier] = identifier || this.identifier
        }
        if (['svg', 'use'].includes(item.nodeName)) {
            delete item.attributes[CONFIG.porterNodeIdentifier]
            console.log(item.nodeName, item.attributes)
        }
        // item.attributes[porterDispatcherIdentifier] = this.events.label
        return item
    }
}