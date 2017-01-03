import {one} from '../public'

export default function (processor) {
    const type = typeof processor.callbacks
    if (type == "object") {
        processor.callbacks.forEach(function (callback) {
            // console.log(callback)
            const chain = callback.function.split('.'),
                  args = callback.arguments || {}
            let fn

            if (chain.length > 1) {
                fn = window[chain[0]][chain[1]]
            } else {
                fn = window[chain[0]]
            }
            try {
                fn(...args)
            } catch (error) {
                console.warn(error)
            }
        })
    }
}