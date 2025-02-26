export default class PieChart{
  
  constructor (sTN) {
      this.labelSpace = 30;
      this.stringsToNumbers = sTN //helper function convert strings to numbers
  
  }

  renderPie(p, data, x, y, diameter, labels, colours, title) {
      this.x = x;
      this.y = y;
      this.diameter = diameter;
      this.draw(p, data, labels, colours, title )
  }

  get_radians(p5, data) {
      const total = sum(data);
      const radians = [];

      function sum(data) {
        let t = 0 

        for (let i = 0; i < data.length; i++) {
          t += parseInt(data[i]);// Ensure that data contains numbers and not strings.
        }

        return t;
      }

      for (let i = 0; i < data.length; i++) {
        radians.push((data[i] / total) * p5.TWO_PI);
      }

      return radians;
  };


  draw(p5, data, labels, colours, title) {
      // Test that data is not empty and that each input array is the same length.
      if (data.length == 0) {
        alert('Data has length zero!');
      } else if (![labels, colours].every((array) => {
        return array.length == data.length;
      })) {
        alert(`Data (length: ${data.length}) Labels (length: ${labels.length}) Colours (length: ${colours.length})
        Arrays must be the same length!`);
      }

      // https://p5js.org/examples/form-pie-chart.html

      const angles = this.get_radians(p5, data);
      let lastAngle = 0;
      let colour;

      for (let i = 0; i < data.length; i++) {
        
        if (colours) {
          colour = colours[i];
        } else {
          colour = p5.map(i, 0, data.length, 0, 255);
        }

        p5.fill(colour);
        p5.stroke(171, 167, 206);
        p5.strokeWeight(2);

        p5.arc(this.x, this.y,
            this.diameter, this.diameter,
            lastAngle, lastAngle + angles[i] + 0.001); // Hack for 0!


        if (labels) {
          this.makeLegendItem(p5, labels[i], i, colour);
        }

        lastAngle += angles[i];
      }

      //rect for title overlapping
      p5.fill(63, 72, 120)
      p5.rect(0, 0, this.x * 3, 30)

      if (title) {
        p5.fill(255)
        p5.noStroke();
        p5.textAlign('center', 'top');
        p5.textSize(18);
        p5.text(title, this.x, this.y - this.diameter * 0.75);
      }
  };

   makeLegendItem(p5, label, i, colour) {
      const x = this.x + 50 + this.diameter / 2;
      const y = this.y + (this.labelSpace * i) - this.diameter / 3;
      const boxWidth = this.labelSpace / 2;
      const boxHeight = this.labelSpace / 2;

      p5.fill(colour);
      p5.rect(x, y, boxWidth, boxHeight);

      p5.fill('lightgrey');
      p5.noStroke();
      p5.textAlign('left', 'top');
      p5.textSize(13);
      p5.text(label, x + boxWidth + 10, y + boxWidth / 2);
    };
}
