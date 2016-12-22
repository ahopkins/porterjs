import {one, all} from '../public'
export const run = () => {
    const events = ['click','keyup']
    for (event of events) {
        let attribute = `data-${event}`
        all(`[${attribute}]`).addEventListener(event, function (e) {
            let element = e.srcElement,
                fn = element.getAttribute(attribute)

            window[fn](e)
        })
    }
}