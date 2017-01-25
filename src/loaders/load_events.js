import {one, all} from '../public'
import {findAttribute} from '../utils'

const eventListener = function (e) {
    let element = e.srcElement,
        attribute = `data-${e.type}`,
        fn = findAttribute(element, attribute)
    window[fn](e)
}

export const run = () => {
    const events = ['click','keyup','keydown','focus','blur','change']
    for (event of events) {
        let attribute = `data-${event}`
        all(`[${attribute}]`)
            .addEventListener(event, eventListener)
    }
}