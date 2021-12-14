import { createContext, useState, useContext, useEffect } from 'react'
import { fetchUser } from '../services/user'

const UserContext = createContext()

function UserProvider({ children }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetchUser()
      .then((fetchedUser) => {
        setUser(fetchedUser)
      })
      .catch((error) => {
        throw new Error(`Error: ${error}`)
      })
  }, [])

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

function useUser() {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser hook must be called within a UseProvider')
  }

  return context
}

export { useUser, UserProvider }
