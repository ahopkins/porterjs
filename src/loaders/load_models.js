import {one, all, events} from '../public'
// import {trigger_bind} from '../triggers'
import {dispatchers} from '../helpers'

const parse_value = (element, value) => {
    if (element !== document.activeElement){
        element.value = value
    }
}

const parse_content = (element, value) => {
    element.innerHTML = value
}

export const run = () => {
    // TODO:
    // - Create option to whitelabel or blacklabel usage of all <a> elements
    const models = all("[data-model]")

    for (let model of models) {
        const name = model.getAttribute('data-model')
        let dispatcherLabel = model.getAttribute('data-label')
        let useEvents = events

        if (dispatcherLabel) {
            useEvents = dispatchers[dispatcherLabel]
        } else {
            dispatcherLabel = events.label
        }

        const label = `StackChange||${name}||${dispatcherLabel}`
        
        const callback = (model.nodeName == 'INPUT') ? parse_value : parse_content
        useEvents.add(label, value => callback(model, value))
    }
}