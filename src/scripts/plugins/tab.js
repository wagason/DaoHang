var Tab = function (elem, options) {
  var t_selector = this.t_selector = options.t_selector || null,
      c_selector = this.c_selector = options.c_selector || null;
  this.$container = elem ? $(elem) : null;
  this.$tabs = this._$(t_selector);
  this.$contents = this._$(c_selector);

  if (0 != this.$contents.length) {
    this.current = options.current || 0;
    this.timeout = options.timeout || 200;
    this.cur_style = options.cur_style || 'cur';
    this.oninit = options.oninit;
    this.onbefore = options.onbefore;
    this.onafter = options.onafter;
    this.len = this.$tabs.length;
    this.lock = 0;
    this.events = (options.events || "click").replace("mouseover", "mouseenter");
  }
  this.init();
}

Tab.prototype = {
  constructor: Tab,
  _$: function (selector) {
    return this.$container ? this.$container.find(selector) : $(selector);
  },
  go: function (index) {
    var self = this;
    if (index != this.current) {
      if ("undefined" == typeof index)  index = this.current;
      index = index < 0 ? this.len - 1 : index >= this.len ? 0 : index;
      this.onbefore && this.onbefore(index);
      this.timeoutIndex = setTimeout(function() {
        self.current = index;
        self.$tabs.removeClass(self.cur_style).eq(index).addClass(self.cur_style);
        !self.lock && self.$contents.hide().eq(index).show();
        self.onafter && self.onafter();
      }, this.timeout);
    }
  },
  prev: function () {
    this.go(this.current - 1);
  },
  next: function () {
    this.go(this.current + 1);
  },
  stop: function () {
    this.timeoutIndex && clearTimeout(this.timeoutIndex);
  },
  init: function () {
    var self = this;
    if (this.$container) {
      this.$container.on(this.events, this.t_selector, function () {
        self.go($(this).index());
      });
    } else {
      this.$tabs.on(this.events, function () {
        self.go($(this).index());
      });
    }

    if (this.events === "mouseenter") {
      if (this.$container) {
        this.$container.on('mouseleave', this.t_selector, function () {
          self.stop();
        });
      } else {
        this.$tabs.on('mouseleave', function () {
          self.stop();
        })
      }
    }

    this.current && this.go();
    this.oninit && this.oninit();
  }
};

$.fn.tab = function (options) {
  return this.each(function () {
    new Tab($(this), options);
  });
};

export default Tab;