import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Login from '@/app/login/page'
import router from 'next'


import {signInWithEmailAndPassword} from "firebase/auth"
 
jest.mock('firebase/auth');
jest.mock('next/router');


/**
 * @jest-environment jsdom
 */
describe('Login', () => {
  it('renders missing email on apprpriate response receive', async () => {
    useRouter.mockImplementation(()=>({pathname:''}))

    const mockedSignIn = jest.mocked(signInWithEmailAndPassword);
    mockedSignIn.mockImplementation(() => {
      throw new Error("", {code: "auth/invalid-email"})
    });

    const {getByTestId} = render(<Login/>)
    const button = getByTestId("button");

    fireEvent.click(button);
    
    const statusText = await waitFor(() => screen.getByText(/invalid email/i));
    expect(statusText).toBeInTheDocument();
  })

  it('renders the login page', async () => {

    render(<Login />)

    const usernameField = screen.getByPlaceholderText("Enter Email")
    const passwordField = screen.getByPlaceholderText("Enter Password")

    
    await page.fill('[name=user_name]', process.env.GITEA_ADMIN_USERNAME);
    await page.fill('[name=password]', process.env.GITEA_ADMIN_PASSWORD);
    await page.click('button.green');

 
    expect(usernameField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
  })
})
