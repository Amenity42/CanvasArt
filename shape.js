class Shape {
      constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
      }
      getCenter() {
            this.x = this.x - this.width / 2,
            this.y = this.y - this.height / 2
      }
}

export default Shape;