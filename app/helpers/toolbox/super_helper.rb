module Toolbox
  module SuperHelper
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

    def turbo_close_modal(id)
      turbo_stream.append "overlay" do
        tag.script id: "close-modal", type: "module" do
          <<~JS.html_safe
            const element = document.getElementById("#{ id }")

            if (element) {
              const controller = Stimulus.getControllerForElementAndIdentifier(element, "modal")

              if (controller) { controller.hideModal() }
            }

            document.getElementById("close-modal").remove()
          JS
        end
      end
    end

    def link_to_confirmation(content, destination, **options)
      link_style = options.delete(:class)

      link_to content, toolbox.confirmation_path(destination, **options), class: link_style, data: { turbo_stream: true }
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
