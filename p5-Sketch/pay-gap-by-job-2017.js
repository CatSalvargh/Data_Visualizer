export default class PayGapByJob2017 {
    
  constructor (p, stN, w, h) {
          this.name = 'Male-Female paygap: 2017';
          this.id = 'pay-gap-by-job-2017';
          this.loaded = false;
          this.pad = 20;
          this.dotSizeMin = 15;
          this.dotSizeMax = 40;
          this.p = p;
          const p5 = p;
          this.stringsToNum = stN;
          this.width = w;
          this.height = h;

          this.preload(p5)
    }

      preload(p5) {
        const self = this;
        this.data = p5.loadTable(
          './data/pay-gap/occupation-hourly-pay-by-gender-2017.csv', 'csv', 'header',
          function(table) {
            self.loaded = true;
          });
      };

      setup() {        
      };

      destroy() {
      };

      draw(p5) {
         if (!this.loaded) {
          console.log('Data not yet loaded');
          return;
        }

      this.addAxes(p5);
      let propFemale = this.data.getColumn('proportion_female');
      let payGap = this.data.getColumn('pay_gap');
      let numJobs = this.data.getColumn('num_jobs');

      propFemale = this.stringsToNum(propFemale);
      payGap = this.stringsToNum(payGap);
      numJobs = this.stringsToNum(numJobs);

    //   // Use full 100% for x-axis (proportion of women in roles).
      const propFemaleMin = 0;
      const propFemaleMax = 100;

    //   // y-axis (pay gap) use a symmetrical axis equal to the largest gap direction so that equal pay (0% pay gap) is in the
    //   // centre of the canvas. Above the line = men are paid more. Below the line = women are paid more.
      const payGapMin = -20;
      const payGapMax = 20;

    //   // Find smallest and largest numbers of people across all
    //   // categories to scale the size of the dots.
      const numJobsMin = p5.min(numJobs);
      const numJobsMax = p5.max(numJobs);

      p5.fill(255);
      p5.stroke(25);
      p5.strokeWeight(0.5);

      for (let i = 0; i < this.data.getRowCount(); i++) {
        let x = p5.map(propFemale[i],
          propFemaleMin, 
          propFemaleMax,
          this.pad,
          this.width - this.pad
        );

        let y = p5.map(payGap[i],
          payGapMin,
          payGapMax,
          this.height - this.pad,
          this.pad
        );

        let size = p5.map(numJobs[i],
          numJobsMin,
          numJobsMax,
          10, 
          50
        )
        p5.fill(y, size + i * 3, x)
        p5.ellipse(
          x,
          y, 
          size * 1.7
        );
      }
    };

    addAxes(p5) {
        p5.stroke(200);
        p5.line(
            this.width / 2, 
            this.pad, 
            this.width / 2, 
            this.height - this.pad); // vertical
        p5.line(
            this.pad * 3, 
            this.height / 2, 
            this.width - this.pad, 
            this.height / 2); //horizontal
        p5.textSize(14) 
        p5.fill(180);
        p5.noStroke();
        p5.text('Higher Male Salaries', this.width / 5, this.height * 0.40 )
        p5.text('Higher FeMale Salares', this.width / 4.5, this.height * 0.58 )
        p5.fill(50, 150, 255)
        p5.text('0% Gap', this.pad * 3, this.height * 0.48)
    };

}