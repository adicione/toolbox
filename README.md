# Toolbox

A set of ruby, JS and css tools we normally use across projects.

## Installation

Add to the application's Gemfile and `bundle` it up.

    gem "toolbox", git: "https://github.com/adicione/toolbox.git"

## Stimulus Mask Controller

Wrap the maskables with `data-controller="mask"` and add the desired mask to the class of eash input.

The available masks are date `date-mask`, phone `phone-mask`, cpf `cpf-mask`, cnpj `cnpj-mask`, money brl `money-brl-mask`, money usd `money-usd-mask`, cep `cep-mask` and plate `plate-mask`.

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
        secret: secretsitekeyhere

And the posted `params[:recaptcha_token]` can be checked by `verify_recaptcha` method available upon adding the following into your controller:

    include Pundit::Authorization

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

## Contributing

Bug reports and pull requests are welcome on GitHub at [toolbox]https://github.com/adicione/toolbox. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/adicione/toolbox/blob/master/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Toolbox project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/adicione/toolbox/blob/master/CODE_OF_CONDUCT.md).
