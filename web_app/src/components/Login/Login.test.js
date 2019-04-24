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
    
    it('onSubmit is called when login button is clicked ', () => {
        const wrapper = shallow(<Login {...mockProps} />);
        let onSubmit = jest.spyOn(wrapper.instance(), 'onSubmit')
        wrapper.instance().forceUpdate();
        wrapper.find('#submit').prop('onClick')();
        expect(onSubmit).toHaveBeenCalled();
    })
})

