import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Login from '@/app/login/page'
 
describe('Login', () => {
  it('renders the login page', async () => {
    render(<Login />)

    const usernameField = screen.getByPlaceholderText("Enter Email")
    const passwordField = screen.getByPlaceholderText("Enter Password")
 
    expect(usernameField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
  })
})
