import { Controller } from "@hotwired/stimulus"
import { sleep } from "concerns/helpers"

export default class extends Controller {
  connect() {
    console.log("Alert controller connected.")

    this.element.querySelectorAll(".alert").forEach(alert => {
      alert.addEventListener("click", this.dismissAlert.bind(this))
    })

    this.element.querySelectorAll(".alert a").forEach(link => {
      link.addEventListener("click", this.redirectAndDismissAlert.bind(this))
    })
  }

  redirectAndDismissAlert(event) {
    event.preventDefault()

    const destination = event.currentTarget.href
    const alert = event.currentTarget.parentElement

    if (alert) { alert.classList.remove("show") } // Bootstrap hide.

    window.location.href = destination
  }

  async dismissAlert(event) {
    const alert = event.currentTarget

    if (alert) {
      alert.classList.remove("show")

      await sleep(500)

      if (alert) { alert.remove() } // Yes, double checks are really necessary.
    }
  }
}
