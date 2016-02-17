/* 2016-02-17 */
// global helpers
'use strict';

// Adds object properties to another object.
// @param {object} obj
var extend = function (baseObj, addedObj) {
    for (var key in addedObj) {
        if (addedObj.hasOwnProperty(key)) {
            baseObj[key] = addedObj[key];
        }
    }
}

/* --- */
// global namespace
var app = app || {};

/* --- */
(function (window) {
    'use strict';

    // constructor
    var AppActions = function () {
        return {
            testAction: 'GRJS_TEST_ACTION'
        }
    }

    // export to app
	window.app = window.app || {};
	window.app.actions = new AppActions();

})(window);

/* --- */
(function (window) {
    'use strict';

    // constructor
    var AppBroadcaster = function () {
        this.subscribers = {};
    }

    // Subscribes to an event with a callback.
    // @param {string} name
    // @param {object Function} callback
    AppBroadcaster.prototype.subscribe = function (name, callback) {
        if (this.subscribers[name] === undefined) {
            this.subscribers[name] = [];
        }
        this.subscribers[name].push(callback);
    };

    // Publish to an event with a callback.
    // @param {string} name
    AppBroadcaster.prototype.publish = function (name, data) {
        var subsArray = this.subscribers[name];
        if (subsArray === undefined) {
            console.warn('Tried to publish unknown event:' + name);
        } else {
            for (var i = 0, j = subsArray.length; i < j; i += 1) {
                subsArray[i]({ name: name }, data);
            }
        }
    };

    // export to app
	window.app = window.app || {};
	window.app.broadcaster = new AppBroadcaster();

})(window);