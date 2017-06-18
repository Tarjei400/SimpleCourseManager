import React from "react";
import { shallow } from "enzyme";

import { UserList } from "./UserList";
import { UserProvider } from "../../providers/UserProvider";

describe("<UserList />", () => {

    let wrapper = null;
    beforeEach( async ()=> {
        spyOn(UserProvider, "remove").and.callFake( async () => {});
        spyOn(UserProvider, "getAll").and.callFake( async () => [
            {"id": 1, "first_name": "Mock", "last_name": 5, "gender":"m"},
            {"id": 2, "first_name": "Mock", "last_name": 5, "gender":"m"},
            {"id": 3, "first_name": "Mock", "last_name": 5, "gender":"m"},
        ]);

        wrapper = shallow(<UserList />);
        await UserProvider.getAll();

    });

    it("renders three users in component", async () => {

        expect(UserProvider.getAll).toHaveBeenCalled();
        expect(wrapper.find('.collection-item').length).toBe(3);
    });

    it("successfuly removes a user", async () => {

        expect(UserProvider.getAll).toHaveBeenCalled();
        let users = wrapper.find('.collection-item');
        expect(users.length).toBe(3);

        await wrapper.instance().removeUser(1);
        wrapper.update();
        users = wrapper.find('.collection-item');

        expect(users.length).toBe(2);

    });

});
