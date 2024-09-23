import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import axios from 'axios';
import firebase from "firebase/auth"

import Track from '@/app/track/page';




// Mocking modules

jest.mock('axios');
jest.mock('firebase/auth');

test('fetches and displays user data', async () => {

    // Create a mock response
    const sections = { data: ["CMSC330-0101", "CMSC330-0102"] };

    axios.get.mockImplementation((url) => {
    switch (url) {
    case '/api/track':
        return Promise.resolve({data: sections})
    case '/api/section?course_id=CMSC330-0101':
        return Promise.resolve({data: {
            "course_id": "CMSC330-0101",
            "professor": "Cliff Bakalian",
        }})
    case '/api/section?course_id=CMSC330-0102':
        return Promise.resolve({data: {
            "course_id": "CMSC330-0102",
            "professor": "Cliff Bakalian",
        }})
    default:
        return Promise.reject(new Error('not found'))
    }
    })

    // Render the User component
    render(<Track />);

    // Check if the mocked response is used in the component
    const courseNameElement = await waitFor(() => screen.getByText(/CMSC330/i));
    const sectionElement1 = await waitFor(() => screen.getByText(/0101/i));
    const sectionElement2 = await waitFor(() => screen.getByText(/0102/i));
    expect(courseNameElement).toBeInTheDocument();
    expect(sectionElement1).toBeInTheDocument();
    expect(sectionElement2).toBeInTheDocument();
});