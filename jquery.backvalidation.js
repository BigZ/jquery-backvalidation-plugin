var global_valid = [];

function updateStatus(elem, valid, message)
{
	//alert(elem.id+" "+valid);
	if (!valid)
	{
		if ($(elem).parent().find('.warning').length > 0 && message != $(elem).parent().find('.warning').html() && message !== undefined)
		{
			var mysize = message.split('<br />');
			mysize = 10 + ((mysize.length - 1) * 15);
			$(elem).parent().css('margin-bottom', mysize + 'px');
			$(elem).parent().find('.warning').html(message);
		}
		else
		{
			var out = setTimeout(function(){
				if (global_valid[elem.id] === false)
				{
					$(elem).parent().find('.validation_status').removeClass('status_valid');
					$(elem).parent().find('.validation_status').addClass('status_invalid');
				}
			}, 1500);
		}
	}
	else
	{
		$(elem).parent().find('.validation_status').removeClass('status_invalid');
		$(elem).parent().find('.validation_status').addClass('status_valid');
		$(elem).parent().find('.warning').remove();
		$(elem).parent().css('margin-bottom', '0');
	}
}

function myCallBackKeyUp(elem, valid, message)
{
	global_valid[elem.id] = valid;
	updateStatus(elem, valid, message);
}

function myCallBackBlur(elem, valid, message)
{
	global_valid[elem.id] = valid;
	if (!valid)
	{
		var mysize = message.split('<br />');
		mysize = 10 + ((mysize.length - 1) * 15);
		
		$(elem).parent().css('margin-bottom', mysize + 'px');
		
		$(elem).parent().find('.warning').remove();
		if (global_valid[elem.id] === false)
		{
			$(elem).parent().append('<div class="warning">'+message+'</div>');
			$(elem).parent().find('.validation_status').removeClass('status_valid');
			$(elem).parent().find('.validation_status').addClass('status_invalid');
		}
	}
	else
	{
		$(elem).parent().find('.warning').remove();
		$(elem).parent().css('margin-bottom', '0');
		updateStatus(elem, valid);
	}
}

function myDateCallBackBlur(elem, valid, message)
{
	if ($('#days').val().length < 2 || $('#days').val().length > 2 || isNaN($('#days').val()) ||
		$('#months').val().length < 2 || $('#months').val().length > 2 || isNaN($('#months').val()))
		valid = false;
	global_valid[elem.id] = valid;
	if (!valid)
	{		
		$(elem).parent().find('.warning').remove();
		if (global_valid[elem.id] === false)
		{
			$(elem).parent().find('.validation_status').removeClass('status_valid');
			$(elem).parent().find('.validation_status').addClass('status_invalid');
			$('#months').removeClass('valid');
			$('#days').removeClass('valid');
			$('#months').addClass('invalid');
			$('#days').addClass('invalid');
		}
	}
	else
	{
		$(elem).parent().find('.warning').remove();
		$(elem).parent().css('margin-bottom', '0');
		$('#months').removeClass('invalid');
		$('#days').removeClass('invalid');
		$('#months').addClass('valid');
		$('#days').addClass('valid');
		updateStatus(elem, valid);
	}
}

function myEmailCallBackBlur(elem, valid, message)
{
	//global_valid[elem.id] = valid;
	if (!valid)
	{
		var mysize = message.split('<br />');
		mysize = 10 + ((mysize.length - 1) * 15);
		
		$(elem).parent().css('margin-bottom', mysize + 'px');
		
		$(elem).parent().find('.warning').remove();
		if (global_valid[elem.id] === false)
		{
			$(elem).parent().append('<div class="warning">'+message+'</div>');
			$(elem).parent().find('.validation_status').removeClass('status_valid');
			$(elem).parent().find('.validation_status').addClass('status_invalid');
		}
	}
	else
	{
		$(".hidden_register_params").show('slow');
		$(elem).parent().find('.warning').remove();
		$(elem).parent().css('margin-bottom', '0');
		updateStatus(elem, valid);
	}
}

