import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log('Validation controller connected.')

    this.setupElements()
    this.initializeValidations()
  }

  disconnect() {
    this.cleanupEventListeners()
  }

  // // //
  // Validation methods.
  // // //

  validateCpf(cpf) {
    let isValid = true
    const cleanCpf = cpf.replace(/\D/g, "")
    const digits = cleanCpf.split("").map(Number)

    isValid = cleanCpf.length == 11 // Needs 11 digits.
    isValid = isValid && !digits.every((digit) => digit === digits[0]) // Can't be all the same.

    // First verification digit.
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i)
    }
    let digit = 11 - (sum % 11)
    if (digit > 9) digit = 0
    isValid = isValid && digit == digits[9]

    // Second verification digit.
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * (11 - i)
    }
    digit = 11 - (sum % 11)
    if (digit > 9) digit = 0
    isValid = isValid && digit == digits[10]

    return isValid || cpf.length == 0
  }

  validateEmail(email) {
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i

    return emailRegex.test(email) || email.length == 0
  }

  validateBrPhone(phone) {
    const cleanPhone = phone.replace(/\D/g, "")
    const phoneRegex = /^((1[1-9]|2[1-9]|3[1-9]|4[1-9]|5[1-9]|6[1-9]|7[1-9]|8[1-9]|9[1-9])(9[1-9][0-9]{7}|[2-5][0-9]{7})|(4004[0-9]{4}))$/

    return phoneRegex.test(cleanPhone) || phone.length == 0
  }

  // // //
  // Validation engine.
  // // //

  setupElements() {
    // TODO : Create.
    //
    // validateNumbers(), validateLetters(), validateAlphanumeric(), validateCnpj(), validateCpfCnpj(),
    // validateCep(), validateBrPlate(), validateDate() // We nave a very nice regex for this one
    this.validationClasses = {
      'validate-email': this.validateEmail.bind(this),
      'validate-br-phone': this.validateBrPhone.bind(this),
      'validate-cpf': this.validateCpf.bind(this)
    }
    this.validationKeys = Object.keys(this.validationClasses)
    this.inputs = Array.from(this.element.querySelectorAll('input, textarea, select'))
    this.submitButton = this.element.querySelector('button[type="submit"], input[type="submit"]')
  }

  initializeValidations() {
    // Event listeners.
    this.inputs.forEach(input => {
      input.addEventListener('input', () => this.validateInput(input))

      if (input.required) input.addEventListener('blur', () => this.validateInput(input))
    })
    this.submitButton.addEventListener('click', event => this.handleSubmit(event))

    // Custom validation methods based
    // on each input class.
    this.validationKeys.forEach(validationClass => {
      this.element.querySelectorAll(`input.${ validationClass }`).forEach(input => {
        input.validationMethod = this.validationClasses[validationClass]
      })
    })
  }

  validateInput(input) {
    let isValid = input.validationMethod ? input.validationMethod(input.value) : true

    if (input.required) isValid = isValid && input.value.length > 0

    input.classList.toggle('invalid', !isValid)

    return isValid
  }

  validateInputs() {
    let isValid = true

    this.inputs.forEach(input => { if (!this.validateInput(input)) isValid = false })

    return isValid
  }

  handleSubmit(event) {
    if (!this.validateInputs()) {
      event.preventDefault()
      console.log('Validation failed, submission prevented.')
    }
  }
}
