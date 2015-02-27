Nutritionix Dynamic Menu
========================

Getting up an running with `nix-menu.js` quick and simple:

#### Including the javascript
Add a few `<script>` tags just before the closing body tag of your web page `</body>`. Then replace the `id` parameter in the second include script with your own.
```html
<script type="text/javascript" src="//d2lop6g9xdhvsa.cloudfront.net/lib/nix-menu-0.0.1.js"></script>
<script type="text/javascript">
    'use strict';
    (function(){
        nutritionixMenu({id:'YOUR_LOCATION_ID'});
    })();
</script>
```

#### Display the calories
Add some new elements to your page where you want the calorie information to be displayed 
```html
<div data-nix-item-id='123123'>cal</div>
```

The library will automagically prepend the inner text of each element if calorie information exists for the item id provided in the `data-nix-item-id`
attribute. Feel free to style it however you wish, the only thing our library will control is the visibility of the element itself and anything inside.
It will hide the element to keep your interface clean in the event that data does not exist.

**Change the label** The inner text in this example `cal` is only an example. You can change it to what ever you want or completely remove it.
You can add in as many of these elements as you have items to display calorie information for.

#### Getting up to date information
All the data is served from our cdn on `amazon cloudfront`. When ever new data is published to the amazon cloud we submit invalidation requests to force
the cdn to retrieve the newest version from `s3` on the next request. We also take advantage of caching headers. So, after making changes to your data
be sure to do a hard regresh on the page you are using our snippets on. This will clear your browsers cache and force it to ask the cdn for a new version.
The caching headers are set to expire every 24 hours so your customers will automatically receieve the newest version after 24 hours each time they visit the page.

#### FDA Rounding
Our library support USDA rounding rules. All you need to do to enable it is supply an additional parameter when the library is initialized.
```js
nutritionixMenu({
    id:'YOUR_LOCATION_ID',
    round: true
});
```