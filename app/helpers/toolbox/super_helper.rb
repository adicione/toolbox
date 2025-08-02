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
      turbo_stream.append id do
        tag.script do
          <<~JS.html_safe
            const e = document.getElementById("#{id}")

            if (e) {
              const c = Stimulus.getControllerForElementAndIdentifier(e, "modal")

              if (c) {
                console.log("Closing modal.")
                c.hideModal()
              } else {
                console.warn("Modal controller not found.")
              }
            } else {
              console.warn("Modal element not found.")
            }
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
