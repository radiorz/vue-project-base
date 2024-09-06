// marquee.js
import "./marquee.css";

export const SCROLL_DIRECTIONS = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};

function addPx(value) {
  return typeof value === "number" ? `${value}px` : value;
}

export const marquee = {
  inserted(el, binding) {
    const settings = binding.value || {};
    const {
      scrollDirection = SCROLL_DIRECTIONS.left,
      scrollSpeed = 50,
      auto = true,
    } = settings;

    if (!auto || !SCROLL_DIRECTIONS[scrollDirection]) {
      return;
    }

    const isHorizontal = [
      SCROLL_DIRECTIONS.left,
      SCROLL_DIRECTIONS.right,
    ].includes(scrollDirection);
    const container = el.parentNode;

    // 设置容器样式
    container.style.overflow = "hidden";
    container.style.display = "flex";
    container.style.flexDirection = isHorizontal ? "row" : "column";

    if (isHorizontal) {
      el.style.whiteSpace = "nowrap";
    } else {
      container.style.height = addPx(
        parseFloat(getComputedStyle(container).lineHeight)
      );
    }

    // 克隆元素以创建无缝滚动效果
    const clone = el.cloneNode(true);
    container.appendChild(clone);

    // 计算滚动距离和持续时间
    const distance = isHorizontal ? el.offsetWidth : el.offsetHeight;
    const duration = distance / scrollSpeed;

    // 设置动画
    el.style.animation = `marquee-${scrollDirection} ${duration}s linear infinite`;
    clone.style.animation = `marquee-${scrollDirection} ${duration}s linear infinite`;

    // 为反向滚动设置延迟
    if (
      scrollDirection === SCROLL_DIRECTIONS.right ||
      scrollDirection === SCROLL_DIRECTIONS.down
    ) {
      clone.style.animationDelay = `${-duration / 2}s`;
    } else {
      el.style.animationDelay = `${-duration / 2}s`;
    }

    // 保存清理函数
    el._cleanup = () => {
      clone.remove();
      el.style.animation = "";
      el.style.whiteSpace = "";
    };
  },
  unbind(el) {
    if (el._cleanup) {
      el._cleanup();
    }
  },
};

export function marqueePlugin(Vue) {
  Vue.directive("marquee", marquee);
}
