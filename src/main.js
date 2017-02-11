'use strict'
import ready from 'document-ready-promise'
import {startup} from './utils'
import * as modifiers from './modifiers'

require("expose?p!./public.js");

modifiers.startup()

ready().then(() => startup())
