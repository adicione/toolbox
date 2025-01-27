module Toolbbox
  class Engine < ::Rails::Engine
    initializer "toolbox.stimulus_controllers" do |app|
      if app.config.respond_to?(:assets)
        # Adds the paths used to search for assets.
        app.config.assets.paths << root.join("app", "javascript")
        app.config.assets.paths << root.join("vendor", "javascript")

        # Precompiles additional assets.
        app.config.assets.precompile += %w[
          controllers/hello_toolbox_controller.js
          controllers/modal_controller.js
          controllers/masking_controller.js
          controllers/validation_controller.js
          controllers/recaptcha_controller.js
          concerns/helpers.js
        ].freeze
      end
    end

    initializer "toolbox.importmap", before: "importmap" do |app|
      # Engines own importmap.
      app.config.importmap.paths << Engine.root.join("config/importmap.rb")

      # Sweeps the cache when any files in the engine change.
      app.config.importmap.cache_sweepers << Engine.root.join("app/javascript")
      app.config.importmap.cache_sweepers << Engine.root.join("vendor/javascript")
    end

    initializer "toolbox.add_flash_types" do
      ActiveSupport.on_load(:action_controller) do
        add_flash_types :primary, :success, :danger, :warning
      end
    end

    initializer "toolbox.helpers" do
      ActiveSupport.on_load(:action_view) do
        # include Toolbox::Helpers::Overlay
      end
    end
  end
end
