<template>
  <div class="example-container">
    <h2>旋转按钮组示例</h2>
    <div class="button-group-demo">
      <rotate-button-group
        :menu="menuItems"
        main-button-text="菜单"
        :radius="120"
        @main-click="handleMainClick"
        @secondary-click="handleSecondaryClick"
      />
    </div>
    <div class="event-log">
      <h3>事件日志</h3>
      <ul>
        <li v-for="(log, index) in eventLogs" :key="index">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import RotateButtonGroup from './rotate-button-group.vue';

export default {
  components: {
    RotateButtonGroup
  },
  data() {
    return {
      menuItems: [
        { text: '设置', onClick: this.handleSettingClick },
        { text: '分享', onClick: this.handleShareClick },
        { text: '收藏', onClick: this.handleFavoriteClick },
        { text: '更多', onClick: this.handleMoreClick }
      ],
      eventLogs: []
    };
  },
  methods: {
    handleMainClick() {
      this.addLog('主按钮被点击');
    },
    handleSecondaryClick(item, index) {
      this.addLog(`副按钮 ${index + 1} (${item.text}) 被点击`);
    },
    handleSettingClick() {
      this.addLog('设置功能被触发');
    },
    handleShareClick() {
      this.addLog('分享功能被触发');
    },
    handleFavoriteClick() {
      this.addLog('收藏功能被触发');
    },
    handleMoreClick() {
      this.addLog('更多功能被触发');
    },
    addLog(message) {
      const timestamp = new Date().toLocaleTimeString();
      this.eventLogs.unshift(`[${timestamp}] ${message}`);
      // 只保留最近10条日志
      if (this.eventLogs.length > 10) {
        this.eventLogs.pop();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.example-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.button-group-demo {
  margin: 40px 0;
  padding: 40px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.event-log {
  margin-top: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.event-log h3 {
  margin-top: 0;
  font-size: 16px;
  color: #333;
}

.event-log ul {
  list-style-type: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.event-log li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #555;
}

.event-log li:last-child {
  border-bottom: none;
}
</style>