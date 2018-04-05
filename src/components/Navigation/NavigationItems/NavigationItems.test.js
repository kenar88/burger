import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('Navigation Items', () => {
    it('should render two navigation items', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should be NavLink in NavigationItem', () => {
        const wrapper = shallow(<NavigationItem />);
        expect(wrapper.text()).toEqual('<NavLink />');
    });
    it('should be link to orders', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.contains(<NavigationItem link="/orders">Orders</NavigationItem>)).toEqual(true);
    });
});