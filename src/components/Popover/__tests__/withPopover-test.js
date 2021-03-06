import React from 'react'
import { mount } from 'enzyme'
import withPopoverState from '../withPopoverState'

const Base = () => null

const wrap = (enhance, props = {}) => {
  const Comp = enhance(Base)
  return mount(<Comp {...props} />)
}

const getState = (wrapper, prop = 'popover') =>
  wrapper
    .update()
    .find(Base)
    .prop(prop)

const structure = (wrapper, prop) => {
  const state = getState(wrapper, prop)
  expect(state).toHaveProperty('popoverId', expect.any(String))
}

const createTests = enhance => {
  test('structure', () => structure(wrap(enhance)))
  test('name argument', () => structure(wrap(enhance('foo')), 'foo'))
  test('name option', () => structure(wrap(enhance({ name: 'foo' })), 'foo'))
}

describe('withPopoverState', () => {
  createTests(withPopoverState)
})
