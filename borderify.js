var sheet = (function() {
	// Create the <style> tag
	var style = document.createElement("style");

	// Add a media (and/or media query) here if you'd like!
	// style.setAttribute("media", "screen")
	// style.setAttribute("media", "only screen and (max-width : 1024px)")

	// WebKit hack :(
	style.appendChild(document.createTextNode(""));

	// Add the <style> element to the page
	document.head.appendChild(style);

	return style.sheet;
})();

sheet.insertRule(".dr.red { color: red; }", 0);
sheet.insertRule(".dr.black { color: black; }", 0);
sheet.insertRule(".dr.blue { color: blue; }", 0);

var count = 0;
var mode = 0;
var modes = ["black", "blue", "black", "red"];

function increaseMode() {
  mode++;
  if (mode == 4) {
    mode = 0;
  }
}

$( "p" ).contents()
.filter(function() {
  return this.nodeType === 3;
})
.each(function(index) {
	var spans = process(this);
	replace(this, spans);
});

function process(_this) {
  var t = _this.nodeValue
  var length = t.length;
  var spans = [];

  for(var i = 0; i < length; i++) {
    var char = t[i];
		var span = createSpan(char);
    spans.push(span);
    if (char == " ") {
      if (count > 70) {
        count = 0;
        increaseMode();
      }
      else {
        span.classList.add(modes[mode]);
      }
    }
    else {
      span.classList.add(modes[mode]);
      count++;
    }
  }
	return spans;
}

function createSpan(char) {
	var span = document.createElement('span');
	span.innerHTML = char;
	span.classList.add('dr');
	return span;
}

function replace(_this, spans) {
	_this.replaceWith.apply(_this, spans);
}
