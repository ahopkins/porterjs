import {one, all} from '../public'
import {findAttribute, findElementWithAttribute} from '../utils'

const eventListener = function (e) {
    const element = e.srcElement,
          attribute = `data-${e.type}`,
          fn = findAttribute(element, attribute),
          target = findElementWithAttribute(element, attribute),
          arr = fn.split('.'),
          first = arr.shift(),
          last = arr.pop()
    
    let obj = window[first]


    // TODO:
    // - Add to documentation ability to have dot notation in event attributes
    if (arr.length > 0) {
        while (arr.length && (obj = obj[arr.shift()])) {}
    }

    if (last !== undefined) {
        obj = obj[last]
    }

    obj.call(target, e)
}

export const run = () => {
    const events = ['click','keyup','keydown','focus','blur','change']
    for (event of events) {
        let attribute = `data-${event}`
        all(`[${attribute}]`)
            .addEventListener(event, eventListener)
    }
}