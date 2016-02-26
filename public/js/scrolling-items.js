(function() {
  'use strict';

  var support = { animations : Modernizr.cssanimations },
  animEndEventNames = {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
  },

  animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
  dabbleCont = document.getElementById( 'dabbleCont' ),
  dabbleItems = dabbleCont.querySelector( 'ul.itemwrap' ).children,
  dabbleCurrent = 0,
  dabbleCount = dabbleItems.length,
  did,
  dabbleDelay = 1500,
  contentCurrent = 0;



  function init() {
    // set starting timeouts
    did = setTimeout(dabbleTimer, dabbleDelay);
  }

  function dabbleTimer() {
    //console.log('dabble check');
    clearTimeout(did);
    if (contentCurrent === 0) {
      scroll('dabble');
    }
  }

  // little bit repetitive but each scrolling box needs its own
  // onEndAnimation in its own scope
  function scroll(line) {
    if (line === 'dabble') {
      var currentItem = dabbleItems[ dabbleCurrent ];

      // always going to next item
      dabbleCurrent = dabbleCurrent < dabbleCount - 1 ? dabbleCurrent + 1 : 0;

      var nextItem = dabbleItems[ dabbleCurrent ];

      classesAdd(currentItem, nextItem);

      var onEndAnimationNextItem = function() {
        this.removeEventListener( animEndEventName, onEndAnimationNextItem );

        classesRemove(currentItem, nextItem);
        did = setTimeout(dabbleTimer, dabbleDelay);
      };

      if (support.animations) {
        nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
      }
      else {
        console.log('no support for animations');
        onEndAnimationNextItem();
      }
    }

  }

  /* classie functions for scrolling boxes */
function classesAdd(current, next) {
  classie.addClass(current, 'move-out');
  classie.addClass(next, 'show-next');
  classie.addClass(next, 'current');
}
function classesRemove(current, next) {
  classie.removeClass(current, 'current');
  classie.removeClass(current, 'move-out');
  classie.removeClass(next, 'show-next');
}


  // currently unused
  function clearAllTimeouts() {
    clearTimeout(did);
  }

  init();
})();
