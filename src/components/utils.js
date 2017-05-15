/*global p*/

import {node} from '../renderers/node'

export const model = function (key, state=p.stack, label=null) {
    let attributes = { 'data-model': key }
    if (label) {
        attributes['data-label'] = label
    }
    return node('span', attributes, state.get(key))
}