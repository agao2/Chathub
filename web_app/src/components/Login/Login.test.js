import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mockProps = {
    authenticate: jest.fn()
}

describe("Login Component", () => {

    it('Login component renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('onSubmit is called when login button is clicked ', () => {
        const wrapper = shallow(<Login {...mockProps} />);
        const onSubmit = jest.spyOn(wrapper.instance(), 'onSubmit')
        wrapper.instance().forceUpdate();
        wrapper.find('#submit').prop('onClick')();
        expect(onSubmit).toHaveBeenCalled();
    })

    it('Editting username inputs should set username', () => {
        const wrapper = shallow(<Login />)
        wrapper.find('#username').simulate("change", { target: { value: "alex", id: "username" } });
        expect(wrapper.state().username).toEqual("alex");
    })

    it('Editing password input should set password', () => {
        const wrapper = shallow(<Login />)
        wrapper.find("#password").simulate("change", { target: { value: "password", id: "password" } });
        expect(wrapper.state().password).toEqual("password");
    })

    it('Login button makes authenticate api call', () => {
        const wrapper = shallow(<Login {...mockProps} />);
        wrapper.find('#submit').prop('onClick')();
        expect(mockProps.authenticate).toHaveBeenCalled();
    })
})

