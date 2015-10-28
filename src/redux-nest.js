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
    const nullObject = {

        /**
         * @constant IS_NULL
         * @return {Boolean}
         */
        IS_NULL: true,

        /**
         * @method toString
         * @return {undefined}
         */
        toString: () => undefined

    };

    return new Proxy(object, {

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

/**
 * @method isDefined
 * @param {*} object
 * @return {Boolean}
 */
export const isDefined = object => {
    return !isUndefined(object);
};

/**
 * @method isUndefined
 * @param {*} object
 * @return {Boolean}
 */
export const isUndefined = object => {
    return object.IS_NULL;
};
