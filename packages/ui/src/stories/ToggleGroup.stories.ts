import type { Meta, StoryObj } from '@storybook/vue3'
import ToggleGroup from '../../lib/the-toggle/ToggleGroup.vue'
import { ToggleStrategy } from '../../lib/the-toggle/ToggleGroup.vue'

// 定义元数据
const meta: Meta<typeof ToggleGroup> = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    strategies: {
      control: 'array',
      description: '包含多个 ToggleStrategy 实例的数组'
    },
    value: {
      control: 'text',
      description: '当前选中的 toggle 类型'
    },
    onChange: {
      action: 'change',
      description: '切换项被点击时触发的事件'
    }
  }
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

// 定义模拟的 ToggleStrategy 数据
const mockStrategies: ToggleStrategy[] = [
  {
    type: 'strategy1',
    isActive: () => false,
    icon: 'fa fa-star',
    title: '策略 1'
  },
  {
    type: 'strategy2',
    isActive: () => true,
    icon: 'fa fa-heart',
    title: '策略 2'
  },
  {
    type: 'strategy3',
    isActive: () => false,
    icon: 'fa fa-bell',
    title: '策略 3'
  }
]

// 基础用例
export const Basic: Story = {
  args: {
    strategies: mockStrategies,
    value: 'strategy2'
  }
}
