import {CONFIG} from '../config'

const porterNodeIdentifier = CONFIG.porterNodeIdentifier

class Component {
    constructor (props, children) {
        this._dirty = true
        this.children = children
        this.props = props

        if (!this.state) this.state = {}
    }

    preMount () {
        console.log('preMount')
    }

    postMount () {
        console.log('postMount')
    }

    preUnMount () {
        console.log('preUnMount')
    }

    postUnMount () {
        console.log('postUnMount')
    }

    preUpdate () {
        console.log('preUpdate')
    }

    postUpdate () {
        console.log('postUpdate')
    }

    shouldUpdate () {
        return true
    }

    render (props, state) {}

    renderItem (identifier=null) {
        let item = this.render()
        if (identifier) {
            item.attributes[CONFIG.porterNodeIdentifier] = identifier
        }
        return item
    }
}

export {Component}