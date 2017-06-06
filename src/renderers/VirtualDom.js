import {one, all, events} from '../public'
import {renderItem, operations, clearOperations} from './methods'

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
        if (this.rendered) {
            one(this.selector).appendChild(this.rendered)
        }

        for (let [_, o] of operations) {
            const component = o[0]
            const operation = o[1]

            component[operation](component.props, component.state)
        }

        clearOperations()

        events.dispatch('virtualDomBuild', this)
    }

    clear () {
        all(`${this.selector} > [data-porter-node]`).remove()
    }
}