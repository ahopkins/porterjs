import {events, stack} from '../public'
import {CONFIG} from '../config'
import {load} from '../loaders'

export const clientSideStartup = function () {
    // events.add(CONFIG.buildTrigger, function () {
    //     const virtualDoms = new Map(stack.get('virtualDoms'))
    //     virtualDoms.forEach((virtualDom) => virtualDom.build())
    //     // for (let [selector, virtualDom] of virtualDoms) {
    //     //     virtualDom.build()
    //     // }
    //     load()
    // })
}