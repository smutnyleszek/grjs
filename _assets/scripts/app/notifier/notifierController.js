(function (window) {

    'use strict';

    // constructor
    var AppNotifierController = function (model, view) {
        // safety checks
        if (model === undefined) {
            throw new Error('Tried to create modelless controller.');
        }
        if (view === undefined) {
            throw new Error('Tried to create viewless controller.');
        }
        this.model = model;
        this.view = view;

        this._notificationLifespan = 2 * 1000; // 2s

        app.broadcaster.subscribe(
            app.actions.addNotification,
            this._onAddNotification.bind(this)
        );
    };

    // Handle addNotification event.
    // @param {object} [event]
    // @param {object} [data] of the event
    AppNotifierController.prototype._onAddNotification = function (event, data) {
        var message = data.message;
        var type = data.type;

        // safety checks
        if (message === undefined) {
            throw new Error('Tried to create messageless notification.');
        }

        this._createNotification(message, type);
    };

    // Creates a notification with a lifespan.
    // @param {string} [message] to be displayed
    // @param {string} [type] of the notification
    AppNotifierController.prototype._createNotification = function (message, type) {
        var notification = this.model.create(message, type);
        var id = notification.attributes.id.value;

        this.view.add(notification);

        setTimeout(
            this._destroyNotification.bind(this),
            this._notificationLifespan,
            id
        );
    };

    // Destroys a notification by id.
    // @param {string} [id] of notification to be destroyed
    AppNotifierController.prototype._destroyNotification = function (id) {
        this.view.remove(id);
    };

    // export to app
    window.app = window.app || {};
    window.app.notifier = window.app.notifier || {};
    window.app.notifier.controller = AppNotifierController;

})(window);