module IconsHelper
  def icon(icon, style = nil, family = "regular")
    # TODO : Google translate adds a font > font tag inside the translated icon,
    # we need to create a CSS to fix it on notranslate class.

    css = "notranslate material-icons-#{family}"
    css = "#{css} #{style}" if style.present?
    css = "#{css} back" if icon == "back"
  
    icon = icon == "back" ? "arrow_back_ios" : (icon == "forward" ? "arrow_forward_ios" : icon)

    content_tag(:i, icon, class: css, translate: "no")
  end
end
