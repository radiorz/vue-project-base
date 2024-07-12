/**
 * @author
 * @file useBackupToTop.ts
 * @fileBase useBackupToTop
 * @path packages\vue-ui\lib\BackupToTop\useBackupToTop.ts
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */

import { ref } from 'vue'

export interface useBackupToTopOptions {}

export const defaultuseBackupToTopOptions: useBackupToTopOptions = {}

export function useBackupToTop(options: Partial<useBackupToTopOptions> = {}) {
  const opts = { ...defaultuseBackupToTopOptions, ...options }
  const value = ref(null)

  return { value }
}
