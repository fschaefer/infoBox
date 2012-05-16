/*
 * jQuery infoBox Plugin.
 * 
 * Copyright (c) 2012 Florian Schäfer (florian.schaefer@gmail.com)
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL Version 2 (GPL_LICENSE.txt) licenses.
 *
 * Version: 1.0
 * 
 */

(function($) {
    $.widget("face.infoBox", {
        
        options: { 
            content: '&nbsp',
            title: '&nbsp;',
            visible: true,
            style: 'medium',
            at: 'top',
            offset: false,
            collision: 'none none',
            zIndex: '2000000',
            cursor: 'help',
            click: $.noop
        },

        _create: function () {
            this.element.css({
                cursor: this.options.cursor
            });

            this.infoBox = $('<div></div>', {
                'class': 'infobox'
            })
            .appendTo(document.body);

            this.infoBoxTitle = $('<div></div>', {
                'class': 'infobox-title'
            })
            .appendTo(this.infoBox);

            this.infoBoxContent = $('<div></div>', {
                'class': 'infobox-content'
            })
            .appendTo(this.infoBox);
        },

        _init: function () {
            this.infoBox.removeClass('infobox-top-tiny infobox-top-medium infobox-top-big infobox-bottom-tiny infobox-bottom-medium infobox-bottom-big');

            if (this.options.at.indexOf('top') > -1) {
                this.infoBox.addClass('infobox-top-' + this.options.style);
            } else {
                this.infoBox.addClass('infobox-bottom-' + this.options.style);
            }

            this.infoBoxTitle.html($.isFunction(this.options.title) ? this.options.title() : this.options.title);
            this.infoBoxContent.html($.isFunction(this.options.content) ? this.options.content() : this.options.content);

            if (this.options.visible) {
                this._show();
                this._doPositioning();
            } else {
                this._hide(); 
            }

            this.infoBox.off().on('click', this.options.click);
        },

        _show: function () {
            var self = this;
            this.infoBox.show();
            this.options.visible = true;
            this.overlay = $('<div></div>', {
                'css': {
                    'left': 0,
                    'top': 0,
                    'width': '100%',
                    'height': '100%',
                    'position': 'absolute',
                    'zIndex': 10000000000
                }
            })
            .appendTo(document.body)
            .bind('click', function () {
                self._hide();
                return false;
            });
        },
        
        _hide: function () {
            this.infoBox.hide();
            this.options.visible = false;
            if (this.overlay) {
                this.overlay.remove();
            }
        },

        _doPositioning: function () {
            this.infoBox
            .position({
                my: this.options.at === 'top' ? 'bottom' : 'top',
                at: this.options.at,
                of: this.element,
                offset: this.options.offset,
                collision: this.options.collision
            })
            .css({
                'zIndex': this.options.zIndex
            })
        },

        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
        },

        show: function () {
            this._show();
            this._doPositioning();
        },
        
        hide: function () {
            this._hide();
        },

        toggle: function () {
            if (this.options.visible) {
                this._hide();
            } else {
                this._show();
                this._doPositioning();
            }
        },

        isVisible: function () {
            return this.options.visible;
        },
        
        title: function (newTitle) {
            this.infoBoxTitle.html(this.options.title = newTitle);
        },

        content: function (newContent) {
            this.infoBoxContent.html(this.options.content = newContent);
        },

        destroy: function() {
            
            this.infoBox.remove();

            $.Widget.prototype.destroy.call(this);
        }
    });
})(jQuery);
