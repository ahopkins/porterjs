import {one, all, findAttribute} from '../public'
import {trigger_call} from '../triggers'

const modalOpener = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const id = findAttribute(e.target, 'data-target')
    console.log(id)

    const modal = new pModal(`#${id}`)
    modal.open()
}

export const run = () => {
    try {
        if (pModal !== undefined) {
            const links = all(".modal-open")
            
            links.removeEventListener("click", modalOpener)
                 .addEventListener("click", modalOpener)
        }
    } catch (e) {
        return
    }

}