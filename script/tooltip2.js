/**
 * Tooltip
 * Version: 2.0
 */

var Tooltip = function(element, args){
  this.responsive =  true;
  this.position = "bottom";

  this.init = function(){
    this.checkArgs();
    this.createTootlip();
    this.responsive();
  }

  this.checkArgs = function(){
    if(args){
      if(args.responsive){
        this.responsive = args.responsive;
      }

      if(args.position){
        this.position = args.position;
      }
    }
  }

  this.createTootlip = function(){
    for(i = 0; i < element.length; i++){
      var position = this.position;
      var el = element[i];
      
      if(el.dataset.tpPosition){
        position = el.dataset.tpPosition;
      }

      var content = el.dataset.tpContent;
      var render = document.createElement('span');
      var fct = el.dataset.tpFct;

      render.className = "tooltip-content tooltip-" + position;

      if(fct){
        this.createTooltipAsync(el, render);
      }else{        

        render.innerHTML = content;
        el.appendChild(render);
      }
    }
  }

  this.createTooltipAsync = function(el, render){    
    this.loader(render);
    el.appendChild(render);
    
    el.addEventListener('mouseover', function hover(e){
      var tooltipElem = e.target.firstElementChild;
      var fct = e.target.dataset.tpFct;
      var regFindArgs = /\(([^)]+)\)/;
      var regRemoveQuote = /\'*/g;
      var fctArgs = regFindArgs.exec(fct);

      if(fctArgs){
        fctArgs = fctArgs[1].replace(regRemoveQuote, '');
        fctArgs = fctArgs.split(',');
      }else{
        fctArgs = null;
      }
      
      fct = fct.split('(');
      fctName = fct[0];
          
      callAsyncFunction(tooltipElem, fctName, fctArgs); 

      el.removeEventListener('mouseover', hover, true);

    }, true);

  }

  this.loader = function(el){
    el.innerHTML = '<span class="tooltip-loader"><span></span><span></span><span></span></span>';
  } 

  this.responsive = function(){
    window.onresize = function(e) {
      // Get body width
      bodyWidth = document.body.offsetWidth;
      for(i = 0; i < element.length; i++){
        var position = this.position;
        var el = element[i];
        
        if(el.dataset.tpPosition){
          position = el.dataset.tpPosition;
        }
       
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

            else if(eval(offset + obj.offsetWidth + 20) > bodyWidth){
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
    }
  }

  callAsyncFunction = function(tooltipElem, fctName, fctArgs){
    promise = new Promise(function(resolve, reject) {
      window.setTimeout(function(){
        resolve(window[fctName](fctArgs));
      }, 2000);
    });

    promise.then(function(result) {
      tooltipElem.innerHTML = result;
    }, function(err) {
      console.log(err);
    });  
  }

  this.removeAll = function(){
    for(i = 0; i < element.length; i++){
      element[i].removeChild(element[i].lastChild);
    }
  }


  return this.init();
}