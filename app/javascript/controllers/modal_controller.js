import { Controller } from "@hotwired/stimulus"
import "bootstrap"

// Connects to data-controller="modal"
export default class extends Controller {
  connect() {
    console.log("Modal controller connected.")

    this.modalInstance = new bootstrap.Modal(this.element)

    if (this.element.getAttribute("aria-hidden") === "false") {
      this.modalInstance.show() // From turbo-stream.
    }

    this.element.addEventListener('hidden.bs.modal', event => {
      if (this.element.dataset.persistent === "false") { this.element.remove() }
    })
  }

  disconnect() {
    console.log("Modal controller disconnected.")

    this.modalInstance.dispose()
  }
}
