//==============  Data processing helper functions.================
export function sum(data, stringsToNumbers) {
    let total = 0;  
    data = stringsToNumbers(data);// Ensure that data are numbers, not strings.
    for (let i = 0; i < data.length; i++) {
      total = total + data[i];
    }
    return total;
}

export function mean(data) {
    const total = sum(data);
    return total / data.length;
}

export function sliceRowNumbers (row, start=0, end) {
    const rowData = [];
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
    const range = max - min;
    const yTickStep = range / layout.numYTickLabels;

    p5.fill(0);
    p5.noStroke();
    p5.textAlign('right', 'center');

    // Draw all axis tick labels and grid lines.
    for (let i = 0; i <= layout.numYTickLabels; i++) {
      const value = min + (i * yTickStep);
      const y = mapFunction(value);

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
    const x = mapFunction(value);

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
