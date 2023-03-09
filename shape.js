class Shape {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.colour = this.colour();
            this.originalColour = this.colour;
		this.colourWhenSelected = `rgba(255, 57, 72, 0.5)`;
		this.adjustXY = false;
            this.Selected = false;
	}
	getCenter() {
		(this.x = this.x - this.width / 2),
			(this.y = this.y - this.height / 2);
	}

	randomNum() {
		return Math.floor(Math.random() * 255);
	}

	colour() {
		let colour = `rgba(${this.randomNum()}, ${this.randomNum()}, ${this.randomNum()}, 0.5)`;

		return colour;
	}
}

export default Shape;
