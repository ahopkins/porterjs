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

    preMount () {
        // console.log('preMount')
    }

    postMount () {
        // console.log('postMount')
    }

    preUnMount () {
        // console.log('preUnMount')
    }

    postUnMount () {
        // console.log('postUnMount')
    }

    preUpdate () {
        // console.log('preUpdate')
    }

    postUpdate () {
        // console.log('postUpdate')
    }

    shouldUpdate () {
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