/**
 * @method create
 * @param {Object} object
 * @return {Proxy}
 */
export function create(object) {

    /**
     * @method isUndefined
     * @param {*} object
     * @return {Boolean}
     */
    const isUndefined = object => typeof object === 'undefined';

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
         * @param {Object} targetObject
         * @param {String} property
         * @return {*|Proxy}
         */
        get(targetObject, property) {

            try {

                const item = targetObject[property];
                return isUndefined(item) ? create(nullObject) : item;

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
