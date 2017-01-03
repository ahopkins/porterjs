import {Response} from './response'

export class Request {
    constructor (url) {
        this.req = new XMLHttpRequest()
        this.url = url
        this.data = {}
        this.csrftoken = null

        this.resolve = () => { console.log('NOT IMPLEMENTED') }
        this.reject = () => { console.log('NOT IMPLEMENTED') }

        this.req.onload = () => {
            this.response = new Response(this.req)
            if (this.req.status >= 200 && this.req.status < 400) {
                this.resolve(this.response)
            } else {
                this.reject({
                    status: this.response.status,
                    responseText: this.response.responseText
                })
                this.response = null
            }
        }
        this.req.onerror = () => {
            this.response = new Response(this.req)
            this.reject({
                status: this.response.status,
                responseText: this.response.responseText
            })
            this.response = null
        }
    }

    get (data, _) {
        if (data !== undefined) this.data = data
        const method = "GET"
        return this.send(method)
    }

    post (data, csrftoken) {
        this.data = data
        this.csrftoken = csrftoken
        const method = "POST"
        return this.send(method)
    }

    send (method) {
        method = method || "GET"

        const params = typeof this.data == 'string' ? this.data : Object.keys(this.data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(this.data[k]) }.bind(this)
        ).join('&')

        this.req.open(method, this.url, true)
        if (['OPTIONS', 'HEAD', 'GET'].includes(method) == false) {
            this.req.setRequestHeader("X-CSRFToken", this.csrftoken);
        }
        this.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        this.req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        this.req.send(params)
        return new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = resolve
        })
    }
}