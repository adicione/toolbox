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

Add the following paths to `app/config/routes.rb`, this will add the `login_path`, `logout_path` and `create_session_path` to the routes.

    scope module: :sessions do
      get :login, action: :new, as: :login
      post :login, action: :create, as: :create_session
      get :logout, action: :destroy, as: :logout
    end

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
