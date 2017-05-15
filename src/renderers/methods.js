import {one, stack, componentActions} from '../public'
import {CONFIG} from '../config'
import {node} from './node'

const porterNodeIdentifier = CONFIG.porterNodeIdentifier

export const renderItem = function (virtualNode) {  
    // https://medium.com/@rajaraodv/the-inner-workings-of-virtual-dom-666ee7ad47cf
    if (Number.isInteger(virtualNode)) virtualNode = virtualNode.toString()
    if (!virtualNode)  {
        console.error('Problem virtualNode:', virtualNode)
        virtualNode = '<ERROR: See console.log>'
    }
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
            component.preMount(component.props, component.state)
            virtualNode = component.renderItem()
            virtualNode.attributes[porterNodeIdentifier] = identifier

            if (component.actions()) {
                componentActions[identifier] = {}
                for (let [action, fn] of component.actions(component.state)) {
                    componentActions[identifier][action] = fn
                }
            }
        } else {
            // Update existing component
            if (component.shouldUpdate(component.props, component.state)) {
                component.preUpdate(component.props, component.state)
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
        callbackEvent(component.props, component.state)
    }

    return element
}