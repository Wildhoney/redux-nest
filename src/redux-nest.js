/**
 * @method create
 * @param {Object} object
 * @return {Proxy}
 */
export function create(object) {

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
                    return create(nullObject);
                }

                return targetObject[property];

            } catch (e) {
                return create(nullObject);
            }

        }

    });

}

/**
 * @method camelize
 * @return {Function}
 */
export function proxy() {

    return next => action => {
        next(create(action));
    };

}

/**
 * @method isDefined
 * @param {*} object
 * @return {Boolean}
 */
export function isDefined(object) {
    return !isUndefined(object);
}

/**
 * @method isUndefined
 * @param {*} object
 * @return {Boolean}
 */
export function isUndefined(object) {
    return object.IS_NULL;
}
