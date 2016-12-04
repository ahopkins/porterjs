export class Response {
    constructor (request) {
        this.request = request
        this.responseText = request.responseText
        this.json = JSON.parse(this.responseText)
        this.status = request.status

        return this.response
    }
}