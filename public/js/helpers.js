( function( $ ) {

var calypsoux = {
	previousTab: false,

	init: function() {
		calypsoux.frontendMockup();
		calypsoux.bindEvents();
		calypsoux.setDefaultSwitcherSite();
		calypsoux.highlightFilter();
		calypsoux.magicMobileNavigation();
	},

	bindEvents: function() {
		// Mobile Navigation
		$( '.mobile-nav-bar .toggle-sidebar, .mobile-nav-bar ul' ).on( 'click', calypsoux.mobileNavigation );

		// Select a site
		$( '#my-sites .site, #my-sites .site a' )
			.on( 'click', calypsoux.selectSite );

		// hit the picker
		$( '.site-picker' )
			.on( 'click touchstart', calypsoux.popupSites );

		// Import show upload form
		$( '.import-selection' )
				.on( 'click', calypsoux.importUpload );

		// Import slider next
		$( '.next-step' )
				.on( 'click', calypsoux.importNextStep );

		// masterbar click to select menus
		$( 'li.notifications' ).on( 'click', calypsoux.selectNotifications );

		// Blog picker drop down
		$( '.menu-open' )
			.on( 'click', calypsoux.togglePickerSubmenu );

		$( '#tag-details .edit, #tag-details-editor .save, #tag-details-editor .cancel' )
			.on( 'click', calypsoux.toggleTagsEditor );

		$( '#category-details .edit, #category-details-editor .save, #category-details-editor .cancel' )
			.on( 'click', calypsoux.toggleCategoriesEditor );

		$( '#tag-details .edit, #tag-details-editor .save, #tag-details-editor .cancel' )
			.on( 'click', calypsoux.toggleTagsEditor );

		$( '#category-details .edit, #category-details-editor .save, #category-details-editor .cancel' )
			.on( 'click', calypsoux.toggleCategoriesEditor );

		// Toggle the top level pages in a blog on /pages
		$( '.toggle-pages' )
			.on( 'click', calypsoux.toggleBlogPages );

		// Toggle the sub level pages for a page on /pages
		$( '.toggle-sub-pages' )
			.on( 'click', calypsoux.toggleSubPages );

		// Toggle hidden drawer stats datepicker module
		$( '.module.datepicker' )
			.on( 'click', calypsoux.toggleDatePicker );

		$( 'input.search-box' )
			.on( 'focus', calypsoux.loadSearchFilterDropdown )

		$( 'input.search-box' )
			.on( 'blur', calypsoux.hideSearchDropdown )

		$( 'input.search-box' )
			.on( 'keyup', calypsoux.loadSearchTermDropdown )

		// Open/close user actions
		$( '#primary.section-users .user-edit-toggle' )
			.on( 'click', calypsoux.toggleUserActions );

		$( '#primary.section-users .avatar' )
			.on( 'click', calypsoux.toggleUserActions );

		// Change User Role
		$( '#primary.section-users .user-actions li' )
			.on( 'click', calypsoux.changeUserRole );

		// Remove User
		$( '#primary.section-users .remove' )
			.on( 'click', calypsoux.removeUser );

		// Open/close plan details in mobile
		$( '.plan' )
			.on( 'click touchstart', calypsoux.togglePlan );

		// Toggle details on charges and domains
		$( '.upgrade-item' )
			.on( 'click touchstart', calypsoux.toggleUpgradesListItem );

		// Fake domain search results loading
		$( '.domain-search input[type=submit]' )
			.on( 'click touchstart', calypsoux.showDomainSearchResults );

		// Toggle more domain extensions in search results
		$( '.show-more-domains' )
			.on( 'click touchstart', calypsoux.toggleMoreDomainExt );

		// Show map a domain flow
		$( '.show-map-domain' )
			.on( 'click touchstart', calypsoux.showMapDomain );

		// Toggle Actions Dropdown List
		$( '.actions-dropdown > a' )
			.on( 'click touchstart', calypsoux.toggleActionsDropdown );

		// Toggle Receipt Modal
		$( '.charge-receipt, .receipt header' )
			.on( 'click touchstart', calypsoux.toggleReceiptModal );

		// Show Switcher
		$( '#switch-sites' ).on( 'click touchstart', calypsoux.showSwitcher );

		$( '.available-site' ).on( 'click', calypsoux.switchSites );

		// Toggle Meta Box
		$( '.wpcom-sidebar .meta' ).on( 'click', calypsoux.toggleMetaBox );

		// Zoom Gallery Images in the Reader
		$( '.card-gallery img, .card-photo img' ).on( 'click', function( event ) {
			event.preventDefault();
			event.stopPropagation();

			var src = $( this ).attr( 'src' );
			
			var zoomer = $( '<div id="zoomer"><div><span><img src=""></span></div></div>' );

			zoomer.find( 'img' ).attr( 'src', src );

			zoomer.appendTo( $( 'body' ) );

			setTimeout( function() {
				zoomer.addClass( 'active' );
			}, 50 );
		} );

		$( 'body' ).on( 'click', '#zoomer', function() {
			$( '#zoomer' ).remove();
		} );

		// Trigger the modal when tapping on a Post Card
		// in the Reader stream.
		$( '#reader-content .card' ).on( 'click', function( event ) {
			event.preventDefault();
			event.stopPropagation();

			var body = $( 'body' ),
				card = $( this ),
				headline = $( '.card-body h1', card ).html(),
				byline = $( '.card-byline', card ).html(),
				bgStyle = $( 'header.has-featured-image', card ).attr( 'style' ),
				modalCard = $( '.wpcom-modal > .card' ),
				modalHeader = $( 'header', modalCard ),
				modalHeadline = $( '.card-body h1', modalCard ),
				modalByline = $( '.card-byline', modalCard );

			// Set the headline and byline
			modalHeadline.html( headline );
			modalByline.html( byline );

			// If there's bg image, use it
			if ( ! bgStyle ) {
				modalHeader.attr( 'style', '' );
				modalHeader.removeClass( 'has-featured-image' );
			} else {
				modalHeader.addClass( 'has-featured-image' );
				modalHeader.attr( 'style', bgStyle );
			}

			// Open the modal
			body.toggleClass( 'wpcom-modal-open' );
			card.toggleClass( 'open' );

			if ( event.target.className == 'action-comment' ) {
				$( '.wpcom-modal' ).scrollTop( $( '#wpcom-modal-comments' ).offset().top );
			} else {
				$( '.wpcom-modal' ).scrollTop( 0 );
			}
		} );

		// Close the modal, either with the button or by tapping
		// the modal shade.
		$( '.wpcom-modal-close, .wpcom-modal' ).on( 'click', function( event ) {
			var target = event.target.className;

			if ( target == 'wpcom-modal' || target == 'wpcom-modal-close' ) {
				event.preventDefault();
				event.stopPropagation();

				var body = $( 'body' ),
					card = $( '#primary .card.open' );

				body.toggleClass( 'wpcom-modal-open' );
				card.toggleClass( 'open' );
			}
		} );
	},

	frontendMockup: function() {
		// Mockup for Masterbar on other pages/sites
		$( '#wpcom.mockup .wpcom-navigation li' ).on( 'click', function( event ) {
			var tab = $( event.target ).closest( 'li' );

			if ( tab.hasClass( 'active' ) ) {
				if ( tab.hasClass( 'notifications' ) ) {
					// This is an annoying hack to make this work with the existing notifications js -shaun
				} else {
					event.preventDefault();
					$( '.wpcom-navigation .active' ).removeClass( 'active' );
					$( '.wpcom-sidebar' ).removeClass( 'enabled' );
				}
				
				$( 'body' ).removeClass( 'notifications-open' );
				$( '.masterbar-shade' ).removeClass( 'enabled' );
				$( '#mockup' ).removeClass( 'disabled' );
			} else {
				$( '.wpcom-navigation .active' ).removeClass( 'active' );
				$( '.wpcom-sidebar' ).removeClass( 'enabled' );
				$( '#mockup' ).removeClass( 'disabled' );
				$( '.masterbar-shade' ).removeClass( 'enabled' );

				if ( tab.hasClass( 'my-sites' ) ) {
					event.preventDefault();
					tab.addClass( 'active' );
					$( '.wpcom-sidebar.my-sites' ).addClass( 'enabled' );
				}

				if ( tab.hasClass( 'reader' ) ) {
					event.preventDefault();
					tab.addClass( 'active' );
					$( '.wpcom-sidebar.reader' ).addClass( 'enabled' );
				}

				if ( tab.hasClass( 'user-account' ) ) {
					event.preventDefault();
					tab.addClass( 'active' );
					$( '.wpcom-sidebar.me' ).addClass( 'enabled' );
				}

				if ( tab.hasClass( 'notifications' ) ) {
					$( 'body' ).addClass( 'notifications-open' );
				}

				$( '.masterbar-shade' ).addClass( 'enabled' );
				$( '#mockup' ).addClass( 'disabled' );
			}
		} );

		$( '.masterbar-shade' ).on( 'click', function() {
			$( '.wpcom-navigation .active' ).removeClass( 'active' );
			$( '.wpcom-sidebar' ).removeClass( 'enabled' );
			$( 'body' ).removeClass( 'notifications-open' );
			$( '.masterbar-shade' ).removeClass( 'enabled' );
			$( '#mockup' ).removeClass( 'disabled' );
		} );
	},

	toggleMetaBox: function() {
		$( this ).toggleClass( 'open' );
	},

	mobileNavigation: function( event ) {
		var body = $( 'body' ),
			sidebar = $( '.wpcom-sidebar' ),
			more_btn = $( this );
		body.toggleClass( 'viewing-mobile-navigation' );
		more_btn.toggleClass( 'selected' );
	},

	magicMobileNavigation: function() {
		// Hide Header on on scroll down
		var didScroll,
			lastScrollTop = 0,
			delta = 5,
			navbarHeight = $('mobile-nav-bar').outerHeight();

		$( window ).scroll( function( event ) {
			didScroll = true;
		} );

		setInterval( function() {
			if ( didScroll ) {
				hasScrolled();
				didScroll = false;
			}
		}, 250);

		function hasScrolled() {
			var st = $(this).scrollTop();

			// Make sure they scroll more than delta
			if( Math.abs( lastScrollTop - st ) <= delta ) {
				return;
			}

			// If they scrolled down and are past the navbar, add class .nav-up.
			// This is necessary so you never see what is "behind" the navbar.
			if (st > lastScrollTop && st > navbarHeight){
				// Scroll Down
				$( 'body' ).removeClass( 'nav-down' ).addClass( 'nav-up' );
			} else {
				// Scroll Up
				if(st + $(window).height() < $(document).height()) {
					$( 'body' ).removeClass('nav-up').addClass('nav-down');
				}
			}

			lastScrollTop = st;
		}
	},

	setDefaultSwitcherSite: function() {
		var body = $( 'body' ),
			path = window.location.pathname,
			sites_sidebar = $( '.my-sites' ),
			current_site_card = $( '.current-selected-site' ),
			available_sites = $( '.available-sites' ),
			primary_site = $( '.primary', available_sites ),
			menu_links = $( '.menu-group a', sites_sidebar ),
			url_string = '/mariadahvanaheadley.wordpress.com',
			mockup_string = '/visit';

		// Check if we're in single-site mode
		if ( path.indexOf( url_string ) > 0 ) {
			// If we are, then update the sidebar
			current_site_card.html( primary_site.html() );
			menu_links.each( function() {
				var href = $( this ).attr( 'href' );
				if ( ! $( this ).hasClass( 'visit-site' ) ) {
					$( this ).attr( 'href', href + url_string );
				}
			} );
		} else if ( path == mockup_string ) {
			// If we're viewing the frontend mockup
			current_site_card.html( primary_site.html() );
			menu_links.each( function() {
				var href = $( this ).attr( 'href' );
				if ( ! $( this ).hasClass( 'visit-site' ) ) {
					$( this ).attr( 'href', href + url_string );
				}
			} );
		} else {
			// Otherwise just add the body class
			body.addClass( 'managing-all-sites' );
		}
	},

	showSwitcher: function() {
		event.preventDefault();
		var body = $( 'body' );
		body.toggleClass( 'switching-sites' );

		/*
		$( '.available-sites-list' ).bind( 'mousewheel', function( e ) {
			$( this ).scrollTop( $( this ).scrollTop() - e.originalEvent.wheelDeltaY );

			//prevent page fom scrolling
			return false;
		});
		*/
	},

	switchSites: function( event ) {
		event.preventDefault();

		var body = $( 'body' ),
			sites_sidebar = $( '.my-sites' ),
			current_site_card = $( '.current-selected-site' ),
			available_sites = $( '.available-sites' ),
			current_selected_site = $( '.selected', available_sites ),
			click_target = $( event.target ),
			new_selected_site = click_target.closest( '.available-site' ).clone(),
			url_string = '/mariadahvanaheadley.wordpress.com',
			menu_links = $( '.menu-group a', sites_sidebar );

		current_selected_site.removeClass( 'selected' );
		new_selected_site.addClass( 'selected' );

		if ( new_selected_site.hasClass( 'all-sites' ) ) {
			// All Sites
			new_selected_site.find( '.all-site-gravatars' ).remove();
			body.addClass( 'managing-all-sites' );
			menu_links.each( function() {
				var href = $( this ).attr( 'href' );
				if ( ! $( this ).hasClass( 'visit-site' ) ) {
					$( this ).attr( 'href', href.replace( url_string, '' ) );
				}
			} );
		} else {
			// Single Site
			body.removeClass( 'managing-all-sites' );
			menu_links.each( function() {
				var href = $( this ).attr( 'href' );
				if ( ! $( this ).hasClass( 'visit-site' ) ) {
					$( this ).attr( 'href', href + url_string );
				}
			} );
		}

		target_html = new_selected_site.html();
		current_site_card.html( target_html );

		body.toggleClass( 'switching-sites' );
	},

	changeUserRole: function() {
		var role = $( this ),
			card = role.closest( '.card.user' );

		if ( role.hasClass( 'selected' ) || role.hasClass( 'remove' ) ) {
			return;
		} else {
			$( '.selected', card ).removeClass( 'selected' );
			role.addClass( 'selected' );
			notice = $( '<span class="notice">Saved!</span>' );
			notice.appendTo( role );

			setTimeout( function() {
				$( '.notice', card ).addClass( 'transition' );
			}, 1 );

			setTimeout( function() {

				$( '.notice', card ).removeClass( 'transition' );

				setTimeout( function() {
					$( '.notice', card ).remove();
				}, 500 );

			}, 2000 );
		}
	},

	removeUser: function() {
		var card = $( this ).closest( '.card.user' );

		if ( confirm( 'This user will no longer have access to Glittering Scrivener.' ) ) {
			card.fadeOut( 300 );
			setTimeout( function() { card.remove(); }, 500 );
		}
	},

	toggleUserActions: function() {
		var $this = $( this ),
			card = $this.closest( '.card.user' ),
			toggle = $( '.user-edit-toggle', card ),
			actions = $( '.user-actions', card );

		card.toggleClass( 'active' );
		toggle.toggleClass( 'active' );
		actions.toggleClass( 'active' );
		actions.slideToggle( 150 );
	},

	selectNotifications: function( e ) {
		e.preventDefault();

		var $html = $( 'body' ),
			$target = $( e.target ).closest( 'li' ),
			$currentlyActive = $( '.sections-menu li.active' );

		if ( ! $currentlyActive.hasClass( 'notifications' ) ) {
			calypsoux.previousTab = $currentlyActive;
		}

		if ( $target.hasClass( 'active' ) ) {
			$html.removeClass( 'notifications-open' );
			$target.removeClass( 'active' );

			return;
		}

		$html.addClass( 'notifications-open' );
		$target.toggleClass( 'active' );
	},

	popupSites: function( e ) {
		e.preventDefault();
		e.stopPropagation();

		var $sitesPopup = $( '.sites-popup' );
		var $sitePicker = $( '.site-picker' );

		$sitePicker.toggleClass( 'active' );
		$sitesPopup.toggle()
		calypsoux.setPopupPickerHeight( $sitesPopup );

		if ( ! $( '.darkener' ).length ) {
			if ( $( 'html' ).hasClass( 'mobile-sidebar-visible' ) ) {
				calypsoux.toggleMobileSidebar();
			}

			$( 'body' ).append( '<div class="darkener sidebar"></div>' );

			$sitePicker
				.clone()
				.appendTo( '.darkener' )
				.addClass( 'picker-clone' )
				.css( 'width', $sitePicker.width() );

			var $pickerClone = $( '.picker-clone' );
			calypsoux.repositionPopupPicker( $pickerClone, $sitePicker.offset().top, $sitePicker.offset().left, $sitePicker.width() );

			$( '.picker-clone, .darkener' )
			 .on( 'click', calypsoux.popupSites );

			$( window ).on( 'resize.picker', function() {
				calypsoux.repositionPopupPicker( $pickerClone, $sitePicker.offset().top, $sitePicker.offset().left, $sitePicker.width() );
				calypsoux.setPopupPickerHeight( $sitesPopup );
			} );
		} else {
			$( '.picker-clone, .darkener' ).off();
			$( window ).off( 'resize.picker' );
			$( document ).off( 'keyup.picker' );
			$( '.picker-clone' ).remove();
			$( '.darkener' ).remove();
		}

		setTimeout( function() {
			$( 'html' ).toggleClass( 'sites-popup-visible' );
		}, 10 );

		return false;
	},

	repositionPopupPicker: function( $picker, top, left, width ) {
		$picker.css( {
			'top': top + 'px',
			'left': left + 'px',
			'width': width + 'px'
		} );

		if ( ! $( 'style#arrow' ).length )
			$( 'head' ).append( "<style id='arrow'></style>" );

		$( 'style#arrow' ).html( '.sites-popup::before{ left: ' + ( width - 41 ) + 'px }' );
	},

	importUpload: function( e ) {
		e.preventDefault();
		var $import_dashboard = $( '.import-dashboard' );
		if ( $import_dashboard.hasClass( 'importing' ) ) {
			$import_dashboard.removeClass( 'importing' );
		} else {
			$import_dashboard.addClass( 'importing' );
		}
	},

	importNextStep: function( e ) {
		e.preventDefault();
		var $import_container = $( '.import-process' );
		if ( $import_container.hasClass( 'import-upload' ) ) {
			$import_container.removeClass( 'import-upload' );
			$import_container.addClass( 'import-authors' );
		} else if ( $import_container.hasClass( 'import-authors' ) ) {
			$import_container.removeClass( 'import-authors' );
			$import_container.addClass( 'import-progress' );
		}
	},

	setPopupPickerHeight: function( $popup ) {
		if ( $(window).width() <= 650 ) {
			$popup.css( { 'height':  $( window ).height() - 100 + 'px' } );
		} else {
			$popup.css( {
				'height': ( $( window ).height() - ( $popup.offset().top * 1.3 ) ) + 'px'
			});
		}
	},

	selectSite: function( e ) {
		e.preventDefault();
		e.stopPropagation();

		$site = $(e.target).closest( '.site' );

		if ( $site.hasClass( 'all-sites' ) ) {
			location.href = '/posts'
		} else {
			location.href = '/posts/mariadahvanaheadley.wordpress.com'
		}
	},

	highlightFilter: function() {
		var href = location.href,
				hrefNoQuery = (href.indexOf('#') > -1) ? href.split('#')[0] : href.split('?')[0],
				loc = hrefNoQuery.split( '/' );
				loc = loc.splice( 3, loc.length );

		if ( loc[loc.length-1] == 'mariadahvanaheadley.wordpress.com' ) {
			loc.pop();
		}

		if ( 1 == loc.length ) {
			loc += '-index';
		} else {
			loc = loc.join( '-' );
		}

		$( '#' + loc ).addClass( 'selected' );
	},

	toggleBlogPages: function( e ) {
		e.preventDefault();

		var $blog = $( e.target ).parents( '.pages:first' );

		if ( $blog.hasClass( 'is-open' ) ) {
			$blog.removeClass( 'is-open' );
		} else {
			$blog.addClass( 'is-open' );
		}
	},

	toggleSubPages: function( e ) {
		e.preventDefault();

		var $target = $( e.target ),
			$pageBlock = $target.closest( '.page-block' );

		if ( $pageBlock.hasClass( 'is-open' ) ) {
			$pageBlock.removeClass( 'is-open' );
			$target.removeClass( 'is-open' );
		} else {
			$pageBlock.addClass( 'is-open' );
			$target.addClass( 'is-open' );
		}
	},

	toggleDatePicker: function( e ) {

		$( '.module.datepicker' ).toggleClass( 'active' );
	},

	toggleTagsEditor: function() {
		tag = $( '#tag-details' );
		tag_editor = $( '#tag-details-editor' );


		if( tag.css( 'display' ) != 'none' ){
			tag.css( 'display', 'none' );
			tag_editor.css( 'display' ,'block' );
		} else {
			tag.css( 'display', 'list-item' );
			tag_editor.css( 'display' ,'none' );
		}
	},

	toggleCategoriesEditor: function(){
		category = $( '#category-details' );
		category_editor = $( '#category-details-editor' );


		if( category.css( 'display' ) != 'none' ){
			category.css( 'display', 'none' );
			category_editor.css( 'display' ,'block' );
		} else {
			category.css( 'display', 'list-item' );
			category_editor.css( 'display' ,'none' );
		}
	},

	toggleNavMenu: function() {
		$( 'html' ).toggleClass( 'nav-visible' );
		return false;
	},

	loadSearchFilterDropdown: function() {
		var $input = $( '.search-box' );
		$( '.search' ).addClass( 'active' );

		if ( $( '.search-box' ).val() ) {
			return calypsoux.loadSearchTermDropdown();
		}

		$( '.search-filters' ).toggle();
	},

	loadSearchTermDropdown: function() {
		var $input = $( '.search-box' ),
			$filtersBox = $( '.search-filters' ),
			$termsBox = $( '.entered-terms' );

		if ( ! $input.val() ) {
			$filtersBox.show();
			$termsBox.hide();
		} else {
			$filtersBox.hide();
			$termsBox.show();
		}
	},

	hideSearchDropdown: function() {
		$( '.search' ).removeClass( 'active' );
		$( '.search-filters' ).hide(),
		$( '.entered-terms' ).hide();
	},

	removeMasterBar: function() {
		$( '.wpcom-masterbar' ).remove();
	},

	moveOverlay: function() {
		var $overlay = $( '.overlay' ).detach();

		$( '#wpcom' ).append( $overlay );
	},

	togglePlan: function() {
		if ( !$( this ).hasClass('plan-active') ) $( '.plan' ).removeClass( 'plan-active' );
		$( this ).toggleClass( 'plan-active' );
		return false;
	},

	toggleUpgradesListItem: function() {
		if ( !$( this ).find('.upgrade-actions').length ) return;
		if ( !$( this ).hasClass('active') ) $( this ).parent().find( '.upgrade-item' ).removeClass( 'active' );
		$( this ).toggleClass( 'active' );

		return false;
	},

	showDomainSearchResults: function() {
		$( '.domain-suggestions' ).fadeOut(function() {
			$( '.domain-results-fake' ).addClass('active');
			$( '.domain-results-fake li' ).each(function(i) {
				var timeout = (i++) * 150;
				var li = $(this);
				setTimeout(function() {
					li.addClass('fade-in');
				}, timeout);
			});
		});

		return false;
	},

	toggleMoreDomainExt: function() {
		$( this ).toggleClass( 'active' );
		$( '.more-domains' ).toggleClass( 'active' );

		return false;
	},

	showMapDomain: function() {
		$( '.domain-search, .domain-suggestions h2, .domain-suggestions ul:first-of-type' ).slideUp(500);
		$( '.domain-results' ).css( 'top', '0' );
		$( '.map-domain' ).slideDown();
		$( '.map-domain-cta' ).addClass('active');
		$( '.link-back-mapping' ).show();
		$( '.filter-bar-toggle' ).text('Map a Domain');
		$( '.mobile-header a' ).attr('href','/upgrades/domains/add/mariadahvanaheadley.wordpress.com');
		return false;
	},

	toggleActionsDropdown: function() {
		if ( !$( this ).parent().find('ul').hasClass('active') ) $( '.actions-dropdown ul' ).removeClass( 'active' );
		$( this ).parent().find('ul').toggleClass('active');
		return false;
	},

	toggleReceiptModal: function() {
		$( '.receipt' ).toggleClass('active');
		$( '.modal-backdrop' ).toggleClass('active');
		return false;
	},

	importUpload: function( e ) {
		e.preventDefault();
		var $import_dashboard = $( '.import-dashboard' );
		if ( $import_dashboard.hasClass( 'importing' ) ) {
			$import_dashboard.removeClass( 'importing' );
		} else {
			$import_dashboard.addClass( 'importing' );
		}
	},

	importNextStep: function( e ) {
		e.preventDefault();
		var $import_container = $( '.import-process' );
		if ( $import_container.hasClass( 'import-upload' ) ) {
			$import_container.removeClass( 'import-upload' );
			$import_container.addClass( 'import-authors' );
		} else if ( $import_container.hasClass( 'import-authors' ) ) {
			$import_container.removeClass( 'import-authors' );
			$import_container.addClass( 'import-progress' );
		}
	},

	toggleSearch: function() {
		$( '.search' ).toggle().focus();

		return false;
	},

	toggleMobileSidebar: function( e ) {
		e.preventDefault();

		var $html = $( 'html' ),
			$sidebar = $( '.sidebar' );

		if ( $html.hasClass( 'mobile-sidebar-visible' ) ) {
			$html
				.removeClass( 'mobile-sidebar-visible' )
				.addClass( 'mobile-sidebar-closing' );

			setTimeout( function() {
				$html
					.removeClass( 'mobile-sidebar-closing' );
				$sidebar
					.toggle()
					.css( {
						'top': '',
						'height': ''
					} );
			}, 300 );
		} else {
			$sidebar.toggle();

			setTimeout( function() {
				$html.addClass( 'mobile-sidebar-opening' );

				setTimeout( function() {
					if ( $( '#primary' ).hasClass( 'no-site-selector' ) ) {
						$sidebar.css( {
							'top': '105px',
							'height': 'calc( 100% - 105px )'
						} );
					}

					$html
						.removeClass( 'mobile-sidebar-opening' )
						.addClass( 'mobile-sidebar-visible' );
				}, 300 );
			}, 5 );
		}

		return false;
	}
};

$( document ).ready( calypsoux.init );

// Simple show/hide for notifications

$(document).ready(function(){
		$('.unread.note').click(function() {
				$('.single-view').css("display", "block");

				$('.list-view').css("display", "none");
		});

		$('.back').click(function() {
				$('.single-view').css("display", "none");

				$('.list-view').css("display", "block");
		});
})

// Auto expand textarea for reply field http://codepen.io/vsync/pen/frudD/

$(document)
		.one('focus.textarea', '.reply-field', function(){
			var savedValue = this.value;
			this.value = '';
			this.baseScrollHeight = this.scrollHeight;
			this.value = savedValue;
		})
		.on('input.textarea', '.reply-field', function(){
			var minRows = this.getAttribute('data-min-rows')|0,
				 rows;
			this.rows = minRows;
			rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
			this.rows = minRows + rows;
		});
} )( jQuery );

var scrollToElement = function(el, ms, offset){
	var speed = (ms) ? ms : 600;
	$( 'html,body' ).animate({
		scrollTop: $(el).offset().top - offset
	}, speed);
}
