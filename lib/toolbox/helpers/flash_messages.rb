module Toolbox
  module Helpers
    module FlashMessages
      include ActionView::Helpers::TagHelper
      include ActionView::Context
      extend ActiveSupport::Concern

      included do
        after_action :broadcast_flash_messages
      end

      def broadcast_flash_messages
        return unless request.format.turbo_stream? && flash.any? && current_user

        Turbo::StreamsChannel.broadcast_prepend_later_to(dom_id(current_user, :personal_channel), target: "flash-wrap", html: "coiso")
      end
    end
  end
end
