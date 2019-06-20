import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import {render, fireEvent, cleanup, waitForElement} from '@testing-library/react'
import axiosMock from 'axios'


afterEach(cleanup)


test('Login component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('onSubmit is called when login button is clicked ', () => {
    const mockProps = {
        authenticate: jest.fn()
    }
    const {container} = render(<Login {...mockProps} />);
    fireEvent.click(container.querySelector("#submit"));
    expect(mockProps.authenticate).toHaveBeenCalled();
})

test('sucessfully logged in user redirects' , async () => {
    const mockProps = {
        authenticate: jest.fn(),
        User: {username: "test name"},
        history: {push : jest.fn()}
    }
    const {container} = render(<Login {...mockProps} />);
    fireEvent.click(container.querySelector("#submit"));
    await Promise.resolve();
    expect(mockProps.history.push).toHaveBeenCalled();
})

test('no user does not redirect' , async () => {
    const mockProps = {
        authenticate: jest.fn(),
        User: null,
        history: {push : jest.fn()}
    }
    const {container} = render(<Login {...mockProps} />);
    fireEvent.click(container.querySelector("#submit"));
    await Promise.resolve();
    expect(mockProps.history.push).not.toHaveBeenCalled();
})