function myEmailCallBackKeyUp(elem, valid, message)
{
	global_valid[elem.id] = valid;
	if (valid)
	{
		$(".hidden_register_params").show('slow');
	}
	updateStatus(elem, valid);
}

(function($) {
	var submitok = 0;
	var to_validate = [];
	
	// checks field for validity and insert valid / invalid class
	// and call appropriate callback
    $.fn.fieldValidate = function(options) {   
        var defaults = {required:false, minlength:0, maxlength: 0, email: false, regexp: "", isInt: false, isNumeric:false, isRegular: false, callBackKeyUp: null, callBackBlur: null, errorMessages: {
        			required: 'This field is required',
                    minlength: 'This field length should be at least $x characters',
                    maxlength: 'This field length should not be more than $x characters',
                    email: 'This field shoud be a valid e-mail',
                    regexp: 'This field does\'nt match the awaited expression',
                    isInt: 'This field should be an integer',
                    isNumeric: 'This field should be an integer',
                    isRegular: 'This field should not have any special characters'
                }
        };
        
        var opts = $.extend(defaults, options), status = true;
        
        function isInt(n) {
        	return !isNaN(n);
        }
        
        function isEmail(e)
        {
        	var r = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,5}(?:[a-z0-9-]*[a-z0-9])?/;
        	return e.match(r);                                       
        }
        
        function validate(obj, opts) {
        	var valid = true, validationMessage = '';
        	if (opts.required && $(obj).val() === '')
        	{
        		valid = false;
        		validationMessage += opts.errorMessages.required + " <br />";
        		return validationMessage;
        	}
        	if ($(obj).val().length > 0 && opts.minlength > 0 && $(obj).val().length < opts.minlength)
        	{
        		valid = false;
        		validationMessage += opts.errorMessages.minlength.replace('$x', opts.minlength) + " <br />";
        	}
        	if (opts.maxlength > 0 && $(obj).val().length > opts.maxlength)
        	{
        		valid = false;
        		validationMessage += opts.errorMessages.maxlength.replace('$x', opts.maxlength) + " <br />";
        	}
        	if (opts.isInt && !isInt($(obj).val()))
        	{
        		valid = false;
        		validationMessage += opts.errorMessages.isInt + " <br />";
        	}
        	if (opts.email && !isEmail($(obj).val()))
        	{
        		valid = false;
        		validationMessage += opts.errorMessages.email + " <br />";
        	}
        	return (valid === true) ? true : validationMessage;
        }
        
        // add valid / invalid class
        function liveValidation(elem)
        {
        	var status = validate(elem, opts);
	        if (status === true)
	        {
	        	$(elem).removeClass('invalid');
		       	$(elem).addClass('valid');
	        }
	        else
	        {
	        	$(elem).removeClass('valid');
		       	$(elem).addClass('invalid');
	        }
	        return status;
        }
        
        $(this).keyup( function() {
        	var status = liveValidation(this);
        	if (opts.callBackKeyUp !== null)
	        	opts.callBackKeyUp(this, ((status === true) ? true : false), status);
        	return true;
        });
        
        $(this).blur( function() {
        	var status = liveValidation(this);
        	if (opts.callBackBlur !== null)
	        	opts.callBackBlur(this, ((status === true) ? true : false), status);
        	return true;
        });
        
        // push every field to validate in the global tab of elements to be validated
        $(this).each(function() {
        	to_validate.push($(this).attr('id'));
        });
        
        return $(this);  
    };
    
    // validate the global form
    // by checking if all specified field have valid clss
    $.fn.formValidate = function(d) {
    	$(this).submit( function() {
    		if (!submitok && d)
    		{
    			$(d).show();
    			submitok = 1;
    			return false;
    		}
    		var list = '';
    		var form_valid = true;
    		for (i = 0; i < to_validate.length; i++)
    		{
    			$('#'+to_validate[i]).blur();
    			if (!$('#'+to_validate[i]).hasClass('valid'))
    				form_valid = false;
    		}
    		return form_valid;
    	});
    };
})(jQuery);
