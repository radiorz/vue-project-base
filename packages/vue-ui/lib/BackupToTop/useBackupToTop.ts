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

import { useState, useEffect } from 'react'
// import { useDispatch } from "react-redux";
export interface useBackupToTopOptions {}

export const defaultuseBackupToTopOptions: useBackupToTopOptions = {}

export default function useBackupToTop(options: Partial<useBackupToTopOptions> = {}) {
  const opts = { ...defaultuseBackupToTopOptions, ...options }
  const [value] = useState(null)

  return { value }
}
