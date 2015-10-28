/**
 * @method proxy
 * @param {Object} object
 * @return {Proxy}
 */
export const proxy = object => {

    /**
     * @property nullObject
     * @type {Object}
     */
    const nullObject = {};

    /**
     * @method toString
     * @return {undefined}
     */
    nullObject.toString = () => undefined;

    return new Proxy(object, {

        /**
         * @constructor
         * @return {Proxy}
         */
        constructor() {
            this.isUndefined = true;
        },

        /**
         * @method get
         */
        get(targetObject, property) {

            try {

                if (typeof targetObject[property] === 'undefined') {
                    return proxy(nullObject);
                }

                return targetObject[property];

            } catch (e) {
                return proxy(nullObject);
            }

        }

    });

};
