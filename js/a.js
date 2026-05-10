//--------------------------------------------------------
// Theia Sticky Sidebar | v1.7.0
//--------------------------------------------------------
(function($){$.fn.theiaStickySidebar=function(options){var defaults={'containerSelector':'','additionalMarginTop':0,'additionalMarginBottom':0,'updateSidebarHeight':true,'minWidth':0,'disableOnResponsiveLayouts':true,'sidebarBehavior':'modern','defaultPosition':'relative','namespace':'TSS'};options=$.extend(defaults,options);options.additionalMarginTop=parseInt(options.additionalMarginTop)||0;options.additionalMarginBottom=parseInt(options.additionalMarginBottom)||0;tryInitOrHookIntoEvents(options,this);function tryInitOrHookIntoEvents(options,$that){var success=tryInit(options,$that);if(!success){console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');$(document).on('scroll.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that));$(window).on('resize.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that))}}function tryInit(options,$that){if(options.initialized===true){return true}if($('body').width()<options.minWidth){return false}init(options,$that);return true}function init(options,$that){options.initialized=true;var existingStylesheet=$('#theia-sticky-sidebar-stylesheet-'+options.namespace);if(existingStylesheet.length===0){$('head').append($('<style id="theia-sticky-sidebar-stylesheet-'+options.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'))}$that.each(function(){var o={};o.sidebar=$(this);o.options=options||{};o.container=$(o.options.containerSelector);if(o.container.length==0){o.container=o.sidebar.parent()}o.sidebar.parents().css('-webkit-transform','none');o.sidebar.css({'position':o.options.defaultPosition,'overflow':'visible','-webkit-box-sizing':'border-box','-moz-box-sizing':'border-box','box-sizing':'border-box'});o.stickySidebar=o.sidebar.find('.theiaStickySidebar');if(o.stickySidebar.length==0){var javaScriptMIMETypes=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;o.sidebar.find('script').filter(function(index,script){return script.type.length===0||script.type.match(javaScriptMIMETypes)}).remove();o.stickySidebar=$('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());o.sidebar.append(o.stickySidebar)}o.marginBottom=parseInt(o.sidebar.css('margin-bottom'));o.paddingTop=parseInt(o.sidebar.css('padding-top'));o.paddingBottom=parseInt(o.sidebar.css('padding-bottom'));var collapsedTopHeight=o.stickySidebar.offset().top;var collapsedBottomHeight=o.stickySidebar.outerHeight();o.stickySidebar.css('padding-top',1);o.stickySidebar.css('padding-bottom',1);collapsedTopHeight-=o.stickySidebar.offset().top;collapsedBottomHeight=o.stickySidebar.outerHeight()-collapsedBottomHeight-collapsedTopHeight;if(collapsedTopHeight==0){o.stickySidebar.css('padding-top',0);o.stickySidebarPaddingTop=0}else{o.stickySidebarPaddingTop=1}if(collapsedBottomHeight==0){o.stickySidebar.css('padding-bottom',0);o.stickySidebarPaddingBottom=0}else{o.stickySidebarPaddingBottom=1}o.previousScrollTop=null;o.fixedScrollTop=0;resetSidebar();o.onScroll=function(o){if(!o.stickySidebar.is(":visible")){return}if($('body').width()<o.options.minWidth){resetSidebar();return}if(o.options.disableOnResponsiveLayouts){var sidebarWidth=o.sidebar.outerWidth(o.sidebar.css('float')=='none');if(sidebarWidth+50>o.container.width()){resetSidebar();return}}var scrollTop=$(document).scrollTop();var position='static';if(scrollTop>=o.sidebar.offset().top+(o.paddingTop-o.options.additionalMarginTop)){var offsetTop=o.paddingTop+options.additionalMarginTop;var offsetBottom=o.paddingBottom+o.marginBottom+options.additionalMarginBottom;var containerTop=o.sidebar.offset().top;var containerBottom=o.sidebar.offset().top+getClearedHeight(o.container);var windowOffsetTop=0+options.additionalMarginTop;var windowOffsetBottom;var sidebarSmallerThanWindow=(o.stickySidebar.outerHeight()+offsetTop+offsetBottom)<$(window).height();if(sidebarSmallerThanWindow){windowOffsetBottom=windowOffsetTop+o.stickySidebar.outerHeight()}else{windowOffsetBottom=$(window).height()-o.marginBottom-o.paddingBottom-options.additionalMarginBottom}var staticLimitTop=containerTop-scrollTop+o.paddingTop;var staticLimitBottom=containerBottom-scrollTop-o.paddingBottom-o.marginBottom;var top=o.stickySidebar.offset().top-scrollTop;var scrollTopDiff=o.previousScrollTop-scrollTop;if(o.stickySidebar.css('position')=='fixed'){if(o.options.sidebarBehavior=='modern'){top+=scrollTopDiff}}if(o.options.sidebarBehavior=='stick-to-top'){top=options.additionalMarginTop}if(o.options.sidebarBehavior=='stick-to-bottom'){top=windowOffsetBottom-o.stickySidebar.outerHeight()}if(scrollTopDiff>0){top=Math.min(top,windowOffsetTop)}else{top=Math.max(top,windowOffsetBottom-o.stickySidebar.outerHeight())}top=Math.max(top,staticLimitTop);top=Math.min(top,staticLimitBottom-o.stickySidebar.outerHeight());var sidebarSameHeightAsContainer=o.container.height()==o.stickySidebar.outerHeight();if(!sidebarSameHeightAsContainer&&top==windowOffsetTop){position='fixed'}else if(!sidebarSameHeightAsContainer&&top==windowOffsetBottom-o.stickySidebar.outerHeight()){position='fixed'}else if(scrollTop+top-o.sidebar.offset().top-o.paddingTop<=options.additionalMarginTop){position='static'}else{position='absolute'}}if(position=='fixed'){var scrollLeft=$(document).scrollLeft();o.stickySidebar.css({'position':'fixed','width':getWidthForObject(o.stickySidebar)+'px','transform':'translateY('+top+'px)','left':(o.sidebar.offset().left+parseInt(o.sidebar.css('padding-left'))-scrollLeft)+'px','top':'0px'})}else if(position=='absolute'){var css={};if(o.stickySidebar.css('position')!='absolute'){css.position='absolute';css.transform='translateY('+(scrollTop+top-o.sidebar.offset().top-o.stickySidebarPaddingTop-o.stickySidebarPaddingBottom)+'px)';css.top='0px'}css.width=getWidthForObject(o.stickySidebar)+'px';css.left='';o.stickySidebar.css(css)}else if(position=='static'){resetSidebar()}if(position!='static'){if(o.options.updateSidebarHeight==true){o.sidebar.css({'min-height':o.stickySidebar.outerHeight()+o.stickySidebar.offset().top-o.sidebar.offset().top+o.paddingBottom})}}o.previousScrollTop=scrollTop};o.onScroll(o);$(document).on('scroll.'+o.options.namespace,function(o){return function(){o.onScroll(o)}}(o));$(window).on('resize.'+o.options.namespace,function(o){return function(){o.stickySidebar.css({'position':'static'});o.onScroll(o)}}(o));if(typeof ResizeSensor!=='undefined'){new ResizeSensor(o.stickySidebar[0],function(o){return function(){o.onScroll(o)}}(o))}function resetSidebar(){o.fixedScrollTop=0;o.sidebar.css({'min-height':'1px'});o.stickySidebar.css({'position':'static','width':'','transform':'none'})}function getClearedHeight(e){var height=e.height();e.children().each(function(){height=Math.max(height,$(this).height())});return height}})}function getWidthForObject(object){var width;try{width=object[0].getBoundingClientRect().width}catch(err){}if(typeof width==="undefined"){width=object.width()}return width}return this}})(jQuery);
//--------------------------------------------------------
// Jquery TimeAgo Plugin in Bangla Locale
//--------------------------------------------------------
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&"object"==typeof module.exports?t(require("jquery")):t(jQuery)}(function(h){h.timeago=function(t){return t instanceof Date?r(t):r("string"==typeof t?h.timeago.parse(t):"number"==typeof t?new Date(t):h.timeago.datetime(t))};var i=h.timeago;h.extend(h.timeago,{settings:{refreshMillis:6e4,allowPast:!0,allowFuture:!1,localeTitle:!1,cutoff:0,autoDispose:!0,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:" আগে ",suffixFromNow:" এখন থেকে ",inPast:" যেকোনো সময় ",seconds:" এইমাত্র ",minute:" এক মিনিট ",minutes:"%d মিনিট ",hour:" এক ঘন্টা ",hours:" %d ঘন্টা ",day:" এক দিন ",days:"%d দিন ",month:" এক মাস ",months:"%d মাস ",year:" এক বছর ",years:"%d বছর ",wordSeparator:" ",numbers:[]}},inWords:function(n){if(!this.settings.allowPast&&!this.settings.allowFuture)throw"timeago allowPast and allowFuture settings can not both be set to false.";var r=this.settings.strings,t=r.prefixAgo,e=r.suffixAgo;if(this.settings.allowFuture&&n<0&&(t=r.prefixFromNow,e=r.suffixFromNow),!this.settings.allowPast&&0<=n)return this.settings.strings.inPast;var i=Math.abs(n)/1e3,a=i/60,o=a/60,s=o/24,u=s/365;function m(t,e){var i=h.isFunction(t)?t(e,n):t,a=r.numbers&&r.numbers[e]||e;return i.replace(/%d/i,a)}var l=i<45&&m(r.seconds,Math.round(i))||i<90&&m(r.minute,1)||a<45&&m(r.minutes,Math.round(a))||a<90&&m(r.hour,1)||o<24&&m(r.hours,Math.round(o))||o<42&&m(r.day,1)||s<30&&m(r.days,Math.round(s))||s<45&&m(r.month,1)||s<365&&m(r.months,Math.round(s/30))||u<1.5&&m(r.year,1)||m(r.years,Math.round(u)),d=r.wordSeparator||"";return void 0===r.wordSeparator&&(d=" "),h.trim([t,l,e].join(d))},parse:function(t){var e=h.trim(t);return e=(e=(e=(e=(e=e.replace(/\.\d+/,"")).replace(/-/,"/").replace(/-/,"/")).replace(/T/," ").replace(/Z/," UTC")).replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2")).replace(/([\+\-]\d\d)$/," $100"),new Date(e)},datetime:function(t){var e=i.isTime(t)?h(t).attr("datetime"):h(t).attr("title");return i.parse(e)},isTime:function(t){return"time"===h(t).get(0).tagName.toLowerCase()}});var a={init:function(){a.dispose.call(this);var t=h.proxy(n,this);t();var e=i.settings;0<e.refreshMillis&&(this._timeagoInterval=setInterval(t,e.refreshMillis))},update:function(t){var e=t instanceof Date?t:i.parse(t);h(this).data("timeago",{datetime:e}),i.settings.localeTitle&&h(this).attr("title",e.toLocaleString()),n.apply(this)},updateFromDOM:function(){h(this).data("timeago",{datetime:i.parse(i.isTime(this)?h(this).attr("datetime"):h(this).attr("title"))}),n.apply(this)},dispose:function(){this._timeagoInterval&&(window.clearInterval(this._timeagoInterval),this._timeagoInterval=null)}};function n(){var t=i.settings;if(t.autoDispose&&!h.contains(document.documentElement,this))return h(this).timeago("dispose"),this;var e=function(t){if(!(t=h(t)).data("timeago")){t.data("timeago",{datetime:i.datetime(t)});var e=h.trim(t.text());i.settings.localeTitle?t.attr("title",t.data("timeago").datetime.toLocaleString()):!(0<e.length)||i.isTime(t)&&t.attr("title")||t.attr("title",e)}return t.data("timeago")}(this);return isNaN(e.datetime)||(0===t.cutoff||Math.abs(o(e.datetime))<t.cutoff?h(this).text(r(e.datetime)):0<h(this).attr("title").length&&h(this).text(h(this).attr("title"))),this}function r(t){return i.inWords(o(t))}function o(t){return(new Date).getTime()-t.getTime()}h.fn.timeago=function(t,e){var i=t?a[t]:a.init;if(!i)throw new Error("Unknown function name '"+t+"' for timeago");return this.each(function(){i.call(this,e)}),this},document.createElement("abbr"),document.createElement("time")});$(document).ready(function() {$.timeago.settings.strings.numbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];var originalInWords = $.timeago.inWords; $.timeago.inWords = function(n) {var words = originalInWords.call(this, n);words = words.replace(/\d/g, function(match) {return $.timeago.settings.strings.numbers[parseInt(match)];});return words;};$("time.timeago").timeago();});
//--------------------------------------------------------
// Theme menu plugin
//--------------------------------------------------------
!function(a){a.fn.menuify=function(){return this.each(function(){var $t=a(this),b=$t.find('.LinkList ul > li').children('a'),c=b.length;for(var i=0;i<c;i++){var d=b.eq(i),h=d.text();if(h.charAt(0)!=='_'){var e=b.eq(i+1),j=e.text();if(j.charAt(0)==='_'){var m=d.parent();m.append('<ul class="sub-menu m-sub"/>');}}if(h.charAt(0)==='_'){d.text(h.replace('_',''));d.parent().appendTo(m.children('.sub-menu'));}}for(var i=0;i<c;i++){var f=b.eq(i),k=f.text();if(k.charAt(0)!=='_'){var g=b.eq(i+1),l=g.text();if(l.charAt(0)==='_'){var n=f.parent();n.append('<ul class="sub-menu2 m-sub"/>');}}if(k.charAt(0)==='_'){f.text(k.replace('_',''));f.parent().appendTo(n.children('.sub-menu2'));}}$t.find('.LinkList ul li ul').parent('li').addClass('has-sub');});}}(jQuery);
//--------------------------------------------------------
// Sidebar tabs
//--------------------------------------------------------
!function(a){a.fn.tabify=function(b){b=jQuery.extend({onHover:false,animated:true,transition:'fadeInUp'},b);return this.each(function(){var e=a(this),c=e.children('[tab-ify]'),d=0,n='tab-animated',k='tab-active';if(b.onHover==true){var event='mouseenter'}else{var event='click'}e.prepend('<ul class="select-tab"></ul>');c.each(function(){if(b.animated==true){a(this).addClass(n)}e.find('.select-tab').append('<li><a href="javascript:;">'+a(this).attr('tab-ify')+'</a></li>')}).eq(d).addClass(k).addClass('tab-'+b.transition);e.find('.select-tab a').on(event,function(){var f=a(this).parent().index();a(this).closest('.select-tab').find('.active').removeClass('active');a(this).parent().addClass('active');c.removeClass(k).removeClass('tab-'+b.transition).eq(f).addClass(k).addClass('tab-'+b.transition);return false}).eq(d).parent().addClass('active')})}}(jQuery);



//--------------------------------------------------------
// preloaded Thumbs by blogger
//--------------------------------------------------------
(function ($) {
  $.fn.preloD = function () {
    return this.each(function () {
      var t = $(this),
          dImg = t.attr('data-image'),
          iWid = Math.round(t.width()) || 200,
          iHei = Math.round(t.height()) || 200,
          iSiz = 'w' + iWid + '-h' + iHei + '-p-k-no-nu',
          img = '';

      if (dImg.match('/s72-c')) {
        img = dImg.replace('/s72-c', '/' + iSiz);
      } else if (dImg.match('/w72-h')) {
        img = dImg.replace(/\/w\d+-h\d+-p-k-no-nu/,'/' + iSiz);
      } else if (dImg.match('=w72-h')) {
        img = dImg.replace(/=w\d+-h\d+-p-k-no-nu/,'=' + iSiz);
      } else {
        img = dImg;
      }

      function loadImage() {
        var winH = $(window).height(),
            scrT = $(window).scrollTop(),
            elT = t.offset().top;

        if (scrT + winH > elT) {
          // detach listener = prevent repeat firing
          $(window).off('load resize scroll', loadImage);

          var n = new Image();
          n.onload = function(){
            t.css('background-image', 'url(' + this.src + ')')
             .addClass('pre-loD');
          };
          n.src = img;
        }
      }

      $(window).on('load resize scroll', loadImage);
      loadImage(); // initial check
    });
  };
})(jQuery);



//--------------------------------------------------------
// jQuery replaceText by "Cowboy" Ben Alman
//--------------------------------------------------------
(function($){$.fn.replaceText=function(b,a,c){return this.each(function(){var f=this.firstChild,g,e,d=[];if(f){do{if(f.nodeType===3){g=f.nodeValue;e=g.replace(b,a);if(e!==g){if(!c&&/</.test(e)){$(f).before(e);d.push(f)}else{f.nodeValue=e}}}}while(f=f.nextSibling)}d.length&&$(d).remove()})}})(jQuery);
//--------------------------------------------------------
// Custom Cookie Settings
//--------------------------------------------------------
$(function(){let t={set(t,e,o){let i=new Date;i.setTime(i.getTime()+864e5*o),document.cookie=`${t}=${e};expires=${i.toUTCString()};path=/`},get(t){let e=decodeURIComponent(document.cookie).split("; ");for(let o of e)if(o.startsWith(`${t}=`))return o.split("=")[1];return""},delete(t){document.cookie=`${t}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`}},e=$(".tbt_cookiealert"),o=$(".tbt_acceptcookies");t.get("tbt_acceptCookies")||e.addClass("tbt_show"),o.on("click",function(){t.set("tbt_acceptCookies",!0,7),e.removeClass("tbt_show")})});
//-------------------------------
// Text Increase Decrease Plugin
//-------------------------------
$(document).ready((function(){function n(n){const t=window.getComputedStyle(n,null).getPropertyValue("font-size");return parseFloat(t)}function t(t,o,e){for(let c=0;c<t.length;c++){const i=t[c];let l=0;l=e?17:o?n(i)+1:n(i)-1,i.style.fontSize=l.toString()+"px"}}$("#increase-plugin-ac").click((function(){t($(".post-body"),!0,!1)})),$("#normal-plugin-ac").click((function(){t($(".post-body"),!1,!0)})),$("#decrease-plugin-ac").click((function(){t($(".post-body"),!1,!1)}))}));
//--------------------------------------------------------
// Text comments Plugin
//-------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("notification-toggle");
    const box = document.getElementById("notif-dropdown-box"); // আপনার HTML আইডি অনুযায়ী পরিবর্তন
    const commentList = document.getElementById("comment-list-container"); // আপনার HTML আইডি অনুযায়ী পরিবর্তন
    const notifCount = document.getElementById("notif-count");
    const titleCache = new Map();
    const imageCache = new Map();

    function setBoxState(isOpen) {
        if (!box) return;
        box.style.display = isOpen ? "block" : "none";
        box.setAttribute("aria-hidden", isOpen ? "false" : "true");
    }

    toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = box.style.display === "block";
        setBoxState(!isOpen);
        if (!isOpen) loadComments(); // বক্স খুললে রিফ্রেশ হবে
    });

    document.addEventListener("click", function (e) {
        if (box && !toggle.contains(e.target) && !box.contains(e.target)) {
            setBoxState(false);
        }
    });

    async function getPostTitle(postUrl) {
        if (!postUrl) return "পোস্ট";
        const cleanUrl = postUrl.split("#")[0];
        if (titleCache.has(cleanUrl)) return titleCache.get(cleanUrl);
        
        try {
            // Priority hint ব্যবহার করা হয়েছে দ্রুত লোডের জন্য
            const response = await fetch(cleanUrl, { priority: 'low' });
            const htmlText = await response.text();
            const doc = new DOMParser().parseFromString(htmlText, "text/html");
            
            let title = doc.querySelector('meta[property="og:title"]')?.getAttribute("content") || 
                        doc.querySelector('title')?.textContent.split('|')[0].trim() || "পোস্ট";
            
            titleCache.set(cleanUrl, title);
            return title;
        } catch (error) { return "পোস্ট"; }
    }

    async function getPostImage(postUrl) {
        if (!postUrl) return "";
        const cleanUrl = postUrl.split("#")[0];
        if (imageCache.has(cleanUrl)) return imageCache.get(cleanUrl);
        
        try {
            const response = await fetch(cleanUrl, { priority: 'low' });
            const htmlText = await response.text();
            const doc = new DOMParser().parseFromString(htmlText, "text/html");
            const img = doc.querySelector('meta[property="og:image"]')?.getAttribute("content") || 
                        doc.querySelector(".post-body img")?.getAttribute("src") || "";
            imageCache.set(cleanUrl, img);
            return img;
        } catch (error) { return ""; }
    }

    function stripHtml(text) {
        const temp = document.createElement("div");
        temp.innerHTML = text || "";
        return (temp.textContent || temp.innerText || "").trim();
    }

    function escapeHtml(text) {
        return String(text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // রিড মার্ক করার ফাংশন
    function markCommentAsRead(id) {
        const stored = JSON.parse(localStorage.getItem("readComments") || "[]");
        if (!stored.includes(id)) {
            stored.push(id);
            if (stored.length > 50) stored.shift(); // মেমোরি সাশ্রয়
            localStorage.setItem("readComments", JSON.stringify(stored));
        }
    }

    async function loadComments() {
        try {
            const response = await fetch("/feeds/comments/default?alt=json");
            const data = await response.json();
            const entries = data.feed.entry || [];
            const readComments = JSON.parse(localStorage.getItem("readComments") || "[]");

            // পড়া হয়নি এমন কমেন্ট ফিল্টার
            const unread = entries.filter(item => !readComments.includes(item.id.$t));
            notifCount.textContent = unread.length;
            notifCount.style.display = unread.length > 0 ? "inline-block" : "none";

            if (!unread.length) {
                commentList.innerHTML = '<div class="notif-loading">সব পড়া শেষ! নতুন কিছু নেই।</div>';
                return;
            }

            const visibleComments = unread.slice(0, 8);
            commentList.innerHTML = ""; // ক্লিয়ার করা

            visibleComments.forEach(async (item, i) => {
                let link = item.link.find(l => l.rel === "alternate")?.href || "#";
                const commentId = item.id.$t;
                const imgId = `img-idx-${i}`;
                const titleId = `title-idx-${i}`;
                const commentBody = stripHtml(item.summary?.$t || item.content?.$t).substring(0, 55);

                const itemHtml = `
                    <a href="${link}" class="alokito-notif-item" data-id="${commentId}">
                        <div class="notif-thumb" id="${imgId}"><i class="fas fa-spinner fa-spin" style="margin-top:20px;color:#ccc"></i></div>
                        <div class="notif-info">
                            <span class="notif-comment-text"><b>${item.author[0].name.$t}:</b> ${escapeHtml(commentBody)}...</span>
                            <span class="notif-post-title" id="${titleId}">টাইটেল লোড হচ্ছে...</span>
                        </div>
                    </a>`;
                
                commentList.insertAdjacentHTML('beforeend', itemHtml);

                // ব্যাকগ্রাউন্ডে টাইটেল ও ছবি লোড
                getPostTitle(link).then(t => document.getElementById(titleId).innerText = t);
                getPostImage(link).then(img => {
                    const holder = document.getElementById(imgId);
                    if(img) holder.innerHTML = `<img src="${img}" loading="lazy">`;
                    else holder.innerHTML = `<i class="fas fa-image" style="margin-top:20px;color:#eee"></i>`;
                });
            });

            // ক্লিক করলে রিড মার্ক হবে
            setTimeout(() => {
                document.querySelectorAll(".alokito-notif-item").forEach(el => {
                    el.addEventListener("click", function () {
                        markCommentAsRead(this.getAttribute("data-id"));
                    });
                });
            }, 500);

        } catch (error) {
            notifCount.textContent = "0";
            commentList.innerHTML = '<div class="notif-loading">নেটওয়ার্ক এরর!</div>';
        }
    }

    loadComments(); // শুরুতে একবার রান
});




//--------------------------------------------------------
// sticky-nav
//-------------------------------

window.onscroll = function() {
    var nav = document.getElementById("sticky-nav");
    // লোগো সেকশন পার হলে মেনু আটকে যাবে
    if (window.pageYOffset > 200) { 
        nav.classList.add("sticky-now");
    } else {
        nav.classList.remove("sticky-now");
    }
};




//--------------------------------------------------------
// searchBoxPop
//-------------------------------

function toggleSearchBox(event) {
    event.stopPropagation(); // ক্লিক করার সময় ইভেন্ট থামিয়ে রাখা
    var x = document.getElementById("searchBoxPop");
    var icon = document.getElementById("searchIcon");

    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "block";
        icon.classList.replace("fa-magnifying-glass", "fa-xmark"); // ক্লিক করলে ক্রস আইকন হবে
    } else {
        x.style.display = "none";
        icon.classList.replace("fa-xmark", "fa-magnifying-glass"); // আবার ক্লিক করলে সার্চ আইকন হবে
    }
}

// বক্সের বাইরে ক্লিক করলে অটোমেটিক বন্ধ হওয়ার জন্য
document.addEventListener("click", function(event) {
    var x = document.getElementById("searchBoxPop");
    var icon = document.getElementById("searchIcon");
    var searchWrapper = document.querySelector(".nav-search-wrapper");

    if (x.style.display === "block" && !searchWrapper.contains(event.target)) {
        x.style.display = "none";
        icon.classList.replace("fa-xmark", "fa-magnifying-glass");
    }
});



//--------------------------------------------------------
// mvnMask
//-------------------------------

function mvnToggle() {
    var drawer = document.getElementById("mvn-side-drawer");
    var mask = document.getElementById("mvnMask");
    if (drawer.classList.contains("mvn-open")) {
        drawer.classList.remove("mvn-open");
        mask.classList.remove("mvn-visible");
        document.body.style.overflow = "auto";
    } else {
        drawer.classList.add("mvn-open");
        mask.classList.add("mvn-visible");
        document.body.style.overflow = "hidden";
    }
}


//--------------------------------------------------------
// oiblatestnews-news-feed
//-------------------------------
let autoInterval = null;

function getImage(post,size){
let img="";
if(post.media$thumbnail){
img=post.media$thumbnail.url.replace("s72-c",size);
}else{
let content=post.content ? post.content.$t : "";
let match=content.match(/<img[^>]+src="([^">]+)/);
img=match ? match[1] : "";
}
return img;
}

function renderOiblatestnewsNews(json){
const target=document.getElementById("oiblatestnews-news-feed");
const entries=json.feed.entry;
if(!entries){
target.innerHTML="নিউজ পাওয়া যায়নি";
return;
}

let html="";
const isMobile = window.innerWidth <= 768;
const bigPostCount = 4;
const totalPostsNeeded = isMobile ? 6 : 4;
const postsToShow = entries.slice(0, totalPostsNeeded);

html+=`<div class="oiblatestnews-big-post"><div class="oiblatestnews-slider-wrapper">`;
html+=`<div class="oiblatestnews-slider-container"><div class="oiblatestnews-slider-track" id="oiblatestnewsSliderTrack">`;

// স্লাইডার অংশ
for(let i=0;i<bigPostCount;i++){
const f=postsToShow[i];
const title=f.title.$t;
const link=f.link.find(l=>l.rel==="alternate").href;
const img=getImage(f,"w1200");
const date = new Date(f.published.$t).toLocaleDateString("bn-BD", {
year:"numeric", month:"long", day:"numeric"
});
let category = "";
if(f.category && f.category.length > 0){
category = `<span class="oiblatestnews-category-badge">${f.category[0].term}</span>`;
}
html+=`
<div class="oiblatestnews-slide">
<div class="oiblatestnews-img-box">
<a href="${link}"><img src="${img}" width="100%" height="390" loading="eager"></a>
${category}
</div>
<div class="oiblatestnews-title-box">
<h2><a href="${link}">${title}</a></h2>
<div class="oiblatestnews-date">${date}</div>
</div>
</div>`;
}
html+=`</div></div><div class="oiblatestnews-dots">`;
for(let i=0;i<bigPostCount;i++){
html+=`<span class="oiblatestnews-dot" data-index="${i}"></span>`;
}
html+=`</div></div></div><div class="oiblatestnews-side-list">`;

// সাইড লিস্ট অংশ
let sidePosts = isMobile ? (entries.slice(0, 4).concat(entries.slice(4, 6))) : postsToShow;

for(let i=0;i<sidePosts.length;i++){
const item = sidePosts[i];
if(!item) continue;
const title=item.title.$t;
const link=item.link.find(l=>l.rel==="alternate").href;
const img=getImage(item,"w300");
let badgeNumber = i + 1;
html+=`
<a href="${link}" class="oiblatestnews-item">
<div class="oiblatestnews-thumb">
<span class="oiblatestnews-badge">${badgeNumber}</span>
<img src="${img}" width="115" height="80" loading="lazy">
</div>
<div><h4>${title}</h4></div>
</a>`;
}
html+=`</div>`;
target.innerHTML=html;

// স্ক্রিপ্ট অপ্টিমাইজেশন
setTimeout(()=>{
let track = document.getElementById("oiblatestnewsSliderTrack");
let slides = document.querySelectorAll(".oiblatestnews-slide");
let dots = document.querySelectorAll(".oiblatestnews-dot");
let index = 0;
let slideWidth = slides.length > 0 ? slides[0].offsetWidth : 0;

function showSlide(i){
index = i;
track.style.transform = `translateX(-${index * slideWidth}px)`;
dots.forEach((d, idx) => d.classList.toggle("active", idx === index));
}

window.addEventListener("resize", () => {
slideWidth = slides[0].offsetWidth;
showSlide(index);
});

dots.forEach((dot, idx) => dot.onclick = () => showSlide(idx));
autoInterval = setInterval(() => {
index = (index < bigPostCount - 1) ? index + 1 : 0;
showSlide(index);
}, 4000);
showSlide(0);
}, 50); // লোডিং টাইম কমিয়ে ৫০মিলি সেকেন্ড করা হয়েছে
}


//--------------------------------------------------------
// searchBoxPop
//-------------------------------


