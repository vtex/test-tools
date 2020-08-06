import { hooks } from '@vtex/test-tools/react'
import useCustomHook from './useCustomHook'

test('counter should be one', async () => {
  const { result } = hooks.renderHook(() => useCustomHook())

  // This waits for the useEffect hook to be triggered and mutate hook state
  await hooks.act(() => Promise.resolve())

  expect(result.current).toBe(1)
})
