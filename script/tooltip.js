/**
 * Tooltip
 * @param  {htmlCollection} html elements
 * @return {dom element} renderHtml
 */
function tooltip(element){
  for(i = 0; i < element.length; i++){
    var el = element[i];
    var content = el.dataset.tpContent;
    var position = el.dataset.tpPosition;
    var responsive = el.dataset.tpResponsive;
    var fct = el.dataset.tpFct;
    var render = document.createElement('span');

    // Check tooltip position
    // Make bottom by default
    if(!position){
      position = 'bottom'
    }

    // Check for asynchrone function
    if(fct){
      render.className = "tooltip-content tooltip-" + position + " tooltip-" + i;
      var regFindArgs = /\(([^)]+)\)/;
      // var regRemoveQuote = /'[^'']*'/g;
      var fctArgs = regFindArgs.exec(fct)[1];
      // fctArgs = regRemoveQuote.exec(fctArgs);
      console.log(fctArgs);
      
      fct = fct.split('(');
      fctName = fct[0];
      
      callPromise(i, fctName, fctArgs);            
    }else{
      console.log('No fonction')
      render.className = "tooltip-content tooltip-" + position;
      render.innerHTML = content;
    }

    el.appendChild(render);

    // Check position if responsive attribute is true
    if(responsive){
      checkPosition(el, position);
    }
  }

  // Check position if responsive attribute is true and window is resized
  window.onresize = function(e) {        
    var elements = document.querySelectorAll('[data-tp-responsive]');
    console.log(elements);
    for(i = 0; i < elements.length; i++){
      var el = elements[i];
      var position = el.dataset.tpPosition;
      console.log(position);
      checkPosition(el, position);
    }
  }
}

/**
 * httpGet
 * @param  {string} theUrl 
 * @param  {dom element} el     
 * @param  {dom element} render 
 * @return {dom element} renderHtml
 */
function httpGet(url, el, render){
  var xmlHttp = null;
  
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, true );

  xmlHttp.onload = function(e){
    if (xmlHttp.readyState === 4){
      if (xmlHttp.status === 200){        
        render.innerHTML = xmlHttp.responseText;
        el.appendChild(render);
      } else {
        console.error(xmlHttp.statusText);
      }
    }
  };
  xmlHttp.send( null );
}

/**
 * Check Position
 * @param  {htmlCollection} el
 * @param  {string} position
 */
function checkPosition(el, position){
  var obj = el.getElementsByClassName('tooltip-content')[0];
  var offset = 0;

  // Get offset about the body
  while (obj && obj.tagName != 'BODY') {
    eval(offset += obj.offsetLeft);
    obj = obj.offsetParent;    
  }  

  obj = el.getElementsByClassName('tooltip-content')[0];

  // Get body width
  bodyWidth = document.body.offsetWidth;

  // Depending the position, the tooltip is move if is not fully visible
  switch(position){
    case 'left':       
      if(eval(offset - obj.offsetWidth) < 0){
        obj.className = '';
        obj.className = 'tooltip-content tooltip-right';
      }else{
        obj.className = '';
        obj.className = 'tooltip-content tooltip-left';
      }
      break;

    case 'right':       
      if(eval(offset + obj.offsetWidth + 100) > bodyWidth){
        obj.className = '';
        obj.className = 'tooltip-content tooltip-left';
      }else{
        obj.className = '';
        obj.className = 'tooltip-content tooltip-right';
      }
      break;

    case 'bottom':
    case 'top':
      if(eval(offset - obj.offsetWidth) < 0){
        obj.className = '';
        obj.className = 'tooltip-content tooltip-' + position + ' tooltip-marge-left';
      }

      else if(eval(offset + obj.offsetWidth) > bodyWidth){
        obj.className = '';
        obj.className = 'tooltip-content tooltip-' + position + ' tooltip-marge-right';
      }

      else{
        obj.className = '';
        obj.className = 'tooltip-content tooltip-' + position; 
      }
      break;
  }
} 

function callPromise(id, fctName, fctArgs){
  promise = new Promise(function(resolve, reject) {
    window.setTimeout(function(){
      resolve(window[fctName](fctArgs));
    }, 1000);
  });

  promise.then(function(result) {
    tooltipElem = document.getElementsByClassName('tooltip-'+id);
    tooltipElem[0].innerHTML = result;
  }, function(err) {
    console.log(err);
  });
}