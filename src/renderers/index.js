import {one} from '../public'

export const node = function (nodeName, attributes, ...args) {  
      let children = args.length ? [].concat(...args) : null
      return { nodeName, attributes, children }
}

export const renderItem = function (virtualNode) {  
    if (virtualNode.split) return document.createTextNode(virtualNode)

    let component = null,
        created = false

    // Is nodeName a component?
    if (typeof virtualNode.nodeName === 'function') {
        // Check if node exists
        // TEMP - Component does NOT exist
        // if (false === false) {
            // Create new component
            component = new virtualNode.nodeName(virtualNode.attributes)
            component.preMount()
            virtualNode = component.render()
        // } else {
        //     // Update existing component
        //     // virtualNode.shouldUpdate()
        //     //      call virtualNode.preUpdate()
        //     //      virtualNode = virtualNode.render()
        //     // else:
        //     //      return
        // }
    }

    // If same as real DOM node from previous render
    // TEMP - Component is NOT same as real DOM node
    // if (false === false) {
        // createNode?
        //      Create new component
                let element = document.createElement(virtualNode.nodeName)
                created = true
        // Else:    
        //      If component:
        //          virtualNode.preUnMount()
        //          Remove node
        //          virtualNode.postUnMount()
        //      Else:
        //          remove node
        //          call virtualNode.postUpdate()
        //      return
    // } else {
    //     // Do Nothing
    //     return
    // }

    let attributes = virtualNode.attributes || {}
    for (let [key, value] of attributes) {
        element.setAttribute(key, value)
    }

    (virtualNode.children || []).forEach( c => element.appendChild(renderItem(c)) )

    // If parent:
    //      parent.appendChild(virtualNode)
    // Else:
    //      Was newly created?
    //          call virtualNode.postMount()
    //      Else:
    //          call virtualNode.postUpdate()
    if (component !== null) {
        const callbackEvent = (created) ? component.postMount : component.postUpdate
        callbackEvent()
    }

    return element
}

export const render = function (virtualNode, selector) {
    const rendered = renderItem(virtualNode)
    one(selector).appendChild(rendered)
}