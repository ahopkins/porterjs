/*global Object*/
import {CONFIG} from '../config'
import {stack} from '../public'
import {Dispatcher} from '../helpers'
import {DataStack} from '../stacks'
import {model} from './utils'

const porterNodeIdentifier = CONFIG.porterNodeIdentifier

export class Component {
    constructor (props, children) {
        // this._dirty = true
        this.children = children
        this.props = props
        this.events = new Dispatcher()
        this.state = new DataStack(this.events)

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
        if (identifier) {
            item.attributes[CONFIG.porterNodeIdentifier] = identifier
        }
        return item
    }
}