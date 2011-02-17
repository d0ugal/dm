function Ball(pCtx, pId){
	
	this.ctx = pCtx;
	this.id = pId;
	
	this.radius = 		(Math.round(40*Math.random())+30);
	this.x = 			(Math.round(700*Math.random()) + 100);
	this.y = 			(Math.round(500*Math.random()) + 100);
	this.xVol = 		(Math.round(6*Math.random())-3);
	this.yVol = 		(Math.round(6*Math.random())-3);
	this.lineWidth =	1;
	this.red = 			(Math.round(250*Math.random())-100);
	this.green = 		(Math.round(250*Math.random())-100);
	this.blue = 		(Math.round(250*Math.random())-100);
	this.alpha = 		((Math.round(3*Math.random())+5)/10);
	
	this.draw = function(pX, pY, pRadius){
		
		this.x = pX;
		this.y = pY;
		this.radius = pRadius;
		
		this.ctx.beginPath();
		
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.fillStyle = "rgba("+this.red+", "+this.green+", "+this.blue+", "+this.alpha+")";
		this.ctx.arc(pX,pY,pRadius,0,Math.PI*2,true);
		this.ctx.fill();
		
	}
	
	this.redraw = function(){
		
		this.draw(this.x, this.y, this.radius)
		
	}
	
	this.move = function(){
		
		this.x += this.xVol;
		this.y += this.yVol;
		
		this.redraw();
		
	}
	
}