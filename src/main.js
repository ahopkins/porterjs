'use strict'
import ready from 'document-ready-promise'
import * as loaders from './loaders'
import * as modifiers from './modifiers'

require("expose?p!./public.js");

modifiers.startup()

ready().then(() => loaders.startup())
