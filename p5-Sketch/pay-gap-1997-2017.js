


  export default class  PayGaptimeSeries {
    
        constructor (p, w, h, axis, axisL, xTick, yTick) {
          this.name = 'Pay gap: 1997-2017';
          this.id = 'pay-gap-timeseries';
          this.loaded = false;
          this.p = p

          this.title = 'Average difference between male and female pay'
          this.xAxisLabel = 'year';
          this.yAxisLabel = '% difference';
          var marginSize = 40;
      
            //use imported helper functions to draw each Axis and  its components
            this.Axis = axis;
            this.AxisLabels = axisL
            this.AxisXTickLabel = xTick
            this.AxisYTickLabel = yTick
            
            this.layout = {
              marginSize: marginSize,
              leftMargin: marginSize * 3,
              rightMargin: w - marginSize,
              topMargin: marginSize * 1.2,
              bottomMargin: h - marginSize * 2,
              pad: 5,
        
              plotWidth: function() {
                return this.rightMargin - this.leftMargin;
              },
        
              plotHeight: function() {
                return this.bottomMargin - this.topMargin;
              },
        
              grid: true,
              numXTickLabels: 15,
              numYTickLabels: 8,
          };
          this.preload(this.p)
        }
      
       preload(p5) {
        const self = this;
          this.data = p5.loadTable(
            './data/pay-gap/all-employees-hourly-pay-by-gender-1997-2017.csv', 'csv', 'header',
            function(table) {
              self.loaded = true;
            });
        };
      
       setup(p5) {
            if (!this.loaded) {
              console.log('Data not yet loaded');
              return;
            }
            p5.textSize(12);
            this.startYear = this.data.getString(0, 'year');
            this.endYear = this.data.getNum(this.data.getRowCount() - 1, 'year');
            this.minPayGap = 0; 
            this.maxPayGap = p5.max(this.data.getColumn('pay_gap'));
        };
      
       destroy() {
        };
      
       draw(p5) {
      
        const self = this;
            if (!this.loaded) {
              console.log('Data not yet loaded');
              return;
            }
      
            this.drawTitle(p5);
      
            this.AxisYTickLabel(p5,
                                this.minPayGap,
                                this.maxPayGap,
                                this.layout,
                                this.mapPayGapToHeight.bind(this),
                                0);
                                
            this.Axis(p5, this.layout);
      
            this.AxisLabels(p5, 
                          this.xAxisLabel,
                          this.yAxisLabel,
                          this.layout);
      
            var previous;
            var numYears = this.endYear - this.startYear;
      
      
            for (var i = 0; i < this.data.getRowCount(); i++) {
      
              var current = {
                year: this.data.getNum(i, 'year'),
                payGap: this.data.getNum(i, 'pay_gap')
              };
                
              if (previous != null) {
                p5.stroke(255, 0, 100);
                p5.strokeWeight(2)
                p5.line(
                  this.mapYearToWidth(previous.year), this.mapPayGapToHeight(previous.payGap),
                  this.mapYearToWidth(current.year), this.mapPayGapToHeight(current.payGap)
                );
                  
                         var xLabelSkip = Math.ceil(numYears / this.layout.numXTickLabels);
      
                if (i % xLabelSkip == 0) {
                  p5.strokeWeight(1)
                  this.AxisXTickLabel(p5, previous.year, this.layout,
                                    this.mapYearToWidth.bind(this));
                }
              }
      
              previous = current;
              
            }
        };
      
       drawTitle(p5) {
        p5.fill(245);
        p5.noStroke();
        p5.textAlign('center', 'center');
            
        p5.push();
        p5.textSize(16);
      
        p5.text(this.title,
                (this.layout.plotWidth() / 2) + (this.layout.leftMargin * 0.75),
                this.layout.topMargin - (this.layout.marginSize * 0.75));
                p5.pop();
          };
      
         mapYearToWidth(value) {
            return this.p.map(value,
                      this.startYear,
                      this.endYear,
                      this.layout.leftMargin,   // Draw left-to-right from margin.
                      this.layout.rightMargin);
          };
      
         mapPayGapToHeight(value) {
            return this.p.map(value, 
              this.minPayGap,
              this.maxPayGap,
              this.layout.bottomMargin,
              this.layout.topMargin
            )
        };
      }

  