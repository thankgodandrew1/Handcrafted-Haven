import { BehaviorSubject, Observable } from 'rxjs'
import getConfig from 'next/config'
import Router from 'next/router'

import { fetchWrapper } from '@/helpers'
import { alertService } from './alert.service'

const { publicRuntimeConfig } = getConfig()
const baseUrl = `${publicRuntimeConfig.apiUrl}`

interface User {
  id: string
  token?: string
  // Add other properties as needed
}

const userSubject = new BehaviorSubject<User | null>(
  typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')!),
)

export const userService = {
  user: userSubject.asObservable(),
  get userValue(): User | null {
    return userSubject.value
  },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: deleteUser,
}

async function login(email: string, password: string): Promise<void> {
  const user: User = await fetchWrapper.post(`${baseUrl}/users/authenticate`, {
    email,
    password,
  })
  updateLocalStorageAndPublish(user)
}

function logout(): void {
  alertService.clear()
  localStorage.removeItem('user')
  userSubject.next(null)
  Router.push('/signin')
}

async function register(user: any): Promise<void> {
  await fetchWrapper.post(`${baseUrl}/users/register`, user)
}

async function getAll(): Promise<User[]> {
  return await fetchWrapper.get(baseUrl)
}

async function getById(id: string): Promise<User> {
  return await fetchWrapper.get(`${baseUrl}/users/${id}`)
}

async function update(id: string, params: any): Promise<void> {
  await fetchWrapper.put(`${baseUrl}/users/${id}`, params)

  if (id === userSubject.value?.id) {
    const updatedUser = { ...userSubject.value, ...params }
    updateLocalStorageAndPublish(updatedUser)
  }
}

async function deleteUser(id: string): Promise<void> {
  await fetchWrapper.delete(`${baseUrl}/users/${id}`)

  if (id === userSubject.value?.id) {
    logout()
  }
}

function updateLocalStorageAndPublish(user: User): void {
  localStorage.setItem('user', JSON.stringify(user))
  userSubject.next(user)
}
