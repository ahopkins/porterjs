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
import {getLocation} from '../utils'

export class Router {
    constructor () {
        this.routes = []
        this.namedRoutes = {}
        this.current = null
    }

    trigger (e, path=null) {

        console.log('getLocation', getLocation(e.srcElement))
        if (!path) {
            path = (e) 
                 ? getLocation(e.srcElement).replace(/(?:(?:http|https):\/\/(?:[a-z0-8:]*))?\//g, '/')
                 : window.location.pathname
        }

        const regex = /\?(.*)/g
        let m, items

        while ((m = regex.exec(path)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++
            }

            items = m[1].split('&').map(item => {
                const x = item.split('=')
                return {
                    key: x[0],
                    value: x[1]
                }
            })
        }

        const route = this.getRoute(path)

        if (route == null) {
            console.warn(`No route found matching: ${path}`)
        } else {
            this.current = route
            this.current.rendered = (path) ? path : '/'
            this.execute(null, items)
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
            // console.log('route test', r.path, path, matchPath(r.path, path))
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

    execute (e, items=null) {
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
            this.current.trigger(e, items)
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