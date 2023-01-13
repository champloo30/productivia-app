import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export function useSignup(first, last, email, password) {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  async function signup(first, last, email, password) {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:5000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({first, last, email, password})
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update authContext
      dispatch({type: 'LOGIN', payload: json})
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
