import {one, all} from '../public'
import {trigger_bind} from '../triggers'

export const run = () => {
    // TODO:
    // - Create option to whitelabel or blacklabel usage of all <a> elements
    const binders = all("[data-bind]")

    binders.addEventListener("change", (e) => {
        trigger_bind(e.target)
    })
    binders.addEventListener("input", (e) => {
        trigger_bind(e.target)
    })
}