
//==============  Data processing helper functions.================
export function sum(data, stringsToNumbers) {
    var total = 0;  
    // Ensure that data contains numbers and not strings.
    data = stringsToNumbers(data);
    for (let i = 0; i < data.length; i++) {
      total = total + data[i];
    }
    return total;
}

export function mean(data) {
    var total = sum(data);
    return total / data.length;
}

export function sliceRowNumbers (row, start=0, end) {
    var rowData = [];
    if (!end) {
      // Parse all values until the end of the row.
      end = row.arr.length;
    }
    for (let i = start; i < end; i++) {
      rowData.push(row.getNum(i));
    }
    return rowData;
}

export function stringsToNumbers (array) {
    return array.map(Number);
}

//============== Plotting helper functions============== 


export function drawAxis(p5, layout) {
  p5.stroke(0);

  // x-axis
  p5.line(layout.leftMargin,
       layout.bottomMargin,
       layout.rightMargin,
       layout.bottomMargin);

  // y-axis
  p5.line(layout.leftMargin,
       layout.topMargin,
       layout.leftMargin,
       layout.bottomMargin);
}

export function AxisLabels(p5, xLabel, yLabel, layout) {
  p5.fill(220);
  p5.noStroke();
  p5.textAlign('center', 'center');
  
  p5.push()
  p5.textSize(17);
  p5.text(xLabel,
       (layout.plotWidth() / 2) + layout.leftMargin,
       layout.bottomMargin + (layout.marginSize * 1.5));

  p5.translate(layout.leftMargin - (layout.marginSize * 1.5),
      layout.bottomMargin / 2);
  p5.rotate(- p5.PI / 2);
  p5.text(yLabel, 0, 0);
  p5.pop();
}

export function yTickLabel(p5, min, max, layout, mapFunction, decimalPlaces) {
  // Map function must be passed with .bind(this).
  var range = max - min;
  var yTickStep = range / layout.numYTickLabels;

  p5.fill(0);
  p5.noStroke();
  p5.textAlign('right', 'center');

  // Draw all axis tick labels and grid lines.
  for (let i = 0; i <= layout.numYTickLabels; i++) {
    var value = min + (i * yTickStep);
    var y = mapFunction(value);

    p5.noStroke();
    p5.text(value.toFixed(decimalPlaces),
         layout.leftMargin - layout.pad,
         y);

    if (layout.grid) {
      p5.strokeWeight(0.5)
      p5.stroke(220);
      p5.line(layout.leftMargin, y, layout.rightMargin, y);
    }
  }
}

export function xTickLabel(p5, value, layout, mapFunction) {
  // Map function must be passed with .bind(this).
  var x = mapFunction(value);

  p5.fill(0);
  p5.noStroke();
  p5.textAlign('center', 'center');

  // Add tick label.
  p5.text(value,
       x,
       layout.bottomMargin + layout.marginSize / 2);

  if (layout.grid) {
    // Add grid line.
    p5.strokeWeight(0.5)
    p5.stroke(220);
    p5.line(x,
         layout.topMargin,
         x,
         layout.bottomMargin);
  }
}
