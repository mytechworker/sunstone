import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ data }) => {
  const lineOptions = {
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0 },
    xAxis: {
      type: 'category',
      data: ['Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5'],
    },
    yAxis: {
      type: 'value',
      min: 0,
    },
    series: data,
  };

  return (
    <div className="rounded-lg p-4">
      <ReactECharts option={lineOptions} style={{ height: 500, width: '100%' }} />
    </div>
  );
};

export default LineChart;
