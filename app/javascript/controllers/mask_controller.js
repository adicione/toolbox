import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    console.log('Masking controller connected.')

    this.initializeAndWatchInputs()
  }

  initializeAndWatchInputs() {
    // Map classes to mask functions.
    const maskClasss = {
      'date-mask': this.maskDate,
      'phone-mask': this.maskPhone,
      'cpf-mask': this.maskCpf,
      'cnpj-mask': this.maskCnpj
    }

    // Loops through each mask type.
    Object.keys(maskClasss).forEach(maskClass => {
      this.element.querySelectorAll(`input.${ maskClass }`).forEach(input => {
        // Applies the mask immediately if there's
        // an initial value.
        if (input.value) { this.setInput(input, maskClasss[maskClass].call(this, input.value)) }

        // Attaches an input event listener
        // for dynamic masking.
        input.addEventListener('input', event => { this.setInput(event.target, maskClasss[maskClass].call(this, event.target.value)) })
      })
    })
  }

  // // //
  // Masking functions.
  // // //

  // Ajusts the cursor position and
  // sets the input with the new value
  // after masking.
  setInput(input, mask) {
    const initialCursorPos = input.selectionStart
    const maskPositionAjustment = mask.maskPositions.includes(initialCursorPos) ? 1 : 0
    const cursorPos = initialCursorPos + maskPositionAjustment

    input.value = mask.result
    input.selectionStart = cursorPos
    input.selectionEnd = cursorPos
  }

  maskCpf(cpf) {
    const unformattedCpf = cpf.replace(/\D/g, '').slice(0, 11)
    const result = unformattedCpf
      .replace(/^(?=\d{1,6}$)(\d{3})(\d)/, '$1.$2')
      .replace(/^(?=\d{7,9}$)(\d{3})(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(?=\d{10,11}$)(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4')
    const maskPositions = [4, 8, 12]

    return { result, maskPositions }
  }
}












// TODO : Old code, delete after implementing all the masks on new filter.

  // maskPhone(phone) {
  //   const cleanPhone = phone.replace(/\D/g, '').slice(0, 11)
  //   const dashPosition = cleanPhone.length <= 10 ? 4 : 5
  //   const dashRegex = new RegExp('(\\d{' + dashPosition + '})(\\d)')

  //   return cleanPhone
  //     .replace(/(\d{0})(\d)/, '$1($2')
  //     .replace(/(\d{2})(\d)/, '$1) $2')
  //     .replace(dashRegex, '$1-$2')
  // }

  // maskDateField(date) {
  //   date
  //     .replace(/\D/g, "")
  //     .replace(/(\d{2})(\d)/, "$1/$2")
  //     .replace(/(\d{2})\/(\d{2})(\d{1,4})/, "$1/$2/$3")
  // }

  // maskCnpj(cnpj) {
  //   const unformattedCnpj = cnpj.replace(/\D/g, '').slice(0, 14)

  //   return unformattedCnpj
  //     .replace(/^(?=\d{1,3}$)(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  // }




// import { Controller } from '@hotwired/stimulus'

// // Connects to data-controller='masking'

// export default class extends Controller {
//   connect() {
//     console.log('Masking controller connected.')

//     this.findMaskables()
//   }

//   findMaskables() {
//     // masks = ["phone", "date", "time", "money", "datetime", "cpf-cnpj", "cep"]

//     // Mask email, no spaces, no special characters

//     this.timeInputs = Array.from(this.element.querySelectorAll('input.time'))
//     this.moneyInputs = Array.from(this.element.querySelectorAll('input.money'))
//     this.datetimeInputs = Array.from(this.element.querySelectorAll('input.datetime'))
//     this.cpfCnpjInputs = Array.from(this.element.querySelectorAll('input.cpf-cnpj'))
//     this.cepInputs = Array.from(this.element.querySelectorAll('input.cep'))

//     this.phoneInputs.forEach(phoneInput => { phoneInput.addEventListener('input', this.maskPhoneInput.bind(this)) })
//     this.dateInputs.forEach(dateInput => { dateInput.addEventListener('input', this.maskDateInput.bind(this)) })
//     this.timeInputs.forEach(timeInput => { timeInput.addEventListener('input', this.maskTimeInput.bind(this)) })
//     this.moneyInputs.forEach(moneyInput => { moneyInput.addEventListener('input', this.maskMoneyInput.bind(this)) })
//     this.cepInputs.forEach(cepInput => { cepInput.addEventListener('input', this.maskCepInput.bind(this)) })
//     this.datetimeInputs.forEach(datetimeInput => { datetimeInput.addEventListener('input', this.maskDatetimeInput.bind(this)) })
//     this.cepInputs.forEach(cepInput => { cepInput.addEventListener('input', this.maskCepInput.bind(this)) })
//   }

//   maskCpfCnpjInput(e) {
//     this.setInput(e.target, this.maskCpfCnpj(e.target.value))
//   }

//   maskTimeInput(e) {
//     this.setInput(e.target, this.maskTime(e.target.value))
//   }
  
//   maskMoneyInput(e) {
//     this.setInput(e.target, this.maskMoney(e.target.value))
//   }
  
//   maskDatetimeInput(e) {
//     this.setInput(e.target, this.maskDatetime(e.target.value))
//   }

//   maskCepInput(e) {
//     this.setInput(e.target, this.maskCep(e.target.value))
//   }

//   maskCpfCnpj(cpfCnpj) {
//     const clearCpfCnpj = cpfCnpj.replace(/\D/g, '').slice(0, 14)

//     return clearCpfCnpj
//       .replace(/^(?=\d{14}$)(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
//       .replace(/^(?=\d{11}$)(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
//   }

//   maskMoney(money) {
//     var clearMoney = (money.replace(/\D/g, '').replace(/^0+/, '')).padStart(3, '0')
//     return clearMoney.replace(/^(\d+)(\d{2})$/, function(_, p1, p2) {
//       return "R$ " + p1.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + p2
//     })
//   }

//   maskCep(cep){
//     const clearCep = cep.replace(/\D/g, '').slice(0, 8)

//     return clearCep.replace(/(\d{5})(\d{1,3})/, '$1-$2')
//   }

//   maskTime(time) {
//     const clearTime = time.replace(/\D/g, '').slice(0, 4)

//     return clearTime.replace(/(\d{2})(\d)/, '$1:$2')
//   }

//   maskDatetime(datetime) {
//     const clearDatetime = datetime.replace(/\D/g, '').slice(0, 12)
//     var maskedDatetime = this.maskDate(clearDatetime.slice(0,8))

//     if(clearDatetime.length > 8) {
//       maskedDatetime = maskedDatetime.concat(' ', this.maskTime(clearDatetime.slice(0-(clearDatetime.length - 8))))
//     }

//     return maskedDatetime
//   }

//   setInput(input, newValue) {
//     const cursorPos = input.selectionStart + (newValue.length - input.value.length)

//     input.value = newValue
//     input.selectionStart = cursorPos
//     input.selectionEnd = cursorPos
//   }
// }
