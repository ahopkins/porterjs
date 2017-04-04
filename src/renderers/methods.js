import {one, stack} from '../public'
import {CONFIG} from '../config'

const porterNodeIdentifier = CONFIG.porterNodeIdentifier

// const shallowTree = function (virtualNode) {
//     const nodeName = virtualNode.nodeName
//     const attributes = virtualNode.attributes
//     let children = []

//     for (let child of virtualNode.children) {
//         const value = (typeof child === 'string')
//                     ? child
//                     : (typeof child.nodeName === 'function')
//                         ? child.nodeName.name
//                         : child.nodeName
//         children.push(value)
//     }

//     return { nodeName, attributes, children }
// }

// const shallowRepr = function (item) {
//     return JSON.stringify(shallowTree(item))
// }

// const getExistingInstance = function (identifier) {
//     const checkChildren = function (prefix, children) {
//         prefix = `${prefix}.children`
//         for (let [key, child] of children.entries()) {
//             const childPrefix = `${prefix}.${key.toString()}`
//             // console.log(child.nodeName, childPrefix, child.attributes)
//             if (child.attributes && child.attributes[porterNodeIdentifier] === identifier) {
//                 // console.log('found', child)
//                 return [childPrefix, child]
//             }

//             if (typeof child.children === 'object') {
//                 const instance = checkChildren(childPrefix, child.children)
//                 if (instance) {
//                     return instance
//                 }
//             }
//         }
//     }

//     for (let [selector, virtualDom] of stack.get('virtualDoms')) {
//         let virtualNode = virtualDom.virtualNode
//         const instance = checkChildren(`${selector}.virtualNode`, virtualNode.children)
//         if (instance) {
//             return instance
//         }
//     }
//     return null
// }

// const checkIfNodeChanged = function (virtualNode) {
//     const identifier = virtualNode.attributes[porterNodeIdentifier]
//     let origRepr = shallowRepr(virtualNode)
    
//     const existingInstance = getExistingInstance(identifier)
//     if (existingInstance) {
//         const path = existingInstance[0]
//         let instance = existingInstance[1],
//             oldRepr = shallowRepr(instance)

//         if (typeof instance.nodeName === 'function') {
//             const component = new instance.nodeName(instance.attributes, instance.children)

//             instance = component.renderItem(identifier)
//             console.log(instance)
//             oldRepr = shallowRepr(instance)
//         }

//         console.log(origRepr, oldRepr)

//         // console.log(shallowRepr(virtualNode))
//         // console.log(shallowRepr(instance))
//         return origRepr !== oldRepr
//     } else {
//         console.warn('no node found')
//         // return true
//     }
// }

export const node = function (nodeName, attributes, ...args) {  
      let children = args.length ? [].concat(...args) : null
      attributes = attributes || {}
      if (!(porterNodeIdentifier in attributes)) {
        attributes[porterNodeIdentifier] = p.randomCharacters(18)
      }
      return { nodeName, attributes, children }
}

export const renderItem = function (virtualNode) {  
    // https://medium.com/@rajaraodv/the-inner-workings-of-virtual-dom-666ee7ad47cf
    if (virtualNode.split) return document.createTextNode(virtualNode)
    let component = null,
        created = false

    const identifier = virtualNode.attributes[CONFIG.porterNodeIdentifier],
          test = `[${CONFIG.porterNodeIdentifier}='${identifier}']`,
          nodeExists = (!!one(test) === true)
    // console.log('check if node exists', test, nodeExists)

    // Is nodeName a component?
    if (typeof virtualNode.nodeName === 'function') {
        // Check if node exists
        // TEMP - Component does NOT exist
        component = new virtualNode.nodeName(virtualNode.attributes, virtualNode.children)

        if (!nodeExists) {
            // Create new component
            component.preMount()
            // console.log('virtualNode', virtualNode)
            // console.log('component', component)
            virtualNode = component.renderItem()
            // console.log('virtualNode', virtualNode)
            virtualNode.attributes[porterNodeIdentifier] = identifier
            // console.log(virtualNode)
        } else {
            // Update existing component
            if (component.shouldUpdate()) {
                component.preUpdate()
                virtualNode = component.renderItem(identifier)
                virtualNode.attributes[porterNodeIdentifier] = identifier
            } else {
                return
            }
        }
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