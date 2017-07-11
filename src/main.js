'use strict'
import ready from 'document-ready-promise'
import {startup} from './utils'
import * as modifiers from './modifiers'

require("expose-loader?p!./public.js")

modifiers.startup()

console.log('hash', window.location.hash)
console.log('loc', window.location)

ready().then(() => startup())
