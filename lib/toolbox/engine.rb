module Toolbox
  class Engine < ::Rails::Engine
    isolate_namespace Toolbox
  
    initializer "toolbox.stimulus_controllers" do |app|
      if app.config.respond_to? :assets
        app.config.assets.paths << root.join("app", "javascript") # Controller paths.
      end
    end

    initializer "toolbox.importmap", before: "importmap" do |app|
      app.config.importmap.paths << Engine.root.join("config/importmap.rb") # Engines own importmap.
      app.config.importmap.cache_sweepers << Engine.root.join("app/javascript") # Sweeps the cache when any files in the engine change.
    end

    initializer "toolbox.add_flash_types" do
      ActiveSupport.on_load :action_controller_base do
        add_flash_types :danger, :warning, :info, :success, :primary, :secondary, :light # Bootstrap matching colors.
      end
    end

    initializer "toolbox.append_routes" do |app|
      app.routes.append do
        mount Toolbox::Engine, at: "/toolbox"
      end
    end

    # Maybe this is not necessary.
    #
    # config.to_prepare do
    #   Dir.glob(Rails.root.join("app/helpers/**/*.rb")).each do |file|
    #     require_dependency file # Auto load all helpers.
    #   end
    # end
  end
end
