import { ref } from 'vue'
import { useInterval } from './useInterval'

export interface UseTimeOptions {
  interval: number
}

export const defaultUseTimeOptions: UseTimeOptions = {
  interval: 500
}

export function useTime(options: Partial<UseTimeOptions> = {}) {
  const { interval } = { ...defaultUseTimeOptions, ...options }
  const currentTime = ref(new Date())

  useInterval({
    callback: () => {
      currentTime.value = new Date()
    },
    interval
  })

  return { currentTime }
}
