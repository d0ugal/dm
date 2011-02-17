function Canvas(canvasId){
	
	
	/**
	 * Properties
	 */
	this.log = new Console("console");
	this.console = new Console("console2");
	
	this.canvas = document.getElementById(canvasId);
	this.ctx = this.canvas.getContext("2d");
	
	this.setup = false;
	this.running = true;
	this.mode = 0;
	
	this.canvas.width = 900;
	this.canvas.height = 700;
	
	this.objects = Array();
	this.objectsCount = 0;
	
	/**
	 * Constructor
	 */
	
	
	
	/**
	 * Methods
	 */
	this.run = function(){
		
		/**
		 *  Main program
		 */
		
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		
		switch(this.mode){
			
			case 0:
				this.runBall();
			break;  
			case 1:
				this.runLine();
			break;
			case 2:
				this.runLineCircle();
			break;
			
		}
		
		if(this.running){
			
			setTimeout("if(can.running)can.run();", 10);
			
		}
		
	}
	
	this.start = function(){
		
		if(!this.running){
			
			this.console.add('<b>Started</b>');
			this.running = true;
			this.run();
			
		} else {
		
			this.console.add('<b>Already Running</b>');
			
		}
		
	}
	
	this.stop = function(){
		
		if(this.running){
			
			this.console.add('<b>Stopped</b>');
			this.running = false;
			
		} else {
		
			this.console.add('<b>Not Running</b>');
			
		}
		
	}

	this.setMode = function(pMode){
		
		if(this.mode != pMode){
			this.mode = pMode;
			this.setup = false;
			this.objects = Array();
			this.objectsCount = 0;
		} else {
			this.console.add("Mode already enabled");	
		}
		
	}
	
	
	/**
	 * Ball Methods
	 */
	this.runBallSetup = function(){
		
		this.console.add("Ball Mode Enabled");
		
		this.objects = Array();
		this.objectsCount = 0;
		
		AddBalls = 4;
		
		for(z=0;z<AddBalls;z++){
			this.addBall()
		}
		
		this.setup = true;
		
	}
	
	this.remBall = function(){
		
		if(this.objectsCount > 0){
			this.objects.pop();
			this.objectsCount--;
		}
		
	}
	
	this.remAllBalls = function(){
		
		this.objects = Array();
		this.objectsCount = 0;
		
	}
	
	this.addBall = function(){
		
		this.console.add("Ball Added");
		
		this.objectsCount = this.objects.push(new Ball(this.ctx, this.objectsCount + 1));
		
	}
	
	this.runBall = function(){
		
		if(!this.setup) this.runBallSetup();
		
		for(i=0;i<this.objectsCount;i++){
			
			// Right Wall
			if(this.objects[i].x > (this.canvas.width - this.objects[i].radius)) {
				this.objects[i].xVol = -(this.objects[i].xVol);
			}
			
			// Bottom Wall
			if(this.objects[i].y > (this.canvas.height - this.objects[i].radius)) {
				this.objects[i].yVol = -(this.objects[i].yVol);
			}
			
			// Left Wall
			if(this.objects[i].x < (this.objects[i].radius)) {
				this.objects[i].xVol = -(this.objects[i].xVol)
			}
			
			// Top Wall
			if(this.objects[i].y < (this.objects[i].radius)) {
				this.objects[i].yVol = -(this.objects[i].yVol)
			}
			
			// Run Collision Tests
			
			for(z=0;z<this.objectsCount;z++){
				if(i != z){
					//this.detectBallToBall(this.objects[i], this.objects[z]);
				}
			}
			
			// Commit Changes
			
			this.objects[i].move();
			
		}
		
	}
	
	
	/**
	 * Line Methods
	 */
	this.runLineSetup = function(){
		
		this.console.add("Line Mode Enabled");
		
		this.objects = Array();
		this.objectsCount = 0;
		
		AddLines = 1;
		
		for(z=0;z<AddLines;z++){
			this.addLine()
		}
		
		this.setup = true;
		
	}
	
	this.remLine = function(){
		
		if(this.objectsCount > 0){
			this.objects.pop();
			this.objectsCount--;
		}
		
	}
	
	this.addLine = function(){
		
		this.console.add("Multiline Added");
		
		this.objectsCount = this.objects.push(new Multiline(this.ctx, this.objectsCount + 1))
		
	}
	
	this.runLine = function(){
		
		if(!this.setup) this.runLineSetup();
		
		for(i=0;i<this.objectsCount;i++){
			
			// Right Wall
			if(this.objects[i].x1 > this.canvas.width) {
				this.objects[i].x1Vol = -(this.objects[i].x1Vol);
			}
			if(this.objects[i].x2 > this.canvas.width) {
				this.objects[i].x2Vol = -(this.objects[i].x2Vol);
			}
			
			// Bottom Wall
			if(this.objects[i].y1 > this.canvas.height) {
				this.objects[i].y1Vol = -(this.objects[i].y1Vol);
			}
			if(this.objects[i].y2 > this.canvas.height) {
				this.objects[i].y2Vol = -(this.objects[i].y2Vol);
			}
			
			// Left Wall
			if(this.objects[i].x1 < 0) {
				this.objects[i].x1Vol = -(this.objects[i].x1Vol)
			}
			if(this.objects[i].x2 < 0) {
				this.objects[i].x2Vol = -(this.objects[i].x2Vol)
			}
			
			// Top Wall
			if(this.objects[i].y1 < 0) {
				this.objects[i].y1Vol = -(this.objects[i].y1Vol)
			}
			if(this.objects[i].y2 < 0) {
				this.objects[i].y2Vol = -(this.objects[i].y2Vol)
			}
			
			// Commit Changes
			
			this.objects[i].move();
			
		}
		
	}
	
	/**
	 * Line Circle Methods
	 */
	
	this.runLineCircleSetup = function(){
		
		this.console.add("Line Circle Mode Enabled");
		
		this.objects = Array();
		this.objectsCount = 0;
		
		this.setup = true;
		
	}
	
	this.runLineCircle = function(){
		
		if(!this.setup) this.runLineCircleSetup();
		
		this.ctx.beginPath();
		
		for(x=0;x<35;x++){
			
			this.ctx.moveTo((x * 10)+550,0);
			this.ctx.lineTo(900,(x * 10)+10);
			
			this.ctx.moveTo(350-(x * 10),0);
			this.ctx.lineTo(0,(x * 10)+10);
			
			this.ctx.moveTo(0,350+(x * 10));
			this.ctx.lineTo((x * 10)+10,700);
			
			this.ctx.moveTo(900,350+(x * 10));
			this.ctx.lineTo(900-(x * 10),700);
			
			if(x<20){
				this.ctx.moveTo(450 + (x*10) + (x*10) ,350);
				this.ctx.arc(450 + (x*10),350,(x*10),0,Math.PI*2,true);
				
				this.ctx.moveTo(450 - (x*10) + (x*10) ,350);
				this.ctx.arc(450 - (x*10),350,(x*10),0,Math.PI*2,true);
			}
			
		}
		
		this.ctx.stroke();
		
		this.running = false;
		
	}
	
	/**
	 * Collision Detection
	 */
	
	this.detectBallToBall = function(a, b){
		
		xDiff = ((a.x - b.x) > 0) ? a.x - b.x : b.x - a.x;
		yDiff = ((a.y - b.y) > 0) ? a.y - b.y : b.y - a.y;
		
		sqDisance = (xDiff * xDiff) + (yDiff * yDiff);
		distance = Math.sqrt(sqDisance);
		
		if(distance <= (a.radius + b.radius)){
			
			angle = Math.atan2(yDiff, xDiff);
			cosa = Math.cos(angle);
			sina = Math.sin(angle);
			
			vx1p = cosa * a.xVol + sina * a.yVol;
			vy1p = cosa * a.yVol - sina * a.xVol;
			vx2p = cosa * b.xVol + sina * b.yVol;
			vy2p = cosa * b.yVol - sina * b.xVol;
			
			P = vx1p * a.radius + vx2p * b.radius;
			V = vx1p - vx2p;
			
			vx1p = (P - b.radius * V)/(a.radius + b.radius);
			vx2p = V + vx1p;
			
			a.xVol = cosa * vx1p - sina * vy1p;
			a.yVol = cosa * vy1p - sina * vx1p;
			b.xVol = cosa * vx2p - sina * vy2p;
			b.yVol = cosa * vy2p - sina * vx2p;
			
		}
		
	}
	
	this.detectBallToRectangle = function(ball){
		
		
		
	}
	
}