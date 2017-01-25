import {one} from '../public'

export default function (processor) {
    const type = typeof processor.errors
    if (type == "object") {
        for (let [key, value] of processor.errors) {
            let element = one(`#${key}`)
            if (element == null) {
                element = one(`#id_${key}`)
            }

            if (element !== null) {
                for (let error of value){
                    console.log(error)
                    let htmlString = `<div class="error">${error}</div>`
                    element.insertAdjacentHTML('afterend', htmlString);
                }
            }
        }
    }
    console.log(processor)
    // TODO:
    // - Add support for arrays (publish somewhere generic place, maybe just console.log)
}