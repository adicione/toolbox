module Toolbox
  module Helpers
    module ViewHelper
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
  end
end
