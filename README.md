# Toolbox

A set of Ruby, JS and CSS tools we normally use across projects.

# Installation

Add to the application's Gemfile and `bundle` it up.

    gem "toolbox", git: "https://github.com/adicione/toolbox.git"

# Stimulus Mask Controller

Wrap the maskables with `data-controller="masking"` and add the desired mask to the class of eash input.

The available masks are `mask-date`, `mask-br-phone`, `mask-cpf`, `mask-cnpj`, `mask-brl`, `mask-usd`, `mask-cep` and `mask-plate`.

# Stimulus Validation Controller

Wrap the form with `data-controller="validation"` and add the desired validation to the class of eash input.

The available validations are `validate-cpf`, `validate-email` and `validate-br-phone`.

In addition to validations, you can also add `required: true` to require it.

TODO : Add following validations.

    validateNumbers()
    validateLetters()
    validateAlphanumeric()
    validateCnpj()
    validateCpfCnpj()
    validateCep()
    validateBrPlate()
    validateDate() // We nave a very nice regex for this one.

# Ruby Validation

Located in app/validators.

You can call the class:

    Validator.cpf(input)
    Validator.email(input)
    Validator.brazilian_phone(input)

Or in your rails model:

    class User < ApplicationRecord
        validates :cpf, method: :cpf
        validates :email, method: :email
        validates :phone, method: { with: :brazilian_phone }
    end

# Toolbox / Bootstrap Components and Styles

Needs sass to work properly:

    aplication.css to application.scss

You can include all components by:

    @forward "toolbox";

# Helpers

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

