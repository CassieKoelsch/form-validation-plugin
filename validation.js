 /**
  * Validation JS
  *
  * @author Cassie Herd
  * @options
  *     success: function(){},
  *     failure: function(){},
  *     emails: [],
  *     required: []
  */
$(function() {
    $.fn.validation = function ( options ) {

        var settings = $.extend({
            success: function(){},
            failure: function(){},
            emails: [],
            required: []
        }, options );

        return this.each(function () {

            var Methods = {
                /**
                 * Array containing all form errors
                 *
                 *
                 */

                errors: [],
                /**
                 * Check for valid email address in required field
                 *
                 * @prams
                 *      form: form being validated,
                 *      fields: each field that is validated (input, textarea, etc.)
                 */
                validateEmail: function ( form, fields )
                {
                    fields.each(function() {
                        var emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

                        // Here is where i do the magic tricks
                        if (!emailRegExp.test( $(this).val() )) {
                            var id = $(this).attr('id');
                            var label = $(form).find('label[for=' + id + ']');

                            $(this).addClass('error');
                            $(label).addClass('error');

                            Methods.errors.push({
                                label: $(label),
                                field: $(this)
                            });
                        }
                    });
                },

                /**
                 * Check for input in required field
                 *
                 * @prams
                 *      form: form being validated,
                 *      fields: each field that is validated (input, textarea, etc.)
                 */
                validateRequired: function ( form, fields )
                {
                    fields.each( function() {
                        if ( $(this).is(':checkbox') ) {
                                Methods.validateChecked( form, $(this) );
                            }

                        if ( !$(this).val() ) {

                            var id = $(this).attr('id');
                            var label = $(form).find('label[for=' + id + ']');

                            $(this).addClass('error');
                            $(label).addClass('error');

                            Methods.errors.push({
                                label: $(label),
                                field: $(this)
                            });
                        }
                    });
                },
                /**
                 * Check for checked checkbox if checkbox is required
                 *
                 * @prams
                 *      form: form being validated,
                 *      field: the checkbox field that is being validated
                 */
                validateChecked: function ( form, field )
                {
                    if ( !field.prop('checked') ) {

                        var id = field.attr('id');
                        var label = $(form).find('label[for=' + id + ']');

                        field.addClass('error');
                        $(label).addClass('error');

                        Methods.errors.push({
                            label: $(label),
                            field: field
                        });
                    }
                },
                /**
                 * Reset errors on each submit
                 *
                 * @prams
                 *      form: form being validated
                 */
                reset: function ( form )
                {
                    this.errors = Methods.errors = [];
                    form.find('.error').removeClass('error');
                },
                /**
                 * Return true if form has no errors
                 *
                 *
                 */
                isValid: function ()
                {
                    return (Methods.errors.length == 0)
                }
            }

            $(this).attr('novalidate', true).on('submit', function ( e ) {
                var emailFields = $('[required][type=email]').add( settings.emails );
                var requiredFields = $('[required]').add(settings.required);

                Methods.reset( $(this) );
                Methods.validateEmail( $(this), $(this).find(emailFields) );
                Methods.validateRequired( $(this), $(this).find(requiredFields) );

                //If form is valid, call success function or if form is not valid call failure function
                Methods.isValid() && settings.success({
                    form: $(this),
                    event: e
                }) || !Methods.isValid() && settings.failure({
                    form: $(this),
                    event: e,
                    errors: Methods.errors
                })
            })
        });
    }
}( jQuery ));
