function Multiline(pCtx, pId){
	
	this.ctx = pCtx;
	this.id = pId;
	
	this.x1Vol =	(Math.round(10*Math.random())-5);
	this.y1Vol =	(Math.round(10*Math.random())-5);
	this.x2Vol =	(Math.round(10*Math.random())-5);
	this.y2Vol =	(Math.round(10*Math.random())-5);
	
	this.x1 = 		(Math.round(700*Math.random()) + 100);
	this.y1 = 		(Math.round(500*Math.random()) + 100);
	this.x2 = 		(Math.round(700*Math.random()) + 100);
	this.y2 = 		(Math.round(500*Math.random()) + 100);
	
	this.ghosts = 60;
	
	this.a = Math.round(15*Math.random());
	this.b = Math.round(15*Math.random());
	this.c = Math.round(15*Math.random());
	this.d = Math.round(15*Math.random());
	
	this.draw = function(pX1, pY1, pX2, pY2){
		
		lineRed = 0;
		lineGreen = 0;
		lineBlue = 0;
		
		this.ctx.strokeStyle = "rgba("+lineRed+", "+lineGreen+", "+lineBlue+", 1)";
		this.ctx.beginPath();
		
		tmpX1 = this.x1;
		tmpY1 = this.y1;
		tmpX2 = this.x2;
		tmpY2 = this.y2;
		

		
		for(z=0;z<this.ghosts;z++){
			
			
			
			
			this.ctx.moveTo(tmpX1,tmpY1);
			this.ctx.lineTo(tmpX2,tmpY2);
			
			
			tmpX1 += 20;
			tmpY1 += 10;
			tmpX2 -= 20;
			tmpY2 += 10;
			lineRed += 5;
			lineGreen += 5;
			lineBlue += 5;
			
		}
		
		this.ctx.stroke();
		
	}
	
	this.redraw = function(){
		
		this.draw(this.x1, this.y1, this.x2, this.y2);
		
	}
	
	this.move = function(){
		
		this.x1 += this.x1Vol;
		this.y1 += this.y1Vol;
		this.x2 += this.x2Vol;
		this.y2 += this.y2Vol;
		
		this.redraw();
		
	}
	
}