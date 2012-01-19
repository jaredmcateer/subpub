/**
 * subPub - a lightweight publish/subscribe observer object
 */
var subPub = {
    /**
     * Contains all the callbacks in arrays bound to subscription  keys
     * @type object
     */
    registry: {},
    
    /**
     * Registers a callback to a specific subscription key
     *
     * @param {string} key
     * @param {Function} callback
     * @throws {TypeError} if call back is not a function
     */
    subscribe: function (key, callback) {
        if (!this._isFunction(callback)) {
            throw new TypeError('callback is expected to be a function.');
        }

        if (!this.registry[key]) {
            this.registry[key] = [];
        }

        this.registry[key].push(callback);
    },

    /**
     * Publishes a subscription calling the callbacks associated with it
     *
     * @param {string} key
     * @param {mixed} memo data to be provided to the call backs
     */
    publish: function (key, memo) {
        var subscriptions, i;

        if (key in this.registry) {
            subscriptions = this.registry[key];
            i = subscriptions.length;
            while (i--) {
                subscriptions[i](memo);
            }
        }
    },

    /**
     * Unsubscribes callbacks from subscription keys
     *
     * @param {String} key  
     * @param {Function} callback Optional. function handler to unsub
     */
    unsubscribe: function (key, callback) {
        var i=0,
            k,
            subscriptions;

        if (!key in this.registry) { return; }

        if (!this._isFunction(callback)) { 
            this.registry[key] = [];
        } else {
            subscriptions = this.registry[key];
            k = subscriptions.length;

            while (i < k) {   
                if (callback === subscriptions[i]) { 
                    subscriptions.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
    },

    /**
     * Fast function checker
     *
     * @param {Mixed} obj the variable to check if it's a function
     * @return {Boolean}
     */
    _isFunction: function (obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }
};
