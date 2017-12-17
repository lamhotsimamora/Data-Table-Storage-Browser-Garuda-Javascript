/**
 * Enable console log
 * @type {Boolean}
 */
run_console     = true;


const serverUrl = 'https://jsonplaceholder.typicode.com/comments';


_setValue("URL_Server",serverUrl);

function loadData(){
   
	_printTo("disp_info","Load data from server "+serverUrl);
    
    /**
     * Load data from the URL = https://jsonplaceholder.typicode.com/comments
     * @param  {[type]} _loadDoc("")
     * @return {[type]} void
     */
	_loadDoc(serverUrl,function(result){
  	  if (result==false)
      {
         return;
      }
      _printTo("disp_info","Save data to storage");
      
      /**
       * Save response to storage
       * _saveStorage("key_name");
       */
      _saveStorage("data_table",result);
  });
}

function renderTable(){
  _printTo("disp_info","Get data from storage");
   _printTo("disp_info","Clear Table");
   _clear("disp_table",true);
   
    /**
     * Getting data from storage if already.
     * _getStorage("key_name");
     * @type {[type]}
     */
    var obj = _getStorage("data_table"); 
   	
   	/**
   	 * Check if the result is NULL or Empty
   	 * @type {[type]}
   	 */
    if (obj===null || obj==='')
    {
    	loadData();
    	return;
    }else{
	    var obj = JSON.parse(obj);
	  
	    var tmplte= '';
	    for (var i = 0; i < 20; i++) 
	    {	
	    	var id    = obj[i]['id'];
	    	var name  = obj[i]['name'];
	    	var email = obj[i]['email'];
	    	var body  = obj[i]['body'];
	      tmplte    += "<tr> <td>"+id+"</td><td>"+name+"</td> <td>"+email+"</td> <td>"+body+"</td> </tr>"; 
	    }
	     _printTo("disp_info","Display data");
	     /**
	      * Display to HTML (DIV)
	      */
	     _printTo("disp_table",tmplte);
    }
   
}


renderTable();

_onClick("btn_load",function(){
   loadData();
});


_onClick("btn_display",function(){
   renderTable();
});

_onClick("btn_clear",function(){
   _printTo("disp_info","Storage clear");
   _clear("disp_table",true);
   _saveStorage("data_table","");
});
