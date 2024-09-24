import {
  CreateUserApiResponse,
  CreateUserDto,
  FindAllUsersApiResponse,
  RemoveUserApiArg,
  UpdateUserApiResponse,
  UpdateUserDto,
  UserDto
} from "@/features/users/usersApi"
import { delay, http, HttpResponse } from "msw"

const GET_USERS_ENDPOINT = 'http://localhost:3000/api/v1/users'
const CREATE_USER_ENDPOINT = 'http://localhost:3000/api/v1/users'
const UPDATE_USER_ENDPOINT = 'http://localhost:3000/api/v1/users/:id'
const DELETE_USER_ENDPOINT = 'http://localhost:3000/api/v1/users/:id'


let db: UserDto[] = [
  {
    id: '1',
    name: 'peter smith',
    email: "peter@gmail.com",
    phone: 4000000000
  },
  {
    id: '2',
    name: 'sarah smith',
    email: "sarah@gmail.com",
    phone: 4000000001
  },
  {
    id: '3',
    name: 'christina smith',
    email: "christina@gmail.com",
    phone: 4000000002
  },
  {
    id: '4',
    name: 'john smith',
    email: "john@gmail.com",
    phone: 4000000003
  },
]

export const handlers = [
  // intercept requests to the backend
  http.get<never, never, FindAllUsersApiResponse, typeof GET_USERS_ENDPOINT>(GET_USERS_ENDPOINT, async () => {
    // create an artificial delay
    await delay(150)
    // respond with users
    return HttpResponse.json(db)
  }),
  http.post<never, CreateUserDto, CreateUserApiResponse, typeof CREATE_USER_ENDPOINT>(CREATE_USER_ENDPOINT, async ({ request }) => {
    await delay(150)

    const newUser = await request.json()
    const createdUser = { id: String(+db[db.length - 1].id + 1), ...newUser }

    db.push(createdUser)

    return HttpResponse.json(createdUser)
  }),
  http.patch<{ id: string }, UpdateUserDto, UpdateUserApiResponse, typeof UPDATE_USER_ENDPOINT>(UPDATE_USER_ENDPOINT, async ({ request, params }) => {
    await delay(150)

    const { id } = params

    const updatedUserDetails = await request.json()
    const existingUser = db.find(u => u.id === id)!

    const updatedUser = {
      ...existingUser,
      ...updatedUserDetails
    }

    db = db.map(u => u.id === id ? updatedUser : u)

    return HttpResponse.json(updatedUser)

  }),
  http.delete<RemoveUserApiArg, never, never, typeof DELETE_USER_ENDPOINT>(DELETE_USER_ENDPOINT, async ({ params }) => {
    await delay(150)
    const { id } = params

    db = db.filter(user => user.id !== id)

    return new HttpResponse()
  })
]
