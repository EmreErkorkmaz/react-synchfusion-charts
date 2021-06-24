import React from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { chartData } from '../data/financial-data';
export let zoomFactor: any;
export let zoomPosition: any;
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
    }`;

const HiloOpenClose = () => {
  function axisLabelRender(args: any) {
    if (args.axis.title === 'Price') {
      args.text = '$' + args.text;
    }
  }
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
          <ChartComponent id='chartshiloopenclose' style={{ textAlign: "center" }} primaryXAxis={{
            valueType: 'DateTime',
            crosshairTooltip: { enable: true },
            majorGridLines: { width: 0 }
          }} primaryYAxis={{
            title: 'Price',
            rangePadding: 'None',
            labelFormat: 'n0',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
          }} chartArea={{ border: { width: 0 } }} tooltip={{
            enable: true, shared: true
          }} axisLabelRender={axisLabelRender.bind(this)} width={Browser.isDevice ? '100%' : '80%'} legendSettings={{ visible: false }} crosshair={{ enable: true, lineType: 'Vertical', line: { width: 0 } }}>
            <Inject services={[HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair]} />
            <SeriesCollectionDirective>
              <SeriesDirective type='HiloOpenClose' dataSource={chartData} animation={{ enable: true }} bearFillColor='#2ecd71' bullFillColor='#e74c3d' xName='x' low='low' high='high' open='open' close='close' name='Apple Inc'>
              </SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    </div>
  )
}

export default HiloOpenClose
