import React from "react";
import { shallow } from "enzyme";
import { CourseEdit } from "./CourseEdit";
import { CourseUsers } from "./CourseUsers";
import { CourseProvider } from "../../providers/CourseProvider";

describe("<CourseEdit />", () => {

    let wrapper = null;
    beforeEach(async () => {
        spyOn(CourseProvider, "create").and.callFake( async () => {});

        wrapper = shallow(<CourseEdit
            location={{
                    state: {
                        course: {"id": 1, "title": "Mock", "candidates_limit": 5, candidates: [1, 2]}
                    }
            }}
        />);

    });

    it("should display users on edit view", async ()=>{
        expect(wrapper.find(CourseUsers).length).toBe(1);
    })

})
