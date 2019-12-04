import { useState, useEffect } from 'react'

const useCustomHook = () => {
  const [counter, setCount] = useState(0)
  useEffect(() => {
    setCount(1)
  }, [])
  return counter
}

export default useCustomHook
