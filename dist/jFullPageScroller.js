/* jFullPageScroller v1.3 by Kevin Karl Leaño */
(function($) {
  // Initialize the jFullPageScroller.
  $.jFullPageScroller = function(jfpsOptions, jfpsCallbackActions) {
    // Check if jFullPageScroller is incorrectly configured in assigning the required attributes.
    if (!$('html[jfps]').length || !$('[jfps-section-container]').length || !$('[jfps-section]').length || !$('[jfps-section-container]>[jfps-section]').length) {
      console.info('%cjFullPageScroller is incorrectly configured!', 'color: red; font-size: 30pt;');
      console.info("%cPossible misconfiguration in assigning the following attributes: 'jfps', 'jfps-section-container' or 'jfps-section'.", 'font-size: 13pt;');
      console.info('%cCheck the documentation at https://github.com/kevinkarl22/jFullPageScroller for more info.', 'font-size: 11pt;');
      return;
    }

    // Check if jFullPageScroller is incorrectly configured in assigning the options.
    if (typeof jfpsOptions != 'object') {
      console.info('%cjFullPageScroller is incorrectly configured!', 'color: red; font-size: 30pt;');
      console.info("%cPossible misconfiguration in assigning the options. Options must be an object.", 'font-size: 13pt;');
      console.info('%cCheck the documentation at https://github.com/kevinkarl22/jFullPageScroller for more info.', 'font-size: 11pt;');
      return;
    } else {
      for (var jfpsOption in jfpsOptions) {
        if ($.inArray(jfpsOption, ['animationDelay', 'animationSpeed', 'enableKeyPressScroll', 'withNavigation']) == -1) {
          console.info('%cjFullPageScroller is incorrectly configured!', 'color: red; font-size: 30pt;');
          console.info("%cPossible misconfiguration in assigning the following options: 'animationDelay', 'animationSpeed', 'enableKeyPressScroll' or 'withNavigation'.", 'font-size: 13pt;');
          console.info('%cCheck the documentation at https://github.com/kevinkarl22/jFullPageScroller for more info.', 'font-size: 11pt;');
          return;
          break;
        }
      }
    }

    // Check if jFullPageScroller is incorrectly configured in assigning the callback actions.
    if (jfpsCallbackActions != undefined && typeof jfpsCallbackActions != 'object') {
      console.info('%cjFullPageScroller is incorrectly configured!', 'color: red; font-size: 30pt;');
      console.info("%cPossible misconfiguration in assigning the callback actions. Callback actions must be an object.", 'font-size: 13pt;');
      console.info('%cCheck the documentation at https://github.com/kevinkarl22/jFullPageScroller for more info.', 'font-size: 11pt;');
      return;
    } else {
      for (var jfpsCallbackAction in jfpsCallbackActions) {
        for (var jfpsCallbackActionsOption in jfpsCallbackActions[jfpsCallbackAction]) {
          if ($.inArray(jfpsCallbackActionsOption, ['easing', 'queue', 'specialEasing', 'step', 'progress', 'complete', 'start', 'done', 'fail', 'always']) == -1) {
            console.info('%cjFullPageScroller is incorrectly configured!', 'color: red; font-size: 30pt;');
            console.info("%cPossible misconfiguration in assigning the following options: 'easing', 'queue', 'specialEasing', 'step', 'progress', 'complete', 'start', 'done', 'fail', 'always'.", 'font-size: 13pt;');
            console.info('%cCheck the documentation at https://github.com/kevinkarl22/jFullPageScroller for more info.', 'font-size: 11pt;');
            return;
            break;
          }
        }
      }
    }

    // Set the default settings and override it if the user provides options.
    var jfpsSettings = $.extend({
      animationDelay: 0,
      animationSpeed: 1000,
      enableKeyPressScroll: true,
      withNavigation: true,
    }, jfpsOptions);
    // Get the jFullPageScroller direction, if none provided, then it will use the default value instead.
    var jfpsDirection = $('html[jfps-direction]');

    if (!jfpsDirection.length || $.inArray(jfpsDirection = jfpsDirection.attr('jfps-direction'), ['vertical', 'horizontal']) == -1) {
      jfpsDirection = 'vertical';
    }

    // Set jFullPageScroller page variables.
    var jfpsPages = [];
    var jfpsCurrentPage;
    var jfpsCurrentPageIndex;
    // Get the current window.
    var jfpsWindow = $(window);
    // Get the current body, then check if jFullPageScroller is incorrectly configured by checking if the <body> tag is missing.
    var jfpsBody = $('body');

    if (!jfpsBody.length) {
      console.info('%cjFullPageScroller is incorrectly configured!', 'color: red; font-size: 30pt;');
      console.info("%cThe <body> tag is missing.", 'font-size: 13pt;');
      console.info('%cCheck the documentation at https://github.com/kevinkarl22/jFullPageScroller for more info.', 'font-size: 11pt;');
      return;
    }
    // Get the jFullPageScroller sections, then check if jFullPageScroller is incorrectly configured by checking if the sections are missing.
    var jfpsSections = $('[jfps-section-container]>[jfps-section]');

    if (!jfpsSections.length) {
      console.info('%cjFullPageScroller is incorrectly configured!', 'color: red; font-size: 30pt;');
      console.info("%cSections are missing.", 'font-size: 13pt;');
      console.info('%cCheck the documentation at https://github.com/kevinkarl22/jFullPageScroller for more info.', 'font-size: 11pt;');
      return;
    }
    // Set jFullPageScroller mobile variables.
    var jfpsTouchSwipeXValue;
    var jfpsTouchSwipeYValue
    var jfpsTouchSwipeThreshold = 50;
    var jfpsTouchSwipeLimit = 50;

    if (jfpsSettings.withNavigation == true) {
      // Get the jFullPageScroller html navigation menu, then check if jFullPageScroller is incorrectly configured by checking if the html navigation menu is missing when the withNavigation option is enabled.
      var jfpsNavigation = $('[jfps-nav]');

      if (!jfpsNavigation.length) {
        console.info('%cjFullPageScroller is incorrectly configured!', 'color: red; font-size: 30pt;');
        console.info("%cwithNavigation option is enabled but html navigation menu is missing.", 'font-size: 13pt;');
        console.info('%cCheck the documentation at https://github.com/kevinkarl22/jFullPageScroller for more info.', 'font-size: 11pt;');
        return;
      }
    }

    function setActiveNavigation(jfpsNavigationCallbackAction) {
      jfpsNavigation.each(function() {
        $(this).removeClass('active');
      });

      jfpsNavigation.each(function() {
        if ($(this).attr('jfps-target-section') == jfpsCurrentPage) {
          $(this).addClass('active');
        }
      });

      jfpsNavigationCallbackAction();
    }

    function getCurrentPage() {
      jfpsCurrentPage = window.location.hash.replace('#', '');
      jfpsCurrentPageIndex = $.inArray(jfpsCurrentPage, jfpsPages);
    }

    function navigatePage() {
      var jfpsSection = $('[jfps-section-id=' + jfpsCurrentPage + ']');

      if (jfpsDirection == 'vertical') {
        // Set animation scroll vertically.
        var animateSettings = {
          scrollTop: (jfpsSection.outerHeight() * jfpsCurrentPageIndex)
        }
      } else if (jfpsDirection == 'horizontal') {
        // Set animation scroll horizontally.
        var animateSettings = {
          scrollLeft: (jfpsSection.outerWidth() * jfpsCurrentPageIndex)
        }
      }

      // Start the scroll animation.
      $('body').stop().delay(jfpsSettings.animationDelay).animate(animateSettings, !jfpsCallbackActions ? {
        duration: jfpsSettings.animationSpeed
      } : $.extend(
        jfpsCallbackActions[jfpsCurrentPage], {
          duration: jfpsSettings.animationSpeed
        }));
    }

    function validateAndNavigatePage() {
      if (jfpsCurrentPageIndex == -1) {
        window.location.hash = jfpsPages[0];
      } else {
        if (jfpsSettings.withNavigation == false) {
          navigatePage();
        } else if (jfpsSettings.withNavigation == true) {
          setActiveNavigation(function() {
            navigatePage();
          });
        }
      }
    }

    // Get the current page on navigate and load the contents after.
    jfpsWindow.on('hashchange', function() {
      getCurrentPage();

      validateAndNavigatePage();
    });

    // Navigate page on mouse scroll.
    jfpsWindow.on('wheel', function(jfpsEvent) {
      if (jfpsEvent.originalEvent.wheelDelta > 0) {
        // Scroll up.
        if (jfpsCurrentPageIndex > 0) {
          window.location.hash = jfpsPages[jfpsCurrentPageIndex - 1];
        }
      } else if (jfpsEvent.originalEvent.wheelDelta < 0) {
        // Scroll down.
        if (jfpsCurrentPageIndex < jfpsPages.length - 1) {
          window.location.hash = jfpsPages[jfpsCurrentPageIndex + 1];
        }
      }
    });

    // Navigate page on key press.
    if (jfpsSettings.enableKeyPressScroll == true) {
      jfpsWindow.on('keydown', function(jfpsEvent) {
        if (jfpsEvent.keyCode == 38 || jfpsEvent.keyCode == 37) {
          // Scroll up or left.
          if (jfpsCurrentPageIndex > 0) {
            window.location.hash = jfpsPages[jfpsCurrentPageIndex - 1];
          }
        } else if (jfpsEvent.keyCode == 40 || jfpsEvent.keyCode == 39) {
          // Scroll down or right.
          if (jfpsCurrentPageIndex < jfpsPages.length - 1) {
            window.location.hash = jfpsPages[jfpsCurrentPageIndex + 1];
          }
        }
      });
    }

    // Navigate page on swipe, for touch screen devices only.
    jfpsBody.on('touchstart', function(jfpsEvent) {
      jfpsTouchSwipeXValue = jfpsEvent.changedTouches[0].clientX;
      jfpsTouchSwipeYValue = jfpsEvent.changedTouches[0].clientY;
    }).on('touchmove', function(jfpsEvent) {
      jfpsEvent.preventDefault ? jfpsEvent.preventDefault() : jfpsEvent.returnValue = false;
    }).on('touchend', function(jfpsEvent) {
      var jfpsTouchSwipeXDistance = jfpsEvent.changedTouches[0].clientX - jfpsTouchSwipeXValue;
      var jfpsTouchSwipeYDistance = jfpsEvent.changedTouches[0].clientY - jfpsTouchSwipeYValue;

      if (Math.abs(jfpsTouchSwipeXDistance) >= jfpsTouchSwipeThreshold && Math.abs(jfpsTouchSwipeYDistance) <= jfpsTouchSwipeLimit) {
        if (jfpsTouchSwipeXDistance > 0) {
          // Scroll left.
          if (jfpsCurrentPageIndex > 0) {
            window.location.hash = jfpsPages[jfpsCurrentPageIndex - 1];
          }
        } else {
          // Scroll right.
          if (jfpsCurrentPageIndex < jfpsPages.length - 1) {
            window.location.hash = jfpsPages[jfpsCurrentPageIndex + 1];
          }
        }
      } else if (Math.abs(jfpsTouchSwipeYDistance) >= jfpsTouchSwipeThreshold && Math.abs(jfpsTouchSwipeXDistance) <= jfpsTouchSwipeLimit) {
        if (jfpsTouchSwipeYDistance > 0) {
          // Scroll up
          if (jfpsCurrentPageIndex > 0) {
            window.location.hash = jfpsPages[jfpsCurrentPageIndex - 1];
          }
        } else {
          // Scroll down.
          if (jfpsCurrentPageIndex < jfpsPages.length - 1) {
            window.location.hash = jfpsPages[jfpsCurrentPageIndex + 1];
          }
        }
      }
    });

    if (jfpsSettings.withNavigation == false) {
      // Call each jFullPageScroller section if navigation is not available and register it as a page.
      jfpsSections.each(function() {
        jfpsPages.push($(this).attr('jfps-section-id'));
      });
    } else if (jfpsSettings.withNavigation == true) {
      // Call each jFullPageScroller navigation if it is available and register it as a page.
      jfpsNavigation.each(function() {
        jfpsPages.push($(this).attr('jfps-target-section'));

        $(this).on('click', function(jfpsEvent) {
          jfpsEvent.preventDefault ? jfpsEvent.preventDefault() : jfpsEvent.returnValue = false;

          window.location.hash = $(this).attr('jfps-target-section');
        });
      });
    }

    // Remove anchor link to section default behavior.
    jfpsSections.each(function() {
      if ($(this).attr('jfps-section-id') == $(this).attr('id')) {
        $(this).removeAttr('id');
      }
    });

    getCurrentPage();

    validateAndNavigatePage();
  };
}(jQuery));