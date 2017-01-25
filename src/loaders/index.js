import * as load_links from './load_links'
import * as load_binders from './load_binders'
import * as load_models from './load_models'
import * as load_events from './load_events'
import * as load_list from './load_list'
import * as load_inputs from './load_inputs'
import * as load_robust_porter from './load_robust_porter'

import {events} from '../public'

export function load () {
    console.log('running load')
    load_links.run()
    load_inputs.run()
    load_binders.run()
    load_models.run()
    load_events.run()
    load_list.run()    
    load_robust_porter.run()

    // events.dispatch('pushState')
}

export function startup () {
    load()    
}