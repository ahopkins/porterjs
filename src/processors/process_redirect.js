import {one} from '../public'

export default function (processor) {
    if (processor.redirect !== null){
        window.location = processor.redirect
    }
}