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

    // it('Editting username inputs should set username', () => {
    //     const wrapper = shallow(<Login />)
    //     wrapper.find('#username').simulate("change", { target: { value: "alex", id: "username" } });
    //     expect(wrapper.state().username).toEqual("alex");
    // })

    // it('Editing password input should set password', () => {
    //     const wrapper = shallow(<Login />)
    //     wrapper.find("#password").simulate("change", { target: { value: "password", id: "password" } });
    //     expect(wrapper.state().password).toEqual("password");
    // })

    // it('Login button makes authenticate api call', () => {
    //     const wrapper = shallow(<Login {...mockProps} />);
    //     wrapper.find('#submit').prop('onClick')();
    //     expect(mockProps.authenticate).toHaveBeenCalled();
    // })


