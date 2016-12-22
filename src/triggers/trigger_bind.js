import {one, all, stack} from '../public'

export default function (element) {
    const value = element.value
    const name = element.getAttribute('data-bind')

    stack.set(name, value)
}