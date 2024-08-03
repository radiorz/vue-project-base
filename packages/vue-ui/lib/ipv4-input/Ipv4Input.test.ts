import { render, screen } from '@testing-library/vue'
import { it, expect } from 'vitest'
import Ipv4Input from './Ipv4Input.vue'

it('ipv4 is work', async () => {
  const wrapper = render(Ipv4Input, {
    props: {
      modelValue: '1.1.1.1',
      disabled: false,
      active: false
    }
  })
  const a = await wrapper.queryAllByLabelText('input')
  console.log(`a`, a)
  // console.log(`wrapper.find("input")`, await wrapper.findByLabelText('input'))
})
