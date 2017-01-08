import {default as process_html} from './process_html'
import {default as process_errors} from './process_errors'
import {default as process_redirect} from './process_redirect'
import {default as process_callbacks} from './process_callbacks'
import {load} from '../loaders'

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
        if (this.response.json == null) {
            // console.log('not JSON html parser')
            this.html = this.response.responseText
        } else{
            this.html = this.response.json.html
        }

        this.callbacks = this.response.json.callbacks || []
        this.errors = this.response.json.errors || []
        this.redirect = this.response.json.redirect || null
    }

    run () {
        if (this.response.status >= 200 && this.response.status < 400){ this.success() }
        else { this.error() }
    }

    success () {
        process_html(this)
        process_callbacks(this)
        process_errors(this)
        process_redirect(this)

        load()
    }

    error () {
        console.log('TODO: abstract and allow for more user friendly error responses')
        document.write(this.html)
    }
}