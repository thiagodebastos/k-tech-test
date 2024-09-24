import {
  fireEvent,
  getByLabelText,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within
} from "@testing-library/react"
import { http, HttpResponse } from "msw"

import { renderWithProviders } from "./lib/test-utils"
import { UsersList } from "./features/users/UsersList"
import { server } from "./mocks/node"

import App from "./App"

/** NOTE: These tests capture the essense of the app without having to
  * get too deep into implementation details.
  * They depend on mocking, provided by msw together with a simple
  * in-memory database
  */

describe('Integration Test', () => {

  test('Renders a list of users', async () => {
    renderWithProviders(<UsersList />)

    const element = await screen.findByText(/sarah smith/i)

    await waitFor(() => {
      expect(element).toBeInTheDocument()
    })
  })

  test('Renders a message when no users are found', async () => {
    renderWithProviders(<UsersList />)

    // override the default handler to test an empty response from the server
    server.use(http.get('http://localhost:3000/api/v1/users', () => {
      return HttpResponse.json([])
    }))

    const element = await screen.findByText("No users found")

    await waitFor(() => {
      expect(element).toBeInTheDocument()
    })
  })

  test('Creates a user and updates the UI', async () => {
    renderWithProviders(<App />)

    const createUserButton = await screen.findByTestId('create-user-button')

    fireEvent.click(createUserButton)

    const createUserForm = screen.getByTestId('create-user-form')

    const nameInput = getByLabelText(createUserForm, /name/i)
    const emailInput = getByLabelText(createUserForm, /email/i)
    const phoneInput = getByLabelText(createUserForm, /phone/i)

    const values = {
      name: 'test user',
      email: 'test_user@gmail.com',
      phone: '0400000009'
    }

    fireEvent.change(nameInput, { target: { value: values.name } })
    fireEvent.change(emailInput, { target: { value: values.email } })
    fireEvent.change(phoneInput, { target: { value: values.phone } })

    fireEvent.submit(createUserForm)

    await waitForElementToBeRemoved(createUserForm)

    expect(await screen.findByText('test user')).toBeInTheDocument()
  })

  test('Updates a user and updates the UI', async () => {
    renderWithProviders(<UsersList />)

    let user1Card = await screen.findByTestId('user-card-1')
    const editUserButton = within(user1Card).getByLabelText(/edit user/i)

    fireEvent.click(editUserButton)


    // wait for UI to update with the form
    await waitFor(async () => {
      user1Card = await screen.findByTestId('user-card-1')
      expect(user1Card).toBeInTheDocument()
    })


    const editUserForm = screen.getByTestId('edit-user-form-1')
    const emailInput = getByLabelText(editUserForm, /email/i)

    const newEmailValue = 'sarah@gmail.com'

    // change the email input value
    fireEvent.change(emailInput, { target: { value: newEmailValue } })

    // submit the new email value
    fireEvent.click(getByLabelText(user1Card, /submit/i))

    await waitForElementToBeRemoved(editUserForm)

    expect(editUserForm).not.toBeInTheDocument()

    // check that the updated user card contains the updated email
    await waitFor(async () => {
      user1Card = await screen.findByTestId('user-card-1')
      expect(getByLabelText(user1Card, /email/i)).toHaveTextContent(newEmailValue)
    })
  })

  test('Deletes a user and update the UI', async () => {
    renderWithProviders(<UsersList />)

    const user1Card = await screen.findByTestId('user-card-1')
    const removeUserButton = within(user1Card).getByLabelText(/remove user/i)

    fireEvent.click(removeUserButton)

    await waitForElementToBeRemoved(user1Card)

    expect(screen.queryByTestId('user-card-1')).not.toBeInTheDocument()
  })

})

