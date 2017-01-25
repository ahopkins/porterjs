import {stack} from '../public'

export const run = () => {
    const load_list = stack.get('load_list', [])
    if (load_list !== undefined) {
        for (let fn of load_list) {
            fn()
        }
    }
}