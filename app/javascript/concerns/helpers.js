// With async methods, add with await to delay the next line of code.
//
// Example: await sleep(500)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Toggles between the first and second class on the target element.
function toggleClass(target, first, second) {
  if (target.classList.contains(first) || target.classList.contains(second)) {
    target.classList.toggle(first)
    target.classList.toggle(second)
  } else {
    target.classList.add(first)
  }
}

// If the element exists in the array, remove it. Otherwise, add it.
function toggleArrayElement(array, element) {
  const newArray = [...array]

  if (newArray.includes(element)) {
    newArray.splice(newArray.indexOf(element), 1)
  } else {
    newArray.push(element)
  }

  return newArray
}

// Will add the element to the array if add is true and the element is not already in the array.
function toggleArrayElementByTest(array, add, element) {
  const newArray = [...array]

  if (add && !newArray.includes(element)) {
    newArray.push(element)
  } else if (!add) {
    newArray.splice(newArray.indexOf(element), 1)
  }

  return newArray
}

// Date validation for dd/mm/yyyy format.
function valiDate(date) {
  const regex = /^(?:(?:(?:(?:31\/(?:0[13578]|1[02]))|(?:(?:29|30)\/(?:0[13-9]|1[0-2])))\/\d{4})|(?:(?:29\/02\/(?:(?:19|[2-9]\d)(?:04|08|[2468][048]|[3579][26])|2000|2400)))|(?:0[1-9]|[12]\d|3[01])\/(?:0[13578]|1[02])\/\d{4}|(?:0[1-9]|1\d|2[0-8])\/(?:0[1-9]|1[0-2])\/\d{4}|(?:29|30)\/(?:0[469]|11)\/\d{4})$/

  return regex.test(date)
}

function expireCookies(startString) {
  const cookies = document.cookie.split(";").filter(cookie => cookie.trim().startsWith(startString))

  cookies.forEach(cookie => {
    const [name] = cookie.split("=")
    document.cookie = `${[name]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
}

function getCookie(startString) {
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith(startString))?.split('=')[1]

  return cookieValue ? decodeURIComponent(cookieValue).split(",").map(x => x) : ""
}

function setCookie(name, content = "") {
  const expires = "expires=" + new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toUTCString()

  document.cookie = name + "=" + encodeURIComponent(content) + ";" + expires + ";path=/"
}

export { sleep, toggleClass, toggleArrayElement, toggleArrayElementByTest, valiDate, getCookie, expireCookies, setCookie }
