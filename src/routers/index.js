//             var foo = {
//   [Symbol.iterator]: () => ({
//     items: ['p', 'o', 'n', 'y', 'f', 'o', 'o'],
//     next: function next () {
//       return {
//         done: this.items.length === 0,
//         value: this.items.shift()
//       }
//     }
//   })
// }
import {Route} from './objects'
import {events, settings} from '../public'

export class Router {
    constructor () {
        this.routes = []
    }

    trigger (e) {
        let route = null

        // TODO:
        // - Better path getter. Needs to get path for href, or data-url if class=fake-link
        const path = e.srcElement.getAttribute('href')

        if (this.routes.length == 0) {
            console.error("There are no routes enabled")
        }

        for (let r of this.routes) {
            // TODO:
            // - Better matcher. Needs to be able to have parameters in path /path/to/id/1
            console.log(`${r.path} == ${path}`)
            if (r.path == path) {
                route = r
                break
            }
        }


        if (route == null) {
            console.warn(`No route found matching: ${path}`)
        } else {
            if (route.history) {
                if (settings.pushPath) {
                    console.log(route)
                    window.history.pushState({
                        url: path
                    }, "", path);

                    events.dispatch('pushPath')
                }
            }
            route.trigger(e)
        }
    }

    add (path, callback, history) {
        history = history || false
        console.log(`history: ${history}`)

        const route = new Route(path, callback, history)
        this.routes.push(route)
    }
}