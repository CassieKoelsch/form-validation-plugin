# Validate JS
Validate is a plugin that allows you to validate a form on submission. It will accept 4 options: emails, required, failure, and success.  Details and examples of each option are below.

## Emails
By default, all email fields with `[type=email]` and `[required]` property will be validated.  You can add additional fields that you'd like to have validated as an email address.

Example usage:

    $('form').validate({
        email: $('.extra-email');
    });

## Required
By default, all fields with the `[required]` property will be validated for user input.  You can add additional fields that you'd like to have validated for input.

Example usage:

        $('form').validate({
            required: $('.other-required');
        });


## Failure
The failure function is called when one or more errors are found when the form is submitted. The failure function receives three parameters: form, event, and errors.  Form is the form that is being validated.  Event is the event triggering the validation function.  Errors is an array of all the elements that have an error (no input, not an email address, etc.).

Example usage:

        $('form').validate({
            failure:function( data ){
                console.log(data.errors);
                data.event.preventDefault();
            }
        });

## Success
The success function is called when there are no errors found when the form is submitted. The success function receives two parameters: form and event.  Form is the form that is being validated.  Event is the event triggering the validation function.

Example usage:

        $('form').validate({
            success: function ( data ) {
                console.log("It worked!");
            }
        });