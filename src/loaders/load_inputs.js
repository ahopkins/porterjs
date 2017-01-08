import {all} from '../public'
import {trigger_call} from '../triggers'
import {findAttribute, getTarget} from '../utils'

const formSubmit = (e) => {
    const key = e.key
    const target = getTarget(e)


    if (key == 'Enter') {
        e.stopPropagation()
        e.preventDefault()
        
        trigger_call(target)
        return false
    }
}

export const run = () => {
    // TODO:
    // - Create option to whitelabel or blacklabel usage of all <a> elements
    // const links = all("a:not(.ignore-self):not(.exclude):not([target])")
    const text_inputs = all("input:not(.ignore-self):not(.exclude)[type='text']")
    // const text_inputs = all("form:not(.ignore-self):not(.exclude)")

    text_inputs.removeEventListener("keydown", formSubmit)
    text_inputs.addEventListener("keydown", formSubmit)
}