/*
 * Script js
 */
var tooltipDom = document.getElementById('exemple-content').getElementsByClassName('tooltip');

tooltip(tooltipDom);

function getContent(value){

  promise = new Promise(function(resolve, reject) {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "http://local.dev:5004/bookmark/561786c72d085add0d312081", true);
    xhr.send(null);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4){
        result = JSON.parse(xhr.responseText);
        console.log(result.title);
        resolve(result.title);
      }
    }
  });  

  return promise;
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