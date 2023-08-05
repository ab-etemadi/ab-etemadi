/***********************************************
 * INIT THIRD PARTY SCRIPTS
 ***********************************************/
(function ($) {
  'use strict';
  /**
   * Remove overflow for sticky
   */

  if ($('.sticky-column, .has-sticky-column').length) {
    $('.vlt-main').css('overflow', 'inherit');
  }
  /**
   * Add submenu carret
   */


  $('.sf-menu li.menu-item-has-children > a > span.menu-item-icon').append('<i class="fa-solid fa-fw fa-circle-small"></i>');
  /**
   * Add nofollow to child menu link
   */

  $('.menu-item-has-children>a').attr('rel', 'nofollow');
  /**
   * Widget RSS
   */

  $('.vlt-widget.widget_rss .rsswidget').addClass('h6');
  /**
   * Widget menu
   */

  if (typeof $.fn.superclick !== 'undefined') {
    $('.widget_pages > ul, .widget_nav_menu ul.menu').superclick({
      delay: 300,
      cssArrows: false,
      animation: {
        opacity: 'show',
        height: 'show'
      },
      animationOut: {
        opacity: 'hide',
        height: 'hide'
      }
    });
  }
  /**
   * Jarallax
   */


  if (typeof $.fn.jarallax !== 'undefined') {
    $('.jarallax, .elementor-section.jarallax, .elementor-column.jarallax>.elementor-column-wrap').jarallax({
      speed: 0.8
    });
  }
  /**
   * Fitvids
   */


  if (typeof $.fn.fitVids !== 'undefined') {
    VLTJS.body.fitVids();
  }
  /**
   * AOS animation
   */


  if (typeof AOS !== 'undefined') {
    function aos() {
      AOS.init({
        disable: 'mobile',
        offset: 120,
        once: true,
        duration: 1000,
        easing: 'ease'
      });

      function aos_refresh() {
        AOS.refresh();
      }

      aos_refresh();
      VLTJS.debounceResize(aos_refresh);
    }

    VLTJS.window.on('vlt.site-loaded', aos);
  }
  /**
   * Back button
   */


  $('.btn-go-back').on('click', function (e) {
    e.preventDefault();
    window.history.back();
  });
  /**
   * Lax
   */

  if (typeof lax !== 'undefined') {
    VLTJS.body.imagesLoaded(function () {
      lax.setup();

      const updateLax = function () {
        lax.update(window.scrollY);
        window.requestAnimationFrame(updateLax);
      };

      window.requestAnimationFrame(updateLax);
      VLTJS.debounceResize(function () {
        lax.updateElements();
      });
    });
  }
  /**
   * Fancybox
   */


  if (typeof $.fn.fancybox !== 'undefined') {
    $.fancybox.defaults.btnTpl = {
      close: '<button data-fancybox-close class="fancybox-button fancybox-button--close">' + '<i class="fa-regular fa-fw fa-xmark"></i>' + '</button>',
      arrowLeft: '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" href="javascript:;">' + '<i class="fa-regular fa-fw fa-arrow-left"></i>' + '</a>',
      arrowRight: '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" href="javascript:;">' + '<i class="fa-regular fa-fw fa-arrow-right"></i>' + '</a>',
      smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small">' + '<i class="fa-regular fa-fw fa-xmark"></i>' + '</button>'
    };
    $.fancybox.defaults.buttons = ['close'];
    $.fancybox.defaults.infobar = false;
    $.fancybox.defaults.transitionEffect = 'slide';
  }
  /**
   * Material input
   */


  if ($('.vlt-form-group').length) {
    $('.vlt-form-group .vlt-form-control').each(function () {
      if ($(this).val().length > 0 || $(this).attr('placeholder') !== undefined) {
        $(this).closest('.vlt-form-group').addClass('active');
      }
    });
    $('.vlt-form-group .vlt-form-control').on({
      mouseenter: function () {
        $(this).closest('.vlt-form-group').addClass('active');
      },
      mouseleave: function () {
        if ($(this).val() == '' && $(this).attr('placeholder') == undefined && !$(this).is(':focus')) {
          $(this).closest('.vlt-form-group').removeClass('active');
        }
      }
    });
    $('.vlt-form-group .vlt-form-control').focus(function () {
      $(this).closest('.vlt-form-group').addClass('active');
    });
    $('.vlt-form-group .vlt-form-control').blur(function () {
      if ($(this).val() == '' && $(this).attr('placeholder') == undefined) {
        $(this).closest('.vlt-form-group').removeClass('active');
      }
    });
    $('.vlt-form-group .vlt-form-control').change(function () {
      if ($(this).val() == '' && $(this).attr('placeholder') == undefined) {
        $(this).closest('.vlt-form-group').removeClass('active');
      } else {
        $(this).closest('.vlt-form-group').addClass('active');
      }
    });
  }
})(jQuery);
/***********************************************
 * HEDAER: DROP EFFECTS
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof gsap == 'undefined') {
    return;
  }

  if (typeof $.fn.superclick == 'undefined') {
    return;
  }

  VLTJS.submenuEffectStyle1 = {
    config: {
      easing: 'power2.out'
    },
    init: function () {
      var effect = $('[data-submenu-effect="style-1"]'),
          $navbars = effect.find('ul.sf-menu'); // prepend back button

      $navbars.find('ul.sub-menu').prepend('<li class="sub-menu-back"><a href="#"><span>' + VLT_LOCALIZE_DATAS.menu_back_text + '</span></a></li>'); // update submenu height

      function _update_submenu_height($item) {
        var $nav = $item.closest(effect);
        var $sfMenu = $nav.find('ul.sf-menu');
        var $submenu = $sfMenu.find('li.menu-item-has-children.open > ul.sub-menu:not(.closed)');
        var submenuHeight = '';

        if ($submenu.length) {
          submenuHeight = $submenu.innerHeight();
        }

        $sfMenu.css({
          height: submenuHeight,
          minHeight: submenuHeight
        });
      } // open / close submenu


      function _toggle_submenu(open, $submenu, clickedLink) {
        var $newItems = $submenu.find('> ul.sub-menu > li > a');
        var $oldItems = $submenu.parent().find('> li > a');

        if (open) {
          $submenu.addClass('open').parent().addClass('closed');
        } else {
          $submenu.removeClass('open').parent().removeClass('closed');
          var tmp = $newItems;
          $newItems = $oldItems;
          $oldItems = tmp;
        }

        gsap.timeline({
          defaults: {
            ease: VLTJS.submenuEffectStyle1.config.easing
          }
        }).to($oldItems, .3, {
          autoAlpha: 0,
          onComplete: function () {
            $oldItems.css('display', 'none');
          }
        }).set($newItems, {
          autoAlpha: 0,
          display: 'flex',
          y: 30,
          onComplete: function () {
            _update_submenu_height(clickedLink);
          }
        }).to($newItems, .3, {
          y: 0,
          delay: .3,
          autoAlpha: 1,
          stagger: {
            amount: .15
          }
        });
      }

      $navbars.on('click', 'li.menu-item-has-children > a', function (e) {
        _toggle_submenu(true, $(this).parent(), $(this));

        e.preventDefault();
      });
      $navbars.on('click', 'li.sub-menu-back > a', function (e) {
        _toggle_submenu(false, $(this).parent().parent().parent(), $(this));

        e.preventDefault();
      });
    }
  };
  VLTJS.submenuEffectStyle1.init();
  VLTJS.submenuEffectStyle2 = {
    config: {
      easing: 'power2.out'
    },
    init: function () {
      var effect = $('[data-submenu-effect="style-2"]'),
          $navbars = effect.find('ul.sf-menu');
      $navbars.superclick({
        delay: 300,
        cssArrows: false,
        animation: {
          opacity: 'show',
          height: 'show'
        },
        animationOut: {
          opacity: 'hide',
          height: 'hide'
        }
      });
    }
  };
  VLTJS.submenuEffectStyle2.init();
})(jQuery);
/***********************************************
 * HEDAER: MENU DEFAULT
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof $.fn.superfish == 'undefined') {
    return;
  }

  VLTJS.menuDefault = {
    init: function () {
      var menu = $('.vlt-nav--default'),
          navigation = menu.find('ul.sf-menu');
      navigation.superfish({
        popUpSelector: 'ul.sub-menu',
        delay: 0,
        speed: 300,
        speedOut: 300,
        cssArrows: false,
        animation: {
          opacity: 'show',
          marginTop: '0',
          visibility: 'visible'
        },
        animationOut: {
          opacity: 'hide',
          marginTop: '10px',
          visibility: 'hidden'
        },
        onInit: function () {
          var megaMenuParent = $(this).find('> li.menu-item-has-megamenu'),
              megaMenuColumn = megaMenuParent.find('ul ul'); // remove has children class

          megaMenuParent.find('li').removeClass('menu-item-has-children'); // remove attr from megamenu column

          megaMenuColumn.removeAttr('class style'); // remove label from column

          if (megaMenuParent.hasClass('menu-item-has-megamenu-hide-label')) {
            megaMenuParent.find('> ul > li > a').remove();
          } else {
            megaMenuParent.find('> ul > li > a').addClass('label');
          }
        }
      }); // fix dropdown position if needed

      function correctDropdownPosition($item) {
        $item.removeClass('left');
        var $dropdown = $item.children('ul.sub-menu');

        if ($dropdown.length) {
          var rect = $dropdown[0].getBoundingClientRect();

          if (rect.left + rect.width > VLTJS.window.width()) {
            $item.addClass('left');
          }
        }
      }

      navigation.on('mouseenter', 'li.menu-item-has-children', function () {
        correctDropdownPosition($(this));
      });
    }
  };
  VLTJS.menuDefault.init();
})(jQuery);
/***********************************************
 * HEADER: MENU FULLSCREEN
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof gsap == 'undefined') {
    return;
  }

  var menuIsOpen = false;
  VLTJS.menuFullscreen = {
    init: function () {
      var menu = $('.vlt-nav--fullscreen'),
          menuToggle = $('.js-fullscreen-menu-toggle'),
          navItem = menu.find('ul.sf-menu > li');
      menuToggle.on('click', function (e) {
        e.preventDefault();

        if (!menuIsOpen) {
          VLTJS.menuFullscreen.open_menu(menu, navItem);
        } else {
          VLTJS.menuFullscreen.close_menu(menu);
        }
      });
      VLTJS.document.on('vlt.close-fullscreen-menu', function () {
        if (menuIsOpen) {
          VLTJS.menuFullscreen.close_menu(menu);
        }
      });
      VLTJS.document.keyup(function (e) {
        if (e.keyCode === 27 && menuIsOpen) {
          e.preventDefault();
          VLTJS.menuFullscreen.close_menu(menu);
        }
      });
    },
    open_menu: function (menu, navItem) {
      // trigger close event
      VLTJS.document.trigger('vlt.close-search-popup');
      VLTJS.document.trigger('vlt.close-offcanvas-sidebar');
      menuIsOpen = true;
      menu.addClass('is-open');
      gsap.fromTo(navItem, {
        autoAlpha: 0,
        y: 30
      }, {
        autoAlpha: 1,
        y: 0,
        duration: .3,
        delay: .3,
        stagger: {
          amount: .3
        }
      }); // play audio

      if (VLT_LOCALIZE_DATAS.open_click_sound && typeof Howl !== 'undefined') {
        new Howl({
          src: [VLT_LOCALIZE_DATAS.open_click_sound],
          autoplay: true,
          loop: false,
          volume: 0.3
        });
      }
    },
    close_menu: function (menu) {
      menuIsOpen = false;
      menu.removeClass('is-open'); // play audio

      if (typeof VLT_LOCALIZE_DATAS.close_click_sound && typeof Howl !== 'undefined') {
        new Howl({
          src: [VLT_LOCALIZE_DATAS.close_click_sound],
          autoplay: true,
          loop: false,
          volume: 0.3
        });
      }
    }
  };
  VLTJS.menuFullscreen.init();
})(jQuery);
/***********************************************
 * HEADER: MENU MOBILE
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof $.fn.superclick == 'undefined') {
    return;
  }

  var menuIsOpen = false;
  VLTJS.menuMobile = {
    config: {
      easing: 'power2.out'
    },
    init: function () {
      var menu = $('.vlt-nav--mobile'),
          menuToggle = $('.js-mobile-menu-toggle');
      menuToggle.on('click', function (e) {
        e.preventDefault();

        if (!menuIsOpen) {
          VLTJS.menuMobile.open_menu(menu, menuToggle);
        } else {
          VLTJS.menuMobile.close_menu(menu, menuToggle);
        }
      });
      VLTJS.document.on('vlt.close-mobile-menu', function () {
        if (menuIsOpen) {
          VLTJS.menuMobile.close_menu(menu, menuToggle);
        }
      });
      VLTJS.document.keyup(function (e) {
        if (e.keyCode === 27 && menuIsOpen) {
          e.preventDefault();
          VLTJS.menuMobile.close_menu(menu, menuToggle);
        }
      });
    },
    open_menu: function (menu, menuToggle) {
      // trigger close event
      VLTJS.document.trigger('vlt.close-search-popup');
      VLTJS.document.trigger('vlt.close-offcanvas-sidebar');
      menuIsOpen = true;
      menuToggle.addClass('is-open');
      menu.slideDown(300);
    },
    close_menu: function (menu, menuToggle) {
      menuIsOpen = false;
      menuToggle.removeClass('is-open');
      menu.slideUp(300);
    }
  };
  VLTJS.menuMobile.init();
})(jQuery);
/***********************************************
 * HEADER: MENU OFFCANVAS
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof gsap == 'undefined') {
    return;
  }

  var menuIsOpen = false;
  VLTJS.menuOffcanvas = {
    config: {
      easing: 'power2.out'
    },
    init: function () {
      var menu = $('.vlt-nav--offcanvas'),
          menuToggle = $('.js-offcanvas-menu-toggle'),
          navItem = menu.find('ul.sf-menu > li'),
          siteOverlay = $('.vlt-site-overlay');
      menuToggle.on('click', function (e) {
        e.preventDefault();

        if (!menuIsOpen) {
          VLTJS.menuOffcanvas.open_menu(menuToggle, menu, navItem, siteOverlay);
        } else {
          VLTJS.menuOffcanvas.close_menu(menuToggle, menu, siteOverlay);
        }
      });
      VLTJS.document.on('vlt.close-offcanvas-menu', function () {
        if (menuIsOpen) {
          VLTJS.menuOffcanvas.close_menu(menuToggle, menu, siteOverlay);
        }
      });
      VLTJS.document.keyup(function (e) {
        if (e.keyCode === 27 && menuIsOpen) {
          e.preventDefault();
          VLTJS.menuOffcanvas.close_menu(menuToggle, menu, siteOverlay);
        }
      });
      siteOverlay.on('click', function () {
        if (menuIsOpen) {
          VLTJS.menuOffcanvas.close_menu(menuToggle, menu, siteOverlay);
        }
      });
    },
    open_menu: function (menuToggle, menu, navItem, siteOverlay) {
      // trigger close event
      VLTJS.document.trigger('vlt.close-search-popup');
      VLTJS.document.trigger('vlt.close-offcanvas-sidebar');
      menuIsOpen = true;
      menu.addClass('is-open');
      menuToggle.addClass('is-open');
      siteOverlay.addClass('is-open');
      gsap.fromTo(navItem, {
        autoAlpha: 0,
        y: 30
      }, {
        autoAlpha: 1,
        y: 0,
        duration: .3,
        delay: .3,
        stagger: {
          amount: .3
        }
      }); // play audio

      if (VLT_LOCALIZE_DATAS.open_click_sound && typeof Howl !== 'undefined') {
        new Howl({
          src: [VLT_LOCALIZE_DATAS.open_click_sound],
          autoplay: true,
          loop: false,
          volume: 0.3
        });
      }
    },
    close_menu: function (menuToggle, menu, siteOverlay) {
      menuIsOpen = false;
      menu.removeClass('is-open');
      menuToggle.removeClass('is-open');
      siteOverlay.removeClass('is-open'); // play audio

      if (typeof VLT_LOCALIZE_DATAS.close_click_sound && typeof Howl !== 'undefined') {
        new Howl({
          src: [VLT_LOCALIZE_DATAS.close_click_sound],
          autoplay: true,
          loop: false,
          volume: 0.3
        });
      }
    }
  };
  VLTJS.menuOffcanvas.init();
})(jQuery);
/***********************************************
 * HEADER: MENU SLIDE
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof gsap == 'undefined') {
    return;
  }

  var menuIsOpen = false;
  VLTJS.menuSlide = {
    config: {
      easing: 'power2.out'
    },
    init: function () {
      var menu = $('.vlt-nav--slide'),
          menuToggle = $('.js-slide-menu-toggle'),
          navItem = menu.find('ul.sf-menu > li'),
          siteOverlay = $('.vlt-site-overlay');
      menuToggle.on('click', function (e) {
        e.preventDefault();

        if (!menuIsOpen) {
          VLTJS.menuSlide.open_menu(menuToggle, menu, navItem, siteOverlay);
        } else {
          VLTJS.menuSlide.close_menu(menuToggle, menu, siteOverlay);
        }
      });
      VLTJS.document.on('vlt.close-slide-menu', function () {
        if (menuIsOpen) {
          VLTJS.menuSlide.close_menu(menuToggle, menu, siteOverlay);
        }
      });
      VLTJS.document.keyup(function (e) {
        if (e.keyCode === 27 && menuIsOpen) {
          e.preventDefault();
          VLTJS.menuSlide.close_menu(menuToggle, menu, siteOverlay);
        }
      });
      siteOverlay.on('click', function () {
        if (menuIsOpen) {
          VLTJS.menuSlide.close_menu(menuToggle, menu, siteOverlay);
        }
      });
    },
    open_menu: function (menuToggle, menu, navItem, siteOverlay) {
      // trigger close event
      VLTJS.document.trigger('vlt.close-search-popup');
      VLTJS.document.trigger('vlt.close-offcanvas-sidebar');
      menuIsOpen = true;
      menu.addClass('is-open');
      menuToggle.addClass('is-open');
      siteOverlay.addClass('is-open');
      gsap.fromTo(navItem, {
        autoAlpha: 0,
        y: 30
      }, {
        autoAlpha: 1,
        y: 0,
        duration: .3,
        delay: .3,
        stagger: {
          amount: .3
        }
      }); // play audio

      if (VLT_LOCALIZE_DATAS.open_click_sound && typeof Howl !== 'undefined') {
        new Howl({
          src: [VLT_LOCALIZE_DATAS.open_click_sound],
          autoplay: true,
          loop: false,
          volume: 0.3
        });
      }
    },
    close_menu: function (menuToggle, menu, siteOverlay) {
      menuIsOpen = false;
      menu.removeClass('is-open');
      menuToggle.removeClass('is-open');
      siteOverlay.removeClass('is-open'); // play audio

      if (typeof VLT_LOCALIZE_DATAS.close_click_sound && typeof Howl !== 'undefined') {
        new Howl({
          src: [VLT_LOCALIZE_DATAS.close_click_sound],
          autoplay: true,
          loop: false,
          volume: 0.3
        });
      }
    }
  };
  VLTJS.menuSlide.init();
})(jQuery);
/***********************************************
 * WIDGET: ACCORDION
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.accordion = {
    init: function ($scope) {
      var accordion = $scope.find('.vlt-accordion');
      accordion.on('click', '.vlt-accordion__title', function () {
        var $this = $(this);

        if ($this.next().hasClass('is-show')) {
          $this.removeClass('is-active');
          $this.next().removeClass('is-show');
          $this.next().slideUp();
        } else {
          $this.parent().parent().find('.vlt-accordion__title').removeClass('is-active');
          $this.parent().parent().find('.vlt-accordion__content').removeClass('is-show');
          $this.parent().parent().find('.vlt-accordion__content').slideUp();
          $this.toggleClass('is-active');
          $this.next().toggleClass('is-show');
          $this.next().slideToggle();
        }
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-accordion.default', VLTJS.accordion.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: ALERT MESSAGE
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.alertMessage = {
    init: function ($scope) {
      $scope = typeof $scope === 'undefined' ? VLTJS.body : $scope;
      var alert = $scope.find('.vlt-alert-message');
      alert.on('click', '.vlt-alert-message__dismiss', function (e) {
        e.preventDefault();
        $scope.fadeOut(500);
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-alert-message.default', VLTJS.alertMessage.init);
  });
  VLTJS.alertMessage.init();
})(jQuery);
/***********************************************
 * WIDGET: AWARDS
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  VLTJS.awards = {
    init: function ($scope) {
      var awards = $scope.find('.vlt-awards'),
          speed = awards.data('speed');
      new Swiper(awards, {
        spaceBetween: 0,
        loop: false,
        slidesPerView: 'auto',
        grabCursor: true,
        speed: speed,
        freeMode: true
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-awards.default', VLTJS.awards.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: BUTTON
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.button = {
    init: function ($scope) {
      var el = $scope.find('.vlt-btn.vlt-btn--effect');
      el.each(function () {
        var $this = $(this);

        if (!$this.find('.vlt-btn__content').length) {
          $this.wrapInner('<span class="vlt-btn__content"></span>');
          $this.find('.vlt-btn__content').clone().attr('aria-hidden', true).appendTo($this);
        }
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-button.default', VLTJS.button.init);
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-single-post.default', VLTJS.button.init);
    elementorFrontend.hooks.addAction('frontend/element_ready/wp-widget-mc4wp_form_widget.default', VLTJS.button.init); // elementorFrontend.hooks.addAction(
    // 	'frontend/element_ready/vlt-showcase-2.default',
    // 	VLTJS.button.init
    // );
    // elementorFrontend.hooks.addAction(
    // 	'frontend/element_ready/vlt-showcase-3.default',
    // 	VLTJS.button.init
    // );
    // elementorFrontend.hooks.addAction(
    // 	'frontend/element_ready/vlt-showcase-5.default',
    // 	VLTJS.button.init
    // );
    // elementorFrontend.hooks.addAction(
    // 	'frontend/element_ready/vlt-showcase-7.default',
    // 	VLTJS.button.init
    // );
  });
  VLTJS.button.init(VLTJS.body);
  VLTJS.document.on('init.vpf endLoadingNewItems.vpf', function (e) {
    VLTJS.button.init(VLTJS.body);
  });
})(jQuery);
/***********************************************
 * WIDGET: CONTENT SLIDER
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  } // check if plugin defined


  if (typeof gsap == 'undefined') {
    return;
  }

  VLTJS.contentSlider = {
    init: function ($scope) {
      var slider = $scope.find('.vlt-content-slider'),
          anchor = slider.data('navigation-anchor'),
          gap = slider.data('gap') || 0,
          loop = slider.data('loop') == 'yes' ? true : false,
          speed = slider.data('speed') || 1000,
          autoplay = slider.data('autoplay') == 'yes' ? true : false,
          centered = slider.data('slides-centered') == 'yes' ? true : false,
          freemode = slider.data('free-mode') == 'yes' ? true : false,
          slider_offset = slider.data('slider-offset') == 'yes' ? true : false,
          mousewheel = slider.data('mousewheel') == 'yes' ? true : false,
          autoplay_speed = slider.data('autoplay-speed'),
          settings = slider.data('slide-settings');
      var swiper = new Swiper(slider, {
        init: false,
        spaceBetween: gap,
        grabCursor: true,
        loop: loop,
        speed: speed,
        centeredSlides: centered,
        freeMode: freemode,
        mousewheel: mousewheel,
        autoplay: autoplay ? {
          delay: autoplay_speed,
          disableOnInteraction: false
        } : false,
        autoHeight: true,
        slidesOffsetBefore: slider_offset ? $('.container').get(0).getBoundingClientRect().left + 15 : false,
        slidesOffsetAfter: slider_offset ? $('.container').get(0).getBoundingClientRect().left + 15 : false,
        navigation: {
          nextEl: $(anchor).find('.vlt-swiper-button-next'),
          prevEl: $(anchor).find('.vlt-swiper-button-prev')
        },
        pagination: {
          el: $(anchor).find('.vlt-swiper-pagination .total'),
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            return VLTJS.addLedingZero(total);
          }
        },
        breakpoints: {
          // when window width is >= 576px
          576: {
            slidesPerView: settings.slides_to_show_mobile || settings.slides_to_show_tablet || settings.slides_to_show || 1,
            slidesPerGroup: settings.slides_to_scroll_mobile || settings.slides_to_scroll_tablet || settings.slides_to_scroll || 1
          },
          // when window width is >= 768px
          768: {
            slidesPerView: settings.slides_to_show_tablet || settings.slides_to_show || 1,
            slidesPerGroup: settings.slides_to_scroll_tablet || settings.slides_to_scroll || 1
          },
          // when window width is >= 992px
          992: {
            slidesPerView: settings.slides_to_show || 1,
            slidesPerGroup: settings.slides_to_scroll || 1
          }
        }
      });
      swiper.on('init slideChange', function () {
        if ($(anchor).find('.vlt-swiper-pagination').length) {
          var speed = swiper.params.speed / 1000 / 2,
              current = $(anchor).find('.vlt-swiper-pagination .current'); // Pagination transform

          gsap.to(current, speed, {
            force3D: true,
            y: -10,
            opacity: 0,
            onComplete: function () {
              gsap.set(current, {
                y: 10
              });
              current.html(VLTJS.addLedingZero(swiper.realIndex + 1));
            }
          });
          gsap.to(current, speed, {
            force3D: true,
            y: 0,
            opacity: 1,
            delay: speed
          });
        }
      });
      swiper.init();
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-content-slider.default', VLTJS.contentSlider.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: COUNTDOWN
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof $.fn.countdown === 'undefined') {
    return;
  }

  VLTJS.countdown = {
    init: function ($scope) {
      var countdown = $scope.find('.vlt-countdown'),
          due_date = countdown.data('due-date') || false;
      countdown.countdown(due_date, function (event) {
        countdown.find('[data-weeks]').html(event.strftime('%W'));
        countdown.find('[data-days]').html(event.strftime('%D'));
        countdown.find('[data-hours]').html(event.strftime('%H'));
        countdown.find('[data-minutes]').html(event.strftime('%M'));
        countdown.find('[data-seconds]').html(event.strftime('%S'));
      });
      $('<span class="sep"></span>').insertAfter(countdown.filter('.vlt-countdown--inline').find('.vlt-countdown__item:not(:last-child'));
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-countdown.default', VLTJS.countdown.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: COUNTER UP
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof $.fn.numerator == 'undefined') {
    return;
  }

  VLTJS.counterUp = {
    init: function ($scope) {
      var counterUp = $scope.find('.vlt-counter-up'),
          animation_duration = counterUp.data('animation-speed') || 1000,
          ending_number = counterUp.find('.counter'),
          ending_number_value = ending_number.text(),
          delimiter = counterUp.data('delimiter') ? counterUp.data('delimiter') : ',';

      if (counterUp.hasClass('vlt-counter-up--style-2')) {
        ending_number.css({
          'min-width': ending_number.outerWidth() + 'px'
        });
      }

      counterUp.one('inview', function () {
        ending_number.text('0');
        ending_number.numerator({
          easing: 'linear',
          duration: animation_duration,
          delimiter: delimiter,
          toValue: ending_number_value
        });
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-counter-up.default', VLTJS.counterUp.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: FANCY TEXT
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Typed == 'undefined') {
    return;
  } // check if plugin defined


  if (typeof $.fn.Morphext == 'undefined') {
    return;
  }

  VLTJS.fancyText = {
    init: function ($scope) {
      var fancyText = $scope.find('.vlt-fancy-text'),
          strings = fancyText.find('.strings'),
          fancy_text = fancyText.data('fancy-text') || '',
          fancy_text = fancy_text.split('|'),
          animation_type = fancyText.data('animation-type') || '',
          typing_speed = fancyText.data('typing-speed') || '',
          delay = fancyText.data('delay') || '',
          type_cursor = fancyText.data('type-cursor') == 'yes' ? true : false,
          type_cursor_symbol = fancyText.data('type-cursor-symbol') || '|',
          typing_loop = fancyText.data('typing-loop') == 'yes' ? true : false;

      if (animation_type == 'typing') {
        new Typed(strings.get(0), {
          strings: fancy_text,
          typeSpeed: typing_speed,
          backSpeed: 0,
          startDelay: 300,
          backDelay: delay,
          showCursor: type_cursor,
          cursorChar: type_cursor_symbol,
          loop: typing_loop
        });
      } else {
        strings.show().Morphext({
          animation: animation_type,
          separator: ', ',
          speed: delay,
          complete: function () {// Overrides default empty function
          }
        });
      }
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-fancy-text.default', VLTJS.fancyText.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: GOOGLE MAP
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.googleMap = {
    init: function ($scope) {
      var googleMap = $scope.find('.vlt-google-map'),
          map_lat = googleMap.data('map-lat'),
          map_lng = googleMap.data('map-lng'),
          map_zoom = googleMap.data('map-zoom'),
          map_gesture_handling = googleMap.data('map-gesture-handling'),
          map_zoom_control = googleMap.data('map-zoom-control') ? true : false,
          map_zoom_control_position = googleMap.data('map-zoom-control-position'),
          map_default_ui = googleMap.data('map-default-ui') ? false : true,
          map_type = googleMap.data('map-type'),
          map_type_control = googleMap.data('map-type-control') ? true : false,
          map_type_control_style = googleMap.data('map-type-control-style'),
          map_type_control_position = googleMap.data('map-type-control-position'),
          map_streetview_control = googleMap.data('map-streetview-control') ? true : false,
          map_streetview_position = googleMap.data('map-streetview-position'),
          map_info_window_width = googleMap.data('map-info-window-width'),
          map_locations = googleMap.data('map-locations'),
          map_styles = googleMap.data('map-style') || '',
          infowindow,
          map;

      function initMap() {
        var myLatLng = {
          lat: parseFloat(map_lat),
          lng: parseFloat(map_lng)
        };

        if (typeof google === 'undefined') {
          return;
        }

        var map = new google.maps.Map(googleMap[0], {
          center: myLatLng,
          zoom: map_zoom,
          disableDefaultUI: map_default_ui,
          zoomControl: map_zoom_control,
          zoomControlOptions: {
            position: google.maps.ControlPosition[map_zoom_control_position]
          },
          mapTypeId: map_type,
          mapTypeControl: map_type_control,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle[map_type_control_style],
            position: google.maps.ControlPosition[map_type_control_position]
          },
          streetViewControl: map_streetview_control,
          streetViewControlOptions: {
            position: google.maps.ControlPosition[map_streetview_position]
          },
          styles: map_styles,
          gestureHandling: map_gesture_handling
        });
        $.each(map_locations, function (index, googleMapement, content) {
          var content = '\
					<div class="vlt-google-map__container">\
					<h6>' + googleMapement.title + '</h6>\
					<div>' + googleMapement.text + '</div>\
					</div>';
          var icon = '';

          if (googleMapement.pin_icon !== '') {
            if (googleMapement.pin_icon_custom) {
              icon = googleMapement.pin_icon_custom;
            } else {
              icon = '';
            }
          }

          var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(parseFloat(googleMapement.lat), parseFloat(googleMapement.lng)),
            animation: google.maps.Animation.DROP,
            icon: icon
          });

          if (googleMapement.title !== '' && googleMapement.text !== '') {
            addInfoWindow(marker, content);
          }
        });
      }

      function addInfoWindow(marker, content) {
        google.maps.event.addListener(marker, 'click', function () {
          if (!infowindow) {
            infowindow = new google.maps.InfoWindow({
              maxWidth: map_info_window_width
            });
          }

          infowindow.setContent(content);
          infowindow.open(map, marker);
        });
      }

      initMap();
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-google-map.default', VLTJS.googleMap.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: IMAGES COMPARE
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.imagesCompare = {
    init: function ($scope) {
      var imagesCompare = $scope.find('.vlt-images-compare'),
          disabledTransition = false,
          currentImageCompare = false;

      function _move_position(e) {
        if (currentImageCompare) {
          const rect = currentImageCompare[0].getBoundingClientRect();
          const offsetX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          currentImageCompare.css('--vlt-image-compare__position', 100 * offsetX + '%');
        }
      }

      imagesCompare.on('mousedown', function (e) {
        e.preventDefault();
        currentImageCompare = $(this);
      });
      VLTJS.document.on('mouseup', function (e) {
        if (currentImageCompare) {
          _move_position(e);

          imagesCompare.css('--vlt-image-compare__transition-duration', '');
          currentImageCompare = false;
          disabledTransition = false;
        }
      });
      VLTJS.document.on('mousemove', function (e) {
        if (currentImageCompare) {
          e.preventDefault();

          if (!disabledTransition) {
            currentImageCompare.css('--vlt-image-compare__transition-duration', '0s');
            disabledTransition = true;
          }
        }
      });
      VLTJS.document.on('mousemove', function (e) {
        _move_position(e);
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-images-compare.default', VLTJS.imagesCompare.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: JUSTIFIED GALLERY
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof $.fn.justifiedGallery == 'undefined') {
    return;
  }

  VLTJS.justifiedGallery = {
    init: function ($scope) {
      var justifiedGallery = $scope.find('.vlt-justified-gallery'),
          row_height = justifiedGallery.data('row-height') || 360,
          margins = justifiedGallery.data('margins') || 0,
          last_row = justifiedGallery.data('last-row') || 'justify';
      justifiedGallery.imagesLoaded(function () {
        justifiedGallery.justifiedGallery({
          rowHeight: row_height,
          margins: margins,
          border: 0,
          captions: false,
          lastRow: last_row
        });
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-justified-gallery.default', VLTJS.justifiedGallery.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: MARQUEE TEXT
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof gsap == 'undefined') {
    return;
  }

  VLTJS.marqueeEffect = {
    init: function ($scope) {
      $scope.find('[data-marquee]').each(function () {
        var $this = $(this),
            speed = $this.data('marquee') || 0.5,
            marqueeText = $this.find('[data-marquee-text]'),
            elWidth = marqueeText.outerWidth(),
            elHeight = marqueeText.outerHeight(),
            duration = elWidth / elHeight * speed + 's';
        gsap.set(marqueeText, {
          animationDuration: duration
        });
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-marquee-text.default', VLTJS.marqueeEffect.init);
  });
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-team-member.default', VLTJS.marqueeEffect.init);
  });
  VLTJS.marqueeEffect.init(VLTJS.body);
  VLTJS.document.on('init.vpf endLoadingNewItems.vpf', function (e) {
    VLTJS.marqueeEffect.init(VLTJS.body);
  });
})(jQuery);
/***********************************************
 * WIDGET: PIE CHART
 ***********************************************/
