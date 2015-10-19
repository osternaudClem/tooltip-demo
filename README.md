## Demo
[View the demo](http://demo.clementosternaud.com/tooltip/)

##How it work

To add tooltip, add `.tooltip` on the element and call tooltip() function.

``` html
<a href="#" class="tootlip">My link</a>
```

``` javascript
var tooltipDom = document.getElementById('exemple-content').getElementsByClassName('tooltip');
tooltip = new Tooltip(tooltipDom);
```

###Some otpions
You can configure if you want enable **responsive** and the default **tooltip position**.
``` javascript
tooltip = new Tooltip({
  'responsive': true, // True / False
  'position': 'top' // Top / Left / Bottom / Right
});
```

By default, the position is set to **bottom**.

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

###Add max with
You add a ```max-width``` attribute for the tooltip render.
``` html
<a href="#" class="tootlip" data-tp-width="300">My link</a>
```

##Methodes
###Remove tooltip
To remove tooltip, just call the ```removeAll()``` function.
``` javascript
tooltip.removeAll();
```

##To-Do
- Load HTML templates
