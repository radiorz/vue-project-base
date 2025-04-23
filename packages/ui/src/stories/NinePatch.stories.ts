import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

import { NinePatch } from '../../lib'
const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Example/NinePatch',
  component: NinePatch,
  render: (args: any) => ({
    components: { NinePatch },
    setup() {
      return { args }
    },
    template: '<div style="padding: 20px;"> <NinePatch v-bind="args" image="image.png"/></div>'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  args: {
    // image: '/assets/image.png',
    topLength: 10,
    leftLength: 10,
    rightLength: 10,
    bottomLength: 10,
    width: 100,
    height: 100,
    default: '测试点九图'
    // onClick: fn()
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
} satisfies Meta<typeof NinePatch>

export default meta
type Story = StoryObj<typeof meta>

export const Size1: Story = {
  args: {
    image: `image.png`,
    topLength: 10,
    leftLength: 10,
    rightLength: 10,
    bottomLength: 10,
    width: 100,
    height: 100
  }
}
export const Size2: Story = {
  args: {
    image: `image.png`,
    topLength: 20,
    leftLength: 20,
    rightLength: 20,
    bottomLength: 20,
    width: 200,
    height: 200
  }
}

// export const LoggedOut: Story = {
//   args: {
//     user: null
//   }
// }
