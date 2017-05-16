import {CONFIG} from '../config'
import * as Spark from 'spark-md5'

const porterNodeIdentifier = CONFIG.porterNodeIdentifier
const porterNodeHash = CONFIG.porterNodeHash

export const nodeHashes = {}

export const generateNodeHash = function (children) {
    const textChildren = children.filter(c => c && c.split)
    return Spark.hash(JSON.stringify(textChildren))
}

export const node = function (nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null
    attributes = attributes || {}

    // console.log('nodeName', nodeName, (!(porterNodeIdentifier in attributes) && !(['svg', 'use'].includes(nodeName))))

    // TODO
    // - Cleanup SVG hack
    if (!(porterNodeIdentifier in attributes) && !(['svg', 'use'].includes(nodeName))) {
        attributes[porterNodeIdentifier] = p.randomCharacters(18)
    }
    // console.log('nodeName', nodeName, attributes)

    if (children && !(porterNodeHash in attributes) && !(['svg', 'use'].includes(nodeName))) {
        // attributes[porterNodeHash] = generateNodeHash(children)
        nodeHashes[attributes[porterNodeIdentifier]] = generateNodeHash(children)
    }
    return { nodeName, attributes, children }
}