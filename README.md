# Toolbox

A set of Ruby, JS and CSS tools we normally use across projects.

# Installation

Add to the application's Gemfile and `bundle` it up.

    gem "toolbox", git: "https://github.com/adicione/toolbox.git"

# Stimulus Validation Controller

Wrap the form with `data-controller="validation"` and add the desired validation to the class of each input.

The available validations are:

    validate-only-letters // No spaces.
    validate-name // Only leters, accept spaces.
    validate-cpf
    validate-email
    validate-br-phone
    validate-date

There is no need to call the mask method if the corresponding validate is called.

In addition to validations, you can also add `required: true` to require it.

TODO : Create following validations.

    validateOnlyNumbers()
    validateAlphanumeric() // No special chars.
    validateCnpj()
    validateCpfCnpj()
    validateCep()
    validateBrPlate()

# Stimulus Mask Controller

Wrap the maskables with `data-controller="masking"` and add the desired mask to the class of eash input.

If you are already validating the field, there is no need to use masking.

The available masks are:

    mask-only-letters
    mask-name
    mask-date
    mask-br-phone
    mask-cpf
    mask-cnpj
    mask-brl
    mask-usd
    mask-cep
    mask-plate

# Ruby Validation

Located in app/validators.

You can call the class:

    Validator.only_letters(input)
    Validator.cpf(input)
    Validator.email(input)
    Validator.brazilian_phone(input)

In your rails model to add errors:

    class User < ApplicationRecord
        validates :name, only_letters: true, allow_blank: true
    end

# Toolbox / Bootstrap Components and Styles

Needs sass to work properly:

    aplication.css to application.scss

You can include all components by:

    @forward "toolbox";

# Helpers

Add to ApplicationHelper:

    include Toolbox::SuperHelper

## - Overlay and alerts

It automatically handles alerts on refresh and gives you a base for turbo includes like modals and etc...

Add the overlay helper at your main template.

    <%= overlay %>

For turbo alerts, we need the "flash.now" added to your controller method:

    flash.now[:warning] = "Your alert"

Add the turbo alerts helper to your turbo_stream view:

    <%= turbo_alerts %>

Or render from your controller with or without a desired status:

    render turbo_stream: helpers.turbo_alerts, status: :forbidden

## - Modal

A Bootstrap modal helper that follows all bootstrap configs:

    render Toolbox::ModalComponent.new(**options)

### Options:

Custom ID.

    id: nil

A non-dismissible modal will only close when a designated button is present.

    dismissable: true

Prints a close button if header is available.

    close_button: false

Determines the initial moda's state.

    hidden: true

If true, removes the modal from the DOM upon closing.

    persistent: false

Closes other modals when opened.

    selfish: false

Applies Bootstrap modal size and center classes.

    size: nil (Bootstrap default size.)
    centered: "modal-dialog-centered"

Allows replacing the ‘modal-content’ wrapper with another tag.

    custom_content: false

When custom_content: true, will need to respect Bootstrap modal structure, no ViewComponent::Slots allowed.

    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5">Title here</h1>
        </div>

        <div class="modal-body">
            Body content here...
        </div>

        <div class="modal-footer">
            Footer here...
        </div>
    </div>

## - Confirmation link

Serves as a warning before important actions. (delete, move, etc...)

    link_to_confirmation(content, destination, **options)

### Options:

    class: # Link style.
    confirmation: # Confirmation text. ("Você tem certeza?")
    btn_text: # Confirm button text. ("Seguir")
    turbo_method: # Methods :get, :post, etc... (:delete)
