import { Controller } from "@hotwired/stimulus"
import "bootstrap"

// Connects to data-controller="alert"
export default class extends Controller {
  connect() {
    console.log("Alert controller connected.")

    this.alertInstance = new bootstrap.Alert(this.element)

    this.timeOut = setTimeout(() => { this.alertInstance.close() }, 20000)
  }

  disconnect() {
    console.log("Alert controller disconnected.")

    clearTimeout(this.timeOut)

    this.alertInstance.dispose()
  }
}
