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
        console.log('!!!')
        if (!path) {
            path = (e && getLocation(e.srcElement)) 
                 ? getLocation(e.srcElement).replace(/(?:(?:http|https):\/\/(?:[a-z0-8:\.]*))?\//g, '/')
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

    build (name, params) {
        const route = this.namedRoutes.getProperty(name)
        let path = route.path
        for (let [key, value] of params) {
            const regex = new RegExp(`(\{${key}:.*\})`)
            const subst = value
            path = path.replace(regex, subst)
        }
        return path
    }

    getRoute (path) {
        let route = null,
            params = []

        if (!this.routes) {
            console.error("There are no routes enabled")
        }

        function parseParams(r, input) {
            let params = {}

            for (let [key, value] of r.labels) {
                const part = r.parts[key]
                const splt = input.split('/')
                const regex = new RegExp(part)
                
                regex.lastIndex = 0
                const { ...groups } = regex.exec(splt[key])
                // const cleanedGroups = Array.from(groups)
                //             .map((x, y) => {
                //                 return [x[0], x[1]]
                //             })
                //             .filter( x => {
                //                 if (!['0', 'index', 'input'].includes(x[0])) {
                //                     return true
                //                 }
                //             }).map(x => x[1])

                params[value] = groups[0]
            }

            return params
        }
        function matchPath(regex, input) {
            regex.lastIndex = 0
            return regex.test(input)
        }

        for (let r of this.routes) {
            if (matchPath(r.test, path)) {
                params = parseParams(r, path)
                route = r
                route.params = params
                break
            }
        }

        return route
    }

    goto (input, hard=false) {
        const route = (typeof input === 'string')
                    ? this.namedRoutes[input]
                    : input

        if (route) {
            this.current = route
            // hard && (window.location = this.current.rendered)
            this.execute()
        } else {
            console.error('No route found.')
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