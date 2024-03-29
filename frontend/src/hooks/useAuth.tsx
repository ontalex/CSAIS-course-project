import { useContext } from 'react'
import { AuthContext } from '../hok/AuthProvider'

export function useAuth() {
    return useContext(AuthContext)
}
