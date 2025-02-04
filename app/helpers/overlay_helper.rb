module OverlayHelper
  # include ActionView::Context

  # A base for turbo includes. (modals, flash and etc...)
  #
  # TODO:
  #
  # Way to add sitewise turbo channels as needed.
  def overlay
    content_tag :div, id: "overlay" do
      content_tag :div, alerts, id: "alerts", class: "position-fixed p-3 top-0 end-0", data: { controller: "alert" }
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
    content_tag :div, message.html_safe, class: "alert show fade alert-#{ key }", role: "alert", data: { bs_dismiss: "alert" }
  end
end
