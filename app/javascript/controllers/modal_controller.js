import { Controller } from "@hotwired/stimulus"
import "bootstrap"

// Connects to data-controller="modal"
export default class extends Controller {
  connect() {
    console.log("Modal controller connected.")

    this.modalInstance = new bootstrap.Modal(this.element)

    if (this.element.dataset.selfish === "true") {
      this.closeOtherModals()
    }

    if (this.element.dataset.hidden === "false" && window.getComputedStyle(this.element).display === "none") {
      this.modalInstance.show() // Normally from turbo-stream.
    }

    this.element.addEventListener('hidden.bs.modal', event => {
      if (this.element.dataset.persistent === "false") { this.element.remove() }
    })

    document.addEventListener("shown.bs.modal", this.focusModal.bind(this))
  }

  disconnect() {
    console.log("Modal controller disconnected.")

    this.modalInstance.dispose()
  }

  hideModalBuddies() {
    const modalBuddies = document.querySelectorAll(".modal.show") // Open modals.

    modalBuddies.forEach(modal => {
      if (modal !== this.element) { // Exclude the current modal.
        let bsModal = bootstrap.Modal.getInstance(modal)

        if (bsModal) bsModal.hide()
      }
    })
  }

  focusModal() {
    this.element.focus() // Bootstrap does not respect HTML focus after "shown.bs.modal".
  }
}
