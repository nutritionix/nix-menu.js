(function(){

    'use strict';

    var userAgent = navigator.userAgent;
    var isOldIE = userAgent.indexOf('MSIE 7') >= 0 ||
                  userAgent.indexOf('MSIE 8') >= 0;

    function roundCalories(cal) {
        cal = +cal;

        if (cal < 5) {
            return 0;
        }

        if (cal <= 50) {
            return 5 * Math.round(cal/5);
        }

        if (cal > 50) {
            return 10 * Math.round(cal/10);
        }
    }
    // function forEach(query, callback) {
    //     var list = document.querySelectorAll(query);
    //     for (var i = list.length - 1; i >= 0; i--) {
    //         callback(list[i], i);
    //     }
    // }
    function nutritionixMenu(opts){

        opts.round = opts.round !== void 0 ? opts.round
                                           : true;

        var list = document.querySelectorAll('[data-nix-item-id]');

        // hide elements
        for (var x = list.length - 1; x >= 0; x--) {
            list[x].style.display = 'none';
        }
        var s3Url = 'nutritionix-enterprise.s3.amazonaws.com';
        var cfUrl = 'd2lop6g9xdhvsa.cloudfront.net';
        var cdnUrl = opts.dev ? s3Url : cfUrl;
        var endpoint = '//'+cdnUrl+'/'+opts.id+'.json';

        function Menu(items) {
            this.findItemById = function findItemById(id){
                for (var i = items.length - 1; i >= 0; i--) {
                    var item = items[i];
                    if (item.id === id) {
                        return item;
                    }
                }
            };
        }

        var getMenuData = new XMLHttpRequest();
        getMenuData.open('GET', endpoint);


        getMenuData.onreadystatechange = function handleResp() {

            if (getMenuData.readyState !== 4) {
                return;
            }

            if (getMenuData.status !== 200) {
                console.log(getMenuData);
                console.error('There was a problem downloading menu data.');
                console.error('Please contact enterprise@nutritionix.com');
                return;
            }

            var menu = new Menu(JSON.parse(getMenuData.responseText));

            for (var i = list.length - 1; i >= 0; i--) {
                var elm = list[i];
                var textAttr = isOldIE ? 'innerText' : 'textContent';
                var text = elm[textAttr];
                var attr = 'data-nix-item-id';
                var weightAttr = 'data-nix-item-grams';
                var item = menu.findItemById(elm.getAttribute(attr));
                var newWeight = elm.getAttribute(weightAttr);
                var oldWeight = item ? item.serving_weight : void 0;



                if (item) {
                    var calories = item.calories;

                    if (newWeight && oldWeight) {
                        calories = (newWeight/oldWeight)*calories;
                    }

                    if (opts.round) {
                        calories = roundCalories(calories);
                    }

                    var postFix = (text.length ? ' '+text
                                               : text);

                    if (opts.toFixed >= 0) {
                        calories = calories.toFixed(opts.toFixed);
                    }

                    elm[textAttr] =  calories + postFix;

                    elm.style.display = 'inline-block';
                }
            }
        };

        getMenuData.send();

    }

    window.nutritionixMenu = nutritionixMenu;

})();