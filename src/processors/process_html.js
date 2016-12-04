import {one} from '../public'

const apply_html = (element, html) => {
    if (element !== undefined && element !== null) {
        element.innerHTML = html
    }
}

export default function (processor) {
    const type = typeof processor.html
    
    if (type == "string") {
        const content = one("#content")
        apply_html(content, processor.html)
    } else if (type == "object") {
        if (Array.isArray(processor.html)) {
            for (let obj of processor.html) {
                let e = p.one(`#${obj.id}`)
                apply_html(e, obj.content)
            }
        } else {
            for (let [key, value] of processor.html) {
                let e = p.one(`#${key}`)
                apply_html(e, value)
            }
        }
    }
}