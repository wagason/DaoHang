var Tab = function(elem, options) {
    var t_selector = this.t_selector = options.t_selector || null,
        c_selector = this.c_selector = options.c_selector || null;

    this.$container = elem ? $(elem) : null;
    this.$tab_wrapper = this._$(t_selector);
    this.$tab_item = this._$(c_selector);
    if (0 != this.$tab_item.length) {
        this.current = options.current || 0;
        this.timeout = options.timeout || 0;
        this.cur_style = options.cur_style || "cur";
        this.events = (options.events || "click").replace("mouseover", "mouseenter");
        this.onbefore = options.onbefore;
        this.onafter = options.onafter;
        this.oninit = options.oninit;
        this.len = this.$tab_wrapper.length;
        this.lock = 0;
        this.init();
    }
};
Tab.prototype = {
    constructor: Tab,
    _$: function(selector) {
        return this.$container ? this.$container.find(selector) : $(selector);
    },
    go: function(index) {
        var self = this;
        if (index != this.current) {
            "undefined" == typeof index && (index = this.current);
            index = index < 0 ? this.len - 1 : index >= this.len ? 0 : index;
            this.onbefore && this.onbefore(index);
            this.timeoutIndex = setTimeout(function() {
                self.current = index;
                self.$tab_wrapper.removeClass(self.cur_style).eq(index).addClass(self.cur_style);
                !self.lock && self.$tab_item.hide().eq(index).show();
                self.onafter && self.onafter();
            }, this.timeout);
        }
    },
    prev: function() { this.go(this.current - 1) },
    next: function() { this.go(this.current + 1) },
    stop: function() { this.timeoutIndex && clearTimeout(this.timeoutIndex) },
    init: function() {
        var self = this;
        if (self.$container) {
            self.$container.on(self.events, self.t_selector, function() {
                self.go($(this).index());
            });
        } else {
            self.$tab_wrapper.on(self.events, function() {
                self.go($(this).index());
            });
        }
        if ("mouseenter" == self.events) {
            self.$container ? self.$container.on("mouseleave", self.t_selector, function() { self.stop() }) :

                self.$tab_wrapper.on("mouseleave", function() { self.stop() })
        }
        self.current && self.go();
        this.oninit && this.oninit();
    }
};
$.fn.tab = function(opts) {
    return this.each(function() { new Tab($(this), opts) })
};
export default Tab;