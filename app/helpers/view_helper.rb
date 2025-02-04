module ViewHelper
  # include ActionView::Helpers::TagHelper
  include ActionView::Context

  # A base for turbo includes. (modals and etc...)
  #
  # Personal channel. (when a current user available)
  # Flash messages with "flash: true". (default false)
  #
  # TODO:
  #
  # Way to add turbo channels as needed.
  # def overlay(flash: false)
  #   personal_channel = current_user ? turbo_stream_from(dom_id(current_user, :personal_channel)) : ""
  #   overlay = content_tag(:div, id: "overlay") do
  #     content_tag(:ul, flash_messages, id: "flash-wrap") if flash
  #   end

  #   personal_channel + overlay
  # end

  def modal(id: "", size: "md", location: "center", dismissable: true, &block)
    content_tag(:div, class: "modal #{ location }", id: id, tabindex: 0, data: { controller: "modal", modal_dismissable: dismissable }) do
      concat(content_tag(:div, "", class: "blur fade-in", data: { action: "click->modal#closeModal", modal_target: "blur" }))
      concat(
        content_tag(:div, class: "container #{ size } active", data: { modal_target: "container" }) do
          content_tag(:div, capture(&block), class: "content")
        end
      )
    end
  end

  def flash_messages
    return unless flash.any?

    messages = flash.map do |key, message|
      content_tag(:li, message.html_safe, class: "flash-message #{ key } flash-fade-in-and-out")
    end

    messages.join.html_safe
  end

  # Renders material icons.
  def toolbox_icon(icon, options = {})
    icon_name = case icon

    when "back"
      "arrow_back_ios"
    when "forward"
      "arrow_forward_ios"
    else
      icon
    end

    # Define the base class string for the icon.
    style = [ "notranslate", "material-icons-regular" ]

    # Back button style.
    style << "back" if icon == "back"

    # Include any additional classes specified in the options.
    style << options.delete(:class) if options[:class].present?

    # Join all class names into a single string.
    style = style.join(" ")

    # Prepare the HTML attributes, starting with class and translate.
    html_options = {
      class: style,
      translate: "no",
      hidden: true # (options.delete(:hidden) ? true : false)
    }

    # Merge the remaining options into html_options,
    # ensuring proper attribute formatting.
    html_options.merge!(options)

    # Create the content tag with the correct attributes.
    content_tag(:i, icon_name, html_options)
  end

  # Generates an <hr> tag to divide card objects.
  # Adds the "mobile" class to the <hr> tag if the object is the first in the collection.
  # The "mobile" class is typically used to style the <hr> for visibility
  # in mobile layouts, and it will be hidden in non-mobile (desktop) applications.
  # It is specially useful in "row" and "column" layouts.
  def toolbox_card_divider(object)
    collection = object.class.name.downcase.pluralize
    first_object = controller.view_assigns[collection].first

    content_tag(:hr, nil, class: ("mobile" if first_object == object))
  end
end
