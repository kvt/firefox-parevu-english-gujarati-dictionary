var gujaratiDictionary = function () {
    var prefManager = null;
    return {
        init : function () {
            this.prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
             	
             	gujaratiDictionary.variables.appcontent = document.getElementById("appcontent");   // browser
				if(gujaratiDictionary.variables.appcontent){
					gujaratiDictionary.variables.appcontent.addEventListener("load", gujaratiDictionary.hndEvents, true);
				}
				
        },
		
		hndEvents : function(evt)
		{
			gujaratiDictionary.variables.doc = evt.originalTarget;
			if (gujaratiDictionary.variables.doc instanceof HTMLDocument)
			{
	/*			var inputPanel = document.getElementById('gujarati-dictionary-panel');
    	alert(inputPanel.innerHTML);
		inputPanel.openPopup(null, null, 0, 0, false, false);*/
				gujaratiDictionary.variables.doc.addEventListener("click", gujaratiDictionary.clickHandler, true);
			}
		},

		clickHandler : function(evt)
		{

		   if (2 == evt.detail && evt.ctrlKey)
		   {
				gujaratiDictionary.variables.X = evt.screenX;
				gujaratiDictionary.variables.Y = evt.screenY;
				gujaratiDictionary.show(evt);
			
		   }
		   else if (1 == evt.detail)
		   {
				gujaratiDictionary.variables.X = evt.screenX;
				gujaratiDictionary.variables.Y = evt.screenY;
		   }

		},			
        run : function () {
            gujaratiDictionary.show('');
        },
        show : function(e){
			
           /* var sel = (content.document.selection && content.document.selection.createRange().text) ||
            (content.window.getSelection && content.window.getSelection().toString());
          // var sel = currentWindow.getSelection();*/
          gujaratiDictionary.variables.sel = getBrowserSelection() || e.originalTarget.ownerDocument.defaultView.getSelection().toString();
          
			if(gujaratiDictionary.variables.sel == '')
				return false;
					
					for(gujaratiDictionary.variables.number=1; gujaratiDictionary.variables.number<=3; gujaratiDictionary.variables.number++)
					{
						document.getElementById("parevu-0-"+gujaratiDictionary.variables.number).textContent = "";
						document.getElementById("parevu-1-"+gujaratiDictionary.variables.number).textContent = "";
						document.getElementById("parevu-2-"+gujaratiDictionary.variables.number).textContent = "";
						document.getElementById("parevu-3-"+gujaratiDictionary.variables.number).textContent = "";
						document.getElementById("parevu-4-"+gujaratiDictionary.variables.number).textContent = "";
					}
					document.getElementById("parevu-0-1").textContent = gujaratiDictionary.variables.sel+ ' loading.....';
          //          document.getElementById("gujaratidictionary-panel").openPopup(null, null,gujaratiDictionary.variables.X, gujaratiDictionary.variables.Y, false, false);			
                    
                    gujaratiDictionary.variables.popup = document.getElementById("gujaratidictionary-panel");
                    gujaratiDictionary.variables.popup.openPopupAtScreen(gujaratiDictionary.variables.X, gujaratiDictionary.variables.Y, false);			
                    
                    
            gujaratiDictionary.variables.req = new XMLHttpRequest();
            gujaratiDictionary.variables.lines = '';
            gujaratiDictionary.variables.req.open('POST', 'http://<url-to-get-meaning>?search='+gujaratiDictionary.variables.sel, true);
            gujaratiDictionary.variables.req.onreadystatechange = function (event) 
            {
                if (gujaratiDictionary.variables.req.readyState==4 && gujaratiDictionary.variables.req.status==200)
                {
                    gujaratiDictionary.variables.lines = gujaratiDictionary.variables.req.responseText;
                    gujaratiDictionary.variables.lines = gujaratiDictionary.variables.lines.split('~1~1~1');
                    gujaratiDictionary.variables.len = gujaratiDictionary.variables.lines.length;
                    gujaratiDictionary.variables.counter = 0;
                    gujaratiDictionary.variables.singleRow = '';
                    for(gujaratiDictionary.variables.counter=0; gujaratiDictionary.variables.counter<gujaratiDictionary.variables.len; gujaratiDictionary.variables.counter++)
                    {
						gujaratiDictionary.variables.singleRow = gujaratiDictionary.variables.lines[gujaratiDictionary.variables.counter].split('~~~');
						if(gujaratiDictionary.variables.singleRow.length == 4)
						{
							gujaratiDictionary.variables.number = gujaratiDictionary.variables.counter+1;
							document.getElementById("parevu-0-"+gujaratiDictionary.variables.number).textContent = gujaratiDictionary.variables.number;
							document.getElementById("parevu-1-"+gujaratiDictionary.variables.number).textContent = gujaratiDictionary.variables.singleRow[0];
							document.getElementById("parevu-2-"+gujaratiDictionary.variables.number).textContent = gujaratiDictionary.variables.singleRow[1];
							document.getElementById("parevu-3-"+gujaratiDictionary.variables.number).textContent = gujaratiDictionary.variables.singleRow[2];
							document.getElementById("parevu-4-"+gujaratiDictionary.variables.number).textContent = gujaratiDictionary.variables.singleRow[3];
						}
						else
						{
							document.getElementById("parevu-0-1").textContent = 'Not Found word:' + gujaratiDictionary.variables.sel;
						}
					}
                }
           
            }
            gujaratiDictionary.variables.req.send(null);
		},
		close : function()
		{
		   if (gujaratiDictionary.variables.popup)
		   {
			  if (gujaratiDictionary.variables.popup.state == "open")
				 gujaratiDictionary.variables.popup.hidePopup();
		   }
		},
		variables : function()
		{
			
			
		},
    };
}();

window.addEventListener("load", function() { gujaratiDictionary.init() }, false);
