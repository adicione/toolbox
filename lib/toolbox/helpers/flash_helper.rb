module Toolbox
  module Helpers
    module FlashHelper
      def toolbox_overlay
        content_tag :div, id: "overlay" do
          content_tag :ul, flash_messages, id: "flash-wrap"
        end
      end

      def flash_messages
        return unless flash.any?

        messages = flash.map do |key, message|
          content_tag :li, message.html_safe, class: "flash-message #{ key } flash-fade-in-and-out"
        end

        return messages.join.html_safe
      end
    end
  end
end
