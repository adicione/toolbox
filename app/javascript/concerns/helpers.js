// With async methods, add with await to delay the next line of code.
//
// Example:
//
// async myMethod(stuff) {
//   await sleep(1000) // Waits 1 second.
// }
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Toggles between the first and second class on the target element.
function toggleClass(target, first, second) {
  if (!target) return; // Prevent errors if target is null/undefined

  if (target.classList.contains(first)) {
    target.classList.replace(first, second); // Swap first -> second
  } else if (target.classList.contains(second)) {
    target.classList.replace(second, first); // Swap second -> first
  } else {
    target.classList.add(first); // Default to adding first if neither is present
  }
}

// If the element exists in the array, remove it, otherwise, add it.
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

function getCookie(startString) {
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith(startString))?.split('=')[1]

  return cookieValue ? decodeURIComponent(cookieValue).split(",").map(x => x) : ""
}

function setCookie(name, content = "") {
  const expires = "expires=" + new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toUTCString()

  document.cookie = name + "=" + encodeURIComponent(content) + ";" + expires + ";path=/"
}

function expireCookies(startString) {
  const cookies = document.cookie.split(";").filter(cookie => cookie.trim().startsWith(startString))

  cookies.forEach(cookie => {
    const [name] = cookie.split("=")
    document.cookie = `${[name]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
}

// TODO : Add BR phone and email validation.
//
// BR phone = /\A\(?((11|12|13|14|15|16|17|18|19|21|22|24|27|28|31|32|33|34|35|37|38|41|42|43|44|45|46|47|48|49|51|53|54|55|61|62|63|64|65|66|67|68|69|71|73|74|75|77|79|81|82|83|84|85|86|87|88|89|91|92|93|94|95|96|97|98|99))\)?(?:\s|-)?(?:[2-5]\d{3}|9[1-9]\d{3})(?:-)?(?:\d{4})\z/
// Email = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

// Validates dd/mm/yyyy format with leap year.
function valiDate(date) {
  const regex = /^(?:(?:(?:(?:31\/(?:0[13578]|1[02]))|(?:(?:29|30)\/(?:0[13-9]|1[0-2])))\/\d{4})|(?:(?:29\/02\/(?:(?:19|[2-9]\d)(?:04|08|[2468][048]|[3579][26])|2000|2400)))|(?:0[1-9]|[12]\d|3[01])\/(?:0[13578]|1[02])\/\d{4}|(?:0[1-9]|1\d|2[0-8])\/(?:0[1-9]|1[0-2])\/\d{4}|(?:29|30)\/(?:0[469]|11)\/\d{4})$/

  return regex.test(date)
}

export { sleep, toggleClass, toggleArrayElement, toggleArrayElementByTest, valiDate, getCookie, expireCookies, setCookie }
