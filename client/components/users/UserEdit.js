import { UserProvider } from "../../providers/UserProvider";
import { UserAdd } from "./UserAdd";

/***
 * User Edit component
 *
 * @class UserAdd
 */
export class UserEdit extends UserAdd {
    /***
     * @constructor
     */
    constructor() {
        super();

        this.state = { gender: "m", header: "Edit User" };
    }

    /***
     * This event is triggered when new user form is submitted
     *
     * @event onSubmit
     * @param {Object} event
     */
    onSubmit(event) {
        event.preventDefault();

        const { id, first_name, last_name, gender } = this.state;

        UserProvider.update(id, { first_name, last_name, gender }).then(() => {
            this.setState({ backToList: true });
        });
    }

    /***
     * @event componentWillMount
     */
    componentWillMount() {
        const { user } = this.props.location.state;

        if (user) {
            this.setState({ ...user , header: `Edit user: ${user.first_name} ${user.last_name}` });
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
