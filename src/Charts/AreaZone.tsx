import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Tooltip, AnnotationsDirective, AnnotationDirective, DateTime, MultiColoredAreaSeries, ChartAnnotation, SegmentsDirective, SegmentDirective } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { chartData } from '../data/financial-data';
export let dataValues: { XValue: Date; YValue: number }[] = [];
chartData.map((data) => {
  dataValues.push({ XValue: new Date(data.x), YValue: data.open });
});
let content = "<div padding: 5px;'> <table style='width: 100%'>" +
  "<tr><td><div style='width: 10px; height: 10px;background:linear-gradient(#4ca1af, #c4e0e5);border-radius: 15px;'></div>" +
  "</td><td style='padding-left: 5px;'>Winter</td></tr>" +
  "<tr><td><div style='width: 10px; height: 10px; background:linear-gradient(#ffa751, #ffe259);border-radius: 15px;'></div>" +
  "</td><td style='padding-left: 5px;'>Summer</td></tr><tr><td>" +
  "<div style='width: 10px; height: 10px; background:linear-gradient(#1d976c, #93f9b9);border-radius: 15px;'></div>" +
  "</td><td style='padding-left: 5px;'>Spring</td></tr></table></div>";
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #control-container {
        padding: 0px !important;
    }

    #control-container {
        padding: 0px !important;
    }

    #winter stop {
        stop-color: #4ca1af;
    }

    #winter stop[offset="0"] {
        stop-color: #c4e0e5;
    }

    #winter stop[offset="1"] {
        stop-color: #4ca1af;
    }

    #summer stop {
        stop-color: #ffa751;
    }

    #summer stop[offset="0"] {
        stop-color: #ffe259;
    }

    #summer stop[offset="1"] {
        stop-color: #ffa751;
    }

    #spring stop {
        stop-color: #1d976c;
    }

    #spring stop[offset="0"] {
        stop-color: #93f9b9;
    }

    #spring stop[offset="1"] {
        stop-color: #1d976c;
    }`;

const AreaZone = () => {

  return (
    <div className='control-pane'>
      <style>
        {SAMPLE_CSS}
      </style>
      <div className='control-section'>
        <ChartComponent id='chartsareazone' style={{ textAlign: "center" }} primaryXAxis={{
          valueType: 'DateTime',
          labelFormat: 'MMM',
          intervalType: 'Months',
          edgeLabelPlacement: 'Shift',
          majorGridLines: { width: 0 }
        }} primaryYAxis={{
          labelFormat: '${value}K',
          rangePadding: 'None',
          minimum: 0,
          maximum: 200,
          interval: 50,
          lineStyle: { width: 0 },
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 }
        }} tooltip={{ enable: true }} legendSettings={{ visible: false }} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '60%'} title="Organic Revenue in US - 2016" >
          <Inject services={[MultiColoredAreaSeries, DateTime, Tooltip, ChartAnnotation]} />
          <AnnotationsDirective>
            <AnnotationDirective content={content} region='Series' x='90%' y='12%'></AnnotationDirective>
          </AnnotationsDirective>
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={dataValues} xName='XValue' yName='YValue' name='US' type='MultiColoredArea' segmentAxis='X'>
              <SegmentsDirective>
                <SegmentDirective value={new Date(2016, 4, 1)} color='url(#winter)'></SegmentDirective>
                <SegmentDirective value={new Date(2016, 8, 1)} color='url(#summer)'></SegmentDirective>
                <SegmentDirective color='url(#spring)'></SegmentDirective>
              </SegmentsDirective>
            </SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="winter" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
          </linearGradient>
          <linearGradient id="summer" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
          </linearGradient>
          <linearGradient id="spring" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default AreaZone
