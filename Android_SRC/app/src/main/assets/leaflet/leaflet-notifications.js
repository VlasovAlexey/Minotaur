L.Control.Notifications = L.Control.extend({
    options: {
        position: 'topright',
        timeout: 3000,
        closable: true,
        dismissable: true,
        className: '',
        icons: {
            info: null,
            warning: null,
            success: null,
            alert: null,
            custom: null,
        },
        marginLeft: null,
        marginRight: null,
    },
    onAdd: function (map) {
        this._notifications = [];

        this._container = L.DomUtil.create('div', `leaflet-control-notifications ${this.options.className}`);

        if (this.options.marginLeft) {
            this._container.style.marginLeft = this.options.marginLeft;
        }
        if (this.options.marginRight) {
            this._container.style.marginRight = this.options.marginRight;
        }

        L.DomEvent.disableScrollPropagation(this._container);
        L.DomEvent.disableClickPropagation(this._container);
        L.DomEvent.on(this._container, 'contextmenu', L.DomEvent.stopPropagation);

        map._container.insertBefore(this._container, map._container.firstChild);

        return this._container;
    },
    info: function (title, message, options) {
        this._add('info', title, message, { icon: 'fa fa-info-circle', ...options });
    },
    warning: function (title, message, options) {
        this._add('warning', title, message, { icon: 'fa fa-exclamation-triangle', ...options });
    },
    success: function (title, message, options) {
        this._add('success', title, message, { icon: 'fa fa-check-circle', ...options });
    },
    alert: function (title, message, options) {
        this._add('alert', title, message, { icon: 'fa fa-exclamation-circle', ...options });
    },
    custom: function (title, message, options) {
        this._add('custom', title, message, { icon: 'fa fa-cog', ...options });
    },
    clear: function () {
        for (var i = 0; i < this._notifications.length; i++) {
            var container = this._notifications[i];
            this._remove(container);
            i--;
        }
        this._notifications = [];
    },
    _add: function (severity, title, message, options) {
        const { className, icon, timeout, closable, dismissable } = { ...options };
        var container = L.DomUtil.create('div', `leaflet-notification ${severity}`, this._container),
            _closable = typeof closable !== 'undefined' ? closable : this.options.closable,
            _dismissable = typeof dismissable !== 'undefined' ? dismissable : this.options.dismissable,
            closeBtnUtil,
            iconSpanUtil,
            iconUtil,
            contentUtil,
            titleUtil,
            messageUtil;
        if (icon) {
            iconSpanUtil = L.DomUtil.create('div', 'leaflet-notification-icon', container);
            iconUtil = L.DomUtil.create('i', icon, iconSpanUtil);
        }
        contentUtil = L.DomUtil.create('div', 'leaflet-notification-content', container);
        titleUtil = L.DomUtil.create('div', 'leaflet-notification-title', contentUtil);
        messageUtil = L.DomUtil.create('div', 'leaflet-notification-message', contentUtil);
        if (_dismissable) {
            L.DomUtil.addClass(container, 'dismissable');
            L.DomEvent.addListener(container, 'click', L.DomEvent.stop);
            L.DomEvent.addListener(container, 'click', () => this._remove(container));
            L.DomEvent.disableClickPropagation(container);
        }

        if (_closable) {
            var closeBtnUtil = L.DomUtil.create('span', 'leaflet-notification-close-button', container);
            closeBtnUtil.innerHTML = '&times;';
            L.DomEvent.addListener(closeBtnUtil, 'click', L.DomEvent.stop);
            L.DomEvent.addListener(closeBtnUtil, 'click', () => this._remove(container));
            L.DomEvent.disableClickPropagation(closeBtnUtil);
        }

        if (className) {
            L.DomUtil.addClass(container, className);
        }
        if (title) {
            titleUtil.innerHTML = title;
        }
        if (message) {
            messageUtil.innerHTML = message;
        }
        setTimeout(() => {
            container.style.opacity = '1';
        });
        setTimeout(() => {
            this._remove(container);
        }, timeout || this.options.timeout);

        this._notifications.push(container);

        return container;
    },
    _remove: function (container) {
        var index = this._notifications.indexOf(container);
        this._notifications.splice(index, 1);
        container.style.opacity = '0';
        setTimeout(function () {
            L.DomUtil.remove(container);
        }, 300);
    },
});

L.control.notifications = function (options) {
    return new L.Control.Notifications(options);
};
