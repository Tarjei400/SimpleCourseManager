import React from "react";
import { shallow } from "enzyme";
import { CourseAdd } from "./CourseAdd";
import { CourseUsers } from "./CourseUsers";
import { CourseProvider } from "../../providers/CourseProvider";

describe("<CourseUsers />", () => {

    beforeEach(async () => {
        spyOn(CourseProvider, "create").and.callFake( async () => {});

    });

    it("should add new user to preview", () => {
        let wrapper = shallow(<CourseUsers candidates={[]}/>);
        expect(wrapper.find('.chip').length).toBe(0);

        wrapper.instance().onChange({"id": 1, "first_name": "Mock", "last_name": 5, "gender":"m"});

        expect(wrapper.find('.chip').length).toBe(1);

    });

    it("should remove new user from preview", () => {
        spyOn(CourseProvider, "removeCourseUser").and.callFake( async () => {});
        let wrapper = shallow(<CourseUsers candidates={[
            {"id": 1, "first_name": "Mock", "last_name": 5, "gender":"m"},
        ]}/>);
        expect(wrapper.find('.chip').length).toBe(1);

        wrapper.instance().removeCandidate(1);

        expect(wrapper.find('.chip').length).toBe(1);

    })

})
