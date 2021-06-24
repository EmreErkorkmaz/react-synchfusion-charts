import React from 'react'
import { ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, ColumnSeries, Crosshair, StripLine, RowDirective, RowsDirective, SeriesDirective, Inject } from '@syncfusion/ej2-react-charts';
import { chartData } from '../data/financial-data';
import { Browser } from '@syncfusion/ej2-base';
export let zoomFactor: any;
export let zoomPosition: any;
export let pointColors = [];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #title{
        font-size: 15px;
        font-style: normal;
        font-family: "Segoe UI";
        font-weight: 500;
        text-anchor: middle;
        transform: none;
        opacity: 1;
    }
    `;

const CandleStick = () => {
  const getLabelText = (value: number) => {
    return (((value) / 1000000000)).toFixed(1) + 'bn';
  };

  function onChartLoad(args: any) {
    let chart = document.getElementById('charts');
    chart?.setAttribute('title', '');
  };
  
  function axisLabelRender(args: any) {
    if (args.axis.name === 'primaryYAxis') {
      args.text = getLabelText(+args.text);
    }
    if (args.axis.name === 'secondary') {
      args.text = '$' + args.text;
    }
  }
  function tooltipLabelRender(args: any) {
    if (!args.series.index) {
      args.text = 'Volume : <b>' +
        getLabelText(args.text.split('<b>')[1].split('</b>')[0]) + '</b>';
    }
  }

  
  function renderPoint(args: any): void {
    if (args.series.type === 'Candle') {
      // pointColors.push(args.fill);
    }
    else {
      args.fill = pointColors[args.point.index];
    }
  };


  return (
    <div className='control-pane'>
      <style>
        {SAMPLE_CSS}
      </style>
      <div className='control-section'>
        <div className="row" style={{ textAlign: "center" }}>
          <div id="title"> AAPL Historical</div>
        </div>
        <div className="row">
          <ChartComponent id='chartscandlestick' style={{ textAlign: "center" }} primaryXAxis={{
            valueType: 'DateTime',
            crosshairTooltip: { enable: true },
            majorGridLines: { width: 0 }
          }} primaryYAxis={{
            title: 'Volume',
            rangePadding: 'None',
            valueType: 'Logarithmic',
            opposedPosition: true,
            majorGridLines: { width: 1 },
            lineStyle: { width: 0 },
            stripLines: [
              {
                end: 1300000000, startFromAxis: true, text: '', color: 'black', visible: true,
                opacity: 0.03, zIndex: 'Behind'
              }
            ]
          }} tooltip={{
            enable: true, shared: true
          }} width={Browser.isDevice ? '100%' : '80%'} crosshair={{ enable: true, lineType: 'Vertical' }} 
          pointRender={renderPoint.bind(this)} 
          axisLabelRender={axisLabelRender.bind(this)} 
          tooltipRender={tooltipLabelRender.bind(this)} chartArea={{ border: { width: 0 } }}>
            <Inject services={[CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, ColumnSeries, Logarithmic, Crosshair]} />
            <RowsDirective>
              <RowDirective height={'30%'}>
              </RowDirective>
              <RowDirective height={'70%'}>
              </RowDirective>
            </RowsDirective>
            <AxesDirective>
              <AxisDirective name='secondary' opposedPosition={true} rowIndex={1} majorGridLines={{ width: 1 }} labelFormat='n0' title='Price' plotOffset={30} lineStyle={{ width: 0 }}>
              </AxisDirective>
            </AxesDirective>
            <SeriesCollectionDirective>
              <SeriesDirective type='Column' dataSource={chartData} animation={{ enable: true }} xName='x' yName='volume' name='Volume'>
              </SeriesDirective>
              <SeriesDirective type='Candle' yAxisName='secondary' bearFillColor='#2ecd71' bullFillColor='#e74c3d' dataSource={chartData} animation={{ enable: true }} xName='x' low='low' high='high' open='open' close='close' name='Apple Inc' volume='volume'>
              </SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    </div>
  )
}

export default CandleStick
