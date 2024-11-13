import React from 'react';
import ReactECharts from 'echarts-for-react';

const PipelineChart = ({ data }) => {
  const pipelineOptions = {
    tooltip: { trigger: 'item' },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.value),
      axisLabel: {
        formatter: (value, index) => {
          const { amount, value: stage, deals } = data[index];
          return `${amount.toLocaleString()}\n${stage}\n${deals} Deals`;
        },
        interval: 0,
        align: 'center',
        lineHeight: 20,
      },
    },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'bar',
        data: data.map((item) => item.amount),
        itemStyle: {
          color: (params) => {
            const colors = ['#a855f7', '#6366f1', '#8b5cf6', '#f87171', '#3b82f6', '#ef4444'];
            return colors[params.dataIndex];
          },
        },
        barWidth: '60%',
      },
    ],
  };

  return (
    <div className="border border-gray-200 py-5">
      <ReactECharts option={pipelineOptions} style={{ height: 500, width: '100%' }} />
    </div>
  );
};

export default PipelineChart;
