import {Cookie} from 'aurelia-cookie'
import {Request} from '../requests'
import {Processor} from '../processors'

export default function (element, url, method, data, callback) {
    element = element || null;
    url = url || false;
    method = method || false;
    data = data || false;
    callback = callback || false;

    let csrftoken = null

    // TODO:
    // - Check if element is a string or an Element. If string, get Element

    // Ignore if the user passed a method to the function
    if (!method) {

        // If the user did not pass a method or element
        if (element === null) {
            method = "GET"
        } else {
            method = element.getAttribute('data-method') || element.getAttribute('method')
            if (method !== null) {
                method = method.toUpperCase()
            }
            if (method === null || ["POST", "PUT", "PATCH", "DELETE", "GET"].indexOf(method) < 0) {
                method = (element.nodeName == "FORM") ? "POST" : "GET"
            }
        }
    }
    // Check if we need to get a csrftoken
    if (["POST", "PUT", "PATCH", "DELETE"].indexOf(method) >= 0) {

        // TODO:
        // - Abstract away the token name
        csrftoken = Cookie.get('csrftoken')
    }

    if (!url) {
        if (element === null) {
            console.log('raise error')
        } else {
            url = element.getAttribute('data-url') || element.getAttribute('href') || element.getAttribute('action')
        }
    }

    console.log("==========\\/\\/==========")
    console.log('~~~   THE REQUEST   ~~~')
    console.log(`method: ${method}`)
    console.log(`url: ${url}`)
    console.log("==========/\\/\\==========")

    const request = new Request(url)
    request.get().then((response) => {
        const processor = new Processor(response)
        processor.success()
    }).catch((error) => {
        console.log(error)
        const processor = new Processor(response)
        processor.success()
    })

}