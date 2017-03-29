import {one} from '../public'

export const node = function (nodeName, attributes, ...args) {  
      let children = args.length ? [].concat(...args) : null
      return { nodeName, attributes, children }
}

export const renderItem = function (virtualNode) {  
    if (virtualNode.split) return document.createTextNode(virtualNode)

    let element = document.createElement(virtualNode.nodeName)

    let attributes = virtualNode.attributes || {}
    for( let [key, value] of attributes ) {
        element.setAttribute(key, value)
    }

    (virtualNode.children || []).forEach( c => element.appendChild(renderItem(c)) )

    return element
}

export const render = function (virtualNode, selector) {
    let virtualDOM = renderItem(virtualNode)
    one(selector).appendChild(virtualDOM)
}