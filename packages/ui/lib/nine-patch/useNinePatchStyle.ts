/**
 * @author
 * @file useNinePatchStyle.ts
 * @fileBase useNinePatchStyle
 * @path packages\ui\lib\nine-patch\useNinePatchStyle.ts
 * @from
 * @desc
 * @example
 */

import { computed } from 'vue'

export const defaultUseNinePatchStyleOptions = {
  topLength: 10,
  leftLength: 10,
  rightLength: 10,
  bottomLength: 10,
  width: 100,
  height: 100,
  image: '/assets/image.png'
}

export interface UseNinePatchStyleOptions extends typeof defaultUseNinePatchStyleOptions {
  width: string | number;
  height: string | number;
}

export function useNinePatchStyle(options: Partial<UseNinePatchStyleOptions> = {}) {
  const opts = { ...defaultUseNinePatchStyleOptions, ...options }

  const style = computed(() => {
    const top = addPx(opts.topLength)
    const left = addPx(opts.leftLength)
    const right = addPx(opts.rightLength)
    const bottom = addPx(opts.bottomLength)
    const style: any = {
      borderImageSource: `url(${opts.image})`,
      borderImageSlice: `${opts.topLength} ${opts.rightLength} ${opts.bottomLength} ${opts.leftLength} fill`,
      borderImageWidth: `${top} ${right} ${bottom} ${left}`,
      borderImageOutset: `${top} ${right} ${bottom} ${left}`,
      borderImageRepeat: 'repeat'
    }
    if (opts.width) {
      style.width = addPx(opts.width)
    }
    if (opts.height) {
      style.height = addPx(opts.height)
    }
    return style
  })
  return style
}
export function addPx(n: number | string) {
  if (typeof n == 'string') return n
  return `${n}px`
}
