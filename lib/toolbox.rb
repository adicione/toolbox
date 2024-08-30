# frozen_string_literal: true

module Toolbox
end

# Engine.
require_relative "toolbox/version"
require_relative "toolbox/error"
require_relative "toolbox/engine"

# Helpers.
#
# Not including to "gem_root/helpers" to make it
# available on demand with "include".
require_relative "toolbox/helpers/flash_messages"

# TODO : Review.
require_relative "toolbox/helpers/validation"
require_relative "toolbox/helpers/view_helper"
