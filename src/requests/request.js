import {Response} from './response'
import {stack} from '../public'

export class Request {
    constructor (url) {
        this.req = new XMLHttpRequest()
        this.url = url
        this.data = {}
        this.csrftoken = null
        this.before = () => {}

        this.resolve = () => { console.warn('NOT IMPLEMENTED') }
        this.reject = () => { console.warn('NOT IMPLEMENTED') }

        this.req.onload = () => {
            this.response = new Response(this.req, this.url)
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

    patch (data, csrftoken) {
        this.data = data
        this.csrftoken = csrftoken
        const method = "PATCH"
        return this.send(method)
    }

    send (method) {
        method = method || "GET"
        let csrftoken

        const params = typeof this.data == 'string' ? this.data : Object.keys(this.data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(this.data[k]) }.bind(this)
        ).join('&')

        const globalRequestBefore = stack.get('globalRequestBefore')
        if (globalRequestBefore !== undefined && globalRequestBefore !== null) {
            globalRequestBefore()
        }

        this.before.call()

        if (['OPTIONS', 'HEAD', 'GET'].includes(method) == false) {
            csrftoken = this.csrftoken
        } else if (params) {
            this.url = `${this.url}?${params}`
        }
        this.req.open(method, this.url, true)
        this.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        this.req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        if (csrftoken !== null) {
            this.req.setRequestHeader("X-CSRFToken", csrftoken);
        }
        this.req.send(params)
        return new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = resolve
        })
    }
}