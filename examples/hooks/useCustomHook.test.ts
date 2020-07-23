import { renderHook, act } from '../../react'
import useCustomHook from './useCustomHook'

test('counter should be one', async () => {
  const { result } = renderHook(() => useCustomHook())

  // This waits for the useEffect hook to be triggered and mutate hook state
  await act(() => Promise.resolve())

  expect(result.current).toBe(1)
})
