import { CourseProvider } from "../../providers/CourseProvider";
import { CourseAdd } from "./CourseAdd";
import { saveStateLocally } from "../../decorators/utils";
/***
 * Course Edit component
 *
 * @class CourseAdd
 */
@saveStateLocally("/courses/edit")
export class CourseEdit extends CourseAdd {
    /***
     * @constructor
     */
    constructor() {
        super();
        this.state = {
            header: "Edit course",
            course: {},
        };
    }

    /***
     * This event is triggered when new course form is submitted
     *
     * @event onSubmit
     * @param {Object} event
     */
    onSubmit(event) {
        event.preventDefault();

        const { id, title, candidate_limit } = this.state;

        CourseProvider.update(id, { title, candidate_limit }).then(() => {
            this.setState({ backToList: true });
        });
    }

    /***
     * @event componentWillMount
     */
    componentWillMount() {
        if (this.props.location.state) {
            const { course } = this.props.location.state;

            if (course) {
                this.setState({ ...course, header: `Edit course: ${course.title} (${course.candidate_limit})` });
            }
        } else {
            this.loadState();
        }
    }

    /***
     * Renders UserAdd component
     *
     * @method render
     * @returns {XML}
     */
    render() {
        return super.render();
    }
}
