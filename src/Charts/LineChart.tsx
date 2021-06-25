import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { useEffect, useState } from 'react';
// import { chartData } from '../data/financial-data';
import { useSocketService } from '../SocketService';

export let data1: any[];


const SAMPLE_CSS = `
  .control-fluid {
      padding: 0px !important;
  }
      .charts {
          align :center
      }`;

const LineChart = () => {
  const [socketData, setSocketData] = useState([]);
  const liveData = useSocketService();

  useEffect(() => {
    setSocketData([...socketData, ...liveData])
  }, [liveData])

  useEffect(() => {
    console.log(socketData)
    data1 = socketData.map((data: any, index: number) => {
      return {
        x: index,
        y: data.p
      }
    })
  }, [socketData])

  function onChartLoad(args: any) {
    let chart: HTMLElement | null = document.getElementById('charts');
    chart?.setAttribute('title', '');
  }
  ;
  // function load(args: any) {
  //   let selectedTheme = location.hash.split('/')[1];
  //   selectedTheme = selectedTheme ? selectedTheme : 'Material';
  //   args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
  //     replace(/-dark/i, "Dark");
  // }
  // ;
  return (
    <div className='control-pane'>
      <style>
        {SAMPLE_CSS}
      </style>
      <div className='control-section'>
        <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{
          valueType: 'DateTime',
          labelFormat: 'y',
          intervalType: 'Years',
          edgeLabelPlacement: 'Shift',
          majorGridLines: { width: 0 }
        }}
          // load={load.bind(this)} primaryYAxis={{
          //   labelFormat: '{value}%',
          //   rangePadding: 'None',
          //   minimum: 0,
          //   maximum: 100,
          //   interval: 20,
          //   lineStyle: { width: 0 },
          //   majorTickLines: { width: 0 },
          //   minorTickLines: { width: 0 }
          // }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          // width={Browser.isDevice ? '100%' : '60%'}
          title='Inflation - Consumer Price'
          loaded={onChartLoad.bind(this)}>
          <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Open' width={2} marker={{ visible: true, width: 10, height: 10 }} type='Line'>
            </SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  )
}

export default LineChart
