function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    groupSize: document.querySelector("#groupSize").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#groupSize").value = result.groupSize || "70";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("groupSize");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
