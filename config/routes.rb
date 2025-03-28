Toolbox::Engine.routes.draw do
  get "helpers/confirmation/:destination", to: "helpers#confirmation", as: :confirmation
end
