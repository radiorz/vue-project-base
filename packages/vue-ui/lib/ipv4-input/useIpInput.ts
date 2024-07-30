/**
 * @author
 * @file useIpInput.ts
 * @fileBase useIpInput
 * @path packages\vue-ui\lib\ipv4-input\useIpInput.ts
 * @from 
 * @desc 
 * @todo
 * 
 *
 * @done
 * @example
 */

import { ref } from "vue";

export interface useIpInputOptions {
}

export const defaultuseIpInputOptions: useIpInputOptions = {
};

export function useIpInput(options: Partial<useIpInputOptions> = {}) {
  const opts = { ...defaultuseIpInputOptions, ...options };
  const value  = ref(null);

  return {value};
}
