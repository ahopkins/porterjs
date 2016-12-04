import {default as process_html} from './process_html'

// export {process_success}

import {one} from '../public'

export class Processor {

    constructor (response) {
        console.log("==========\\/\\/==========")
        console.log('~~~   THE RESPONSE   ~~~')
        console.log(`status: ${response.status}`)
        console.log(`json: ${response.json}`)
        console.log(response.json)
        console.log("==========/\\/\\==========")
        
        this.response = response
        this.prepare()
    }

    prepare () {
        this.html = this.response.json.html
    }

    success () {
        process_html(this)
    }
}