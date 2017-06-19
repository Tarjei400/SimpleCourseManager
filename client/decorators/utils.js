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
