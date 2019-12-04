import { renderHook, act } from "../../react"
import useCustomHook from "./useCustomHook"

it('counter should be one', async () => {
  const { result } = renderHook(() => useCustomHook())

  // This waits for the useEffect hook to be triggered and mutate hook state
  await act(async () => await Promise.resolve())

  expect(result.current).toBe(1)
})