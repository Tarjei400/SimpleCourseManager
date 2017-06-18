import React from "react";
import { shallow } from "enzyme";
import { CourseAdd } from "./CourseAdd";
import { CourseUsers } from "./CourseUsers";
import { CourseProvider } from "../../providers/CourseProvider";

describe("<CourseAdd />", () => {

    let wrapper = null;
    beforeEach(async () => {
        spyOn(CourseProvider, "create").and.callFake( async () => {});

        wrapper = shallow(<CourseAdd />);

    });

    it("shouldn't display users on add view", ()=>{
        expect(wrapper.find(<CourseUsers/>).length).toBe(0);
    })

})
