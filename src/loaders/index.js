import * as load_links from './load_links'
import * as load_binders from './load_binders'
import * as load_models from './load_models'
import * as load_events from './load_events'
import * as load_robust_porter from './load_robust_porter'

export function startup () {
    load_links.run()
    load_binders.run()
    load_models.run()
    load_events.run()

    load_robust_porter.run()
}
export function load () {
    load_links.run()
    // load_binders.run()
    // load_models.run()
    load_events.run()    
}