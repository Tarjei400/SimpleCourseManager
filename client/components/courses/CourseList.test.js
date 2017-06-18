import React from "react";
import { shallow } from "enzyme";

import { CourseList } from "./CourseList";
import { CourseProvider } from "../../providers/CourseProvider";

describe("<CourseList />", () => {

    let wrapper = null;
    beforeEach( async ()=> {
        spyOn(CourseProvider, "remove").and.callFake( async () => {});
        spyOn(CourseProvider, "getAll").and.callFake( async () => [
            {"id": 1, "title": "Mock", "candidates_limit": 5, candidates:[]},
            {"id": 2, "title": "Mock", "candidates_limit": 5, candidates:[]},
            {"id": 3, "title": "Mock", "candidates_limit": 5, candidates:[]},
        ]);

        wrapper = shallow(<CourseList />);
        await CourseProvider.getAll();

    });

    it("renders three users in component", async () => {

        expect(CourseProvider.getAll).toHaveBeenCalled();
        expect(wrapper.find('.collection-item').length).toBe(3);
    });

    it("successfuly removes a user", async () => {

        expect(CourseProvider.getAll).toHaveBeenCalled();
        let users = wrapper.find('.collection-item');
        expect(users.length).toBe(3);

        await wrapper.instance().onRemoveCourse(1);
        wrapper.update();
        users = wrapper.find('.collection-item');

        expect(users.length).toBe(2);

    });

});
