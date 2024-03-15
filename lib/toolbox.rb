# frozen_string_literal: true

require_relative "toolbox/version"

module Toolbox
  class Error < StandardError
  end

  class Engine < ::Rails::Engine
    initializer "toolbox.importmap", before: "importmap" do |app|
      app.config.importmap.paths << Engine.root.join("config/importmap.rb")
      app.config.importmap.cache_sweepers << Engine.root.join("app/assets/javascripts/toolbox")
    end
  end
end
