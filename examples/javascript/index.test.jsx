import React from 'react'
import { render, screen } from '@vtex/test-tools/react'

import Component from './index'

test('should render the example', () => {
  render(<Component />)

  expect(screen.getByText(/This is an example/)).toBeDefined()
})
