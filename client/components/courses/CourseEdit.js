import { CourseProvider } from "../../providers/CourseProvider";
import { CourseAdd } from "./CourseAdd";

/***
 * Course Edit component
 *
 * @class CourseAdd
 */
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
        const { course } = this.props.location.state;

        if (course) {
            this.setState({ ...course , header: `Edit course: ${course.title} (${course.candidate_limit})` });
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
