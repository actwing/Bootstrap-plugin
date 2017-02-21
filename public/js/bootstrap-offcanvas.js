$(function() {

  var Offcanvas = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$content            = this.$element.find('.offcanvas-content')
    this.isOpen              = null
/*
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
*/
  }

  Offcanvas.DEFAULTS = {
    backdrop: false,
    keyboard: true,
    show: true,
    mode: "smash",
  }

  Offcanvas.prototype = {
    open: function() {
      var that = this;
      var transition = $.support.transition;

      this.isOpen = true;

      if (this.options.mode == "push") {
        if (this.$element.hasClass('offcanvas-flip')) {
          this.$body.addClass('offcanvas-flip-open');
          this.$body.width(this.$body.width() + 270 );
          this.$body.animate({scrollLeft:270},{duration: 300});
          this.$body.one($.support.transition.end, function(e){
            var d = that.$body.attr('style');
          });
        } else {
          this.$body.width(this.$body.width());
          this.$body.addClass('offcanvas-open');
        }
      } else if (this.options.mode == "smash") {
        if (this.$element.hasClass('offcanvas-flip')) {
          this.$body.addClass('offcanvas-flip-open');
        } else {
          this.$body.addClass('offcanvas-open');
        }
      } else if (this.options.mode == "slide") {
      }

      this.$element.addClass('active');

      if (this.options.backdrop) {
        this.enforceFocus();

        this.$element.trigger('focus');
      }
    },
    close: function() {
      var that = this;

      this.isOpen = false;

      if (this.$element.hasClass('offcanvas-flip')) {
        this.$body.removeClass('offcanvas-flip-open');
      } else {
        this.$body.removeClass('offcanvas-open');
      }
      this.$element.removeClass('active');
      this.$body.animate({scrollLeft:0},{duration: 300});

      this.$element.one($.support.transition.end, function(e){
          that.$body.width('');
      });
    },
    enforceFocus: function () {
      $(document)
        .off('focusin.bs.offcanvas') // guard against infinite focus loop
        .on('focusin.bs.offcanvas', $.proxy(function (e) {
          if (document !== e.target &&
              this.$element[0] !== e.target &&
              !this.$element.has(e.target).length) {
            this.$element.trigger('focus')
          }
        }, this))
    }
  }

  // OFFCANVAS PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.offcanvas')
      var options = $.extend({}, Offcanvas.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.offcanvas', (data = new Offcanvas(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.open) data.open(_relatedTarget)
    })
  }

  var old = $.fn.offcanvas

  $.fn.offcanvas             = Plugin
  $.fn.offcanvas.Constructor = Offcanvas


  // OFFCANVAS NO CONFLICT
  // =================

  $.fn.offcanvas.noConflict = function () {
    $.fn.offcanvas = old
    return this
  }
  
  $(document).on('click', '#test2', function(){
    $('#o1').offcanvas('open');
  });
  $(document).on('click', '#o1', function(){
    $('#o1').offcanvas('close');
  });
  $(document).on('click', '#test3', function(){
    $('#o2').offcanvas('open');
  });
  $(document).on('click', '#o2', function(){
    $('#o2').offcanvas('close');
  });
  

});
