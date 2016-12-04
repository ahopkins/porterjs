import {Response} from './response'

export class Request {
    constructor (url) {
        this.req = new XMLHttpRequest()
        this.url = url

        this.resolve = () => { console.log('NOT IMPLEMENTED') }
        this.reject = () => { console.log('NOT IMPLEMENTED') }

        this.req.onload = () => {
            if (this.req.status >= 200 && this.req.status < 400) {
                this.response = new Response(this.req)
                this.resolve(this.response)
            } else {
                this.response = null
                this.reject({
                    status: this.response.status,
                    statusText: this.response.statusText
                })
            }
        }
        this.req.onerror = () => {
            this.response = null
            this.reject({
                status: this.response.status,
                statusText: this.response.statusText
            })
        }
    }

    get () {
        const method = "GET"
        return this.send(method)
    }

    post (data) {
        const method = "POST"
        return this.send(method)
    }

    send (method) {
        method = method || "GET"
        this.req.open(method, this.url, true)
        this.req.send()
        return new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = resolve
        })
    }
}