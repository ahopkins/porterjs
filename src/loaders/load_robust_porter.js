import {one, all} from '../public'
import {trigger_call} from '../triggers'

export const run = () => {
    try {
        if (pModal !== undefined) {
            const links = all(".modal-open")
            
            links.addEventListener("click", (e) => {
                e.preventDefault()
                e.stopPropagation()

                const id = e.target.getAttribute('href')

                const modal = new pModal(id)
                modal.open()
            })
        }
    } catch (e) {
        return
    }

}