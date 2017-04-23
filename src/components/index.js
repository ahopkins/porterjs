/*global Object*/
import {CONFIG} from '../config'
import {stack} from '../public'

const porterNodeIdentifier = CONFIG.porterNodeIdentifier

export class Component {
    constructor (props, children) {
        // this._dirty = true
        this.children = children
        this.props = props

        this.state = Object.assign(stack, {})
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

    render (props, state) {}

    renderItem (identifier=null) {
        let item = this.render(this.props, this.state)
        if (identifier) {
            item.attributes[CONFIG.porterNodeIdentifier] = identifier
        }
        return item
    }
}

// export {Component}