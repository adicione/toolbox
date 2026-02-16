# frozen_string_literal: true

class Toolbox::ModalComponent < ViewComponent::Base
  def initialize(id: nil, dismissable: true, close_button: false, hidden: true, persistent: false, selfish: false, size: nil, vertically_centered: true)
    @id = id
    @dismissable = dismissable
    @close_button = close_button
    @hidden = hidden
    @persistent = persistent
    @selfish = selfish # Will close other modals when opening.

    @size = size # Includes fullscreen.
    @vertically_centered = vertically_centered
  end

  # data-bs-backdrop="static"

  def modal_dialog
    classes = [ "modal-dialog", @size, vertically_centered ].compact.join " "

    content_tag :div, class: classes do
      content_tag :div, class: "modal-content" do
        content
      end
    end
  end

  # def modal_content
  #   return unless content.present?

  #   if @custom_content
  #     content
  #   else
  #     content_tag :div, content, class: "modal-body pb-0"
  #   end
  # end

  # def modal_header
  #   return unless header?

  #   title = content_tag :h1, header, class: "modal-title fs-5"

  #   content_tag :div, class: "modal-header" do
  #     safe_join [ title, close_button ].compact
  #   end
  # end

  # def modal_footer
  #   return unless footer?

  #   content_tag :div, footer.to_s.html_safe, class: "modal-footer"
  # end

  private

  def vertically_centered
    "modal-dialog-centered" if @vertically_centered
  end

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
end
