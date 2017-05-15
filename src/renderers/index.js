import {stack} from '../public'
import {node} from './node'
import VirtualDom from './VirtualDom'

export {node}

export const render = function (virtualNode, selector, callback=null, clear=true) {
    return new Promise((resolve, reject) => {
        const virtualDom = new VirtualDom(virtualNode, selector)
        virtualDom.build(clear)
        
        let virtualDoms = stack.get('virtualDoms', {})

        if (selector in virtualDoms) {
            stack.update('virtualDoms', selector, virtualDom)
        } else {
            virtualDoms[selector] = virtualDom
            stack.set('virtualDoms', virtualDoms)
        }

        !!callback && callback.call()
        resolve(virtualDom)

        return virtualDom
    })
}