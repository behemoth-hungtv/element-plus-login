import type { App } from 'vue'
import { BaseButton } from './Button'
import { Icon } from './Icon'

export const setupGlobCom = (app: App<Element>): void => {
  app.component('Icon', Icon)
  app.component('BaseButton', BaseButton)
}
