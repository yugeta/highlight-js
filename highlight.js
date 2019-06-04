;$$highlight = (function(){
  var $$event = function(target, mode, func){
		if (typeof target.addEventListener !== "undefined"){target.addEventListener(mode, func, false);}
    else if(typeof target.attachEvent !== "undefined"){target.attachEvent('on' + mode, function(){func.call(target , window.event)});}
  };
  var $$urlinfo = function(uri){
    uri = (uri) ? uri : location.href;
    var urls_hash  = uri.split("#");
    var urls_query = urls_hash[0].split("?");
		var sp = urls_query[0].split("/");
		var data={
      uri      : uri,
			url      : sp.join("/"),
      dir      : sp.slice(0 , sp.length-1).join("/") +"/",
      file     : sp.pop(),
			domain   : sp[2],
			protocol : sp[0].replace(":",""),
			query    : (urls_query[1])?(function(urls_query){
				var data={};
				var sp = urls_query.split("&");
				for(var i=0;i<sp .length;i++){
					var kv = sp[i].split("=");
					if(!kv[0]){continue}
					data[kv[0]]=kv[1];
				}
				return data;
			})(urls_query[1]) : [] , hash : (urls_hash[1]) ? urls_hash[1] : ""
		};
		return data;
  };
  var $$init = function(){
    switch(document.readyState){
      case "complete"    : new $$; break;
      case "interactive" : $$event(window , "DOMContentLoaded" , (function(e){new $$}).bind(this)); break;
      default            : $$event(window , "load" , (function(e){new $$}).bind(this)); break;
    }
  };

  var $$ = function(options){
    var urlinfo = $$urlinfo();
    var word = (typeof urlinfo.query.highlight !== "undefined" && urlinfo.query.highlight) ? decodeURI(urlinfo.query.highlight) : "";
    this.setHighlight(word);
    this.setInputEvent(this.options.form_selector);
    this.setInputValue(word , this.options.form_selector);
  };

  $$.prototype.options = {
    highlight_class : "highlight",
    form_selector   : "#highlight"
  };

  $$.prototype.setInputEvent = function(selector){
    var target = document.querySelector(selector);
    if(!target){return;}
    $$event(target , "blur" , (function(e){this.changeHighlight(e)}).bind(this));
  };

  $$.prototype.setInputValue = function(word , selector){
    if(word === "" || word === null || word === undefined || word === false){return;}
    var highlightInput = document.querySelector(selector);
    if(!highlightInput){return;}
    highlightInput.value = word;
  };

  $$.prototype.createHighlightTag = function(word){
    return "<span class='"+ this.options.highlight_class +"'>"+word+"</span>";
  };
  $$.prototype.createHighlightElement = function(word){
    var span = document.createElement("span");
    span.className = this.options.highlight_class;
    span.textContent = word;
    return span;
  };


  $$.prototype.setHighlight = function(word , elm){
    if(word === "" || word === null || word === undefined || word === false){return;}

    if(!elm){
      this.setHighlight(word , document.body);
    }
    else{
      var nodes = elm.childNodes;
      var count = nodes.length;
      for(var i=0; i<count; i++){
        // 1 : element
        if(nodes[i].nodeType === 1){
          this.setHighlight(word , nodes[i]);
        }
        // 3 : text
        else if(nodes[i].nodeType === 3){
          var txt = nodes[i].textContent;
          if(txt.indexOf(word) === -1){continue;}
          var texts = txt.split(word);
          var docfrag = document.createDocumentFragment();
          for(var j=0; j<texts.length-1; j++){
            var tn = document.createTextNode(texts[j]);
            if(j === 0){
              tn.baseText = txt;
            }
            else{
              tn.baseText = "";
            }
            docfrag.appendChild(tn);
            docfrag.appendChild(this.createHighlightElement(word));
          }
          var tn = document.createTextNode(texts[texts.length-1]);
          tn.baseText = "";

          docfrag.appendChild(tn);
          nodes[i].parentNode.replaceChild(docfrag , nodes[i]);
        }
      }
    }
  };

  $$.prototype.clearHighlights = function(){
    var elms = document.querySelectorAll("." + this.options.highlight_class);
    var count = elms.length;
    for(var i=count-1; i>=0; i--){
      var word = elms[i].textContent;
      var tn = document.createTextNode(word);
      tn.baseText = "";
      elms[i].parentNode.replaceChild(tn , elms[i]);
    }
    this.linkTextNode();
  };

  $$.prototype.linkTextNode = function(elm){
    elm = (elm) ? elm : document.body;
    var nodes = elm.childNodes;
    if(!nodes){return;}
    var count = nodes.length;
    for(var i=count-1; i>=0; i--){
      // 1 : element
      if(nodes[i].nodeType === 1){
        this.linkTextNode(nodes[i]);
      }
      // 3 : text
      else if(nodes[i].nodeType === 3){
        if(typeof nodes[i].baseText === "undefined"){continue;}
        if(nodes[i].baseText){
          nodes[i].textContent = nodes[i].baseText;
        }
        else{
          nodes[i].parentNode.removeChild(nodes[i]);
        }
      }
      
    }
  };

  $$.prototype.changeHighlight = function(e){
    var target = e.currentTarget;
    if(!target){return;}
    this.clearHighlights();
    var word = target.value;
    this.setHighlight(word);
  };


  $$init();

  return $$;
})();