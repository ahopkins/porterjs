import {CONFIG} from '../config'

const porterNodeIdentifier = CONFIG.porterNodeIdentifier

export const node = function (nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null
    attributes = attributes || {}
    if (!(porterNodeIdentifier in attributes)) {
        attributes[porterNodeIdentifier] = p.randomCharacters(18)
    }
    return { nodeName, attributes, children }
}