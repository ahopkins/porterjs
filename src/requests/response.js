import {stack} from '../public'

export class Response {
    constructor (request, url) {
        this.request = request
        this.url = url
        this.responseText = request.responseText
        try {
            this.json = JSON.parse(this.responseText)
        } catch (e) {
            this.json = null
        }
        this.status = request.status

        const globalRequestAfter = stack.get('globalRequestAfter')
        if (globalRequestAfter !== undefined && globalRequestAfter !== null) {
            globalRequestAfter()
        }

        return this.response
    }
}