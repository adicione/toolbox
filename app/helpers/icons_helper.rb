module IconsHelper
  def icon(icon, options = {})
    icon_name = case icon
      when "back"
        "arrow_back_ios"
      when "forward"
        "arrow_forward_ios"
      else
        icon
      end

    # Define the base class string for the icon.
    style = ["notranslate", "material-icons-regular"]

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
end
