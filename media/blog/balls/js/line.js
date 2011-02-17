function Line(pCtx, pId){
	
	this.ctx = pCtx;
	this.id = pId;
	
	this.x1 = 		(Math.round(700*Math.random()) + 100);
	this.y1 = 		(Math.round(500*Math.random()) + 100);
	this.x2 = 		(Math.round(6*Math.random())-3);
	this.y2 = 		(Math.round(6*Math.random())-3);
	
	this.draw = function(pX1, pY1, pX2, pY2){
		
		this.x1 = pX1;
		this.y1 = pY1;
		this.x2 = pX2;
		this.y2 = pY2;
		
		this.ctx.beginPath();
		
		this.ctx.moveTo(this.x1,this.y1);
		this.ctx.lineTo(this.x2,this.y2);
		
		this.ctx.stroke();
		
	}
	
	this.redraw = function(){
		
		this.draw(this.x1, this.y1, this.x2, this.y2);
		
	}
	
}