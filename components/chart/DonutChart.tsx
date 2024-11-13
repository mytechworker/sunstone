import React from 'react';
import ReactECharts from 'echarts-for-react';

const DonutChart = ({ data, overlayContent }) => {
  const donutOptions = {
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', right: 10, top: 'center' },
    series: [
      {
        name: 'Deal Revenue',
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        label: { show: false, position: 'center' },
        emphasis: {
          label: {
            show: false,
            fontSize: '18',
            fontWeight: 'bold',
          },
        },
        data: data,
        color: ['#a855f7', '#6366f1', '#8b5cf6'],
      },
    ],
  };

  return (
    <div className="relative h-[500px] flex items-center justify-center border border-gray-200 rounded-xl p-4">
      {overlayContent && (
        <div className="absolute text-center">
          {overlayContent}
        </div>
      )}
      <ReactECharts option={donutOptions} style={{ height: 500, width: '100%' }} />
    </div>
  );
};

export default DonutChart;
