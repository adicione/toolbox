# frozen_string_literal: true

class Bootstrap::ModalComponent < ViewComponent::Base
  renders_one :header
  renders_one :footer

  def initialize(id: nil, dismissable: true, hidden: true, persistent: false, selfish: false, size: nil, centered: "modal-dialog-centered")
    @id = id
    @dismissable = dismissable
    @hidden = hidden
    @persistent = persistent
    @selfish = selfish # Will close other modals when opening.

    @size = size # Includes fullscreen.
    @centered = centered
  end

  def modal(&block)
    content_tag :div, capture(&block), modal_options
  end

  def modal_dialog(&block)
    classes = [ "modal-dialog", @size, @centered ].compact.join(" ")

    content_tag :div, capture(&block), class: classes
  end

  def modal_header
    return unless header?

    title = content_tag :h1, header, class: "modal-title fs-5"

    button = if @dismissable
      content_tag :button, "", class: "btn-close", data: { bs_dismiss: "modal" }, aria: { label: "Close" }
    end

    content_tag :div, class: "modal-header" do
      safe_join([ title, button ].compact)
    end
  end

  def modal_footer
    return unless footer?

    content_tag :div, class: "modal-footer" do
      footer
    end
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
        lonely: @lonely
      }
    }

    unless @dismissable
      options[:data][:bs_backdrop] = "static"
      options[:data][:bs_keyboard] = "false"
    end

    options.compact # Remove nil values.
  end
end
