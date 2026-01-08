module Toolbox
  class HelpersController < ApplicationController
    # skip_after_action :verify_authorized if defined?(Pundit) # Pundit policy check.
    skip_authorization
    skip_policy_scope

    def confirmation
      @destination = params[:destination] || "#"
      @confirmation = params[:confirmation]&.html_safe || "Você tem certeza?"
      @btn_text = params[:btn_text] || "Seguir"
      @turbo_method = params[:turbo_method] || :delete
    end
  end
end
