module Toolbbox
  class Engine < ::Rails::Engine
    #isolate_namespace Toolbox

    initializer "toolbox.stimulus_controllers" do |app|
      if app.config.respond_to?(:assets)
        # Adds the paths used to search for assets.
        app.config.assets.paths << root.join("app", "javascript")
        # Precompiles additional assets.
        app.config.assets.precompile += %w[
          controllers/hello_toolbox_controller.js
          controllers/modal_controller.js
          controllers/masking_controller.js
          controllers/overlay_controller.js
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
    end

    initializer "toolbox.add_flash_types" do
      ActiveSupport.on_load(:action_controller_base) do
        add_flash_types :danger, :warning, :info, :success, :primary, :secondary, :light
      end
    end

    # initializer "toolbox.helpers" do
    #   ActiveSupport.on_load(:action_view) do
    #     include OverlayHelper
    #   end
    # end

    config.to_prepare do
      Dir.glob(Rails.root.join("app/helpers/**/*.rb")).each do |file|
        require_dependency file
      end
    end
  end
end
