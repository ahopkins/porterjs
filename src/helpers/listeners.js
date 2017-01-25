const hashNode = (node) => {
    const str = node.outerHTML
    let hash = 0
    if (str.length == 0) return hash
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
    return hash
}

export const nodelisteners = {}

export class NodeListener {  
    constructor (node, event, callback, useCapture) {
        // console.log(node)
        this.hash = hashNode(node)
        // console.log(this.hash)
        this.node = node
        this.events = {}

        if (nodelisteners[this.hash] === undefined) {
            nodelisteners[this.hash] = this
        } else {
            this.events = nodelisteners[this.hash].events 
        }

        this.add(event, callback, useCapture)
    }

    add (event, callback, useCapture) {
        const unique = this.node.getAttribute('data-unique')
        if (unique !== undefined && unique !== null && unique == 'true') {
            // console.log('inside unique check')
            if (this.events[event] !== undefined) {
                return false
            }
        }
        if (this.events[event] === undefined) this.events[event] = []
        this.node.addEventListener(event, callback, useCapture)
        this.events[event].push(callback)
    }
}