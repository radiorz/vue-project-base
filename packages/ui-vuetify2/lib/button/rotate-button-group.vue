<!--
 
/**
 * @author
 * @file rotate-button-group.vue
 * @fileBase rotate-button-group
 * @path packages\ui-vuetify2\lib\button\rotate-button-group.vue
 * @from 
 * @desc 
 悬浮在主要按钮上，可以让周边按钮旋转而出
 周边按钮都可以onClick 
 输入就是menu
 
 * @example
 */

-->

<template>
  <div class="rotate-button-group-container" @mouseenter="showMenu" @mouseleave="hideMenu">
    <!-- 主按钮 -->
    <button class="main-button" @click="handleMainClick">
      <slot name="main-button">{{ mainButtonText }}</slot>
    </button>

    <!-- 副按钮容器 -->
    <div class="secondary-buttons-container" :class="{ 'expanded': isExpanded }">
      <!-- 副按钮 -->
      <template v-for="(item, index) in menu">
        <button :key="index" class="secondary-button" :style="getButtonStyle(index)"
          @click="handleSecondaryClick(item, index)">
          <slot :name="`button-${index}`" :item="item">
            {{ item.text || `Button ${index + 1}` }}
          </slot>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'rotate-button-group',
  components: {},
  // props
  props: {
    // 菜单数据
    menu: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(item => typeof item === 'object' && item !== null);
      }
    },
    // 主按钮文本
    mainButtonText: {
      type: String,
      default: 'Menu'
    },
    // 展开半径
    radius: {
      type: Number,
      default: 100
    },
    // 动画持续时间
    animationDuration: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      // 是否展开
      isExpanded: false,
      // 上次鼠标离开时间戳
      lastLeaveTime: 0,
      // 延迟收起时间（毫秒）
      leaveDelay: 200
    }
  },
  computed: {
    // 按钮数量
    buttonCount() {
      return this.menu.length;
    },
    // 每个按钮之间的角度
    angleStep() {
      return 360 / this.buttonCount;
    }
  },
  methods: {
    // 显示菜单
    showMenu() {
      this.isExpanded = true;
    },
    // 隐藏菜单
    hideMenu() {
      this.lastLeaveTime = Date.now();
      // 延迟收起，以便用户有时间移动到副按钮
      setTimeout(() => {
        // 检查是否在延迟期间没有再次进入
        if (Date.now() - this.lastLeaveTime >= this.leaveDelay) {
          this.isExpanded = false;
        }
      }, this.leaveDelay);
    },
    // 获取副按钮样式
    getButtonStyle(index) {
      // 计算角度（弧度）
      const angle = (index * this.angleStep * Math.PI) / 180;
      // 计算X和Y坐标
      const x = this.radius * Math.cos(angle);
      const y = this.radius * Math.sin(angle);
      // 计算旋转角度（为了让按钮面向外）
      const rotateAngle = index * this.angleStep;
      // 计算旋转出现的延迟（依次出现效果）
      const delay = (index * 50) % 200; // 每个按钮延迟不同，但不超过200ms

      return {
        // 设置CSS变量供样式使用
        '--x': `${x}px`,
        '--y': `${y}px`,
        '--rotate': `${rotateAngle}deg`,
        '--delay': `${delay}ms`,
        transition: `transform ${this.animationDuration}ms ease-out ${delay}ms`
      };
    },
    // 处理主按钮点击
    handleMainClick() {
      this.$emit('main-click');
    },
    // 处理副按钮点击
    handleSecondaryClick(item, index) {
      this.$emit('secondary-click', item, index);
      // 如果有点击后回调
      if (item.onClick && typeof item.onClick === 'function') {
        item.onClick(item, index);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rotate-button-group-container {
  position: relative;
  display: inline-block;
  // 设置容器大小以覆盖主按钮和展开的副按钮
  width: calc(2 * #{var(--radius, 100px)} + 40px);
  height: calc(2 * #{var(--radius, 100px)} + 40px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-button {
  position: relative;
  z-index: 2;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4285f4;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;

  &:hover {
    background-color: #3367d6;
  }
}

.secondary-buttons-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
}

.secondary-button {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: #4285f4;
  border: 1px solid #4285f4;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1;
  // 初始状态：隐藏且旋转
  transform: translate(-50%, -50%) scale(0) rotate(-180deg);
  opacity: 0;

  &:hover {
    background-color: #f1f3f4;
    transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(var(--rotate)) scale(1.1);
  }
}

// 展开状态
.expanded .secondary-button {
  /* 使用JS计算的坐标和旋转角度，并添加旋转出现动画 */
  transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(var(--rotate)) scale(1);
  opacity: 1;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay),
              opacity 0.2s ease-out var(--delay);
  /* 使用JS计算的坐标和旋转角度 */
  transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(var(--rotate));
}
</style>
