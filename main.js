var count = 0
var mode = 0
var modes = ["black", "blue", "black", "red"]

var spanEl = document.createElement("span")
spanEl.classList.add("dr")

/**
 * Logs the error passed, prepends an 'Error: ' string.
 * @param {string} error The error to report
 */
function onError(error) {
  console.log(`Error: ${error}`)
}

browser.storage.local.get("groupSize")
  .then(function(result) {
    var groupSize = result.groupSize
    groupSize = groupSize ? parseInt(groupSize) : 70
    start(groupSize)
  }, onError)

// Turbolinks gem
document.addEventListener("turbolinks:load", start)

/*
The algorithm works as follows:
count = 0
For every p in all p's
  For every child node n of p that is of type text
    For every char in n
      If no span has been defined
        Define the span
      Add char to span innerHtml
      If the (char is " " and count > 70) or (count > 140)
        count = 0, add the span, undefine it
      Increase the count
    If span is defined
      count = 0, add the span, undefine it
*/


function start(groupSize) {

  $("p,li,td")
    .contents()
    .filter(function() {
      return this.nodeType === 3
    })
    .each(function() {
      var spans = process(this)
      replace(this, spans)
    })

  function process(_this) {
    var t = _this.nodeValue
    var length = t.length
    var spans = []
    var span
    var buffer = ""

    function add() {
      count = 0
      setInnerHTML(span, buffer)
      buffer = ""
      addMode(span, modes[mode])
      spans.push(span)
      span = null
    }

    function increaseMode() {
      mode++
      if (mode == 4) {
        mode = 0
      }
    }

    for(var i = 0; i < length; i++) {
      var char = t[i]
      if (!span) {
        span = createSpan()
      }
      buffer += char
      if ((char == " " && count > groupSize) || (count > groupSize + 70)) {
        add()
        increaseMode()
      }
      count++
    }
    if (span) {
      add()
    }
    return spans
  }
}

/**
 * Appends html to innerHTML of el
 * @param {HTMLElement} el The element
 * @param {*} html The html to append
 */
function setInnerHTML(el, html) {
  el.innerHTML += html
}

/**
 * Adds a mode to the className
 * @param {HTMLElement} el The element
 * @param {string} mode The mode to add
 */
function addMode(el, mode) {
  el.className += " " + mode
}

/**
 * Creates a span
 */
function createSpan() {
  var span = spanEl.cloneNode(false)
  span.innerHTML = ""
  return span
}

/**
 * Replaces el with the array of spans
 * @param {HTMLElement} el The element
 * @param {HTMLCollection/Array} spans The spans to replace el with
 */
function replace(el, spans) {
  el.replaceWith.apply(el, spans)
}
