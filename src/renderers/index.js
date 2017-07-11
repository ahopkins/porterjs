import {stack} from '../public'
import {node} from './node'
import {renderItem, runOperations} from './methods'
import VirtualDom from './VirtualDom'

export {node, renderItem, runOperations}

export const render = function (virtualNode, selector, callback=null, clear=true) {
    return new Promise((resolve, reject) => {
        let virtualDoms = stack.get('virtualDoms', {})
        const virtualDom = new VirtualDom(virtualNode, selector)

        if (selector in virtualDoms) {
            stack.update('virtualDoms', selector, virtualDom)
        } else {
            virtualDoms[selector] = virtualDom
            stack.set('virtualDoms', virtualDoms)
        }

        virtualDom.build(clear)

        !!callback && callback.call()
        resolve(virtualDom)

        return virtualDom
    })
}