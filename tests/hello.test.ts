import { describe, expect, it } from 'vitest'
import { appName } from '../src/lib/hello'

describe('test runner smoke test', () => {
  it('imports a pure function from src/lib', () => {
    expect(appName()).toBe('Rymoskop')
  })
})
