import {one, all} from '../public'
import {findAttribute} from '../utils'


export const run = () => {
    const events = ['click','keyup','keydown','focus','blur','change']
    for (event of events) {
        let attribute = `data-${event}`
        all(`[${attribute}]`).addEventListener(event, function (e) {
            let element = e.srcElement,
                fn = findAttribute(element, attribute)
            // console.log(fn)
            window[fn](e)
        })
    }
}