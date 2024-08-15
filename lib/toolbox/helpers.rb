module Helpers
  # Generates an <hr> tag to divide card objects.
  # Adds the "mobile" class to the <hr> tag if the object is the first in the collection.
  # The "mobile" class is typically used to style the <hr> for visibility
  # in mobile layouts, and it will be hidden in non-mobile (desktop) applications.
  # It is specially useful in "row" and "column" layouts.
  def card_divider(object)
    collection = object.class.name.downcase.pluralize
    first_object = controller.view_assigns[collection].first
  
    content_tag(:hr, nil, class: ("mobile" if first_object == object))
  end
end