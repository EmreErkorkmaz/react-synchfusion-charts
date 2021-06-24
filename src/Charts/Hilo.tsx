import React from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, HiloSeries, Tooltip, DateTime, Zoom, Logarithmic, Crosshair } from '@syncfusion/ej2-react-charts';
import { chartData, IChartData } from '../data/financial-data';
import { Browser } from '@syncfusion/ej2-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
let date1 = new Date('2017, 1, 1');
let returnValue = chartData.filter(filterValue);
function filterValue(value: IChartData) {
  if (value.x >= date1) {
    return value.x, value.high, value.low;
  }
}

const Hilo = () => {
  function onChartLoad(args: any) {
    let chart = document.getElementById('charts');
    chart?.setAttribute('title', '');
  };
  return (
    <div className='control-pane'>
      <style>
        {SAMPLE_CSS}
      </style>
      <div className='control-section'>
        <ChartComponent id='chartshilo' primaryXAxis={{
          valueType: 'DateTime',
          minimum: new Date('2016, 12, 31'),
          maximum: new Date('2017, 9, 30'),
          crosshairTooltip: { enable: true },
          majorGridLines: { width: 0 }
        }} primaryYAxis={{
          title: 'Price',
          minimum: 100,
          maximum: 180,
          interval: 20,
          labelFormat: '${value}',
          lineStyle: { width: 0 },
          majorTickLines: { width: 0 }
        }} legendSettings={{ visible: false }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true }} crosshair={{ enable: true, lineType: 'Vertical', line: { width: 0 } }} width={Browser.isDevice ? '100%' : '80%'} title='AAPL Historical' loaded={onChartLoad.bind(this)}>
          <Inject services={[HiloSeries, Tooltip, DateTime, Logarithmic, Crosshair, Zoom]} />
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={returnValue} xName='x' yName='low' name='Apple Inc' type='Hilo' low='low' high='high'>
            </SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  )
}

export default Hilo
