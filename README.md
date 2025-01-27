# Toolbox

A set of ruby, JS and css tools we normally use across projects.

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

# Bootstrap Components

Needs sass to work properly:

    aplication.css to application.scss

You can include all components by:

    @use "bootstrap.components" as bc;
    @use "bootstrap.icons" as bi;

















# Overlay

Add the flash helpers to `application_helper.rb`:

    include Toolbox::Helpers::Overlay

And add the overlay into the `body` tag of your html layout:

    <%= overlay %>

### Flash messages

In order to receive turbo flash, you will need to add a user's personal channel.

    <%= turbo_stream_from(dom_id(current_user, :personal_channel)) if current_user %>

Optionally, you can use the Toolbox flash styles importing it to your application.scss:

    @import "superstyles/flashes";

With the Toolbox flash styles we have `primary`, `success`, `warning` and `danger` available as flash types colored as `blue`, `green`, `yellow` and `red`.

# View helper methods

Add the view helpers to your `application_helper.rb` file:

    include Toolbox::Helpers::FlashHelper

### Icons

Renders material icons and simplifies the `back` and `forward` icons to the right positioned ones.

    toolbox_icon("icon-name")

### Card divider

Generates an `hr` tag to divide card objects.

Adds the "mobile" class to the `hr` tag if the object is the first in the collection.

The "mobile" class is typically used to style the `hr` for visibility in mobile layouts, while it remains hidden in non-mobile (desktop) applications.

This method is particularly useful in "row" and "column" layouts.

The method needs to be called from within the collection's element and pass the element as a variable.

    toolbox_card_divider(object)