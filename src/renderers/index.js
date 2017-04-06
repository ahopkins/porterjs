import {stack} from '../public'
import {node} from './methods'
import VirtualDom from './VirtualDom'

export {node}

export const render = function (virtualNode, selector, callback=null) {
    const virtualDom = new VirtualDom(virtualNode, selector)
    virtualDom.build()
    
    let virtualDoms = stack.get('virtualDoms', {})

    if (selector in virtualDoms) {
        stack.update('virtualDoms', selector, virtualDom)
    } else {
        virtualDoms[selector] = virtualDom
        stack.set('virtualDoms', virtualDoms)
    }

    !!callback && callback.call()

    return virtualDom
}