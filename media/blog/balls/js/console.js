function Console(consoleId){
	
	this.element = document.getElementById(consoleId);
	
	this.add = function(pMessage){
		
		msg = "<b>" + pMessage + "</b><br/>";
		
		old = this.element.innerHTML;
		
		if(old.length > 500) old.substr(0, 500);
		
		this.element.innerHTML = msg + old;
		
	}
	
	this.clear = function(){
		
		this.element.innerHTML = "";
		
	}
	
}