/**
 * Tooltip
 * Version: 2.0
 */

var Tooltip = function(element, args){
  // Default variables
  this.responsive =  true;
  this.position   = "bottom";

  /**
   * Init
   * Load function when Tooltip is call
   */
  this.init = function(){
    this.checkArgs();
    this.createTootlip();
    this.responsive();
  }

  /**
   * Check Args
   * Check if args exist and set value
   */
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

  /**
   * Create Tooltip
   * Generate Tooltips
   */
  this.createTootlip = function(){
    for(i = 0; i < element.length; i++){
      var position = this.position;
      var el       = element[i];
      
      // Check if position is set in the dom
      if(el.dataset.tpPosition){
        position = el.dataset.tpPosition;
      }

      var content = el.dataset.tpContent;
      var fct = el.dataset.tpFct;

      // Create Tooltip Content
      var render = document.createElement('span');
      render.className = "tooltip-content tooltip-" + position;

      el.appendChild(render);

      // Check if a function is call
      if(fct){
        this.createTooltipAsync(el, render);
      }else{
        render.innerHTML = content;
        this.checkWidth(el, render);
      }
    }
  }

  /**
   * Create Tooltip Asynchrone
   * @param  {dom} el     Parent element
   * @param  {dom} render Render of Tooltip Content
   */
  this.createTooltipAsync = function(el, render){

    // Display a loader    
    // el.appendChild(render);
    this.loader(render);

    var that = this;

    // Add mouse over event
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
          
      that.callAsyncFunction(el, tooltipElem, fctName, fctArgs);

      // Remove the event for this element
      el.removeEventListener('mouseover', hover, true);

    }, true);

  }

  this.checkWidth = function(el, render){

    if(el.dataset.tpWidth){
      if(render.offsetWidth > el.dataset.tpWidth){          
        render.style.width = el.dataset.tpWidth+"px";
        render.style.whiteSpace = 'normal';
      }
    }
  }

  /**
   * Render loader for asynchrone tooltip content
   * @param  {render} el
   */
  this.loader = function(el){
    el.innerHTML = '<span class="tooltip-loader"><span></span><span></span><span></span></span>';
  } 

  /**
   * Responsive 
   */
  this.responsive = function(){

    window.onresize = function(e) {
      // Get body width
      bodyWidth = document.body.offsetWidth;

      // Check every tooltips position
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


  this.callAsyncFunction = function(el, tooltipElem, fctName, fctArgs){
    that = this;

    window[fctName](fctArgs).then(function(result) {
      tooltipElem.innerHTML = result;
      that.checkWidth(el, tooltipElem);
    }, function(err) {
      console.log(err);
    });  
    
  }

  this.removeAll = function(){
    for(i = 0; i < element.length; i++){
      var elem = element[i].getElementsByClassName('tooltip-content')[0];

      if(elem){
        element[i].removeChild(elem);
      }
    }
  }


  return this.init();
}