(function ($) {
  'use strict';

  if (typeof gsap === 'undefined') {
    return;
  }

  VLTJS.pieChart = {
    init: function ($scope) {
      var chart = $scope.find('.vlt-pie-chart'),
          chart_value = chart.data('chart-value') || 0,
          chart_animation_duration = chart.data('chart-animation-duration') || 0,
          delay = 150,
          obj = {
        count: 0
      };
      chart.one('inview', function () {
        gsap.to(chart, chart_animation_duration / 1000, {
          '--final-value': chart_value
        });
        gsap.to(obj, chart_animation_duration / 1000, {
          count: chart_value,
          delay: delay / 1000,
          onUpdate: function () {
            chart.find('.vlt-pie-chart__title > .counter').text(Math.round(obj.count));
          }
        });
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-pie-chart.default', VLTJS.pieChart.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: PROGRESS BAR
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof gsap === 'undefined') {
    return;
  }

  VLTJS.progressBar = {
    init: function ($scope) {
      var progressBar = $scope.find('.vlt-progress-bar'),
          final_value = progressBar.data('final-value') || 0,
          animation_duration = progressBar.data('animation-speed') || 0,
          delay = 150,
          obj = {
        count: 0
      };
      progressBar.one('inview', function () {
        gsap.to(obj, animation_duration / 1000 / 2, {
          count: final_value,
          delay: delay / 1000,
          onUpdate: function () {
            progressBar.find('.vlt-progress-bar__title > .counter').text(Math.round(obj.count));
          }
        });
        gsap.to(progressBar.filter('.vlt-progress-bar--default').find('.vlt-progress-bar__track > .bar'), animation_duration / 1000, {
          width: final_value + '%',
          delay: delay / 1000
        });
        gsap.to(obj, animation_duration / 1000, {
          count: final_value,
          delay: delay / 1000,
          onUpdate: function () {
            progressBar.filter('.vlt-progress-bar--dotted').find('.vlt-progress-bar__track > .bar').css('clip-path', 'inset(0 ' + (100 - Math.round(obj.count)) + '% 0 0)');
          }
        });
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-progress-bar.default', VLTJS.progressBar.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: SIMPLE GIST
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof $.fn.gistsimple === 'undefined') {
    return;
  }

  VLTJS.simpleGist = {
    init: function ($scope) {
      var gist = $scope.find('.gist-simple'),
          match = /^https:\/\/gist.github.com?.+\/(.+)/g.exec(gist.data('url'));

      if (match && 'undefined' !== typeof match[1]) {
        gist.gistsimple({
          id: match[1],
          file: gist.data('file'),
          lines: gist.data('lines'),
          caption: gist.data('caption'),
          highlightLines: gist.data('highlight-lines'),
          showFooter: gist.data('show-footer') == 'yes' ? true : false,
          showLineNumbers: gist.data('show-line-numbers') == 'yes' ? true : false
        });
      }
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-simple-gist.default', VLTJS.simpleGist.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: STICKY COLUMN
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof StickySidebar == 'undefined') {
    return;
  }

  VLTJS.elementorColumn = {
    init: function ($scope) {
      var stickyOn = ['desktop' // 'tablet',
      // 'mobile'
      ],
          stickyInstance = null,
          stickyInstanceOptions = {
        topSpacing: 50,
        bottomSpacing: 50,
        containerSelector: '.elementor-row, .elementor-container',
        innerWrapperSelector: '.elementor-column-wrap'
      };

      if ($scope.hasClass('vlt-sticky-elementor-sidebar')) {
        $scope.addClass('vlt-sticky-column');

        if (-1 !== stickyOn.indexOf(elementorFrontend.getCurrentDeviceMode())) {
          $scope.data('stickyColumnInit', true);
          stickyInstance = new StickySidebar($scope[0], stickyInstanceOptions);
          VLTJS.debounceResize(resizeDebounce);
        }
      }

      function resizeDebounce() {
        var currentDeviceMode = elementorFrontend.getCurrentDeviceMode(),
            availableDevices = stickyOn || [],
            isInit = $scope.data('stickyColumnInit');

        if (-1 !== availableDevices.indexOf(currentDeviceMode)) {
          if (!isInit) {
            $scope.data('stickyColumnInit', true);
            stickyInstance = new StickySidebar($scope[0], stickyInstanceOptions);
            stickyInstance.updateSticky();
          }
        } else {
          $scope.data('stickyColumnInit', false);
          stickyInstance.destroy();
        }
      }
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/column', VLTJS.elementorColumn.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: TABS
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.tabs = {
    init: function ($scope) {
      var tabs = $scope.find('.vlt-tabs'),
          imagesAnchor = tabs.data('images-anchor');
      $(imagesAnchor).add(tabs).find('li:nth-child(1)').addClass('is-active');
      tabs.on('mouseenter', '.vlt-tabs__item', function () {
        var $this = $(this),
            index = $this.index();
        $(imagesAnchor).find('.vlt-tabs-images__image').removeClass('is-active');
        tabs.find('.vlt-tabs__item').removeClass('is-active');
        $this.addClass('is-active');
        $(imagesAnchor).find('.vlt-tabs-images__image').eq(index).addClass('is-active');
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-tabs.default', VLTJS.tabs.init);
  });
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-tabs-images.default', VLTJS.tabs.init);
  });
})(jQuery);
/***********************************************
 * WIDGET: TYPES LIST
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.typesList = {
    init: function ($scope) {
      var types = $scope.find('.vlt-types'),
          typesList = types.find('.vlt-types-list'),
          typesListItem = typesList.find('.vlt-types-list__item'),
          background = types.find('.vlt-types-background'),
          backgroundImage = background.find('.vlt-types-background__image');
      typesListItem.on('mouseenter', function () {
        var $this = $(this),
            index = $this.index(),
            nearby = $this.siblings('.vlt-types-list__item');
        VLTJS.typesList.add_opacity(nearby);
        VLTJS.typesList.current_background(index, backgroundImage);
      }).on('mouseleave', function () {
        VLTJS.typesList.remove_opacity(typesListItem);
      });
      typesList.on('mouseenter', function () {
        typesList.addClass('is-active');
        background.addClass('is-active');
      }).on('mouseleave', function () {
        typesList.removeClass('is-active');
        backgroundImage.removeClass('is-active');
        background.removeClass('is-active');
      });
    },
    add_opacity: function (nearby) {
      nearby.each(function () {
        $(this).addClass('is-opacity');
      });
    },
    current_background: function (index, backgroundImage) {
      backgroundImage.removeClass('is-active');
      backgroundImage.eq(index).addClass('is-active');
    },
    remove_opacity: function (typesListItem) {
      typesListItem.removeClass('is-opacity');
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-types-list.default', VLTJS.typesList.init);
  });
})(jQuery);
/***********************************************
 * THEME: AJAX LIVE SEARCH FORM
 ***********************************************/
(function ($) {
  'use strict';

  class AjaxLiveSearchForm {
    constructor() {
      this.onInit();
      this.bindEvents();
    }

    getElements() {
      return {
        $form: $('.vlt-search-form--ajax'),
        $input: $('.vlt-search-form--ajax input[type="text"]'),
        $resultsArea: $('.vlt-search-form__results'),
        ajaxURL: VLT_LOCALIZE_DATAS.admin_ajax
      };
    }

    bindEvents() {
      this.getElements().$input.on('keyup', VLTJS.debounce(this.startSearch.bind(this), 500));
      this.getElements().$form.on('submit', function (event) {
        event.preventDefault();
      }.bind(this));
      VLTJS.document.on('click', function (event) {
        if (this.visible) {
          if (!event.target.classList[0].includes('vlt-search-form--ajax')) {
            this.visible = false;
            this.getElements().$input.val('');
            this.getElements().$resultsArea.fadeOut();
            setTimeout(() => {
              this.getElements().$resultsArea.html('');
            }, 600);
          }
        }
      }.bind(this));
    }

    startSearch(event) {
      var currentInput = $(event.target),
          datas = [currentInput.siblings('input[name="post_type"]').val(), currentInput.siblings('input[name="post_taxonomy"]').val(), currentInput.siblings('input[name="post_term_id"]').val()],
          self = this;

      if (currentInput.val().length >= 3) {
        self.getElements().$resultsArea.fadeIn();
        self.runAjaxFiltering(currentInput.val(), datas);
        self.visible = true;
      } else {
        self.getElements().$resultsArea.fadeOut();
        self.visible = false;
      }
    }

    runAjaxFiltering(searchTarget, datas) {
      var self = this;
      $.ajax({
        type: 'POST',
        url: this.getElements().ajaxURL,
        data: {
          action: 'ajax-search-results',
          searchType: datas[0],
          searchTaxonomy: datas[1],
          searchTermID: datas[2],
          searchTarget: searchTarget
        },
        beforeSend: function () {
          self.getElements().$resultsArea.html(VLT_LOCALIZE_DATAS.search_loading);
        },
        success: function (data) {
          if (data.length) {
            self.getElements().$resultsArea.html(data);
          } else {
            self.getElements().$resultsArea.html(VLT_LOCALIZE_DATAS.search_no_found);
          }
        },
        error: function (request, status, error) {}
      });
    }

    onInit() {
      this.visible = false;
    }

  }

  new AjaxLiveSearchForm();
})(jQuery);
/***********************************************
 * THEME: BLOG
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  VLTJS.blog = {
    init: function () {
      VLTJS.blog.postFormatGallerySlider();
      VLTJS.blog.widgetPostlistSlider();
      VLTJS.document.on('loadedNewItems.vpf', function (event, vpObject) {
        if ('vpf' !== event.namespace) {
          return;
        }

        VLTJS.blog.postFormatGallerySlider();

        if (typeof $.fn.fitVids !== 'undefined') {
          VLTJS.body.fitVids();
        }
      });
    },
    postFormatGallerySlider: function () {
      $('.vlt-post-media__gallery').each(function () {
        new Swiper(this, {
          spaceBetween: 0,
          loop: true,
          slidesPerView: 1,
          grabCursor: true,
          speed: 600,
          effect: 'fade',
          pagination: {
            el: $(this).find('.vlt-swiper-pagination'),
            type: 'bullets',
            bulletClass: 'vlt-swiper-pagination-bullet',
            bulletActiveClass: 'vlt-swiper-pagination-bullet-active',
            clickable: true
          },
          navigation: {
            nextEl: $(this).find('.vlt-swiper-button-next'),
            prevEl: $(this).find('.vlt-swiper-button-prev')
          }
        });
      });
    },
    widgetPostlistSlider: function () {
      $('.vlt-widget-post-slider').each(function () {
        new Swiper(this, {
          spaceBetween: 16,
          loop: true,
          autoplay: {
            delay: 5000
          },
          slidesPerView: 1,
          grabCursor: true,
          speed: 600,
          mousewheel: true,
          pagination: {
            el: $(this).find('.vlt-swiper-pagination'),
            type: 'bullets',
            bulletClass: 'vlt-swiper-pagination-bullet',
            bulletActiveClass: 'vlt-swiper-pagination-bullet-active',
            clickable: true
          }
        });
      });
    }
  };
  VLTJS.blog.init();
})(jQuery);
/***********************************************
 * THEME: CUSTOM CURSOR
 ***********************************************/
(function ($) {
  'use strict';

  if (VLTJS.isMobileDevice()) {
    return;
  }

  if (!$('.vlt-is--custom-cursor').length) {
    return;
  }

  VLTJS.customCursor = {
    init: function () {
      VLTJS.body.append('<div class="vlt-custom-cursor"><span class="circle-outer"></span><span class="circle-inner"></span></div>');
      var customCursor = $('.vlt-custom-cursor'),
          adminbarHeight = 0,
          circleOuter = customCursor.find('.circle-outer'),
          circleInner = customCursor.find('.circle-inner'),
          startPosition = {
        x: 0,
        y: 0
      },
          endPosition = {
        x: 0,
        y: 0
      },
          delta = .25;

      if (typeof gsap != 'undefined') {
        gsap.set([circleOuter, circleInner], {
          xPercent: -50,
          yPercent: -50
        });
        VLTJS.document.on('mousemove', function (e) {
          var offsetTop = window.pageYOffset || document.documentElement.scrollTop;
          startPosition.x = e.pageX;
          startPosition.y = e.pageY - offsetTop - adminbarHeight;
        });
        gsap.ticker.add(function () {
          endPosition.x += (startPosition.x - endPosition.x) * delta;
          endPosition.y += (startPosition.y - endPosition.y) * delta;
          gsap.set([circleOuter, circleInner], {
            x: endPosition.x,
            y: endPosition.y
          });
        });
        VLTJS.document.on('mouseenter', function () {
          gsap.to([circleOuter, circleInner], .15, {
            opacity: 1
          });
        }).on('mouseleave', function () {
          gsap.to([circleOuter, circleInner], .15, {
            opacity: 0
          });
        });
        VLTJS.document.on('mouseenter', 'input, textarea, select, a, button, [role="button"]', function () {
          gsap.to(circleInner, .15, {
            scale: 0
          });
          gsap.to(circleOuter, .15, {
            scale: 2,
            backgroundColor: '#ffffff'
          });
        }).on('mouseleave blur', 'input, textarea, select, a, button, [role="button"]', function () {
          gsap.to(circleInner, .15, {
            scale: 1
          });
          gsap.to(circleOuter, .15, {
            scale: 1,
            backgroundColor: 'transparent'
          });
        });
        VLTJS.document.on('mousedown', function () {
          gsap.to(circleOuter, .15, {
            scale: 1.75
          });
          gsap.to(circleInner, .15, {
            scale: 0
          });
        }).on('mouseup', function () {
          gsap.to(circleOuter, .15, {
            scale: 1
          });
          gsap.to(circleInner, .15, {
            scale: 1
          });
        });
      }
    }
  };
  VLTJS.customCursor.init();
})(jQuery);
/***********************************************
 * THEME: ELEMENTOR COLUMN
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.stickyColumn = {
    init: function ($scope) {
      var parent = $scope.filter('.has-sticky-column');

      if (parent.length) {
        parent.find('.elementor-widget-wrap').addClass('sticky-parent').find('.elementor-element').wrapAll('<div class="sticky-column">');
      }
    }
  };
  VLTJS.stretchColumn = {
    init: function ($scope) {
      if (!$scope) {
        $scope = $('div[class^="col-"]');
      }

      resizeDebounce();
      VLTJS.debounceResize(resizeDebounce);

      function resizeDebounce() {
        var winW = VLTJS.window.outerWidth(),
            stretchBlock = $scope.filter('.has-stretch-block');

        if (stretchBlock.length) {
          var rect = stretchBlock[0].getBoundingClientRect(),
              offsetLeft = rect.left,
              offsetRight = winW - rect.right,
              elWidth = rect.width;

          if (stretchBlock.hasClass('to-left')) {
            stretchBlock.find('>*').css('margin-left', -offsetLeft);
            stretchBlock.find('>*').css('width', elWidth + offsetLeft + 'px');
          }

          if (stretchBlock.hasClass('to-right')) {
            stretchBlock.find('>*').css('margin-right', -offsetRight);
            stretchBlock.find('>*').css('width', elWidth + offsetRight + 'px');
          }

          if (stretchBlock.hasClass('has-reset-mobile') && VLTJS.window.outerWidth() <= 768) {
            stretchBlock.find('>*').css({
              'margin-left': '',
              'margin-right': '',
              'width': '100%'
            });
          }
        }
      }
    }
  };
  VLTJS.stretchColumn.init();
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/column', VLTJS.stretchColumn.init);
  });
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/column', VLTJS.stickyColumn.init);
  });
})(jQuery);
/***********************************************
 * THEME: FIXED FOOTER
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof gsap == 'undefined') {
    return;
  }

  if (VLTJS.isMobileDevice()) {
    return;
  }

  VLTJS.fixedFooterEffect = {
    init: function () {
      var footer = $('.vlt-footer').filter('.vlt-footer--fixed');
      VLTJS.window.on('load resize', function () {
        var footerHeight = footer.outerHeight();

        if (footerHeight <= VLTJS.window.height()) {
          var leftValue = VLTJS.body.css('padding-left'),
              rightValue = VLTJS.body.css('padding-right'),
              bottomValue = VLTJS.body.css('padding-bottom') - footerHeight;
          footer.css({
            'position': 'fixed',
            'left': leftValue,
            'right': rightValue,
            'bottom': bottomValue || 0
          });
          VLTJS.body.css('padding-bottom', footerHeight);
        } else {
          VLTJS.body.css('padding-bottom', 0);
          footer.removeAttr('style');
        }
      });
    }
  };
  VLTJS.document.imagesLoaded(function () {
    VLTJS.fixedFooterEffect.init();
  });
  VLTJS.document.on('lazyloaded', function () {
    VLTJS.fixedFooterEffect.init();
  });
  VLTJS.debounceResize(function () {
    VLTJS.fixedFooterEffect.init();
  });
})(jQuery);
/***********************************************
 * THEME: FOLLOW INFO
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.followInfo = {
    init: function ($scope) {
      if (!$('.vlt-follow-info').length) {
        VLTJS.body.append('\
			<div class="vlt-follow-info">\
			<div class="vlt-follow-info__title"></div><br>\
			<div class="vlt-follow-info__subtitle"></div>\
			</div>\
			');
      }

      var getFollowInfo = $scope.find('[data-follow-info]'),
          followInfo = $('.vlt-follow-info'),
          title = followInfo.find('.vlt-follow-info__title'),
          subtitle = followInfo.find('.vlt-follow-info__subtitle');
      getFollowInfo.each(function () {
        var currentPortfolioItem = $(this);
        currentPortfolioItem.on('mousemove', function (e) {
          followInfo.css({
            top: e.clientY,
            left: e.clientX
          });
        });
        currentPortfolioItem.on({
          mouseenter: function () {
            var $this = $(this),
                title_text = $this.find('[data-follow-info-title]').html(),
                subtitle_text = $this.find('[data-follow-info-content]').html();

            if (!followInfo.hasClass('is-active')) {
              followInfo.addClass('is-active');
              title.html(title_text).wrapInner('<h5>');
              subtitle.html(subtitle_text).wrapInner('<span>');
            }
          },
          mouseleave: function () {
            if (followInfo.hasClass('is-active')) {
              followInfo.removeClass('is-active');
              title.html('');
              subtitle.html('');
            }
          }
        });
      });
    }
  };
  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-team-member.default', VLTJS.followInfo.init);
  });
  VLTJS.followInfo.init(VLTJS.body);
  VLTJS.document.on('init.vpf endLoadingNewItems.vpf', function (e) {
    VLTJS.followInfo.init(VLTJS.body);
  });
})(jQuery);
/***********************************************
 * THEME: IMAGES TOOLTIP
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof gsap == 'undefined') {
    return;
  }

  VLTJS.imagesTooltip = {
    init: function () {
      $('.vlt-hover-reveal').remove();
      $('[data-tooltip-image]').each(function (index) {
        var $this = $(this),
            size = $this.data('tooltip-size') ? $this.data('tooltip-size').split('x') : false,
            position = $this.data('tooltip-position') ? $this.data('tooltip-position') : 'center';
        VLTJS.body.append('<div class="vlt-hover-reveal" data-id="' + index + '"><div class="vlt-hover-reveal__inner"><div class="vlt-hover-reveal__img" style="background-image: url(' + $this.data('tooltip-image') + ');"></div></div></div>');

        if (size) {
          $('.vlt-hover-reveal').eq(index).css({
            'width': size[0] + 'px',
            'height': size[1] + 'px'
          });
        }

        var reveal = $('.vlt-hover-reveal[data-id="' + index + '"]'),
            revealInner = reveal.find('.vlt-hover-reveal__inner'),
            revealImg = reveal.find('.vlt-hover-reveal__img'),
            revealImgWidth = revealImg.outerWidth(),
            revealImgHeight = revealImg.outerHeight();

        function position_element(ev) {
          var mousePos = VLTJS.getMousePos(ev),
              docScrolls = {
            left: VLTJS.body.scrollLeft() + VLTJS.document.scrollLeft(),
            top: VLTJS.body.scrollTop() + VLTJS.document.scrollTop()
          };

          switch (position) {
            case 'top':
              gsap.set(reveal, {
                top: mousePos.y - docScrolls.top + 'px',
                left: mousePos.x - docScrolls.left + 'px'
              });
              break;

            case 'center':
              gsap.set(reveal, {
                top: mousePos.y - revealImgHeight * 0.5 - docScrolls.top + 'px',
                left: mousePos.x - revealImgWidth * 0.25 - docScrolls.left + 'px'
              });
              break;

            case 'bottom':
              gsap.set(reveal, {
                top: mousePos.y - revealImgHeight - docScrolls.top + 'px',
                left: mousePos.x - docScrolls.left + 'px'
              });
              break;
          }
        }

        function mouse_enter(ev) {
          position_element(ev);
          show_image();
        }

        function mouse_move(ev) {
          requestAnimationFrame(function () {
            position_element(ev);
          });
        }

        function mouse_leave() {
          hide_image();
        }

        $this.on('mouseenter', mouse_enter);
        $this.on('mousemove', mouse_move);
        $this.on('mouseleave', mouse_leave);

        function show_image() {
          gsap.killTweensOf(revealInner);
          gsap.killTweensOf(revealImg);
          gsap.timeline({
            onStart: function () {
              gsap.set(reveal, {
                opacity: 1
              });
            }
          }).fromTo(revealInner, 1, {
            x: '-100%'
          }, {
            x: '0%',
            ease: Quint.easeOut
          }).fromTo(revealImg, 1, {
            x: '100%'
          }, {
            x: '0%',
            ease: Quint.easeOut
          }, '-=1');
        }

        function hide_image() {
          gsap.killTweensOf(revealInner);
          gsap.killTweensOf(revealImg);
          gsap.timeline({
            onComplete: function () {
              gsap.set(reveal, {
                opacity: 0
              });
            }
          }).to(revealInner, 0.5, {
            x: '100%',
            ease: Quint.easeOut
          }).to(revealImg, 0.5, {
            x: '-100%',
            ease: Quint.easeOut
          }, '-=0.5');
        }
      });
    }
  };
  VLTJS.imagesTooltip.init();
  VLTJS.document.on('init.vpf endLoadingNewItems.vpf', function (e) {
    VLTJS.imagesTooltip.init();
  });
})(jQuery);
/***********************************************
 * THEME: ISOTOPE
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Isotope == 'undefined') {
    return;
  }

  VLTJS.initIsotope = {
    init: function () {
      $('.vlt-isotope-grid').each(function () {
        var $this = $(this),
            setLayout = $this.data('layout'),
            setXGap = $this.data('x-gap'),
            setYGap = $this.data('y-gap');
        $this.css('--vlt-gutter-x', `${setXGap}px`);
        $this.css('--vlt-gutter-y', `${setYGap}px`);
        var $grid = $this.isotope({
          itemSelector: '.grid-item',
          layoutMode: setLayout,
          masonry: {
            columnWidth: '.grid-sizer'
          },
          cellsByRow: {
            columnWidth: '.grid-sizer'
          }
        });
        VLTJS.document.on('lazyloaded vlt.plyr-ready', function () {
          $grid.isotope('layout');
        });
      });
    }
  };
  VLTJS.initIsotope.init();
})(jQuery);
/***********************************************
 * THEME: OFFCANVAS SIDEBAR
 ***********************************************/
(function ($) {
  'use strict';

  var sidebarIsOpen = false;
  VLTJS.offcanvasSidebar = {
    config: {
      easing: 'power2.out'
    },
    init: function () {
      var sidebar = $('.vlt-offcanvas-sidebar'),
          sidebarToggle = $('.js-offcanvas-sidebar-toggle'),
          sidebarClose = $('.js-offcanvas-sidebar-close'),
          siteOverlay = $('.vlt-site-overlay');
      sidebarToggle.on('click', function (e) {
        e.preventDefault();

        if (!sidebarIsOpen) {
          VLTJS.offcanvasSidebar.open_sidebar(sidebar, siteOverlay, sidebarToggle);
        } else {
          VLTJS.offcanvasSidebar.close_sidebar(sidebar, siteOverlay, sidebarToggle);
        }
      });
      sidebarClose.on('click', function (e) {
        e.preventDefault();

        if (sidebarIsOpen) {
          VLTJS.offcanvasSidebar.close_sidebar(sidebar, siteOverlay, sidebarToggle);
        }
      });
      siteOverlay.on('click', function (e) {
        e.preventDefault();

        if (sidebarIsOpen) {
          VLTJS.offcanvasSidebar.close_sidebar(sidebar, siteOverlay, sidebarToggle);
        }
      });
      VLTJS.throttleScroll(function (type, scroll) {
        var start = 300;

        if (scroll > start) {
          if (sidebarIsOpen) {
            VLTJS.offcanvasSidebar.close_sidebar(sidebar, siteOverlay, sidebarToggle);
          }
        }
      });
      VLTJS.document.on('vlt.close-offcanvas-sidebar', function () {
        if (sidebarIsOpen) {
          VLTJS.offcanvasSidebar.close_sidebar(sidebar, siteOverlay, sidebarToggle);
        }
      });
      VLTJS.document.on('keyup', function (e) {
        if (e.keyCode === 27 && sidebarIsOpen) {
          e.preventDefault();
          VLTJS.offcanvasSidebar.close_sidebar(sidebar, siteOverlay, sidebarToggle);
        }
      });
    },
    open_sidebar: function (sidebar, siteOverlay, sidebarToggle) {
      VLTJS.document.trigger('vlt.close-search-popup');
      VLTJS.document.trigger('vlt.close-fullscreen-menu');
      VLTJS.document.trigger('vlt.close-mobile-menu');
      VLTJS.document.trigger('vlt.close-offcanvas-menu');
      VLTJS.document.trigger('vlt.close-slide-menu');
      sidebarIsOpen = true;
      sidebar.addClass('is-open');
      sidebarToggle.addClass('is-open');
      siteOverlay.addClass('is-open');

      if (VLT_LOCALIZE_DATAS.open_click_sound && typeof Howl !== 'undefined') {
        new Howl({
          src: [VLT_LOCALIZE_DATAS.open_click_sound],
          autoplay: true,
          loop: false,
          volume: 0.3
        });
      }
    },
    close_sidebar: function (sidebar, siteOverlay, sidebarToggle) {
      sidebarIsOpen = false;
      sidebar.removeClass('is-open');
      sidebarToggle.removeClass('is-open');
      siteOverlay.removeClass('is-open');

      if (typeof VLT_LOCALIZE_DATAS.close_click_sound && typeof Howl !== 'undefined') {
        new Howl({
          src: [VLT_LOCALIZE_DATAS.close_click_sound],
          autoplay: true,
          loop: false,
          volume: 0.3
        });
      }
    }
  };
  VLTJS.offcanvasSidebar.init();
})(jQuery);
/***********************************************
 * THEME: PLYR
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Plyr === 'undefined') {
    return;
  }

  VLTJS.plyr = {
    init: function () {
      var audio = $('.vlt-post-media__audio'),
          video = $('.vlt-post-media__video');

      if (audio.length) {
        audio.each(function () {
          var audioPlayer = new Plyr($(this).find('.player'), {
            tooltips: {
              controls: true,
              seek: true
            }
          });
          audioPlayer.on('ready', function () {
            VLTJS.document.trigger('vlt.plyr-ready');
          });
        });
      }

      if (video.length) {
        video.each(function () {
          var videoPlayer = new Plyr($(this).find('.player'), {
            tooltips: {
              controls: true,
              seek: true
            },
            ratio: '16:9',
            youtube: {
              modestbranding: false
            }
          });
          videoPlayer.on('ready', function () {
            VLTJS.document.trigger('vlt.plyr-ready');
          });
        });
      }
    }
  };
  VLTJS.plyr.init();
  VLTJS.document.on('loadedNewItems.vpf', function (event, vpObject) {
    if ('vpf' !== event.namespace) {
      return;
    }

    VLTJS.plyr.init();
  });
})(jQuery);
/***********************************************
 * THEME: PORTFOLIO
 ***********************************************/
(function ($) {
  $('.elementor-widget-visual-portfolio').addClass('elementor-widget-theme-post-content');
  $('[data-vp-items-style="archee_product_style_1"]').addClass('woocommerce');
  VLTJS.document.on('beforeInitSwiper.vpf', function (event, vpObject, options) {
    if ('vpf' !== event.namespace) {
      return;
    }

    var setStretchToContainer = $(event.target).data('vp-slider-stretch-to-container');
    var setNavigationAnchor = $(event.target).data('vp-slider-navigation-anchor');

    if (setStretchToContainer && $('.container').length) {
      options.slidesOffsetBefore = $('.container').get(0).getBoundingClientRect().left + 15;
      options.slidesOffsetAfter = $('.container').get(0).getBoundingClientRect().left + 15;
    }

    if (setNavigationAnchor) {
      options.navigation = {
        nextEl: setNavigationAnchor + ' .vlt-swiper-button-next',
        prevEl: setNavigationAnchor + ' .vlt-swiper-button-prev'
      };
    }
  });
  VLTJS.document.on('initSwiper.vpf', function (event, vpObject, options) {
    if ('vpf' !== event.namespace) {
      return;
    }

    var setNavigationAnchor = $(event.target).data('vp-slider-navigation-anchor');

    if (setNavigationAnchor) {
      var swiper = vpObject.$items_wrap.parent()[0].swiper;
      swiper.on('resize slideChange', function () {
        var el = $(setNavigationAnchor),
            current = swiper.realIndex || 0,
            total = vpObject.$items_wrap.find('.swiper-slide:not(.swiper-slide-duplicate)').length,
            scale = (current + 1) / total;

        if (el.data('direction') == 'vertical') {
          el.find('.current').text(VLTJS.addLedingZero(current + 1));
          el.find('.total').text(VLTJS.addLedingZero(total));
        } else {
          el.find('.current').text(current + 1);
          el.find('.total').text(total);
        }

        if (el.length && el.find('.bar > span').length) {
          el.find('.bar > span')[0].style.setProperty('--scaleX', scale);
          el.find('.bar > span')[0].style.setProperty('--speed', swiper.params.speed + 'ms');
        }
      });
    }
  });
  VLTJS.document.on('init.vpf', function (e) {
    if (typeof gsap !== 'undefined') {
      $('[data-vp-pagination-type="load-more"]').each(function () {
        var loadMorePagination = $(this);
        loadMorePagination.find('.vp-pagination__item').mouseleave(function (e) {
          gsap.to(this, .3, {
            scale: 1
          });
          gsap.to(loadMorePagination.find('.vp-pagination__load-more'), .3, {
            scale: 1,
            x: 0,
            y: 0
          });
        });
        loadMorePagination.find('.vp-pagination__item').mouseenter(function (e) {
          gsap.to(this, .3, {
            transformOrigin: '0 0',
            scale: 1
          });
        });
        loadMorePagination.find('.vp-pagination__item').mousemove(function (e) {
          callParallax(e);
        });

        function callParallax(e) {
          parallaxIt(e, loadMorePagination.find('.vp-pagination__load-more'), 60);
        }

        function parallaxIt(e, target, movement) {
          var $this = loadMorePagination.find('.vp-pagination__item');
          var boundingRect = $this[0].getBoundingClientRect();
          var relX = e.pageX - boundingRect.left;
          var relY = e.pageY - boundingRect.top;
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          gsap.to(target, .3, {
            x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
            y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.width * movement
          });
        }
      });
    }
  });
  VLTJS.document.on('init.vpf endLoadingNewItems.vpf', function (e) {
    var portfolioItem = $(e.target).filter('[data-vp-items-style="archee_work_style_1"]').find('.vp-portfolio__item');
    var popupItems = $(e.target).filter('[data-vp-items-click-action="popup_gallery"]').find('.vp-portfolio__item-popup');

    if (portfolioItem.length) {
      portfolioItem.on('mouseenter', function () {
        portfolioItem.not($(this)).addClass('has-opacity');
      }).on('mouseleave', function () {
        portfolioItem.removeClass('has-opacity');
      });
    }

    if (popupItems.length) {
      popupItems.parents('.vp-portfolio__item-wrap').find('a').attr('rel', 'nofollow');
    }
  });
  VLTJS.document.on('init.vpf endLoadingNewItems.vpf', function (e) {
    var tiltPortfolio = $(e.target).filter('[data-vp-tilt-effect="true"]'),
        portfolioStyle = tiltPortfolio.attr('data-vp-items-style'),
        expectStyles = !/^default$/g.test(portfolioStyle),
        items = tiltPortfolio.find((expectStyles ? '.vp-portfolio__item' : '.vp-portfolio__item-img') + ':not(.vp-portfolio__item-tilt)');

    if (items.length) {
      items.each(function () {
        var $this = $(this),
            meta = $this.find('.vp-portfolio__item-meta-wrap');

        if (expectStyles && meta.length) {
          $this.on('change', function (e, transforms) {
            var x = 1.5 * parseFloat(transforms.tiltX);
            meta.css('transform', `translateX(${x}px)`);
          }).on('tilt.mouseLeave', function () {
            meta.css('transform', 'translateX(0)');
          });
        }

        $this.addClass('vp-portfolio__item-tilt').tilt({
          speed: 1000,
          disableAxis: 'x'
        });
      });
    }
  });
})(jQuery);
/***********************************************
 * THEME: SITE TO TOP
 ***********************************************/
(function ($) {
  'use strict';

  var backToTopBtn = $('.vlt-site-back-to-top');

  if (!backToTopBtn.length) {
    return;
  } // Back to top


  backToTopBtn.on('click', function (e) {
    e.preventDefault();
    setTimeout(function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 2);
  });
  var progressPath = backToTopBtn.find('path').get(0),
      pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

  function _update_progress() {
    var scroll = VLTJS.window.scrollTop(),
        height = VLTJS.document.outerHeight() - VLTJS.window.outerHeight(),
        progress = pathLength - scroll * pathLength / height;
    progressPath.style.strokeDashoffset = progress;
  }

  _update_progress();

  VLTJS.window.on('scroll', _update_progress);

  function _show_btn() {
    backToTopBtn.removeClass('is-hidden').addClass('is-visible');
  }

  function _hide_btn() {
    backToTopBtn.removeClass('is-visible').addClass('is-hidden');
  }

  _hide_btn();

  VLTJS.throttleScroll(function (type, scroll) {
    var offset = VLTJS.window.outerHeight() + 100;

    if (scroll > offset) {
      if (type === 'down') {
        _hide_btn();
      } else if (type === 'up') {
        _show_btn();
      }
    } else {
      _hide_btn();
    }
  });
})(jQuery);
/***********************************************
 * THEME: SITE FULLSCREEN
 ***********************************************/
(function ($) {
  'use strict';

  var isFullscreen = false;
  VLTJS.fullscreenSite = {
    init: function () {
      var fullscreenToggle = $('.js-site-fullscreen-toggle'),
          documentElement = document.documentElement;
      fullscreenToggle.on('click', function (e) {
        e.preventDefault();

        if (!isFullscreen) {
          VLTJS.fullscreenSite.open_fullscreen(fullscreenToggle, documentElement);
        } else {
          VLTJS.fullscreenSite.close_fullscreen(fullscreenToggle);
        }
      });
    },
    open_fullscreen: function (fullscreenToggle, documentElement) {
      isFullscreen = true;
      localStorage.setItem('fullscreenEnabled', "on");
      fullscreenToggle.addClass('is-open');

      if (documentElement.requestFullscreen) {
        documentElement.requestFullscreen();
      } else if (documentElement.mozRequestFullScreen) {
        /* Firefox */
        documentElement.mozRequestFullScreen();
      } else if (documentElement.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        documentElement.webkitRequestFullscreen();
      } else if (documentElement.msRequestFullscreen) {
        /* IE/Edge */
        documentElement.msRequestFullscreen();
      }
    },
    close_fullscreen: function (fullscreenToggle) {
      isFullscreen = false;
      localStorage.setItem('fullscreenEnabled', "off");
      fullscreenToggle.removeClass('is-open');

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  };
  VLTJS.fullscreenSite.init();
})(jQuery);
/***********************************************
 * THEME: PRELOADER
 ***********************************************/
(function ($) {
  'use strict';

  var preloader = $('.animsition'),
      preloaderStyle = preloader.data('animsition-style'),
      //animsition-bounce, animsition-image
  preloaderMarkup = false; // check if plugin defined

  if (typeof $.fn.animsition == 'undefined' || !preloader.length) {
    VLTJS.window.trigger('vlt.site-loaded');
    VLTJS.html.addClass('vlt-is-page-loaded');
    return;
  }

  switch (preloaderStyle) {
    case 'animsition-bounce':
      preloaderMarkup = '<span class="double-bounce-one"></span><span class="double-bounce-two"></span>';
      break;

    case 'animsition-image':
      preloaderMarkup = '<img src="' + VLT_LOCALIZE_DATAS.preloader_image + '" alt="preloader">';
      break;
  }

  preloader.animsition({
    inDuration: 500,
    outDuration: 500,
    loadingParentElement: 'html',
    linkElement: 'a:not(.remove):not(.vp-pagination__load-more):not(.elementor-accordion-title):not([href="javascript:;"]):not([role="slider"]):not([data-elementor-open-lightbox]):not([data-fancybox]):not([data-vp-filter]):not([target="_blank"]):not([href^="#"]):not([rel="nofollow"]):not([href~="#"]):not([href^=mailto]):not([href^=tel]):not(.sf-with-ul):not(.elementor-toggle-title)',
    loadingClass: preloaderStyle,
    loadingInner: preloaderMarkup
  });
  preloader.on('animsition.inEnd', function () {
    VLTJS.window.trigger('vlt.site-loaded');
    VLTJS.html.addClass('vlt-is-page-loaded');
  });
})(jQuery);
/***********************************************
 * THEME: SITE PROTECTION
 ***********************************************/
(function ($) {
  'use strict';

  if (!VLTJS.html.hasClass('vlt-is--site-protection')) {
    return;
  }

  var isClicked = false;
  VLTJS.document.bind('contextmenu', function (e) {
    e.preventDefault();

    if (!isClicked) {
      $('.vlt-site-protection').addClass('is-visible');
      VLTJS.body.addClass('is-right-clicked');
      isClicked = true;
    }

    VLTJS.document.on('mousedown', function () {
      $('.vlt-site-protection').removeClass('is-visible');
      VLTJS.body.removeClass('is-right-clicked');
      isClicked = false;
    });
    isClicked = false;
  });
})(jQuery);
/***********************************************
 * THEME: STICKY NAVBAR
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.stickyNavbar = {
    init: function () {
      var navbarMain = $('.vlt-header:not(.vlt-header--slide) .vlt-navbar--main');
      navbarMain.each(function () {
        var currentNavbar = $(this); // sticky navbar

        var navbarHeight = currentNavbar.length ? currentNavbar.outerHeight() : 0,
            navbarMainOffset = currentNavbar.hasClass('vlt-navbar--offset') ? VLTJS.window.outerHeight() : navbarHeight * 2; // fake navbar

        var navbarFake = $('<div class="vlt-fake-navbar">').hide();

        function _fixed_navbar() {
          currentNavbar.addClass('vlt-navbar--fixed');
          navbarFake.show();
        }

        function _unfixed_navbar() {
          currentNavbar.removeClass('vlt-navbar--fixed');
          navbarFake.hide();
        }

        function _on_scroll_navbar() {
          if (VLTJS.window.scrollTop() >= navbarMainOffset) {
            _fixed_navbar();
          } else {
            _unfixed_navbar();
          }
        }

        if (currentNavbar.hasClass('vlt-navbar--sticky')) {
          VLTJS.window.on('scroll resize', _on_scroll_navbar);

          _on_scroll_navbar(); // append fake navbar


          currentNavbar.after(navbarFake); // fake navbar height after resize

          navbarFake.height(currentNavbar.innerHeight());
          VLTJS.debounceResize(function () {
            navbarFake.height(currentNavbar.innerHeight());
          });
        } // hide navbar on scroll


        var navbarHideOnScroll = currentNavbar.filter('.vlt-navbar--hide-on-scroll');
        VLTJS.throttleScroll(function (type, scroll) {
          var start = 650;

          function _show_navbar() {
            navbarHideOnScroll.removeClass('vlt-on-scroll-hide').addClass('vlt-on-scroll-show');
          }

          function _hide_navbar() {
            navbarHideOnScroll.removeClass('vlt-on-scroll-show').addClass('vlt-on-scroll-hide');
          } // hide or show


          if (type === 'down' && scroll > start) {
            _hide_navbar();
          } else if (type === 'up' || type === 'end' || type === 'start') {
            _show_navbar();
          } // add solid color


          if (currentNavbar.hasClass('vlt-navbar--transparent') && currentNavbar.hasClass('vlt-navbar--sticky')) {
            scroll > navbarHeight * 2 ? currentNavbar.addClass('vlt-navbar--solid') : currentNavbar.removeClass('vlt-navbar--solid');
          } // sticky column fix


          if (currentNavbar.hasClass('vlt-navbar--fixed') && currentNavbar.hasClass('vlt-navbar--sticky') && !currentNavbar.hasClass('vlt-on-scroll-hide')) {
            VLTJS.html.addClass('vlt-is--header-fixed');
          } else {
            VLTJS.html.removeClass('vlt-is--header-fixed');
          }
        });
      });
    }
  };
  VLTJS.stickyNavbar.init();
})(jQuery);
/***********************************************
 * THEME: TIC TAC TOE
 ***********************************************/
(function ($) {
  'use strict';

  var ticTacToe = $('.vlt-tic-tac-toe'),
      sq1 = ticTacToe.find('#square1'),
      sq2 = ticTacToe.find('#square2'),
      sq3 = ticTacToe.find('#square3'),
      sq4 = ticTacToe.find('#square4'),
      sq5 = ticTacToe.find('#square5'),
      sq6 = ticTacToe.find('#square6'),
      sq7 = ticTacToe.find('#square7'),
      sq8 = ticTacToe.find('#square8'),
      sq9 = ticTacToe.find('#square9'),
      playValid = false;

  function validatePlay(squareplayed) {
    if ($(squareplayed).hasClass('free')) {
      playValid = true;
    } else {
      playValid = false;
      return false;
    }
  }

  function clearBoard() {
    ticTacToe.find('.tile').removeClass('played');
    ticTacToe.find('.tile').removeClass('o-mark');
    ticTacToe.find('.tile').removeClass('x-mark');
    ticTacToe.find('.tile').addClass('free');
    setTimeout(function () {
      ticTacToe.nextAll('.vlt-alert-message').fadeOut(500);
    }, 2000);
  }

  function winAlert(player) {
    if (player == 'x') {
      $('<div class="vlt-alert-message">' + VLT_LOCALIZE_DATAS.tic_tac_toe_win + '</div>').insertAfter(ticTacToe);
    } else {
      $('<div class="vlt-alert-message">' + VLT_LOCALIZE_DATAS.tic_tac_toe_lost + '</div>').insertAfter(ticTacToe);
    }

    clearBoard();
  }

  function checkWin() {
    if (sq1.hasClass('x-mark') && sq2.hasClass('x-mark') && sq3.hasClass('x-mark')) {
      winAlert('x');
    } else if (sq1.hasClass('o-mark') && sq2.hasClass('o-mark') && sq3.hasClass('o-mark')) {
      winAlert('o');
    } else if (sq4.hasClass('x-mark') && sq5.hasClass('x-mark') && sq6.hasClass('x-mark')) {
      winAlert('x');
    } else if (sq4.hasClass('o-mark') && sq5.hasClass('o-mark') && sq6.hasClass('o-mark')) {
      winAlert('o');
    } else if (sq7.hasClass('x-mark') && sq8.hasClass('x-mark') && sq9.hasClass('x-mark')) {
      winAlert('x');
    } else if (sq7.hasClass('o-mark') && sq8.hasClass('o-mark') && sq9.hasClass('o-mark')) {
      winAlert('o');
    } else if (sq1.hasClass('x-mark') && sq4.hasClass('x-mark') && sq7.hasClass('x-mark')) {
      winAlert('x');
    } else if (sq1.hasClass('o-mark') && sq4.hasClass('o-mark') && sq7.hasClass('o-mark')) {
      winAlert('o');
    } else if (sq5.hasClass('x-mark') && sq2.hasClass('x-mark') && sq8.hasClass('x-mark')) {
      winAlert('x');
    } else if (sq5.hasClass('o-mark') && sq2.hasClass('o-mark') && sq8.hasClass('o-mark')) {
      winAlert('o');
    } else if (sq6.hasClass('x-mark') && sq9.hasClass('x-mark') && sq3.hasClass('x-mark')) {
      winAlert('x');
    } else if (sq6.hasClass('o-mark') && sq9.hasClass('o-mark') && sq3.hasClass('o-mark')) {
      winAlert('o');
    } else if (sq1.hasClass('x-mark') && sq5.hasClass('x-mark') && sq9.hasClass('x-mark')) {
      winAlert('x');
    } else if (sq1.hasClass('o-mark') && sq5.hasClass('o-mark') && sq9.hasClass('o-mark')) {
      winAlert('o');
    } else if (sq5.hasClass('x-mark') && sq7.hasClass('x-mark') && sq3.hasClass('x-mark')) {
      winAlert('x');
    } else if (sq5.hasClass('o-mark') && sq7.hasClass('o-mark') && sq3.hasClass('o-mark')) {
      winAlert('o');
    }
  }

  function checkDraw() {
    if (!ticTacToe.find('.tile').hasClass('free')) {
      $('<div class="vlt-alert-message">' + VLT_LOCALIZE_DATAS.tic_tac_toe_draw + '</div>').insertAfter(ticTacToe);
      clearBoard();
    }
  }

  function Oplay() {
    // Function for when O plays tactically
    function Oplaying(square) {
      validatePlay(square);

      if (playValid) {
        square.removeClass('free');
        square.addClass('played');
        square.addClass('o-mark');
      } else {
        Orandomplay();
      }
    } // Function for when O plays randomly


    function Orandomplay() {
      for (var i = 0; i < 10; i++) {
        // Loop to find a valid play
        var randomNumber = Math.floor(Math.random() * 9 + 1);
        var randomSquare = $('#square' + randomNumber);
        validatePlay(randomSquare);

        if (playValid) {
          randomSquare.removeClass('free');
          randomSquare.addClass('played');
          randomSquare.addClass('o-mark');
          break;
        }
      }
    } // Tactical Plays


    var win123_sq3 = (sq1.hasClass('x-mark') && sq2.hasClass('x-mark') || sq1.hasClass('o-mark') && sq2.hasClass('o-mark')) && !sq3.hasClass('played'),
        win123_sq2 = (sq1.hasClass('x-mark') && sq3.hasClass('x-mark') || sq1.hasClass('o-mark') && sq3.hasClass('o-mark')) && !sq2.hasClass('played'),
        win123_sq1 = (sq3.hasClass('x-mark') && sq2.hasClass('x-mark') || sq3.hasClass('o-mark') && sq2.hasClass('o-mark')) && !sq1.hasClass('played'),
        win456_sq6 = (sq4.hasClass('x-mark') && sq5.hasClass('x-mark') || sq4.hasClass('o-mark') && sq5.hasClass('o-mark')) && !sq6.hasClass('played'),
        win456_sq5 = (sq4.hasClass('x-mark') && sq6.hasClass('x-mark') || sq4.hasClass('o-mark') && sq6.hasClass('o-mark')) && !sq5.hasClass('played'),
        win456_sq4 = (sq5.hasClass('x-mark') && sq6.hasClass('x-mark') || sq5.hasClass('o-mark') && sq6.hasClass('o-mark')) && !sq4.hasClass('played'),
        win789_sq9 = (sq7.hasClass('x-mark') && sq8.hasClass('x-mark') || sq7.hasClass('o-mark') && sq8.hasClass('o-mark')) && !sq9.hasClass('played'),
        win789_sq8 = (sq7.hasClass('x-mark') && sq9.hasClass('x-mark') || sq7.hasClass('o-mark') && sq9.hasClass('o-mark')) && !sq8.hasClass('played'),
        win789_sq7 = (sq8.hasClass('x-mark') && sq9.hasClass('x-mark') || sq8.hasClass('o-mark') && sq9.hasClass('o-mark')) && !sq7.hasClass('played'),
        win147_sq7 = (sq1.hasClass('x-mark') && sq4.hasClass('x-mark') || sq1.hasClass('o-mark') && sq4.hasClass('o-mark')) && !sq7.hasClass('played'),
        win147_sq4 = (sq1.hasClass('x-mark') && sq7.hasClass('x-mark') || sq1.hasClass('o-mark') && sq7.hasClass('o-mark')) && !sq4.hasClass('played'),
        win147_sq1 = (sq4.hasClass('x-mark') && sq7.hasClass('x-mark') || sq4.hasClass('o-mark') && sq7.hasClass('o-mark')) && !sq1.hasClass('played'),
        win528_sq8 = (sq5.hasClass('x-mark') && sq2.hasClass('x-mark') || sq5.hasClass('o-mark') && sq2.hasClass('o-mark')) && !sq8.hasClass('played'),
        win528_sq2 = (sq5.hasClass('x-mark') && sq8.hasClass('x-mark') || sq5.hasClass('o-mark') && sq8.hasClass('o-mark')) && !sq2.hasClass('played'),
        win528_sq5 = (sq2.hasClass('x-mark') && sq8.hasClass('x-mark') || sq2.hasClass('o-mark') && sq8.hasClass('o-mark')) && !sq5.hasClass('played'),
        win693_sq3 = (sq6.hasClass('x-mark') && sq9.hasClass('x-mark') || sq6.hasClass('o-mark') && sq9.hasClass('o-mark')) && !sq3.hasClass('played'),
        win693_sq9 = (sq6.hasClass('x-mark') && sq3.hasClass('x-mark') || sq6.hasClass('o-mark') && sq3.hasClass('o-mark')) && !sq9.hasClass('played'),
        win693_sq6 = (sq9.hasClass('x-mark') && sq3.hasClass('x-mark') || sq9.hasClass('o-mark') && sq3.hasClass('o-mark')) && !sq6.hasClass('played'),
        win159_sq9 = (sq1.hasClass('x-mark') && sq5.hasClass('x-mark') || sq1.hasClass('o-mark') && sq5.hasClass('o-mark')) && !sq9.hasClass('played'),
        win159_sq5 = (sq1.hasClass('x-mark') && sq9.hasClass('x-mark') || sq1.hasClass('o-mark') && sq9.hasClass('o-mark')) && !sq5.hasClass('played'),
        win159_sq1 = (sq5.hasClass('x-mark') && sq9.hasClass('x-mark') || sq5.hasClass('o-mark') && sq9.hasClass('o-mark')) && !sq1.hasClass('played'),
        win573_sq3 = (sq5.hasClass('x-mark') && sq7.hasClass('x-mark') || sq5.hasClass('o-mark') && sq7.hasClass('o-mark')) && !sq3.hasClass('played'),
        win573_sq5 = (sq5.hasClass('x-mark') && sq3.hasClass('x-mark') || sq5.hasClass('o-mark') && sq3.hasClass('o-mark')) && !sq5.hasClass('played'),
        win573_sq7 = (sq7.hasClass('x-mark') && sq3.hasClass('x-mark') || sq7.hasClass('o-mark') && sq3.hasClass('o-mark')) && !sq7.hasClass('played'); // Win 1 2 3

    if (win123_sq3) {
      Oplaying(sq3);
    } else if (win123_sq2) {
      Oplaying(sq2);
    } else if (win123_sq1) {
      Oplaying(sq1);
    } // Win 4 5 6
    else if (win456_sq6) {
      Oplaying(sq6);
    } else if (win456_sq5) {
      Oplaying(sq5);
    } else if (win456_sq4) {
      Oplaying(sq4);
    } // Win 7 8 9
    else if (win789_sq9) {
      Oplaying(sq9);
    } else if (win789_sq8) {
      Oplaying(sq8);
    } else if (win789_sq7) {
      Oplaying(sq7);
    } // Win 1 4 7
    else if (win147_sq7) {
      Oplaying(sq7);
    } else if (win147_sq4) {
      Oplaying(sq4);
    } else if (win147_sq1) {
      Oplaying(sq1);
    } // Win 5 2 8
    else if (win528_sq8) {
      Oplaying(sq8);
    } else if (win528_sq2) {
      Oplaying(sq2);
    } else if (win528_sq5) {
      Oplaying(sq5);
    } // Win 6 9 3
    else if (win693_sq3) {
      Oplaying(sq3);
    } else if (win693_sq9) {
      Oplaying(sq9);
    } else if (win693_sq6) {
      Oplaying(sq6);
    } // Win 1 5 9
    else if (win159_sq9) {
      Oplaying(sq9);
    } else if (win159_sq5) {
      Oplaying(sq5);
    } else if (win159_sq1) {
      Oplaying(sq1);
    } // Win 5 7 3
    else if (win573_sq3) {
      Oplaying(sq3);
    } else if (win573_sq7) {
      Oplaying(sq7);
    } else if (win573_sq5) {
      Oplaying(sq5);
    } else {
      Orandomplay();
    }

    checkDraw();
    checkWin();
  }

  ticTacToe.find('.tile').on('click', function Xplay() {
    validatePlay(this);

    if (playValid) {
      $(this).removeClass('free');
      $(this).addClass('played');
      $(this).addClass('x-mark');
      checkDraw();
      checkWin();
      Oplay();
    }
  });
  Oplay();
})(jQuery);
/***********************************************
 * THEME: TIPPY
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof tippy === 'undefined') {
    return;
  }

  VLTJS.tippy = {
    init: function () {
      tippy('[data-tippy-content]:not(.vlt-showcase-item)', {
        theme: 'vlt',
        animation: 'fade',
        delay: 500,
        hideOnClick: true,
        allowHTML: true
      });
    }
  };
  VLTJS.tippy.init();
})(jQuery);
/***********************************************
 * THEME: VERTICAL LINES
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.verticalLines = {
    init: function () {
      var $element = $('.has-vertical-lines');

      if ($element.length) {
        $element.each(function () {
          $(this).prepend('<div class="vlt-vertical-lines"><div></div><div></div><div></div></div>');
        });
      }
    }
  };
  VLTJS.verticalLines.init();
})(jQuery);
/***********************************************
 * THEME: WOOCOMMERCE
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.wooCommerce = {
    init: function () {
      VLTJS.document.on('click', '.vlt-quantity .plus, .vlt-quantity .minus', function () {
        var $this = $(this),
            $qty = $this.siblings('.qty'),
            current = parseInt($qty.val(), 10),
            min = parseInt($qty.attr('min'), 10),
            max = parseInt($qty.attr('max'), 10),
            step = parseInt($qty.attr('step'), 10);
        min = min ? min : 1;
        max = max ? max : current + step;

        if ($this.hasClass('minus') && current > min) {
          $qty.val(current - step);
          $qty.trigger('change');
        }

        if ($this.hasClass('plus') && current < max) {
          $qty.val(current + step);
          $qty.trigger('change');
        }

        return false;
      });
    }
  };
  VLTJS.wooCommerce.init();
})(jQuery);
/***********************************************
 * SHOWCASE: STYLE 1
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  var showcaseStyle1 = function ($scope, $) {
    var showcase = $scope.find('.vlt-showcase--style-1'),
        anchor = showcase.data('navigation-anchor');
    var swiper = new Swiper(showcase, {
      init: false,
      speed: 1500,
      loop: false,
      parallax: true,
      grabCursor: true,
      mousewheel: true,
      spaceBetween: 0,
      slidesPerView: 1,
      navigation: {
        nextEl: $(anchor).find('.vlt-swiper-button-next'),
        prevEl: $(anchor).find('.vlt-swiper-button-prev')
      },
      pagination: {
        el: $(anchor).find('.vlt-swiper-pagination'),
        clickable: false,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + '<span class="sep">/</span>' + '<span class="' + totalClass + '"></span>';
        }
      }
    });
    showcase.find('.vlt-btn').on('mouseenter', function () {
      showcase.addClass('is-hover');
    }).on('mouseleave', function () {
      showcase.removeClass('is-hover');
    });
    swiper.on('init slideChange', function () {
      var el = $(anchor).find('.vlt-swiper-progress'),
          current = swiper.realIndex,
          total = showcase.find('.swiper-slide').not('.swiper-slide-duplicate').length,
          scale = (current + 1) / total;

      if (el.data('direction') == 'vertical') {
        el.find('.current').text(VLTJS.addLedingZero(current + 1));
        el.find('.total').text(VLTJS.addLedingZero(total));
      } else {
        el.find('.current').text(current + 1);
        el.find('.total').text(total);
      }

      if (el.length && el.find('.bar > span').length) {
        el.find('.bar > span')[0].style.setProperty('--scaleX', scale);
        el.find('.bar > span')[0].style.setProperty('--speed', swiper.params.speed + 'ms');
      }
    });
    swiper.init();
  };

  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-showcase-1.default', showcaseStyle1);
  });
})(jQuery);
/***********************************************
 * SHOWCASE: STYLE 10
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  var showcaseStyle10 = function ($scope, $) {
    var showcase = $scope.find('.vlt-showcase--style-10'),
        anchor = showcase.data('navigation-anchor'),
        gap = showcase.data('gap') || 0;
    var swiper = new Swiper(showcase, {
      init: false,
      lazy: true,
      loop: false,
      spaceBetween: gap,
      mousewheel: {
        releaseOnEdges: true
      },
      slidesPerView: 1,
      speed: 1000,
      grabCursor: true,
      touchReleaseOnEdges: true,
      breakpoints: {
        // when window width is >= 576px
        576: {
          slidesPerView: 1
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2
        },
        // when window width is >= 992px
        992: {
          slidesPerView: 3
        }
      },
      navigation: {
        nextEl: $(anchor).find('.vlt-swiper-button-next'),
        prevEl: $(anchor).find('.vlt-swiper-button-prev')
      },
      pagination: {
        el: $(anchor).find('.vlt-swiper-pagination'),
        clickable: false,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + '<span class="sep">/</span>' + '<span class="' + totalClass + '"></span>';
        }
      }
    });
    VLTJS.document.on('keyup', function (e) {
      if (e.keyCode == 37) {
        // left
        swiper.slidePrev();
      } else if (e.keyCode == 39) {
        // right
        swiper.slideNext();
      }
    });
    swiper.on('init slideChange', function () {
      var el = $(anchor).find('.vlt-swiper-progress'),
          current = swiper.realIndex,
          total = showcase.find('.swiper-slide').not('.swiper-slide-duplicate').length,
          scale = (current + 1) / total;

      if (el.data('direction') == 'vertical') {
        el.find('.current').text(VLTJS.addLedingZero(current + 1));
        el.find('.total').text(VLTJS.addLedingZero(total));
      } else {
        el.find('.current').text(current + 1);
        el.find('.total').text(total);
      }

      if (el.length && el.find('.bar > span').length) {
        el.find('.bar > span')[0].style.setProperty('--scaleX', scale);
        el.find('.bar > span')[0].style.setProperty('--speed', swiper.params.speed + 'ms');
      }
    });
    swiper.init();
  };

  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-showcase-10.default', showcaseStyle10);
  });
})(jQuery);
/***********************************************
 * SHOWCASE: STYLE 11
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof tippy === 'undefined') {
    return;
  }

  var showcaseStyle11 = function ($scope, $) {
    var showcase = $scope.find('.vlt-showcase--style-11'),
        item = showcase.find('.vlt-showcase-item');
    item.each(function () {
      tippy(this, {
        arrow: false,
        distance: '1rem',
        duration: [500, 0],
        maxWidth: 630,
        theme: 'showcase-11',
        allowHTML: true
      });
    });
  };

  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-showcase-11.default', showcaseStyle11);
  });
})(jQuery);
/***********************************************
* SHOWCASE: STYLE 12
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  var showcaseStyle12 = function ($scope, $) {
    var showcase = $scope.find('.vlt-showcase--style-12'),
        showcaseInfo = showcase.find('.vlt-showcase-info'),
        listItem = showcase.find('.vlt-showcase-link');
    var swiper = new Swiper(showcaseInfo, {
      init: false,
      lazy: true,
      spaceBetween: 30,
      speed: 1000,
      allowTouchMove: false
    });
    swiper.init();
    listItem.eq(0).addClass('is-active');
    listItem.on('mouseenter', function () {
      var $this = $(this);
      listItem.removeClass('is-active');
      $this.addClass('is-active');
      swiper.slideTo($this.index());
    });
  };

  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-showcase-12.default', showcaseStyle12);
  });
})(jQuery);
/***********************************************
 * SHOWCASE: STYLE 13
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  var showcaseStyle13 = function ($scope, $) {
    var showcase = $scope.find('.vlt-showcase--style-13'),
        links = showcase.find('.vlt-showcase-links'),
        images = showcase.find('.vlt-showcase-images'),
        anchor = showcase.data('navigation-anchor');
    var swiperImages = new Swiper(images, {
      init: false,
      loop: false,
      lazy: true,
      spaceBetween: 0,
      slidesPerView: 1,
      speed: 1000,
      mousewheel: true
    });
    var swiperLinks = new Swiper(links, {
      init: false,
      loop: false,
      spaceBetween: 0,
      slidesPerView: 'auto',
      speed: 1000,
      mousewheel: true,
      centeredSlides: true,
      navigation: {
        nextEl: $(anchor).find('.vlt-swiper-button-next'),
        prevEl: $(anchor).find('.vlt-swiper-button-prev')
      },
      pagination: {
        el: $(anchor).find('.vlt-swiper-pagination'),
        clickable: false,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + '<span class="sep">/</span>' + '<span class="' + totalClass + '"></span>';
        }
      }
    });
    swiperImages.controller.control = swiperLinks;
    swiperLinks.controller.control = swiperImages;
    VLTJS.document.on('keyup', function (e) {
      if (e.keyCode == 37) {
        // left
        swiperImages.slidePrev();
      } else if (e.keyCode == 39) {
        // right
        swiperImages.slideNext();
      }
    });
    swiperImages.on('init slideChange', function () {
      var el = $(anchor).find('.vlt-swiper-progress'),
          current = swiperImages.realIndex,
          total = images.find('.swiper-slide').not('.swiper-slide-duplicate').length,
          scale = (current + 1) / total;

      if (el.data('direction') == 'vertical') {
        el.find('.current').text(VLTJS.addLedingZero(current + 1));
        el.find('.total').text(VLTJS.addLedingZero(total));
      } else {
        el.find('.current').text(current + 1);
        el.find('.total').text(total);
      }

      if (el.length && el.find('.bar > span').length) {
        el.find('.bar > span')[0].style.setProperty('--scaleX', scale);
        el.find('.bar > span')[0].style.setProperty('--speed', swiperImages.params.speed + 'ms');
      }
    });
    swiperImages.init();
    swiperLinks.init();
  };

  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-showcase-13.default', showcaseStyle13);
  });
})(jQuery);
/***********************************************
 * SHOWCASE: STYLE 2
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  var showcaseStyle2 = function ($scope, $) {
    var showcase = $scope.find('.vlt-showcase--style-2'),
        anchor = showcase.data('navigation-anchor');
    var swiper = new Swiper(showcase, {
      init: false,
      direction: 'vertical',
      lazy: true,
      loop: false,
      parallax: true,
      slidesPerView: 1,
      mousewheel: true,
      grabCursor: true,
      speed: 1000,
      navigation: {
        nextEl: $(anchor).find('.vlt-swiper-button-next'),
        prevEl: $(anchor).find('.vlt-swiper-button-prev')
      },
      pagination: {
        el: $(anchor).find('.vlt-swiper-pagination'),
        clickable: false,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + '<span class="sep">/</span>' + '<span class="' + totalClass + '"></span>';
        }
      }
    });
    VLTJS.document.on('keyup', function (e) {
      if (e.keyCode == 37) {
        // left
        swiper.slidePrev();
      } else if (e.keyCode == 39) {
        // right
        swiper.slideNext();
      }
    });
    swiper.on('init slideChange', function () {
      var el = $(anchor).find('.vlt-swiper-progress'),
          current = swiper.realIndex,
          total = showcase.find('.swiper-slide').not('.swiper-slide-duplicate').length,
          scale = (current + 1) / total;

      if (el.data('direction') == 'vertical') {
        el.find('.current').text(VLTJS.addLedingZero(current + 1));
        el.find('.total').text(VLTJS.addLedingZero(total));
      } else {
        el.find('.current').text(current + 1);
        el.find('.total').text(total);
      }

      if (el.length && el.find('.bar > span').length) {
        el.find('.bar > span')[0].style.setProperty('--scaleX', scale);
        el.find('.bar > span')[0].style.setProperty('--speed', swiper.params.speed + 'ms');
      }
    });
    swiper.init();
  };

  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-showcase-2.default', showcaseStyle2);
  });
})(jQuery);
/***********************************************
 * SHOWCASE: STYLE 3
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  var showcaseStyle3 = function ($scope, $) {
    var showcase = $scope.find('.vlt-showcase--style-3'),
        anchor = showcase.data('navigation-anchor');
    var swiper = new Swiper(showcase, {
      init: false,
      direction: 'vertical',
      lazy: true,
      loop: false,
      parallax: true,
      mousewheel: {
        releaseOnEdges: true
      },
      slidesPerView: 1,
      speed: 1000,
      grabCursor: true,
      touchReleaseOnEdges: true,
      navigation: {
        nextEl: $(anchor).find('.vlt-swiper-button-next'),
        prevEl: $(anchor).find('.vlt-swiper-button-prev')
      },
      pagination: {
        el: $(anchor).find('.vlt-swiper-pagination'),
        clickable: false,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + '<span class="sep">/</span>' + '<span class="' + totalClass + '"></span>';
        }
      }
    });
    swiper.on('init slideChange', function () {
      var el = $(anchor).find('.vlt-swiper-progress'),
          current = swiper.realIndex,
          total = showcase.find('.swiper-slide').not('.swiper-slide-duplicate').length,
          scale = (current + 1) / total;

      if (el.data('direction') == 'vertical') {
        el.find('.current').text(VLTJS.addLedingZero(current + 1));
        el.find('.total').text(VLTJS.addLedingZero(total));
      } else {
        el.find('.current').text(current + 1);
        el.find('.total').text(total);
      }

      if (el.length && el.find('.bar > span').length) {
        el.find('.bar > span')[0].style.setProperty('--scaleX', scale);
        el.find('.bar > span')[0].style.setProperty('--speed', swiper.params.speed + 'ms');
      }
    });
    swiper.init();
  };

  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-showcase-3.default', showcaseStyle3);
  });
})(jQuery);
/***********************************************
 * SHOWCASE: STYLE 4
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  var showcaseStyle4 = function ($scope, $) {
    var showcase = $scope.find('.vlt-showcase--style-4'),
        links = showcase.find('.vlt-showcase-links'),
        images = showcase.find('.vlt-showcase-images'); // add active class

    links.find('li').eq(0).addClass('is-active');
    var swiper = new Swiper(images, {
      loop: false,
      effect: 'fade',
      lazy: true,
      slidesPerView: 1,
      allowTouchMove: false,
      speed: 1000,
      on: {
        init: function () {
          links.on('mouseenter', 'li', function (e) {
            e.preventDefault();
            var currentLink = $(this);
            links.find('li').removeClass('is-active');
            currentLink.addClass('is-active');
            swiper.slideTo(currentLink.index());
          });
        }
      }
    });
  };

  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-showcase-4.default', showcaseStyle4);
  });
})(jQuery);
/***********************************************
 * SHOWCASE: STYLE 5
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  var showcaseStyle5 = function ($scope, $) {
    var showcase = $scope.find('.vlt-showcase--style-5'),
        anchor = showcase.data('navigation-anchor');
    var swiper = new Swiper(showcase, {
      init: false,
      direction: 'vertical',
      lazy: true,
      loop: false,
      grabCursor: true,
      mousewheel: {
        releaseOnEdges: true
      },
      slidesPerView: 1,
      speed: 1000,
      touchReleaseOnEdges: true,
      navigation: {
        nextEl: $(anchor).find('.vlt-swiper-button-next'),
        prevEl: $(anchor).find('.vlt-swiper-button-prev')
      },
      pagination: {
        el: $(anchor).find('.vlt-swiper-pagination'),
        clickable: false,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + '<span class="sep">/</span>' + '<span class="' + totalClass + '"></span>';
        }
      }
    });
    showcase.find('.vlt-btn').on('mouseenter', function () {
      showcase.addClass('is-hover');
    }).on('mouseleave', function () {
      showcase.removeClass('is-hover');
    });
    swiper.on('init slideChange', function () {
      var el = $(anchor).find('.vlt-swiper-progress'),
          current = swiper.realIndex,
          total = showcase.find('.swiper-slide').not('.swiper-slide-duplicate').length,
          scale = (current + 1) / total;

      if (el.data('direction') == 'vertical') {
        el.find('.current').text(VLTJS.addLedingZero(current + 1));
        el.find('.total').text(VLTJS.addLedingZero(total));
      } else {
        el.find('.current').text(current + 1);
        el.find('.total').text(total);
      }

      if (el.length && el.find('.bar > span').length) {
        el.find('.bar > span')[0].style.setProperty('--scaleX', scale);
        el.find('.bar > span')[0].style.setProperty('--speed', swiper.params.speed + 'ms');
      }
    });
    swiper.init();
  };

  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-showcase-5.default', showcaseStyle5);
  });
})(jQuery);
/***********************************************
 * SHOWCASE: STYLE 6
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  var showcaseStyle6 = function ($scope, $) {
    var showcase = $scope.find('.vlt-showcase--style-6'),
        images = showcase.find('.vlt-showcase-images'),
        links = showcase.find('.vlt-showcase-links'); // add active class

    links.find('li').eq(0).addClass('is-active');
    new Swiper(links, {
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      mousewheel: true
    });
    var swiper = new Swiper(images, {
      loop: false,
      effect: 'fade',
      lazy: true,
      slidesPerView: 1,
      allowTouchMove: false,
      speed: 1000,
      on: {
        init: function () {
          links.on('mouseenter', 'li', function (e) {
            e.preventDefault();
            var currentLink = $(this);
            links.find('li').removeClass('is-active');
            currentLink.addClass('is-active');
            swiper.slideTo(currentLink.index());
          });
        }
      }
    });
  };

  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-showcase-6.default', showcaseStyle6);
  });
})(jQuery);
/***********************************************
 * SHOWCASE: STYLE 8
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  var showcaseStyle8 = function ($scope, $) {
    var showcase = $scope.find('.vlt-showcase--style-8'),
        anchor = showcase.data('navigation-anchor');
    var swiper = new Swiper(showcase, {
      init: false,
      speed: 1000,
      loop: false,
      grabCursor: true,
      initialSlide: 1,
      spaceBetween: 0,
      direction: 'vertical',
      centeredSlides: true,
      slidesPerView: 'auto',
      mousewheel: true,
      navigation: {
        nextEl: $(anchor).find('.vlt-swiper-button-next'),
        prevEl: $(anchor).find('.vlt-swiper-button-prev')
      },
      pagination: {
        el: $(anchor).find('.vlt-swiper-pagination'),
        clickable: false,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + '<span class="sep">/</span>' + '<span class="' + totalClass + '"></span>';
        }
      }
    });
    swiper.on('init slideChange', function () {
      var el = $(anchor).find('.vlt-swiper-progress'),
          current = swiper.realIndex,
          total = showcase.find('.swiper-slide:not(.swiper-slide-duplicate)').length,
          scale = (current + 1) / total;

      if (el.data('direction') == 'vertical') {
        el.find('.current').text(VLTJS.addLedingZero(current + 1));
        el.find('.total').text(VLTJS.addLedingZero(total));
      } else {
        el.find('.current').text(current + 1);
        el.find('.total').text(total);
      }

      if (el.length && el.find('.bar > span').length) {
        el.find('.bar > span')[0].style.setProperty('--scaleX', scale);
        el.find('.bar > span')[0].style.setProperty('--speed', swiper.params.speed + 'ms');
      }
    });
    swiper.init();
  };

  VLTJS.window.on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/vlt-showcase-8.default', showcaseStyle8);
  });
})(jQuery);