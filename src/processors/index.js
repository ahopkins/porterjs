import {default as process_html} from './process_html'
import {default as process_errors} from './process_errors'
import {default as process_redirect} from './process_redirect'
import {default as process_callbacks} from './process_callbacks'
import {load} from '../loaders'
import {one, all} from '../public'

// export {process_success}


export class Processor {

    constructor (response, prepare) {
        this.response = response
        prepare = prepare || true

        if (prepare) {
            console.log("==========\\/\\/==========")
            console.log('~~~   THE RESPONSE   ~~~')
            console.log(`status: ${response.status}`)
            console.log(`json: ${response.json}`)
            console.log(response.json)
            console.log("==========/\\/\\==========")
            
            this.prepare()
        }
    }

    prepare () {
        if (this.response.json) {
            this.html = this.response.json.html || null
            this.callbacks = this.response.json.callbacks || []
            this.errors = this.response.json.errors || []
            this.redirect = this.response.json.redirect || null
        } else {
            this.html = this.response.responseText
        }
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
        all('.saving').removeClass('saving')
        console.log('TODO: abstract and allow for more user friendly error responses')
        this.errors = JSON.parse(this.response.responseText)
        process_errors(this)
        // for (let [key, value] of e) {
        //     const element = one(`#${key}`)
        //     const error = document.createElement('div')
        //     const text = document.createTextNode(value)
        //     error.appendChild(text)
        //     error.addClass('error').addClass('enter-flip')
        //     if (element) {
        //         element.parentNode.appendChild(error)
        //     }
        // }
    }
}