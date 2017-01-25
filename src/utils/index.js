import {one} from '../public'

export const findAttribute = (element, attribute) => {
    // let a = element.getAttribute(attribute)
    // if (a !== undefined) return a
    if (element != null) {
        while (element.parentNode) {
            let a = element.getAttribute(attribute)
            if (a !== undefined && a !== null) {
                return a
            }
            element = element.parentNode
        }
    }
    return null
}

export const getTarget = (e) => {
    const attr = findAttribute(e.srcElement, 'data-target')
    if (attr == 'self') {
        return e.srcElement
    } else {
        return one(`#${attr}`)
    }
}
