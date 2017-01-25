import {one, settings, events} from '../public'

const apply_html = (element, html, url) => {
    if (element !== undefined && element !== null) {
        element.innerHTML = html
    }

    if (settings.pushPath && element.id == settings.pushPathId) {
        window.history.pushState({
            url: url
        }, "", url);

        events.dispatch('pushPath')
    }
}

export default function (processor) {
    const type = typeof processor.html
    
    if (type == "string") {
        const content = one(`#${settings.pushPathId}`)
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