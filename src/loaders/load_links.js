import {one, all} from '../public'
import {trigger_call} from '../triggers'
import {findAttribute} from '../utils'

const togglerMethod = (e) => {
    e.preventDefault()
    e.stopPropagation()

    let classes = findAttribute(e.srcElement, 'data-class')
    console.log(classes)
    let target = one(findAttribute(e.srcElement, 'href'))
    if (target == null) {
        target = one("#"+findAttribute(e.srcElement, 'data-target'))
    }
    target.toggleClass(classes)
}

export const run = () => {
    // TODO:
    // - Create option to whitelabel or blacklabel usage of all <a> elements
    // const links = all("a:not(.ignore-self):not(.exclude):not([target])")
    const links = all("a:not(.ignore-self):not(.toggler):not(.exclude):not(.modal-open)")

    links.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()

        trigger_call(e.target)
    })

    const togglers = all(".toggler")
    togglers.removeEventListener("click", togglerMethod).addEventListener("click", togglerMethod)
}