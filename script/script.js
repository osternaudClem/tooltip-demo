/*
 * Script js
 */
var tooltipDom = document.getElementsByClassName('tooltip');

// tooltip(tooltipDom);
tooltip = new Tooltip(tooltipDom);

// tooltip.init(tooltipDom);

function getContent(value){
  return "tooltip - " + value;
}

function loadContent(){
  var content = document.getElementById('exemple-content');

  xhr = new XMLHttpRequest();
  xhr.open("GET", "content.html", true);
  xhr.send(null);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4){
      content.innerHTML = xhr.responseText;
      tooltip(tooltipDom);
    }
  }
}