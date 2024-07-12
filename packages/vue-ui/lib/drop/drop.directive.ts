import type { Directive } from 'vue'
import { allowDrop } from './drop.utils'

export const vDrop: Directive = {
  mounted(el: any, binding: any) {
    console.log(`binding`, binding)
    el.addEventListener('drop', binding.value)
    el.addEventListener('dragover', allowDrop)
  }
}
