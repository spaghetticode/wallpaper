    (function($) {
      $.fn.wallpaper = function(opts) {
        var win   = $(window),
            body  = $('body'),
            wallpaper = this;

        // defining the Wallpaper object which will be returned by this plugin:
        var Wallpaper = {
          uri:     opts.uri,
          element: wallpaper,
          speed:   opts.speed || 500
        };

        Wallpaper.init = function() {
          this.setCssProperties();
          this.buildImgs();
          this.initImg();
          this.initWinResize();
          return this;
        };

        Wallpaper.initWinResize = function () {
          win.bind('resize.wallpaper', Wallpaper.resize);
        };

        Wallpaper.resize = function() {
          var img            = Wallpaper.currentImg,
              winWidth       = win.width();
              winHeight      = win.height();
              imgAspectRatio = img.width() / img.height();
              winAspectRatio = winWidth / winHeight;

          if (winAspectRatio < imgAspectRatio) {
            img.css({width: 'auto', height: winHeight});
          } else {
            img.css({width: winWidth, height: 'auto'});
          }
        };

        Wallpaper.setCssProperties = function() {
          body.css({
            overflow: 'hidden',
            margin:   0,
            padding:  0
          });
          this.element.css({
            display: 'block',
            position: 'relative',
            width:   '100%',
            height:  '100%'
          });
        };

        Wallpaper.buildImgs = function() {
          this.imgs = [];
          this.element.find('img').each(function() {
            Wallpaper.imgs.push($(this));
          });
        };

        Wallpaper.findImage = function(uri) {
          var img;

          $.each(this.imgs, function(){
            if (this.attr('src') === uri) {
              img = this;
            }
          });
          if (!img) {
            img = $(new Image());
            img.attr('src', uri);
            this.imgs.push(img);
            this.preload(img);
          }
          return img;
        };

        Wallpaper.initImg = function() {
          var img;

          if (this.uri) {
            img = this.findImg(this.uri);
          } else {
            img = this.imgs[0];
          }
          this.currentImg = img;
          this.preload(img, function() {
            img.fadeIn(Wallpaper.speed);
          });
        };

        Wallpaper.change = function(args) {
          var img;

          if (args.src) {
            img = this.findImage(args.src);
          } else {
            img = $(args);
          }
          if (img.length) {
            if (this.currentImg !== img) {
              this.currentImg = img;
              img.detach().hide();
              this.element.append(img);
              win.resize();
              img.fadeIn(Wallpaper.speed);
              return true;
            }
          }
        };

        Wallpaper.preload = function(img, callback) {
          var src = img.src;

          img.src = '';
          img.load(function() {
            if (callback) {
              callback.call();
              Wallpaper.resize();
            }
          });
          img.src = src;
        };

        return Wallpaper.init(opts);
      };
    })(jQuery);
