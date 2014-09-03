juqery-backvalidation-plugin
============================

BackValidation is a Jquery form validation plugin that makes an extensive use of callbacks.
Callbacks can be used to set advanced functions when some triggers are fired. For instance, displaying messages relatives to security when a password is weak, or guessing the country from a phone number. Everything is up to you with this plugin !

Working example : https://www.mysnapbackcap.com/authentification (create account form)

juqery-backvalidation-plugin
============================

Initialize the plugin


$(document).ready(function(){
	
	// If you need some translations, or custom error messages. for english, the default ones should be good enough
	// Here, translated to french
	var errorMessages = {
        required: "Ce champ est requis",
        minlength: "Ce champ doit contenir au moins $x caract&egrave;res",
        maxlength: "Ce champ ne doit pas contenir plus de $x caract&egrave;res",
        email: "Ce champ doit &ecirc;tre un e-mail valide",
        regexp: "Ce champ ne r&eacute;pond pas &agrave; l&#039;expression requise",
        isInt: "Ce champ doit &ecirc;tre compos&eacute; uniquement de chiffres",
        isNumeric: "Ce champ doit &ecirc;tre compos&eacute; uniquement de chiffres",
        isRegular: "Ce champ ne doit comporter aucun caract&egrave;re sp&eacute;cial"
    };
    
    // Validate required fields with custom error messages and custom callbacks
    
	$('#customer_firstname, #customer_lastname, #address1, #city').fieldValidate({
		required: true,
		callBackKeyUp: myCallBackKeyUp,
		callBackBlur: myCallBackBlur,
		errorMessages: errorMessages
	});
	
	
	// validate an email and use of specific callbacks
	$('#email_register').fieldValidate({
		email: true,
		callBackKeyUp: myEmailCallBackKeyUp,
		callBackBlur: myEmailCallBackBlur,
		errorMessages: errorMessages
	});
	
    // validate password
	$('#passwd_register').fieldValidate({
		required: true,
		minlength: 5,
		callBackKeyUp: myCallBackKeyUp,
		callBackBlur: myCallBackBlur,
		errorMessages: errorMessages
	});
	
    validate a phone number
	$('#phone').fieldValidate({
		required: true,
		isInt: true,
		minlength: 5,
		callBackKeyUp: myCallBackKeyUp,
		callBackBlur: myCallBackBlur,
		errorMessages: errorMessages
	});
	
	finally validate the form
	$('#create-account_form').formValidate(".hidden_register_params");
});

Add some style for your default valid / unvalid display

<style>
.valid {
	border-color: green;
}

.invalid {
	border-color: red;
}
</style>

