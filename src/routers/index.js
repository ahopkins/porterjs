// var foo = {
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

    trigger (e, path=null) {

        // TODO:
        // - Better path getter. Needs to get path for href, or data-url if class=fake-link
        if (!path) {
            path = (e != undefined) 
                 ? e.srcElement.getAttribute('href')
                 : window.location.pathname
        }

        // console.log(`trigger: ${path}`)

        const route = this.getRoute(path)

        if (route == null) {
            console.warn(`No route found matching: ${path}`)
        } else {
            this.current = route
            this.current.rendered = (path) ? path : '/'
            this.execute()
        }
    }

    getRoute (path) {
        let route = null

        if (!this.routes) {
            console.error("There are no routes enabled")
        }

        // function matcher(regex, input) {
        //   return () => {
        //     const match = regex.exec(input)
        //     const lastIndex = regex.lastIndex
        //     return { lastIndex, match }
        //   }
        // }
        // function parsePath(regex, input) {
        //   const { groups } = regex.exec(input)
        //   return groups
        // }
        function matchPath(regex, input) {
            regex.lastIndex = 0
            return regex.test(input)
        }

        for (let r of this.routes) {
            if (matchPath(r.path, path)) {
                route = r
                break
            }
        }

        return route
    }

    goto (name, hard=false) {
        const route = this.namedRoutes[name]

        if (route !== undefined) {
            this.current = route
            // hard && (window.location = this.current.rendered)
            this.execute()
        }
    }

    execute (e) {
        if (this.current === null) {
            console.error("No current route set. Cannot execute.")
        } else {
            if (this.current.history) {
                if (settings.pushPath) {
                    window.history.pushState({
                        url: this.current.rendered || this.current.fallback
                    }, "", this.current.rendered || this.current.fallback);

                    events.dispatch('pushPath')
                }
            }
            this.current.trigger(e)
        }
    }

    add (path, callback, name=null, history=false, fallback=null) {
        const route = new Route(path, callback, history, fallback)
        this.routes.push(route)

        if (name !== null) {
            this.namedRoutes[name] = route
            route.name = name
        }
    }
}