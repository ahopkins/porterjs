import {events, stack} from '../public'
import {CONFIG} from '../config'

export const clientSideStartup = function () {
    console.log('clientSideStartup')
    events.add(CONFIG.buildTrigger, function () {
        console.log('buildTrigger')
        const virtualDoms = stack.get('virtualDoms')
        for (let [selector, virtualDom] of virtualDoms) {
            console.log(selector, virtualDom)
            virtualDom.build()
        }
    })
}