import {one} from '../public'

const apply_html = (element, html, url) => {
    if (element !== undefined && element !== null) {
        element.innerHTML = html
    }

    // TODO:
    // - Make this toggleable setting; see also modifiers/index.js
    if (element.id == 'content') {
        window.history.pushState({
            url: url
        }, "", url);
    }
}

export default function (processor) {
    const type = typeof processor.html
    
    if (type == "string") {
        const content = one("#content")
        if (content === null) {
            console.error('ERROR: No place to insert html')
            console.warn(processor.html)
        } else {
            apply_html(content, processor.html, processor.response.url)
        }
    } else if (type == "object") {
        if (Array.isArray(processor.html)) {
            for (let obj of processor.html) {
                let e = p.one(`#${obj.id}`)
                apply_html(e, obj.content, processor.response.url)
            }
        } else {
            for (let [key, value] of processor.html) {
                let e = p.one(`#${key}`)
                apply_html(e, value, processor.response.url)
            }
        }
    }
}