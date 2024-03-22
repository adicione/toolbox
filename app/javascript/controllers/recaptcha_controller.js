import { Controller } from '@hotwired/stimulus'
import { sleep } from 'concerns/helpers'

export default class extends Controller {
  static targets = ['loginForm', 'recaptcha', 'reloadMessage', 'recaptchaToken', 'loginField', 'passwordField', 'submitButton']

  initialize() {
    console.log('Recaptcha controller connected.')
    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    scriptTag.async = true
    scriptTag.onload = this.renderTurnstile.bind(this)
    document.head.appendChild(scriptTag)
  }

  renderTurnstile() {
    const sitekey = this.element.dataset.sitekey // Set in the view.

    console.log('Recaptcha on')

    window.turnstile.render(this.recaptchaTarget, {
      'sitekey': sitekey,
      'theme': 'light',
      'callback': (e) => this.showForm(e),
      'error-callback': (e) => this.showReload(e),
      'expired-callback': (e) => this.showReload(e)
    })
  }

  async showForm(e) {
    const recaptcha = this.recaptchaTarget
    const form = this.loginFormTarget

    recaptcha.classList.add('fade-out')

    await sleep(500)

    recaptcha.hidden = true
    form.classList.add('fade-in')
    form.hidden = false
    this.recaptchaTokenTarget.value = e
  }

  async showReload(e) {
    console.log('Recaptcha Off')

    this.recaptchaTarget.classList.add('fade-out')
    this.loginFormTarget.classList.add('fade-out')

    await sleep(500)

    this.recaptchaTarget.hidden = true
    this.loginFormTarget.hidden = true
    this.recaptchaTokenTarget.value = ''
    this.loginFormTarget.innerHTML = ''
    this.reloadMessageTarget.classList.add('fade-in')
    this.reloadMessageTarget.hidden = false
  }

  toggleSubmitButton() {
    const isFormValid = this.recaptchaTokenTarget.value && this.loginFieldTarget.value && this.passwordFieldTarget.value

    this.submitButtonTarget.disabled = !isFormValid
    this.submitButtonTarget.hidden = !isFormValid
  }

  validate(e) {
    const hasToken = this.recaptchaTokenTarget.value.length > 0

    if (!hasToken) e.preventDefault()

    return hasToken
  }
}