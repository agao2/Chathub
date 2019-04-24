import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { shallow , configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const mockProps = {
    authenticate:jest.fn()
}

describe("Login Component" , () => {

    it('Login component renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    it('Login button click calls onSubmit ', () => {
        const component = shallow(<Login/>);
        const onSubmit = jest.spyOn(component.instance(), "onSubmit");
        const loginButton = component.find('#submit');
        expect(loginButton.length).toBe(1);  // finds button
        loginButton.simulate('click');
        expect(onSubmit).toHaveBeenCalled();
        
    })
})

