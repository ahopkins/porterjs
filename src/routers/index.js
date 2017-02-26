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
        this.namedRoutes = {}
        this.current = null
    }

    trigger (e) {
        let route = null

        // TODO:
        // - Better path getter. Needs to get path for href, or data-url if class=fake-link
        const path = (e != undefined) ? e.srcElement.getAttribute('href') :
                                        window.location.pathname

        // console.log(`trigger: ${path}`)

        if (this.routes.length == 0) {
            console.error("There are no routes enabled")
        }

        for (let r of this.routes) {
            // TODO:
            // - Better matcher. Needs to be able to have parameters in path /path/to/id/1
            // console.log(`${r.path} == ${path}`)
            if (r.path == path) {
                route = r
                break
            }
        }


        if (route == null) {
            console.warn(`No route found matching: ${path}`)
        } else {
            this.current = route
            this.execute()
        }
    }

    goto (name) {
        const route = this.namedRoutes[name]

        if (route !== undefined) {
            this.current = route
            this.execute()
        }
    }

    execute (e) {
        if (this.current === null) {
            console.error("No current route set. Cannot execute.")
        } else {
            if (this.current.history) {
                if (settings.pushPath) {
                    // console.log(route)
                    window.history.pushState({
                        url: this.current.path
                    }, "", this.current.path);

                    events.dispatch('pushPath')
                }
            }
            this.current.trigger(e)
        }
    }

    add (path, callback, name, history) {
        name = name || null
        history = history || false
        // console.log(`history: ${history}`)

        const route = new Route(path, callback, history)
        this.routes.push(route)

        if (name !== null) {
            this.namedRoutes[name] = route
        }
    }
}