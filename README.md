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
    validateDate() // We nave a very nice regex for this one

# Toolbox / Bootstrap Components and Styles

Needs sass to work properly:

    aplication.css to application.scss

You can include all components by:

    @forward "toolbox";

# Helpers

## Confirmation Link

Styled modal for delete confirmation link:

    link_to_confirmation(link_text, path, **options)

As options, it accepts:

    class: # Styles and etc...
    btn_text: #Text for action link inside the modal, default is "Apagar".
    confirm: #Confirmation text, default is "Olha lá ein... Certeza?".
    id: # Custom modal ID, as default, creates a random "confirmation-modal" ID.
    delete: # Default true, can be set as false to use as normal dialog.
