( function( $ ) {

	var calypsoPages = {
		
		init: function() {
			calypsoPages.bindEvents();
		},
	
		bindEvents: function() {
			$( '.mobile-header .noticon-add' ).on( 'click', calypsoPages.pageAddNew );
			
			$( '.page-block .page-edit, .page-block .page-edit-link' ).on( 'click', calypsoPages.pageEdit );
			
			$( '.more-info-block .page-frontpage-link' ).on( 'click', calypsoPages.pageFrontPage );
			
			$( '.more-info-block .page-menus-link' ).on( 'click', calypsoPages.pageMenus );
			
			$( '.more-info-block .page-parent-link' ).on( 'click', calypsoPages.pageParent );
			
			$( '.more-info-block .page-revisions-link' ).on( 'click', calypsoPages.pageRevisions );
			
			$( '.page-block .noticon-ellipsis' ).on( 'click', calypsoPages.pageShowMore );
			
			$( '.more-info-block .page-trash-link' ).on( 'click', calypsoPages.pageTrash );
			
			$( '.more-info-block .page-view-link' ).on( 'click', calypsoPages.pageView );
		},
	
		pageAddNew: function() {
			alert( 'TODO: Link to add new page screen.' );
			return false;
		},
		
		pageEdit: function() {
			alert( 'TODO: Link to edit screen for this page.' );
			return false;
		},
		
		pageFrontPage: function() {
			alert( 'TODO: Link to static front-page setting screen.' );
			return false;
		},
		
		pageMenus: function() {
			alert( 'TODO: Link to menus screen, highlighting menus that use this page.' );
			return false;
		},
		
		pageParent: function() {
			alert( 'TODO: Link to parent page.' );
			return false;
		},
		
		pageRevisions: function() {
			alert( 'TODO: Link to revisions screen for this page.' );
			return false;
		},
		
		pageShowMore: function() {
			if ( ! $( this ).parent().hasClass( 'show-more' ) ) {
				$( '.page-block' ).each( function() {
					$( this ).removeClass( 'show-more' );
				});
			}
			$( this ).parent().toggleClass( 'show-more' );
			return false;
		},
		
		pageTrash: function() {
			alert( 'TODO: Link to trash this page.' );
			return false;
		},
		
		pageView: function() {
			alert( 'TODO: Link to this page on my actual site.' );
			return false;
		}
	};	
	
	$( document ).ready( calypsoPages.init );
} )( jQuery );