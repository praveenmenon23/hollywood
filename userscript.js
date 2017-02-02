// ==UserScript==
// @name         unbxd_Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.anntaylor.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // @resource     customCSS http://codepen.io/warcoder/pen/VPXKOo.css
    // @grant        GM_getResourceText
    // @grant        GM_addStyle

    // var newCSS = GM_getResourceText ("customCSS");
    // GM_addStyle (newCSS);


    jQuery('div[data-component="ProductListing"]').children('ul').html("");

    var query = jQuery('main h1 span').text().replace(new RegExp('"', 'g'), '');

    var skeleton_template = [
        '<li class="product row-1 column-1 img-loaded">',
        '<div class="tooltip-circle">',
        '<div class="tooltiptext">',
            '<span class="productsclicks">Product Clicks : 0</span><br>',
            '<span class="orders">Orders : 0</span><br>',
            '<span class="addToCart">Add to cart : 0</span><br>',
        '</div>',
        '</div>',
        '<div class="product-wrap">',
        '<a href="{{productUrl}}" data-page="1" itemscope="" itemtype="http://schema.org/Product">',
        '<figure>',
        '<img src="{{imageUrl}}" alt="Image of {{title}}">',
        '</figure>',
        '<span class="shop-now" tabindex="0">Quick Shop</span>',
        '<strong itemprop="name">{{title}}</strong>',
        '<div class="promos">',
        '</div>',
        '<span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">',
        '<span class="price">',
        '<span itemprop="price">${{price}}</span>',
        '<meta itemprop="priceCurrency" content="INR">',
        '</span>',
        '</span>',
        '</a>',
        '</div>',
        '</li>'
    ].join("");


    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://search.unbxdapi.com/b3094e45838bdcf3acf786d57e4ddd98/express_com-u1456154309768/search?&q=' + query + "&rows=30&start=0",
        onload: function(response) {
            var data = JSON.parse(response.responseText);
            var productArray = [];
            productArray = data.response.products;
            var templateList = "";
            for (var i = 0; i < productArray.length; i++) {
                var product = productArray[i];
                var template = skeleton_template;
                var html = Mustache.to_html(template, product);
                templateList += html;
            }

            jQuery('div[data-component="ProductListing"]').children('ul').html(templateList);
        }
    });


    // This is for the button events //


    $('body').on('click', ".popout .main_btn", function() {
        $(this).toggleClass("active");
        $(this).closest(".popout").find(".panel").toggleClass("active");
    });

    $(document).click(function() {
        $(".popout .panel").removeClass("active");
        $(".popout .main_btn").removeClass("active");
    });

    $('body').on("click", ".popout .panel", function(event) {
        event.stopPropagation();
    });

    $('body').on("click", ".popout .main_btn", function(event) {
        event.stopPropagation();
    });

    var popup_div = [
        '<div class="popout">',
        '       <div class="main_btn">',
        '           <img alt="" class="logo-mt" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRBhZ_7TSMCABpnMKpvQS3AdbfCj4OxABrC1b8albtvJdaVvUHsbw" style="margin-top:9px;" height="51" style="margin-top:9px;">',
        '       </div>',
        '       <div class="panel">',
        '       <div class="panel-header">',
        '<div class="tabs">',
        '    <div class="tab">',
        '        <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch">',
        '        <label for="tab-1" class="tab-label">UB</label>',
        '        <div class="tab-content">',
        '        <span>Days:</span>',
        '               <div class="range-slider">',
        '                   <input class="range-slider__range" type="range" value="0" min="0" max="100">',
        '                   <span class="range-slider__value">0</span>',
        '               </div>',
        '<button class="clickme">Apply</button>',
        '        </div>',
        '    </div>',
        '    <div class="tab">',
        '        <input type="radio" name="css-tabs" id="tab-2" class="tab-switch">',
        '        <label for="tab-2" class="tab-label">Filters</label>',
        '        <div class="tab-content">',
        '<input type="radio" name="gender" value="men"> Male<br>',
        '<input type="radio" name="gender" value="women"> Female<br>',
        '<input type="radio" name="gender" value="reset"> Reset<br>',
        '        </div>',
        '    </div>',
        '    <div class="tab">',
        '        <input type="radio" name="css-tabs" id="tab-3" class="tab-switch">',
        '        <label for="tab-3" class="tab-label">Geo</label>',
        '        <div class="tab-content">Geo location</div>',
        '    </div>',
        '</div>',
        '       </div>',
        '       <div class="panel-body">',
        '           UNBXD Demo',
        '       </div>',
        '   </div>',
        '</div>'
    ].join("");

    jQuery('body').append(popup_div);

    var daysChange = function(value){

        var liList = jQuery('div[data-component="ProductListing"]').children('ul').children('li');

        for(var i=0; i < liList.length ; i++)
        {
            var singleLi = liList[i];
            jQuery(singleLi).find('[class="addToCart"]').first().html("Add to Cart : " + value);
            jQuery(singleLi).find('[class="orders"]').first().html("Orders : " + value);
            jQuery(singleLi).find('[class="productsclicks"]').first().html("Product Clicks : " + value);
        }
        
    };

    $('body').on("click", "button.btn-default", function(event) {


        jQuery('div[data-component="ProductListing"]').children('ul').html("");

        var query = jQuery('main h1 span').text().replace(new RegExp('"', 'g'), '');

        GM_xmlhttpRequest({
            method: "GET",
            url: 'http://search.unbxdapi.com/b3094e45838bdcf3acf786d57e4ddd98/express_com-u1456154309768/search?&q=' + query + "&rows=30&start=30",
            onload: function(response) {
                var data = JSON.parse(response.responseText);
                var productArray = [];
                productArray = data.response.products;
                var templateList = "";
                for (var i = 0; i < productArray.length; i++) {
                    var product = productArray[i];
                    var template = skeleton_template;
                    var html = Mustache.to_html(template, product);
                    templateList += html;
                }

                jQuery('div[data-component="ProductListing"]').children('ul').html(templateList);
            }
        });
    });

    var rangeSlider = function() {
        var slider = $('.range-slider'),
            range = $('.range-slider__range'),
            value = $('.range-slider__value');

        slider.each(function() {

            value.each(function() {
                var value = $(this).prev().attr('value');
                $(this).html(value);
            });

            range.on('input', function() {
                $(this).next(value).html(this.value);
                daysChange(this.value);
            });
        });
    };

    rangeSlider();


    $('body').on('change', 'input[type=radio][name=gender]', function() {
        if (this.value == 'men') {
            
            genderFacet('&filter=gender_fq:"men"');
        }
        else if (this.value == 'women') {
    
            genderFacet('&filter=gender_fq:"women"');
        }
        else {

            genderFacet('');
        }
    });

    jQuery('head').append('<link rel="stylesheet" type="text/css" href="http://codepen.io/warcoder/pen/VPXKOo.css">');


    var genderFacet = function(genderValue){


        jQuery('div[data-component="ProductListing"]').children('ul').html("");

        var query = jQuery('main h1 span').text().replace(new RegExp('"', 'g'), '');

        GM_xmlhttpRequest({
            method: "GET",
            url: 'http://search.unbxdapi.com/b3094e45838bdcf3acf786d57e4ddd98/express_com-u1456154309768/search?&q=' + query + "&rows=30&start=0"+genderValue,
            onload: function(response) {
                var data = JSON.parse(response.responseText);
                var productArray = [];
                productArray = data.response.products;
                var templateList = "";
                for (var i = 0; i < productArray.length; i++) {
                    var product = productArray[i];
                    var template = skeleton_template;
                    var html = Mustache.to_html(template, product);
                    templateList += html;
                }

                jQuery('div[data-component="ProductListing"]').children('ul').html(templateList);
            }
        });
    };

})();

