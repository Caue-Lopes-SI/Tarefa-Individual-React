// src/services/authService.ts
import { api } from '../api/api'

export function login(email: string, password: string) {
  return api.post('/auth/login', { email, password })
}

export function signup(fullName: string, email: string, password: string, passwordConfirmation: string) {
  return api.post('/auth/signup', { fullName, email, password, passwordConfirmation })
}