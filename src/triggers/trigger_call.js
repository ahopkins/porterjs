import {Cookie} from 'aurelia-cookie'
import {Request} from '../requests'
import {Processor} from '../processors'
import {findAttribute} from '../utils'

const c = function (element, url, method, data, callback) {
    element = element || null;
    url = url || false;
    method = method || false;
    data = data || {};
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
            // method = element.getAttribute('data-method') || element.getAttribute('method')
            method = findAttribute(element, 'data-method') || findAttribute(element, 'method')
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
    console.log(`csrftoken: ${csrftoken}`)

    // If URL was not set ...
    if (!url) {
        // If URL was not set, and there was no ELEMENT, then there is no way
        // to know where to direct the page to, therefore raise and error
        if (element === null) {
            console.log('raise error')
        } else {
            // url = element.getAttribute('data-url') || element.getAttribute('href') || element.getAttribute('action')
            url = findAttribute(element, 'data-url') || findAttribute(element, 'href') || element.getAttribute('action')
            // console.log(url)
        }

        // If a URL still does not exist, check if maybe it is inside a form, and execute that
        if (!url && element.closest('form') !== null) {
            // If it is a form being triggered ... ERROR
            if (element.nodeName == 'FORM') {
                console.log('Error because no URL found on triggered, or form element')
                return
            }
            return c(element.closest('form'), url, null, null, callback)
        }
    }

    if (element != null && element.nodeName == 'FORM') {
        const formData = new FormData(element)
        for (let [key, value] of formData.entries()) {
            data[key] = value
        }
    }

    console.log("==========\\/\\/==========")
    console.log('~~~   THE REQUEST   ~~~')
    console.log(`method: ${method}`)
    console.log(`url: ${url}`)
    console.log(`data: ${data}`)
    console.log(data)
    console.log("==========/\\/\\==========")

    const request = new Request(url)
    // request.get().then((response) => {
    //     // console.log(response)
    //     const processor = new Processor(response)
    //     processor.success()
    // }).catch((error) => {
    //     // console.log(error)
    //     const processor = new Processor(response)
    //     processor.success()
    // })
    request[method.toLowerCase()](data, csrftoken).then((response) => {
        // console.log(response)
        const processor = new Processor(response)
        processor.run()
    }).catch((error) => {
        // console.log(error)
        const processor = new Processor(error)
        processor.error()
    })

}

export default c