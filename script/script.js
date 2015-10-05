/*
 * Script js
 */
var tooltipDom = document.getElementsByClassName('tooltip');

tooltip(tooltipDom);

function getContent(value){
  return "tooltip - " + value;
}