/***
 *
 * @decorator SaveStateLocally
 * @param {String} route
 * @returns {function(*)}
 */
export function saveStateLocally(route) {
    return (target) => {
        const oldSetState = target.prototype.setState;

        target.prototype.setState = async function (state) {
            await oldSetState.call(this, state);
            localStorage.setItem(route, JSON.stringify(this.state));
        };

        target.prototype.loadState = function () {
            const savedState = JSON.parse(localStorage.getItem(route));

            if (savedState) {
                oldSetState.call(this, savedState);

                return true;
            }

            return false;
        };
    };
}

/***
 * This would add websocket logic to a componentn
 * it will work on components only!
 *
 * @decorator withWebSocket
 * @param {String} url
 * @returns {function(*)}
 */
export function withWebSocket(url) {
    return (BaseComponent) => class WebsocketComponent extends BaseComponent {
        /***
         * Creates a connection on comonent mount
         *
         * @method componentWillMount
         */
        componentWillMount() {
            if (super.componentWillMount) {
                super.componentWillMount();
            }
            this.connection = new WebSocket(url);
        }

        /***
         * Closes connection on comonent unmount
         *
         * @method componentWillUnMount
         */
        componentWillUnmount() {
            if (super.componentWillUnmount) {
                super.componentWillUnmount();
            }
            this.connection.close();
        }
    };
}
