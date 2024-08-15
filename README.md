# Toolbox

A set of ruby, JS and css tools we normally use across projects.

## Installation

Add to the application's Gemfile and `bundle` it up.

    gem "toolbox", git: "https://github.com/adicione/toolbox.git"

## Stimulus Mask Controller

Wrap the maskables with `data-controller="masking"` and add the desired mask to the class of eash input.

The available masks are `mask-date`, `mask-br-phone`, `mask-cpf`, `mask-cnpj`, `mask-brl`, `mask-usd`, `mask-cep` and `mask-plate`.

## Stimulus Validation Controller

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

## Turnstile recaptcha and login setup

Create `app/views/new.html.erb` containing:

    <div id="main-login-wrap">
        <div id="main-login-modal" data-controller="recaptcha" data-sitekey="0x4AAAAAAADSnPLVRXOUi1Iz">
            <div id="recaptcha" data-recaptcha-target="recaptcha"></div>

            <div data-recaptcha-target="reloadMessage" hidden>
                <p>Sua autenticação expirou, retornou com erro ou você está tentando algo feio!</p>

                <%= link_to "Tentar novamente", "", class: "btn" %>
            </div>

            <%= form_with url: create_session_path, data: { turbo: false, recaptcha_target: "loginForm", action: "recaptcha#validate", controller: "mask" }, html: { hidden: true } do |f| %>
                <%= f.hidden_field(:recaptcha_token, data: { recaptcha_target: "recaptchaToken" }) %>
                <%= f.text_field :login, value: params[:login], placeholder: "Login...", autofocus: :true, data: { recaptcha_target: "loginField", action: "recaptcha#toggleSubmitButton" } %>
                <%= f.password_field :password, value: nil, placeholder: "Senha de acesso...", data: { recaptcha_target: "passwordField", action: "recaptcha#toggleSubmitButton" } %>
                <%= f.submit "Entrar", class: "btn", disabled: true, hidden: true, data: { recaptcha_target: "submitButton" } %>
            <% end %>
        </div>
    </div>

Replace the `data-sitekey` with the one setup at CloudFlare't turstile page, or use one of the test available sitekeys.

    2x00000000000000000000AB // Fake fails.
    3x00000000000000000000FF // Force interactive.

Add the following paths to `app/config/routes.rb`, this will add the `login_path`, `logout_path` and `create_session_path` to the routes.

    scope module: :sessions do
      get :login, action: :new, as: :login
      post :login, action: :create, as: :create_session
      get :logout, action: :destroy, as: :logout
    end

Recaptcha uses rails secret file to store credentials.

    $ EDITOR="code --wait" rails credentials:edit --environment development

The file should at least look like this:

    recaptcha:
        secret: 0x4AAAAAAADSnBhdwRVSWKVJctGQgGKU_58

And the posted `params[:recaptcha_token]` can be checked by `verify_recaptcha` method available upon adding the following into your controller:

    include Toolbox::Recaptcha

## Superstyles

Superstyles needs sass to work properly:

    aplication.css to application.scss

You can include all configs and elements by:

    @import "superstyles";

Or add each individual element:

    // Configs...

    @import "superstyles/colors";
    @import "superstyles/reset";
    @import "superstyles/typography";

    // Elements...

    @import "superstyles/animation";
    @import "superstyles/inputs";
    @import "superstyles/buttons";
    @import "superstyles/flashes";
    @import "superstyles/modals";
    @import "superstyles/layouts";

    // Pages...

    @import "superstyles/pages/login";

You can also change default toolbox values:

    // Default mobile breakpoint.

    $toolbox-breakpoint: 900px;

    // Text.

    $text-regular: #393e49;
    $text-dark: #222222;
    $text-light: #ffffff;

    $text-info: #1a73e8;
    $text-success: #028000;
    $text-warning: #f8c630;
    $text-danger: #fe6d73;

    // Borders.

    $border-regular: #6c757d;
    $border-dark: #453f46;
    $border-light: #d0d0d0;

    $border-info: #808ed1;
    $border-success: #71ad6b;
    $border-warning: #f8c630;
    $border-danger: $text-danger;

    // Background.

    $background-regular: $border-regular;
    $background-dark: $border-dark;
    $background-light: $text-light;

    $background-info: $border-info;
    $background-success: $border-success;
    $background-warning: $text-warning;
    $background-danger: $text-danger;

## Flash messages

Add the available flash types to `application_controller.rb`:

    add_flash_types :primary, :success, :danger, :warning

Add the flash helper to `application_helper.rb`:

    def flash_messages
        return unless flash.any?

        messages = flash.map do |key, message|
        content_tag :li, message.html_safe, class: "flash-message #{ key } flash-fade-in-and-out"
        end

        return messages.join.html_safe
    end

And add the overlay to html layout:

    <div id="overlay">
      <ul id="flash-wrap"><%= flash_messages %></ul>
    </div>

## View helpers

# Generates an <hr> tag to divide card objects.

Adds the "mobile" class to the <hr> tag if the object is the first in the collection.
The "mobile" class is typically used to style the <hr> for visibility in mobile layouts, while it remains hidden in non-mobile (desktop) applications.
This method is particularly useful in "row" and "column" layouts.

# Usage:

The method needs to be called from within the collection's element and pass the element as a variable.

    card_divider(object)