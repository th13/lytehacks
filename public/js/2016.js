// Lytehacks Video
// When Changing Video Use Autoplay Embed Only

var video = document.getElementById("video"),
	iframe = document.getElementById("iframe"),
	play = document.getElementById("play"),
	slides = document.querySelectorAll('div.person');

play.addEventListener("click", function(e){
	e.preventDefault();
	iframe.setAttribute("src", "INSERT YOUTUBE VIDEO HERE");
	video.style.display = "block";
});

video.addEventListener("click", function(e){
	e.preventDefault();
	iframe.setAttribute("src", "");
	video.style.display = "none";
});

if(typeof window.orientation == 'undefined'){
	window.addEventListener('scroll',function(){
		processScroll();
	});
	window.addEventListener('resize',function(){
		processScroll();
	});

	processScroll();
}

if(window.devicePixelRatio >= 1.2){
    var images = document.getElementsByTagName('img');
    for(var i=0;i < images.length;i++){
        var attr = images[i].getAttribute('data-2x');
        if(attr){
            images[i].src = attr;
        }
    }
}

function processScroll(){
	var scrt = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
		win_h = window.innerHeight,
		win_w = window.innerWidth,
		d_h = document.getElementsByTagName('body')[0].offsetHeight;

	if(scrt > 20){
		document.getElementById('header').className = 'over';
	} else {
		document.getElementById('header').className = '';
	}

	for(var i=0;i<slides.length;i++){
		var p = slides[i],
			top = scrt + p.getBoundingClientRect().top,
			h = p.clientHeight || p.offsetHeight || p.scrollHeight,
			x = (i % 2)? '-8%' : '8%';
			startY = top,
			stopY = top + h + 50,
			totalY = stopY - startY,
			bio = p.querySelector('div.meta'),
			img = p.querySelector('div.image'),
			links = p.querySelector('div.links'),
			trans = 'translate3d('+x+',0,0)';

		if(win_w < 1200){
			x = '0px';
		}

		if((scrt + win_h) >= startY && (scrt + win_h) <= stopY){
			var percentage = (scrt + win_h - startY) / totalY;

			if(img != undefined){
				var imgTop = -200 * (1 - percentage),
					bioTop = 240 * (1 - percentage),
					bioOpacity = percentage + 0.1,
					pTop = 90 * (1 - percentage),
					pTranslation = 'translate3d('+x+',' + pTop + 'px' + ',0)',
					imgTranslation = 'translate3d(0,' + imgTop + 'px' + ',0)',
					bioTranslation = 'translate3d(0,' + bioTop + 'px' + ',0)';

				p.style.cssText = '-webkit-transform:'+pTranslation+';-moz-transform:'+pTranslation+';transform:'+pTranslation+';';
				img.style.cssText = '-webkit-transform:'+imgTranslation+';-moz-transform:'+imgTranslation+';transform:'+imgTranslation+';';
				bio.style.cssText = '-webkit-transform:'+bioTranslation+';-moz-transform:'+bioTranslation+';transform:'+bioTranslation+';opacity:'+bioOpacity+';';
				links.style.cssText = 'opacity:'+bioOpacity+';';
			} else {
				var pTop = 140 * (1 - percentage),
					pTranslation = 'translate3d(0,' + pTop + 'px' + ',0)';

				p.style.cssText = '-webkit-transform:'+pTranslation+';-moz-transform:'+pTranslation+';transform:'+pTranslation+';';
			}

		} else if(img != undefined){
			img.style.cssText = '-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0);';
			bio.style.cssText = '-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1;';
			links.style.cssText = 'opacity:1;';
		}

		if(scrt >= startY && scrt < stopY && i+4 < slides.length){
			var nTop = 240 * ((scrt - startY) / totalY);
			trans = (img != undefined)? 'translate3d('+x+',' + nTop + 'px,0)' : 'translate3d(0,' + nTop + 'px,0)';
			p.style.cssText = '-webkit-transform:'+trans+';-moz-transform:'+trans+';transform:'+trans+';';
		} else if((scrt + win_h) > stopY && scrt < startY){
			trans = (img != undefined)? 'translate3d('+x+',0,0)' : 'translate3d(0,0,0)';
			p.style.cssText = '-webkit-transform:'+trans+';-moz-transform:'+trans+';transform:'+trans+';';
		}

	}
}

if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
    document.body.className = "ff";
}

document.addEventListener("touchstart", function(){}, true);

// Menu Smooth Scrolling Effect

if (!window['jQuery']) alert('The jQuery library must be included before the smoothscroll.js file.  The plugin will not work propery.');

;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

;(function(b){function g(a,e,d){var h=e.hash.slice(1),f=document.getElementById(h)||document.getElementsByName(h)[0];if(f){a&&a.preventDefault();var c=b(d.target);if(!(d.lock&&c.is(":animated")||d.onBefore&&!1===d.onBefore(a,f,c))){d.stop&&c._scrollable().stop(!0);if(d.hash){var a=f.id==h?"id":"name",g=b("<a> </a>").attr(a,h).css({position:"absolute",top:b(window).scrollTop(),left:b(window).scrollLeft()});f[a]="";b("body").prepend(g);location=e.hash;g.remove();f[a]=h}c.scrollTo(f,d).trigger("notify.serialScroll",
[f])}}}var i=location.href.replace(/#.*/,""),c=b.localScroll=function(a){b("body").localScroll(a)};c.defaults={duration:1E3,axis:"y",event:"click",stop:!0,target:window,reset:!0};c.hash=function(a){if(location.hash){a=b.extend({},c.defaults,a);a.hash=!1;if(a.reset){var e=a.duration;delete a.duration;b(a.target).scrollTo(0,a);a.duration=e}g(0,location,a)}};b.fn.localScroll=function(a){function e(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,"")==i&&(!a.filter||b(this).is(a.filter))}
a=b.extend({},c.defaults,a);return a.lazy?this.bind(a.event,function(d){var c=b([d.target,d.target.parentNode]).filter(e)[0];c&&g(d,c,a)}):this.find("a,area").filter(e).bind(a.event,function(b){g(b,this,a)}).end().end()}})(jQuery);

jQuery(function($){ $.localScroll({filter:'.smoothScroll'}); });

// Function Test Mobile Menu (On Open)
function openMenu() {
	console.log("ran the menu");
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
