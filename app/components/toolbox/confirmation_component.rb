# frozen_string_literal: true

class Toolbox::ConfirmationComponent < ViewComponent::Base
  def initialize(link_text, path, **options)
    @link_text = link_text
    @path = path
    @options = options # Extract options.
    @class = options[:class]
    @btn_text = options[:btn_text] || "Apagar"
    @confirm = options[:confirm] || "Olha lá ein... Certeza?"
    @id = options[:id] || "confirmation-modal-#{ rand(10000) }" # Extract the id or generate one.
  end

  def modal_link
    link_to @link_text, "#", class: @class, data: { bs_toggle: "modal", bs_target: "##{ @id }" }
  end

  def delete_btn
    link_to @btn_text, @path, class: "btn btn-danger mb-3", data: { bs_dismiss: "modal", turbo_method: :delete }
  end

  def cancel_btn
    link_to "Fechar", "#", class: "btn btn-warning mb-3", data: { bs_dismiss: "modal" }
  end
end
