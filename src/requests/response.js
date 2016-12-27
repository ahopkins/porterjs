export class Response {
    constructor (request) {
        this.request = request
        this.responseText = request.responseText
        // console.log(this.responseText)
        try {
            this.json = JSON.parse(this.responseText)
        } catch (e) {
            this.json = null
        }
        this.status = request.status

        return this.response
    }
}