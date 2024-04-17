import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    console.log('Masking controller connected.')

    this.initializeAndWatchInputs()
  }

  initializeAndWatchInputs() {
    // Map classes to mask functions.
    //
    // TODO : Create.
    //
    // maskNumbers()
    // maskLetters()
    // maskAlphanumeric()
    // maskCpfCnpj()
    const maskClasses = {
      'mask-date': this.maskDate,
      'mask-br-phone': this.maskBrPhone,
      'mask-cpf': this.maskCpf,
      'mask-cnpj': this.maskCnpj,
      'mask-brl': this.maskBrl,
      'mask-usd': this.maskUsd,
      'mask-cep': this.maskCep,
      'mask-br-plate': this.maskBrPlate
    }

    // Loops through each mask type.
    Object.keys(maskClasses).forEach(maskClass => {
      this.element.querySelectorAll(`input.${ maskClass }`).forEach(input => {
        // Applies the mask immediately if there's
        // an initial value.
        if (input.value) { this.setInput(input, maskClasses[maskClass].call(this, input.value)) }

        // Attaches an input event listener
        // for dynamic masking.
        input.addEventListener('input', event => { this.setInput(event.target, maskClasses[maskClass].call(this, event.target.value)) })
      })
    })
  }

  setInput(input, mask) {
    // Sets the current position based on
    // the current cursor position.
    let newPosition = input.selectionStart

    // If the cursor is in the last position, it
    // will push the cursor forward by the difference
    // if the new value has the same lenght.
    if (input.value.length == newPosition) { newPosition += Math.max(0, mask.result.length - input.value.length) }

    // And checks if the new position
    // ends up in a mask position.
    while (mask.maskPositions.includes(newPosition)) { newPosition++ }

    input.value = mask.result
    input.selectionStart = newPosition
    input.selectionEnd = newPosition
  }

  // // //
  // Masking functions.
  // // //

  maskDate(date) {
    let result = date.replace(/\D/g, '').slice(0, 8)
    result = result
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})\/(\d{2})(\d{1,4})/, '$1/$2/$3')
    const maskPositions = [3, 6]

    return { result, maskPositions }
  }

  maskBrPhone(phone) {
    const rawPhone = phone.replace(/\D/g, '').slice(0, 11)
    const result = rawPhone
      .replace(/^(?=\d{0,2}$)(\d{1,2})/, '($1')
      .replace(/^(?=\d{3,6}$)(\d{2})(\d{1,4})/, '($1) $2')
      .replace(/^(?=\d{7,10}$)(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3')
      .replace(/^(?=\d{11}$)(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    const maskPositions = [1, 4, 5, ((rawPhone.length <= 10) ? 10 : 11)]

    return { result, maskPositions }
  }

  maskCpf(cpf) {
    let result = cpf.replace(/\D/g, '').slice(0, 11)
    result = result
      .replace(/^(?=\d{1,6}$)(\d{3})(\d)/, '$1.$2')
      .replace(/^(?=\d{7,9}$)(\d{3})(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(?=\d{10,11}$)(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4')
    const maskPositions = [4, 8, 12]

    return { result, maskPositions }
  }

  maskCnpj(cnpj) {
    let result = cnpj.replace(/\D/g, '').slice(0, 14)
    result = result
      .replace(/^(?=\d{1,5}$)(\d{2})(\d)/, '$1.$2')
      .replace(/^(?=\d{6,8}$)(\d{2})(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(?=\d{9,12}$)(\d{2})(\d{3})(\d{3})(\d)/, '$1.$2.$3/$4')
      .replace(/^(?=\d{13,14}$)(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, '$1.$2.$3/$4-$5')
    const maskPositions = [3, 7, 11, 16]

    return { result, maskPositions }
  }

  maskBrl(cents) {
    const rawCents = cents.replace(/\D/g, '').replace(/^0+/, '')
    let result = rawCents // Set differently as it will determine mask positions.

    // Pads the cents with zeroes if any.
    if (rawCents.length >= 1) { result = rawCents.padStart(3, '0') }

    result = result.replace(/^(\d+)(\d{2})$/, 'R$ $1,$2')

    // Start the mask positions as
    // the R$ plus a space will always be there.
    let maskPositions = [1, 2, 3]

    // The zeroes before the first number
    if (rawCents.length <= 2) { maskPositions.push(4) }
    if (rawCents.length == 1) { maskPositions.push(6) }

    // The comma.
    maskPositions.push(result.length - 2)

    // Retorna o resultado formatado e as posições da máscara
    return { result, maskPositions }
  }

  maskUsd(cents) {
    const rawCents = cents.replace(/\D/g, '').replace(/^0+/, '')
    let result = rawCents // Set differently as it will determine mask positions.

    // Pads the cents with zeroes if any.
    if (rawCents.length >= 1) { result = rawCents.padStart(3, '0') }

    result = result.replace(/^(\d+)(\d{2})$/, '$ $1.$2')

    // Start the mask positions as
    // the $ plus a space will always be there.
    let maskPositions = [1, 2]

    // The zeroes before the first cent.
    if (rawCents.length <= 2) { maskPositions.push(3) }
    if (rawCents.length == 1) { maskPositions.push(5) }

    // The comma.
    maskPositions.push(result.length - 2)

    // Retorna o resultado formatado e as posições da máscara
    return { result, maskPositions }
  }
  
  maskCep(cep) {
    let result = cep.replace(/\D/g, "").slice(0, 8)
    result = result.replace(/^(\d{5})(\d{1,3})$/, "$1-$2")
    const maskPositions = [5]

    return { result, maskPositions }
  }

  maskBrPlate(input) {
    // First, converts the input to uppercase and
    // strips all non-alphanumeric characters, mantaining
    // it under 7 characters.
    let result = input.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 7)

    const letterPositions = [1, 2, 3]
    letterPositions.forEach(position => {
      if (result.length >= position && !/[A-Z]/.test(result[position - 1])) {
        result = result.slice(0, position - 1)
      }
    })

    const digitPositions = [4, 6, 7]
    digitPositions.forEach(position => {
      if (result.length >= position && !/\d/.test(result[position - 1])) {
        result = result.slice(0, position - 1)
      }
    })

    if (result.length >= 5 && !/[A-J0-9]/.test(result[4])) {
      result = result.slice(0, 4) // Accepts only 0-9 or A-J...
    }

    result = result.replace(/^([A-Z]{3})(.)/, "$1-$2")

    const maskPositions = [3]

    return { result, maskPositions }
  }
}
