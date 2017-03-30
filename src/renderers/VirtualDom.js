import {one, all} from '../public'
import {renderItem} from './methods'

export default class VirtualDom {
    constructor (virtualNode, selector) {
        this.virtualNode = virtualNode
        this.selector = selector

    }

    build () {
        // console.log('build', (!!all(`${this.selector} > [data-porter-node]`).queryset.length))
        (!!all(`${this.selector} > [data-porter-node]`).queryset.length) && this.clearSelector()
        this.rendered = renderItem(this.virtualNode)
        one(this.selector).appendChild(this.rendered)
    }

    clearSelector () {
        all(`${this.selector} > [data-porter-node]`).remove()
    }
}