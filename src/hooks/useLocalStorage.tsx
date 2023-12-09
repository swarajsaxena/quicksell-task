import { useState } from 'react'

export function useLocalStorage(key: string, initialValue: any) {
  // Get stored value from local storage or use initial value
  const storedValue = localStorage.getItem(key)
  const initial = storedValue ? JSON.parse(storedValue) : initialValue

  // State to hold the current value
  const [value, setValue] = useState(initial)

  // Update local storage when the state changes
  const setStoredValue = (newValue: any) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setStoredValue]
}
