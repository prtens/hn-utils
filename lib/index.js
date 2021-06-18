export * from './arrays'
export * from './caches'
export * from './common'
export * from './dom'
export * from './export2Excel'
export * from './file'
export * from './html'
export * from './logger'
export * from './pickerOptions'
export * from './scrollTo'
export * from './string'
export * from './time'
export * from './validates'

import * as arrays from './arrays'
import * as caches from './caches'
import * as common from './common'
import * as dom from './dom'
import * as export2Excel from './export2Excel'
import * as file from './file'
import * as html from './html'
import * as logger from './logger'
import * as pickerOptions from './pickerOptions'
import * as scrollTo from './scrollTo'
import * as string from './string'
import * as time from './time'
import * as validates from './validates'

export default {
  ...arrays,
  ...caches,
  ...common,
  ...dom,
  ...export2Excel,
  ...file,
  ...html,
  ...logger,
  ...pickerOptions,
  ...scrollTo,
  ...string,
  ...time,
  ...validates,
}