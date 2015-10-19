/*
 * Script js
 */
var tooltipDom = document.getElementById('exemple-content').getElementsByClassName('tooltip');

// Init tooltip
tooltip = new Tooltip(tooltipDom);


function getContent(value){

  promise = new Promise(function(resolve, reject) {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api-dev.wesnipp.com/user/561ec02413de3c4e52c99235", true);
    xhr.send(null);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4){
        result = JSON.parse(xhr.responseText);
        console.log(result.bio);
        resolve(result.bio);
      }
    }
  });  

  return promise;
}

function removeAll(){
  tooltip.removeAll();
}

function loadContent(){
  tooltip.removeAll();
  var content = document.getElementById('exemple-content');

  xhr = new XMLHttpRequest();
  xhr.open("GET", "content.html", true);
  xhr.send(null);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4){
      content.innerHTML = xhr.responseText;
      tooltip = new Tooltip(tooltipDom);
      // tooltip(tooltipDom);
    }
  }
}