import {one, all} from '../public'
import {trigger_call} from '../triggers'

export const run = () => {
    // TODO:
    // - Create option to whitelabel or blacklabel usage of all <a> elements
    // const links = all("a:not(.ignore-self):not(.exclude):not([target])")
    const links = all("a:not(.ignore-self):not(.exclude):not(.modal-open)")

    links.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()

        trigger_call(e.target)
    })
}