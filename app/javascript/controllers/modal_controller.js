import { Controller } from "@hotwired/stimulus"
import { sleep } from "concerns/helpers"

// Connects to data-controller='modal'

export default class extends Controller {
  static targets = ["container", "blur"]

  connect() {
    // if(this.element.dataset.trigger!="") {
    //   document.getElementById(this.element.dataset.trigger).addEventListener("click", this.openModal.bind(this))
    // }

    // this.observe()
  }

  // escListener(e) {
  //   if(e.key == "Escape"){
  //     this.closeModal()
  //   }
  // }
  // addEscListener() {
  //   document.body.addEventListener("keydown", this.escListener.bind(this))
  // }

  // removeEscListener() {
  //   document.body.removeEventListener("keydown", this.escListener.bind(this))
  // }

  disconnect() {
    this.observer.disconnect()
  }

  // observe() {
  //   this.observer = new MutationObserver(mutations => {
  //     mutations.forEach(mutation => {
  //       Array.from(mutation.addedNodes).forEach(node => {
  //         if ((node.nodeType === Node.ELEMENT_NODE && node.matches('[hidden]')) || (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === 'close modal')) {
  //           this.closeModal()
  //         }
  //       })
  //     })
  //   })

  //   this.observer.observe(this.element, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['hidden'] })
  // }

  async openModal() {
    this.addEscListener()
    this.element.hidden = false
    this.element.style.display = "flex"
    await sleep(125)
    this.blurTarget.hidden = false
    this.blurTarget.classList.remove('fade-out')
    this.containerTarget.classList.add('active')
    document.body.style.overflow = "hidden" // To avoid scroling the body when the modal is active
  }

  async closeModal() {
    console.log("Modal Was Closed!")
    //this.removeEscListener()
    this.containerTarget.classList.remove('active')
    this.blurTarget.classList.add('fade-out')
    document.body.style.overflow = "auto"
    await sleep(500)
    if(this.element.dataset.persistent == "true"){
      this.element.hidden = true
      this.element.style.display = "none"
      this.blurTarget.hidden = true
    }else{
      this.element.remove()
    }
  }
}
