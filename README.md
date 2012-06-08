# wallpaper

Wallpaper is a simple jQuery plugin that helps you handling page backgrounds
where you need the image to fill the window area and scale on resize. You can
also change the background image with a fade in/fade out effect.


## Usage

Copy and include the wallpaper.js and the wallpaper.css file. The html must
contain at least one element with id "wallpaper" in order to work. Of course
you can use another name, but remember to update the css file accordingly.

This example code initialize  the #wallpaper element as the current wallpaper.
The speed option refers to the image fade in/out speed:

```javascript
  var wallpaper = $('#wallpaper').wallpaper({speed: 750});
```

For a simple demo please refer to the example directory. After you open the
index.html file in your browser when you resize the window the image will
resize and scale accordingly.

You can also change the wallpaper image using the following code in your
browser console:

```javascript
  wallpaper.change('#img1.jpg');
```

```javascript
  wallpaper.change(src: 'img2.jpg');
```

`change` accepts an image src (image may not be yet loaded in the dom) or a css
selector (in this case image must be already in the dom).


