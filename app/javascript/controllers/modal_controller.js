import { Controller } from "@hotwired/stimulus"
import "bootstrap"

// Connects to data-controller="modal"
export default class extends Controller {
  connect() {
    console.log("Modal controller connected.")

    this.modalInstance = new bootstrap.Modal(this.element)

    this.showTurboModal()
    this.hideOtherModals()

    console.log("🚨 modalInstance:", this.modalInstance)

    this.element.addEventListener("hidden.bs.modal", event => {
      this.removeModal()
    })

    document.addEventListener("shown.bs.modal", event => {
      this.focusModal()
    })
  }

  disconnect() {
    console.log("Modal controller disconnected.")

    this.modalInstance.dispose()
    this.element.removeEventListener("hidden.bs.modal", this.removeModal)

    document.removeEventListener("shown.bs.modal", this.focusModal)
  }

  showTurboModal() {
    if (this.element.dataset.hidden === "false" && window.getComputedStyle(this.element).display === "none") {
      this.modalInstance.show()
    }
  }

  focusModal() {
    this.element.focus()
  }

  hideOtherModals() {
    if (this.element.dataset.selfish === "false") return

    const modalBuddies = document.querySelectorAll(".modal.show") // Open modals.

    modalBuddies.forEach(modal => {
      if (modal !== this.element) bootstrap.Modal.getInstance(modal)?.hide()
    })
  }

  hideModal() {
    this.modalInstance.hide()
  }

  removeModal() {
    if (this.element.dataset.persistent === "false") {
      console.log("Removing non-persistent modal.")
      this.element.remove() // Removes non-persistent.
    }
  }
}
