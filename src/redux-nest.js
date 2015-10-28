/**
 * @method proxy
 * @param {Object} object
 * @return {Proxy}
 */
export const proxy = object => {

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
                return targetObject[property];
            } catch (e) {
                return proxy(targetObject);
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
    return !(object instanceof Proxy && object.isUndefined);
};

/**
 * @method isUndefined
 * @param {*} object
 * @return {Boolean}
 */
export const isUndefined = object => {
    return !isDefined(object);
};
