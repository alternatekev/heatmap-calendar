;(function($) {

var checkoutux = {
	init: function() {
		checkoutux.initFloatLabels();
		checkoutux.formatCCFields();
		checkoutux.formatPhoneFields();
		checkoutux.bindEvents();
		
		// Check to see if we should launch the cart on load
		checkoutux.checkShowCart();
		checkoutux.checkShowPayWithCredits();
		
		if (window.location.pathname.indexOf('thank-you') >= 0) {
			checkoutux.showDelayedTitle();
		}
	},
	
	initFloatLabels: function() {
		$('.floatlabel').floatlabel({ labelEndTop: '8px' });
	},
	
	formatCCFields: function() {
		$('.payment-card').payment('formatCardNumber');
		$('.payment-exp').payment('formatCardExpiry');
		$('.payment-security').payment('formatCardCVC');
		$('.payment-zip').payment('restrictNumeric');
	},
	
	formatPhoneFields: function() {
		$('.phone-number').mask("(999) 999-9999");
	},
	
	bindEvents: function() {
		// Toggle Payment Types
		$( '.add-card-toggle, .card-on-file' )
			.on( 'click', checkoutux.toggleAddCreditCard );
			
		// Toggle Coupon Code
		$( '.coupon-code-toggle' )
			.on( 'click', checkoutux.toggleCouponCodeForm );
			
		// Add domain to shopping cart
		$( '.add-domain' )
			.on( 'click touchstart', checkoutux.addDomainToCart );

		// Open/close Domains Cart
		$( '.cart > a, .cart-list header, .cart .button:not(.button-primary)' )
			.on( 'click touchstart', checkoutux.toggleDomainsCart );
		
		// Next Step
		$( '.plan .button-primary, .cart .button-primary, .registration-details .button-primary' )
			.on( 'click touchstart', checkoutux.stepNext );
				
		// Back up a step
		$( '.step-back' )
			.on( 'click touchstart', checkoutux.stepBack );
		
		// Complete checkout 
		$( '.checkout-actions .button-primary' )
			.on( 'click touchstart', checkoutux.completeCheckout );
		
		// Toggle PayPal Form
		$( '.paypal-toggle, .checkout-error a' )
			.on( 'click touchstart', checkoutux.togglePayPalForm );
			
		// Toggle Currency Selector
		$( '.currency-toggle' )
			.on( 'click touchstart', checkoutux.toggleCurrencySelector );

		// Change Currency
		$( '.currency li' )
			.on( 'click touchstart', checkoutux.changeCurrency );
		
		// Fake remove item from cart
		$( '.cart-remove' )
			.on( 'click touchstart', checkoutux.removeItemFromCart );
			
		// Toggle add-on
		$( '.addons li' )
			.on( 'click touchstart', checkoutux.toggleAddOn );
		
		// Toggle domain add-ons
		$( '.domain-addons .button' )
			.on( 'click touchstart', checkoutux.toggleDomainAddOns );
		
		// Toggle prviate registration
		$( '.reg-option' )
			.on( 'click touchstart', checkoutux.togglePrivateReg );
	},
	
	toggleAddCreditCard: function() {
		$( '.add-card, .card-on-file' ).removeClass('active');
		if ( $( this ).hasClass('add-card-toggle') ) {
			$( '.add-card' ).addClass('active');
		} else {
			$( this ).addClass('active');
		}
	},
	
	togglePayPalForm: function() {
		$( '.payment-cc' ).toggleClass('animated fadeOut');
		$( '.payment-paypal' ).toggleClass('animated fadeIn');
		return false;
	},
	
	toggleCouponCodeForm: function() {
		$( '.coupon-code' ).toggleClass('active');
		return false;
	},
	
	addDomainToCart: function() {
		$( this ).parent().addClass('in-cart');
		$( this ).removeClass('button-primary').html('<span class="noticon noticon-checkmark"></span>');
		$( '.cart' ).addClass('active');
		//checkoutux.toggleDomainAddOns();
		return false;
	},

	toggleDomainsCart: function() {
		$( '.cart' ).toggleClass('open');
		return false;
	},
	
	removeItemFromCart: function() {
		var cart_item = $( this ).parents('li');
		cart_item.slideUp().after($( '.remove-undo' ).first().clone().fadeIn());
		return false;	
	},
	
	stepNext: function() {
		var current_step = $('.current-step');
		current_step.removeClass('fadeInLeft current-step').addClass('animated fadeOutLeft');
		current_step.next().css('right', 'auto').removeClass('fadeOutRight').addClass('animated fadeInRight current-step');
		$('html, body').animate({ scrollTop: '0' }, 0);
		
		if (current_step.next().find('.title-delayed').length > 0) {
			checkoutux.showDelayedTitle();
		}
		return false;
	},
	
	stepBack: function() {
		var current_step = $('.current-step');
		current_step.prev().removeClass('fadeOutLeft').addClass('animated fadeInLeft current-step');
		current_step.removeClass('fadeInRight current-step').addClass('animated fadeOutRight');
		return false;
	},
	
	completeCheckout: function() {
		if (!$( '.notice-message' ).hasClass('fadeInDown')) {
			$( '.notice-message' ).addClass('animated fadeInDown');
		} else {
			$( this ).removeClass('button-primary').attr('disabled','disabled').html('Completing Your Purchase...');
			setTimeout(function() {
				checkoutux.stepNext();
			}, 1200);
		}
		return false;
	},
	
	checkShowCart: function() {
		if ( window.location.hash != '#showcart' ) 
			return;
			
		checkoutux.addDomainToCart();
		checkoutux.toggleDomainsCart();
		return false;
	},
		
	toggleCurrencySelector: function() {
		$( '.currency ul' ).toggleClass('active');
		return false;
	},
	
	changeCurrency: function() {
		$( '.currency li' ).removeClass('active');
		$( this ).addClass('active');
		$( '.currency-toggle' ).text( $( this ).find( 'em' ).text() );
		checkoutux.toggleCurrencySelector();
		return false;
	},
	
	toggleAddOn: function() {
		if ( $( this ).parents('.multi').length > 0 && !$( this ).hasClass('active') ) $( '.multi li').removeClass('active');
		$( this ).toggleClass('active');
		return false;
	},
	
	toggleDomainAddOns: function() {
		$( '.domain-results, .domain-addons, .domain-search' ).toggleClass('active');
		return false;
	},
	
	togglePrivateReg: function() {
		$( '.reg-option' ).removeClass('active');
		$( this ).addClass('active');
		return false;
	},
	
	checkShowPayWithCredits: function() {
		if ( window.location.hash != '#credits' ) 
			return;
			
		$( '.payment-cc, .payment-paypal' ).hide();
		$( '.payment-credits' ).show();
		return false;
	},
	
	showDelayedTitle: function() {
		var title_delayed = $('.post-purchase .title-delayed');
		if (title_delayed.length) {
			var title_first = $('.post-purchase .title-first');
			setTimeout(function() {
				title_delayed.addClass('animated fadeInUp');
				title_first.addClass('inactive');
				setTimeout(function() {
					$('.whats-next').addClass('animated fadeIn');
				}, 1500);
			}, 1000);
		}
	}
	

};
$( document ).ready( checkoutux.init );

	
})(jQuery);