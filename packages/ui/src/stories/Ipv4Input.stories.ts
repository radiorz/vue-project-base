import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

import { Ipv4Input } from '../../lib'
const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Example/Ipv4Input',
  component: Ipv4Input,
  render: (args: any) => ({
    components: { Ipv4Input },
    setup() {
      return { args }
    },
    template: '<Ipv4Input v-bind="args"/>'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  args: {
    modelValue: '1.1.1.1'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
} satisfies Meta<typeof Ipv4Input>

export default meta
type Story = StoryObj<typeof meta>

export const Value: Story = {
  args: {
    modelValue: '1.1.1.1',
    'onUpdate:modelValue': (e: any) => {
      console.log(e)
    },
    disabled: false
  }
}
export const Disabled: Story = {
  args: {
    modelValue: '1.1.1.1',
    'onUpdate:modelValue': (e: any) => {
      console.log(e)
    },
    disabled: true
  }
}
export const Active: Story = {
  args: {
    modelValue: '1.1.1.1',
    'onUpdate:modelValue': (e: any) => {
      // this.modelValue = e
    },
    active: true
  }
}

// export const LoggedOut: Story = {
//   args: {
//     user: null
//   }
// }
