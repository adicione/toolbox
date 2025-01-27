module Toolbox
  module Helpers
    def icon(icon, options = {})
      # Ensure the class includes "notranslate" to prevent Google Translate
      options[:class] = [ icon.to_s, options[:class], "notranslate" ].compact.join(" ")

      # Set default attributes and merge additional options
      html_options = options.merge(translate: "no", hidden: options.delete(:hidden))

      # Generate the `<i>` tag with attributes
      content_tag(:i, nil, html_options)
    end
  end
end
