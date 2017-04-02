import {events, stack} from '../public'
import {CONFIG} from '../config'

export const clientSideStartup = function () {
    events.add(CONFIG.buildTrigger, function () {
        const virtualDoms = stack.get('virtualDoms')
        for (let [selector, virtualDom] of virtualDoms) {
            virtualDom.build()
        }
    })
}