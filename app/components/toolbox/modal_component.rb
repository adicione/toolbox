# frozen_string_literal: true

class Toolbox::ModalComponent < ViewComponent::Base
  renders_one :header
  renders_one :footer

  def initialize(id: nil, dismissable: true, close_button: false, hidden: true, persistent: false, selfish: false, size: nil, centered: "modal-dialog-centered", custom_content: false)
    @id = id
    @dismissable = dismissable
    @close_button = close_button
    @hidden = hidden
    @persistent = persistent
    @selfish = selfish # Will close other modals when opening.

    @size = size # Includes fullscreen.
    @centered = centered
    @custom_content = custom_content
  end

  def modal_dialog
    classes = [ "modal-dialog", @size, @centered ].compact.join " "

    content_tag :div, class: classes do
      unless @custom_content
        content_tag :div, class: "modal-content" do
          safe_join [ modal_header, modal_content, modal_footer ].compact
        end
      else
        modal_content
      end
    end
  end

  def modal_header
    return unless header?

    title = content_tag :h1, header, class: "modal-title fs-5"

    content_tag :div, class: "modal-header" do
      safe_join [ title, close_button ].compact
    end
  end

  def modal_content
    return unless content.present?

    if @custom_content
      content
    else
      content_tag :div, content, class: "modal-body pb-0"
    end
  end

  def modal_footer
    return unless footer?

    content_tag :div, footer.to_s.html_safe, class: "modal-footer"
  end

  private

  def modal_options
    options = {
      id: @id,
      class: "modal fade",
      tabindex: -1,
      data: {
        controller: "modal",
        hidden: @hidden,
        persistent: @persistent,
        selfish: @selfish
      }
    }

    unless @dismissable
      options[:data][:bs_backdrop] = "static"
      options[:data][:bs_keyboard] = "false"
    end

    options.compact # Remove nil values.
  end

  def close_button
    return unless @dismissable && @close_button

    content_tag :button, "", class: "btn-close", data: { bs_dismiss: "modal" }, aria: { label: "Close" }
  end
end
