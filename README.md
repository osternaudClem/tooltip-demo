## Demo
[View the demo](http://demo.clementosternaud.com/tooltip/)

##How it work

To add tooltip, add `.tooltip` on the element and call tooltip() function.

``` html
<a href="#" class="tootlip">My link</a>
```

``` javascript
var tooltipDom = document.getElementsByClassName('tooltip');
tooltip(tooltipDom);
```


###Add content
To add content on tooltip, add `data-tp-content` attribut.

``` html
<a href="#" class="tootlip" data-tp-content="My content">My link</a>
```

###Call asyncrhone function to return content
To call a function, just add, just add `data-tp-fct` attribut.
```html
<a href="#" class="tootlip" data-tp-fct="getContent('my content')">My link</a>
```

###Choose position
You can place the tooltip on **Top**, **Bottom**, **Left** or **Right** side.
To do that, add `data-tp-position` attribut.

``` html 
<a href="#" class="tootlip" data-tp-position="right">My link</a>
```

By default, the tooltip is placed on the bottom.

###Enable responsive
If the `data-tp-responsive` is true, the tooltip position is redifined if it's not fully visible.
``` html
<a href="#" class="tootlip" data-tp-responsive="true" data-tp-position="right">My link</a>
```

*Check this page in a small size to see en example.*
