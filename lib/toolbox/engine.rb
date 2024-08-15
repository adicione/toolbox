class Engine < ::Rails::Engine
  initializer "stimulus.assets" do |app|
    if app.config.respond_to?(:assets)
      # Adds "app/javascript" to the paths used to search for assets.
      app.config.assets.paths << root.join("app", "javascript")

      # Precompiles additional assets.
      app.config.assets.precompile += %w(
        controllers/hello_toolbox_controller.js
        controllers/masking_controller.js
        controllers/validation_controller.js
        controllers/recaptcha_controller.js
        concerns/helpers.js
      ).freeze
    end
  end

  initializer "toolbox.importmap", before: "importmap" do |app|
    # Engines own importmap.
    app.config.importmap.paths << Engine.root.join("config/importmap.rb")

    # Sweeps the cache when any files in the engine change.
    app.config.importmap.cache_sweepers << Engine.root.join("app/javascript")
  end
end
