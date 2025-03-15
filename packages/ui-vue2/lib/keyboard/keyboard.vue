<template>
  <section class="number-input" :style="buttonStyle">
    <input
      id="myInput"
      autocomplete="off"
      v-model="IDNumber"
      :style="{
        color: buttonStyle.color,
        fontSize: '1.3em',
        fontFamily: buttonStyle.fontFamily,
      }"
    />
    <div
      class="number-input-inner"
      @click.stop="numberClick"
      style="color: white"
    >
      <div
        data-number="1"
        :style="{ background: mainBgColor, fontSize: buttonStyle.fontSize }"
      >
        1
      </div>
      <div
        data-number="2"
        :style="{ background: mainBgColor, fontSize: buttonStyle.fontSize }"
      >
        2
      </div>
      <div
        data-number="3"
        :style="{ background: mainBgColor, fontSize: buttonStyle.fontSize }"
      >
        3
      </div>
      <div
        data-number="4"
        :style="{ background: mainBgColor, fontSize: buttonStyle.fontSize }"
      >
        4
      </div>
      <div
        data-number="5"
        :style="{ background: mainBgColor, fontSize: buttonStyle.fontSize }"
      >
        5
      </div>
      <div
        data-number="6"
        :style="{ background: mainBgColor, fontSize: buttonStyle.fontSize }"
      >
        6
      </div>
      <div
        data-number="7"
        :style="{ background: mainBgColor, fontSize: buttonStyle.fontSize }"
      >
        7
      </div>
      <div
        data-number="8"
        :style="{ background: mainBgColor, fontSize: buttonStyle.fontSize }"
      >
        8
      </div>
      <div
        data-number="9"
        :style="{ background: mainBgColor, fontSize: buttonStyle.fontSize }"
      >
        9
      </div>
      <div
        data-number="10"
        :style="{
          background: deleteButtonBgColor,
          fontSize: buttonStyle.fontSize,
        }"
      >
        回删
      </div>
      <div
        data-number="0"
        :style="{ background: mainBgColor, fontSize: buttonStyle.fontSize }"
      >
        0
      </div>
      <div
        data-number="X"
        :style="{ background: mainBgColor, fontSize: buttonStyle.fontSize }"
      >
        X
      </div>
    </div>

    <el-button
      type="primary"
      @click="submit"
      :style="{
        background: confirmButtonBgColor,
        borderColor: confirmButtonBgColor,
        fontSize: buttonStyle.fontSize,
        fontFamily: buttonStyle.fontFamily,
      }"
      >确认</el-button
    >
  </section>
</template>

<script>
export default {
  name: "TheKeyboard",
  components: {},
  props: {
    conf: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    mainBgColor() {
      return this.conf.bgThemeColorDict[this.conf.bgThemeColor].mainColor;
    },
    deleteButtonBgColor() {
      return this.conf.bgThemeColorDict[this.conf.bgThemeColor].deleteColor;
    },
    confirmButtonBgColor() {
      return this.conf.bgThemeColorDict[this.conf.bgThemeColor].confirmColor;
    },
    buttonStyle() {
      return {
        width: this.conf.width + "px",
        height: this.conf.height + "px",
        opacity: 1 - this.conf.transparency,
        borderRadius: this.conf.borderRadius + "%",
        fontSize: this.conf.fontSize + "px",
        fontFamily: this.conf.font,
        color: this.conf.fontColor,
        backgroundColor: this.conf.bgColor,
      };
    },
  },
  data() {
    return {
      IDNumber: "",
    };
  },
  created() {
    this.$nextTick(() => {
      const input = document.getElementById("myInput");
      input.focus();
    });
  },
  methods: {
    insertAtCursor(input, value) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const oldValue = input.value;

      // 在当前光标位置插入新值
      input.value =
        oldValue.substring(0, start) + value + oldValue.substring(end);
      // 将光标位置重置到新值的末尾
      input.selectionStart = input.selectionEnd = start + value.length;

      // 触发输入事件，以便输入框正确显示值
      const inputEvent = new Event("input", {
        bubbles: true,
        cancelable: true,
      });
      input.dispatchEvent(inputEvent);
    },
    deleteBeforeCursor(input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;

      // 如果没有选中文本，则将光标位置向左移动一个字符
      if (start === end) {
        input.selectionStart = start - 1;
        input.selectionEnd = end;
      }

      // 删除光标前的一个字符
      const oldValue = input.value;
      input.value =
        oldValue.substring(0, input.selectionStart) +
        oldValue.substring(input.selectionEnd);
      // 将光标位置重置到新值的末尾
      input.selectionStart = input.selectionEnd = start - 1;
      // 触发输入事件，以便输入框正确显示值
      const inputEvent = new Event("input", {
        bubbles: true,
        cancelable: true,
      });
      input.dispatchEvent(inputEvent);
    },
    numberClick(event) {
      const input = document.getElementById("myInput");
      input.focus(); // 确保输入框获得焦点
      const { target = {} } = event;
      const { dataset = {} } = target;
      if (!dataset.number) return;
      if (dataset.number === "10") {
        this.deleteBeforeCursor(input); // 删除光标前的一个字符
      } else {
        this.insertAtCursor(input, dataset.number); // 在光标位置插入新值
      }
    },
    submit() {
      this.conf.data = { value: this.IDNumber };
    },
  },
};
</script>

<style>
.number-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
.number-input-inner {
  position: relative;
  flex: 1;
  height: 100%;
  padding: 0 0 10px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.number-input > button {
  height: 12%;
  margin: 0 8px;
  font-size: 1.5vw;
}
#myInput {
  background: white;
  height: 15%;
  margin: 0 8px;
  padding-left: 12px;
  font-size: 2vw;
}
.number-input-inner > div {
  user-select: none;
  cursor: pointer;
  font-size: 2vw;
  width: 30%;
  height: 20%;
  margin: 8px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
</style>
