/**
 * @method create
 * @param {Object} object
 * @return {Proxy}
 */
export function create(object) {

    /**
     * @method defined
     * @param {*} x
     * @return {Boolean}
     */
    const defined = x => typeof x !== 'undefined';

    /**
     * @property noop
     * @type {Object}
     */
    const noop = {

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
                return !defined(item) ? create(noop) : item;

            } catch (e) {

                return create(noop);

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
 * @method isUndefined
 * @param {*} object
 * @return {Boolean}
 */
export function isUndefined(object) {
    return object.IS_NULL;
}

/**
 * @method isDefined
 * @param {*} object
 * @return {Boolean}
 */
export function isDefined(object) {
    return !isUndefined(object);
}
