/****************************************************************************
	ui-button.js, 

	(c) 2015, FCOO

	https://github.com/FCOO/ui-button
	https://github.com/FCOO

****************************************************************************/

;(function ($, window, document, undefined) {
	"use strict";
	
	/*******************************************
	radioButtonGroup
	Create a radio-group with icon-buttons
	onSelectFunc = function( index, buttonElement, modeElement): called when a button is clicked, 
	modeElement (optional): Element that get class set to "mode0" or "mode1" or. or "mode9"
	*******************************************/
	$.fn._adjustRadioButtonGroup = function(){
		var newButtonWidth = 0,
				$buttons = $(this).find('a, button');
		$buttons.each( function () { newButtonWidth = Math.max( newButtonWidth, $(this).outerWidth() ); });	
		$buttons.each( function () { $(this).css('width', newButtonWidth); });
		$(this).width( $buttons.length * $buttons.first().outerWidth());
	};

	$.fn.radioButtonGroup = function( onSelectFunc, $modeElement, selectedIndex, dontAnimate) {
		this._adjustRadioButtonGroup();
		
		var $buttons = this.find('a, button');
	
		//Adds a click-function
		$buttons.each( function ( index ) { 
			$(this).click( function(event){ 
				//Update the selected and the unselected button
				$(this).siblings().removeClass('selected'); 
				$(this).addClass('selected'); 
	
				//Update the mode-element (if any)
				if ($modeElement)
					$modeElement.windowboxSetMode( index, dontAnimate );
	
				//Call the onSelect-function (if any)
				if (onSelectFunc)
					onSelectFunc( index, event, $modeElement);  
			} );
		} );	//End of adding click-functions
	

		//If no selected button was found: Try finding if by the class-name of the mode-element
		if ($modeElement && (selectedIndex == null)){
			for (var i=0; i<$buttons.length; i++ )
				if ($modeElement.hasClass('mode'+i)){
					selectedIndex = i;
					break;
				}
		}
		
		//Find current selected button
		if (selectedIndex != null)
			$buttons.each( function ( index ) { 
				if ( index == selectedIndex )
					$(this).trigger( "click" );
			} );		
	};
	
	
	/*******************************************
	TODO: Skal flyttes til et faelles repository
	buttonMode
	Create a button that changes class dependend on
	parent have or dont have class=modeClass (eq. "mode1")
	*******************************************/
	$.fn.buttonMode = function( modeClass, onClass, offClass, onTitleCode, offTitleCode, $parent, onClick) {
		this.data('parent-mode', $parent);
		this.data('mode-class', modeClass);
		this.data('on-class', onClass);
		this.data('off-class', offClass);
		this.data('on-title', window.fcoo.language.translate(onTitleCode));
		this.data('off-title', window.fcoo.language.translate(offTitleCode));
	
		this.click( function(){
			var p = $(this).data('parent-mode');
			var isOn = !p.hasClass(modeClass);
			$(this).buttonModeSet( isOn );
			onClick(isOn);
		});
	};
	
	$.fn.buttonModeSet = function( isOn ) {
		this.data('parent-mode').toggleClass( this.data('mode-class'), isOn);
		this
			.toggleClass( this.data('on-class'), isOn )
			.toggleClass( this.data('off-class'), !isOn )
			.prop('title', isOn ? this.data('on-title') : this.data('off-title') ); 
	};

	
	/******************************************
	Initialize/ready 
	*******************************************/
	$(function() { 

	}); //End of initialize/ready
	//******************************************



}(jQuery, this, document));