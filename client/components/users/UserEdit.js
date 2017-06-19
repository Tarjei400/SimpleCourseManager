import { UserProvider } from "../../providers/UserProvider";
import { UserAdd } from "./UserAdd";
import { saveStateLocally } from "../../decorators/utils";

/***
 * User Edit component
 *
 * @class UserAdd
 */
@saveStateLocally("/users/edit")
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
        if (this.props.location.state) {
            const { user } = this.props.location.state;

            if (user) {
                this.setState({ ...user, header: `Edit user: ${user.first_name} ${user.last_name}` });
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
