module Toolbox
  class Engine < ::Rails::Engine
    PRECOMPILE_ASSETS = %w(
      controllers/hello_toolbox_controller.js
    ).freeze

    initializer "stimulus.assets" do
      if Rails.application.config.respond_to?(:assets)
        Rails.application.config.assets.precompile += PRECOMPILE_ASSETS
      end
    end

    initializer "toolbox.importmap", before: "importmap" do |app|
      app.config.importmap.paths << Engine.root.join("config/importmap.rb")
      app.config.importmap.cache_sweepers << Engine.root.join("app/assets/javascripts/toolbox")
    end
  end
end
