# frozen_string_literal: true

require_relative "lib/toolbox/version"

Gem::Specification.new do |spec|
  spec.name = "toolbox"
  spec.version = Toolbox::VERSION
  spec.authors = [ "Ayres Narita" ]
  spec.email = [ "eu@ayresnarita.com" ]

  spec.summary = "Toolbox."
  spec.description = "Styles, scripts and helpers."
  spec.homepage = "https://adici.one.com" # TODO: Put your gem's website or public repo URL here.
  spec.license = "MIT"
  spec.required_ruby_version = ">= 2.6.0"

  spec.metadata["allowed_push_host"] = "https://github.com/adicione/toolbox.git"
  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/adicione/toolbox.git"
  spec.metadata["changelog_uri"] = "https://github.com/adicione/toolbox/blob/main/CHANGELOG.md"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(__dir__) do
    `git ls-files -z`.split("\x0").reject do |f|
      (File.expand_path(f) == __FILE__) ||
        f.start_with?(*%w[bin/ test/ spec/ features/ .git appveyor Gemfile])
    end
  end
  spec.bindir = "exe"
  spec.executables = spec.files.grep(%r{\Aexe/}) { |f| File.basename(f) }
  spec.require_paths = [ "lib" ]

  # Uncomment to register a new dependency of your gem
  spec.add_dependency "dartsass-rails", "~> 0.5.1"
  spec.add_dependency "bootstrap", "~> 5.3.3"
  spec.add_dependency "font-awesome-sass"

  # For more information and examples about making a new gem, check out our
  # guide at: https://bundler.io/guides/creating_gem.html
end
