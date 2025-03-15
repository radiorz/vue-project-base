import { ref, onMounted, onUnmounted } from "vue";

export interface UseIntervalOptions {
  callback: (...args: any[]) => void;
  interval: number;
  immediate: boolean;
}
export const USE_INTERVAL_DEFAULT_OPTIONS: UseIntervalOptions = {
  callback: () => {},
  interval: 1000,
  immediate: false,
};
export function useInterval(options: Partial<UseIntervalOptions>) {
  const { callback, interval, immediate } = Object.assign(
    USE_INTERVAL_DEFAULT_OPTIONS,
    options
  );
  const intervalId = ref<number | null>(null);
  const start = () => {
    if (typeof interval !== "number" || interval < 0) {
      // 开发模式下就报错
      return;
    }

    if (immediate) {
      callback();
    }

    intervalId.value = window.setInterval(callback, interval);
  };

  const stop = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  };

  onMounted(start);
  onUnmounted(stop);

  return { stop };
}
