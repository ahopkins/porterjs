import {one, all, events} from '../public'
// import {trigger_bind} from '../triggers'
// import {Dispatcher} from '../helpers'

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
        let name = model.getAttribute('data-model')
        let label = `${name}StackChange`
        let callback = (model.nodeName == 'INPUT') ? parse_value : parse_content
        events.add(label, value => callback(model, value))
    }
}