  (function($) {
      $.fn.wallpaper = function(opts) {
        img    = this;
        win    = $(window);
        body   = $('body');
        speed  = opts.speed || 250;

        loadImage = function() {
          img.load(function() {
            resize();
            img.fadeIn(speed);
            $(window).bind('resize.wallpaper', resizeHandler.bind(img));
          });
          if (img.css('display') === 'none') {
            img.fadeIn(speed);
          }
        };

        resize = function() {
          winWidth  = win.width();
          winHeight = win.height();
          imageAspectRatio  = img.width() / img.height();
          windowAspectRatio = winWidth / winHeight;
          if (windowAspectRatio < imageAspectRatio) {
            css = {width: 'auto', height: winHeight};
          } else {
            css = {width: winWidth, height: 'auto'};
          }
          body.css(css);
          img.css(css);
        };

        resizeHandler = function() {
          resize();
        };

        loadImage();

        this.change = function(url) {
          img.fadeOut(speed, function() {
            img.attr('src', url);
            loadImage();
          });
        }

        return this;
      };
    })(jQuery);
