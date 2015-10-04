/*
 * Script js
 */
var tooltipDom = document.getElementsByClassName('tooltip');
tooltip(tooltipDom);

function getContent(args){
  return "function content " + args;
}