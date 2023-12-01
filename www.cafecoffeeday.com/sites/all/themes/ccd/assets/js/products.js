function animateAction() {
    function e() {
        var e = a.height(),
            r = a.scrollTop(),
            o = r + e;
        jQuery.each(t, function() {
            var e = jQuery(this),
                t = e.outerHeight(),
                a = e.offset().top,
                s = a + t;
            s >= r && o >= a && winW > 1025 && e.addClass("fadeInUp delay")
        })
    }
    var t = jQuery(".animated"),
        a = jQuery(window);
    a.on("scroll resize", e), a.trigger("scroll")
}

function runajax() {
    $.ajax({
        type: "POST",
        url: productAjaxUrl,
        data: {
            next_page: 1,
            productCategory: productCategory,
            productSubCategory: productSubCategory
        },
        dataType: "json",
        success: function(e) {
            productsNormalHtmlBlocks(e), e.next_page && "" != e.next_page && $(".show-more").attr("data-id", page), animateAction()
        }
    })
}

function loadMore() {
    isLoading = !0, $.ajax({
        type: "POST",
        url: productAjaxUrl,
        data: {
            next_page: page,
            productCategory: productCategory,
            is_load_more: 1,
            productSubCategory: productSubCategory
        },
        success: function(e) {
            var t = "";
            e.products && e.products.length && ($.each(e.products, function(e, a) {
                var r = "";
                13500 == productCategory && (r = "ga('send', 'event', 'CCD - Home Delivery', 'Click', '" + a.product_title + " Viewed');"), prodBgColor = a.bgColor ? a.bgColor : "", t += '<div class="col-md-3 col-sm-4 col-xs-6 col-no-space"><div class="cafe-each-selected animated"><div class="img-box"><a href="' + a.product_url + '" onclick="' + r + '">', t += '<img src="' + a.product_mobile_image + '" class="img-responsive" title="CCD - ' + a.product_title + '"  alt="CCD - ' + a.product_title + '" style="background-color:' + prodBgColor + ';" >', 1 == a.isNew && (t += "<span>NEW</span>"), t += '</a></div><div class="desc-box"><h4>' + a.product_title + "</h4>", t += "</div></div></div>"
            }), $(".productList").append(t).fadeIn("slow"), isLoading = !1), page >= total_page ? $(".show-more").css("display", "none") : $(".show-more").attr("data-current-id", page), animateAction()
        }
    })
}

function productsNormalHtmlBlocks(e) {
    var t = "";
    $(".productList").empty(), e.products && e.products.length ? ($.each(e.products, function(e, a) {
        var r = "";
        13500 == productCategory && (r = "ga('send', 'event', 'CCD - Home Delivery', 'Click', '" + a.product_title + " Viewed');"), prodBgColor = a.bgColor ? a.bgColor : "", t += '<div class="col-md-3 col-sm-4 col-xs-6 col-no-space"><div class="cafe-each-selected animated"><div class="img-box"><a href="' + a.product_url + '" onclick="' + r + '" >', t += '<img src="' + a.product_mobile_image + '" class="img-responsive" title="CCD - ' + a.product_title + '" alt="CCD - ' + a.product_title + '" style="background-color:' + prodBgColor + ';">', 1 == a.isNew && (t += "<span>NEW</span>"), t += '</a></div><div class="desc-box"><h4>' + a.product_title + "</h4>", t += "</div></div></div>"
    }), $(".productList").html(t)) : ($(".productList").html("<h4 align='center'>Products not found</h4>"), $(".show-more").css("display", "none")), $(".show-more").attr("data-total", e.total_pages), $(".show-more").attr("data-current-id", 1), e.total_pages > 1 ? $(".show-more").css("display", "inline-block") : $(".show-more").css("display", "none")
}
var winW = jQuery(window).width(),
    productCategory = [],
    productSubCategory = [],
    isLoading = !1,
    page = 2,
    total_page, productAjaxUrl = site_url + "ajax/products";
$(document).on("click", ".show-more", function(e) {
    e.preventDefault(), page = parseInt($(this).attr("data-current-id")) + 1, total_page = parseInt($(this).attr("data-total")), isLoading || loadMore()
}), $(document).on("click", ".refine-search-wrapper .refine-content .refine-items .each-refine", function(e) {
    e.preventDefault(), $(this).toggleClass("active-refine"), $(".productList").removeClass("allergens-imgs");
    var t = ($(this).attr("data-filter"), $(this).attr("data-termid")),
        a = jQuery.inArray(t, productSubCategory),
        r = t + "ChildSubCat";
    if (-1 !== a)
        if (13500 == productCategory && $(this).hasClass("HomeDeliveryfilter")) {
            productSubCategory = [];
            var o = t + "ChildSubCat a";
            $("." + o).removeClass("active-refine"), $("." + r).css("display", "none"), $(".refineBySubCat").css("display", "none")
        } else productSubCategory.splice(a, 1);
    else 13500 == productCategory && $(this).hasClass("HomeDeliveryfilter") ? (productSubCategory = [t], $(".HomeDeliveryfilter,.HomeDeliveryChildSubCat a").removeClass("active-refine"), $(this).toggleClass("active-refine"), $(".HomeDeliveryChildSubCat").css("display", "none"), $("." + r).css("display", "inline-block"), $(".refineBySubCat").css("display", "block")) : productSubCategory.push(t);
    runajax()
});