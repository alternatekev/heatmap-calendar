( function( $ ) {

window.calypsoux = $.extend({}, window.calypsoux, {

  initPosts: function() {
    // Posts Page
    if ( location.href.match( 'posts' ) ) {
      calypsoux.bindPostEvents();

      if (typeof location.href.split('/')[4] !== 'undefined' && location.href.split('/')[4].length > 0) {
        $('body').addClass('single-site');
      }
    }

    // Editor Page
    if ( location.href.match( 'post' ) ) {
      calypsoux.autofillEditor();
    }
  },

  bindPostEvents: function() {
    calypsoux.clickEvent = (Modernizr.touch) ? 'touchstart' : 'click';

    if (Modernizr.touch) {
      // // swipe post
      // var hammertime = new Hammer( $('#posts-multisite')[0] );
      // hammertime.on('hammer.input', function(e) {
      //   var $post = $(e.target).closest('.post');
      //
      //   if (e.direction == 2) { // swipe left
      //     $post.addClass('swipped');
      //   } else if (e.direction == 4) { // swipe right
      //     $post.removeClass('swipped');
      //   }
      // });

      FastClick.attach(document.body);
    }

    $('.dd-toggle')
			.on( 'click', calypsoux.toggleDropdowns );

    $('.post')
      .on( 'click', '.post-content_con, .footer-meta', calypsoux.showReaderModalAlert )
      .on( 'click', '.author-link', calypsoux.showAuthorAlert )
      .on( 'click', '.site-link', calypsoux.showSiteAlert )
      .on( 'click', '.post-control--more, .post-control--back', calypsoux.togglePostMoreOptions )
      .on( 'click', '.post-control--trash', calypsoux.trashPost )
      .on( 'click', '.post-control--undo', calypsoux.undoTrashPost )
      .on( 'click', '.post-control--publish', calypsoux.publishPost )
      .on( 'click', '.general-alert', calypsoux.showGeneralAlert );
  },

  toggleDropdowns: function( e ) {
    var $target = (e.target.nodeName != 'A') ? $(e.target).closest('a') : $(e.target),
        $dropdown = $target.siblings('.dropdown');

		$target.toggleClass('active')
    $dropdown.toggleClass('in');

    if ($dropdown.hasClass('in')) {
      $( 'html' )
        .on( 'click', function(e) {
          if ($('.dropdown.in').length) {
            $dropdown.removeClass('in');
          }
        });
    } else {
      $( 'html' ).off( 'click' );
    }

		return false;
	},

  togglePostControls: function( e ) {
    var $post = $(e.target).closest('.post');

    $post.toggleClass('touch-opened');
  },

  togglePostMoreOptions: function( e ) {
    var $post = $(e.target).closest('.post');

    $post.toggleClass('show-more-options');

    return false;
  },

  autofillEditor: function() {
    var qParams = calypsoux.getQueryParams();

    if (!$.isEmptyObject(qParams)) {
      if (!!qParams.title) $('#title').val( qParams.title );
      if (!!qParams.editor) $('.tiny-mce').val( decodeURIComponent(qParams.editor) );
    }
  },

  getQueryParams: function() {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1),
        urlParams = {};

    while (match = search.exec(query)) {
      urlParams[decode(match[1])] = decode(match[2]);
    }

    return urlParams;
  },

  showReaderModalAlert: function( e ) {
    var alertMsg = 'Open reader style modal of post';

    if ($(e.target).hasClass('noticon-comment')) {
      alertMsg += ' linked to comments';
    }

    alert(alertMsg);

    return false;
  },

  showAuthorAlert: function( e ) {
    alert('Show post list filtered by author');

    return false;
  },

  showSiteAlert: function( e ) {
    alert('Show single site post list');

    return false;
  },

  trashPost: function( e ) {
    var $post = $(e.target).closest('.post');

    $post.addClass('post--updated');

    return false;
  },

  undoTrashPost: function( e ) {
    var $post = $(e.target).closest('.post'),
        $alert = $post.find('.conf-alert_con').first();

    $post.addClass('post--alert-trans').removeClass('post--trashed');

    setTimeout(function() {
      $alert.html('<span class="conf-alert_title">Post Updated</span>');
      $post.removeClass('post--alert-trans').addClass('post--undone');

      calypsoux.redrawDefaultTrashConfirmation( $post, $alert );
    }, 300);

    return false;
  },

  redrawDefaultTrashConfirmation: function($post, $alert, cbFn) {
    setTimeout(function() {
      $post.removeClass('post--updated show-more-options');
      setTimeout(function() {
        $post.removeClass('post--undone post--published');
        $alert.html('<span class="conf-alert_title">Moved to Trash</span><a href="#" class="post-control--undo undo"><span>undo</span></a>');
      }, 300);
    }, 1200);

    if (typeof cbFn === 'function') cbFn();
  },

  showGeneralAlert: function( e ) {
    var $target = (!$(e.target).hasClass('general-alert')) ? $(e.target).parent() : $(e.target),
        alertTxt = $target.attr('data-alert');

    alert( alertTxt );

    return false;
  },

  publishPost: function( e ) {
    var $post = $(e.target).closest('.post'),
        $alert = $post.find('.conf-alert_con').first();

    $alert.html('<span class="conf-alert_title">Post Published</span>');
    $post.removeClass('post--trashed').addClass('post--published post--updated');

    var cbFn = function() {
      $post.find('.post-time').first().html('just now');
      $post.find('.footer-status').first().addClass('out');
      $post.find('.post-control--publish').replaceWith('<li class="post-control--stats general-alert" data-alert="Navigate to stats filtered by post"><a href="#">Stats</a></li>');
      $post.find('.post-control--view a').html('View');
      $post.removeClass('post--scheduled');
    }

    calypsoux.redrawDefaultTrashConfirmation( $post, $alert, cbFn );

    return false;
  }

});

$( document ).ready( calypsoux.initPosts );

} )( jQuery );
