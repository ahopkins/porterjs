import {one, all, events} from '../public'
import {renderItem} from './methods'

export default class VirtualDom {
    constructor (virtualNode, selector) {
        this.virtualNode = virtualNode
        this.selector = selector

    }

    build (clear=true) {
        clear &&
        (!!all(`${this.selector} > [data-porter-node]`).queryset.length) && 
        this.clear()

        this.rendered = renderItem(this.virtualNode)
        one(this.selector).appendChild(this.rendered)
        events.dispatch('virtualDomBuild', this)
    }

    clear () {
        all(`${this.selector} > [data-porter-node]`).remove()
    }
}