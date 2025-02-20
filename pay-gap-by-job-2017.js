function PayGapByJob2017() {
  this.name = 'Male-Female paygap: 2017';
  this.id = 'pay-gap-by-job-2017';
  this.loaded = false;

  this.pad = 20;
  this.dotSizeMin = 15;
  this.dotSizeMax = 40;

  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/pay-gap/occupation-hourly-pay-by-gender-2017.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      });

  };

  this.setup = function() {
  };

  this.destroy = function() {
  };

  this.draw = function() {
      // if (!this.loaded) {
      //   console.log('Data not yet loaded');
      //   return;
      // }

      this.addAxes();
      var jobs = this.data.getColumn('job_subtype'); // CHECK IF THIS VAR IS USED
      var propFemale = this.data.getColumn('proportion_female');
      var payGap = this.data.getColumn('pay_gap');
      var numJobs = this.data.getColumn('num_jobs');

      propFemale = stringsToNumbers(propFemale);
      payGap = stringsToNumbers(payGap);
      numJobs = stringsToNumbers(numJobs);

      // Use full 100% for x-axis (proportion of women in roles).
      var propFemaleMin = 0;
      var propFemaleMax = 100;

      // y-axis (pay gap) use a symmetrical axis equal to the largest gap direction so that equal pay (0% pay gap) is in the
      // centre of the canvas. Above the line = men are paid more. Below the line = women are paid more.
      var payGapMin = -20;
      var payGapMax = 20;

      // Find smallest and largest numbers of people across all
      // categories to scale the size of the dots.
      var numJobsMin = min(numJobs);
      var numJobsMax = max(numJobs);

      fill(255);
      stroke(100);
      strokeWeight(0.5);

      for (i = 0; i < this.data.getRowCount(); i++) {
        x = map(propFemale[i],
          propFemaleMin, 
          propFemaleMax,
          this.pad,
          width - this.pad
        );

        y = map(payGap[i],
          payGapMin,
          payGapMax,
          height - this.pad,
          this.pad
        );

        size = map(numJobs[i],
          numJobsMin,
          numJobsMax,
          10, 
          50
        )
        fill(y, size + i * 3, x)
        ellipse(
          x,
          y, 
          size * 1.7
        );
      }
    };

  this.addAxes = function () {
      stroke(200);
      line(width / 2, 0 + this.pad, width / 2, height - this.pad); // vertical
      line(0 + this.pad * 3, height / 2, width - this.pad, height / 2); //horizontal
      textSize(14) 
      fill(180);
      noStroke();
      text('Higher Male Salaries', this.pad, height * 0.40 )
      text('Higher FeMale Salares', this.pad, height * 0.60 )
      fill(50, 150, 255)
      text('0% Gap', this.pad - 20, height * 0.51 )
    };
}
