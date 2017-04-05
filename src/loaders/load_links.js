import {one, all, router} from '../public'
import {trigger_call} from '../triggers'
import {findAttribute} from '../utils'
import {CONFIG} from '../config'

const togglerMethod = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // console.log(classes)
    let target = one(findAttribute(e.srcElement, 'href'))
    if (target == null) {
        const raw = findAttribute(e.srcElement, 'data-target')
        if (raw == 'self') {
            target = e.srcElement
        } else {
            target = one("#"+raw)
        }
    }

    if (e.srcElement.hasClass('ignore-toggle') || e.srcElement.hasClass('ignore-self') || e.srcElement.hasClass('exclude')) {
        return false
    }

    let classes = findAttribute(e.srcElement, 'data-class').split(' ')
    
    for (let cls of classes) {
        target.toggleClass(cls)
    }
}

const navClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (CONFIG.render == 'server') {
        trigger_call(e.target)
    } else {
        router.trigger(e)
    }
}

const changeHash = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const hash = findAttribute(e.srcElement, 'data-hash')
    window.location.hash = hash
}

export const run = () => {
    // TODO:
    // - Create option to whitelabel or blacklabel usage of all <a> elements
    // const links = all("a:not(.ignore-self):not(.exclude):not([target])")
    const links = all("a:not(.ignore-self):not(.toggler):not(.exclude):not(.modal-open), [data-url]")
    links.removeEventListener("click", navClick).addEventListener("click", navClick)

    const togglers = all(".toggler")
    togglers.removeEventListener("click", togglerMethod).addEventListener("click", togglerMethod)

    const hashes = all("[data-hash]")
    hashes.removeEventListener("click", changeHash).addEventListener("click", changeHash)
}