module Toolbox
  module MainHelper
    # TODO : Add delete: true / false option, to use as confirmation dialog.
    def link_to_confirmation(link_text, path, **options)
      render Toolbox::ConfirmationComponent.new(link_text, path, **options)
    end

    # include ActionView::Context

    # A base for turbo includes. (modals, flash and etc...)
    #
    # TODO:
    #
    # Way to add sitewise turbo channels as needed.
    def overlay
      content_tag :div, id: "overlay" do
        content_tag :div, alerts, id: "alerts", class: "position-fixed p-4 top-0 end-0"
      end
    end

    def turbo_alerts
      turbo_stream.append "alerts", alerts
    end

    private

    def alerts
      return unless flash.any?

      alerts = flash.map { |key, message| alert key, message }

      alerts.join.html_safe
    end

    def alert(key, message)
      content_tag :div, message.html_safe, class: "alert show fade alert-#{ key }", role: "alert", data: { bs_dismiss: "alert", controller: "alert" }
    end
  end
end
