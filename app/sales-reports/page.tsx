"use client"
import DonutChart from '@/components/chart/DonutChart';
import LineChart from '@/components/chart/LineChart';
import PipelineChart from '@/components/chart/PipelineChart';
import React from 'react';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';

const SalesReports = () => {
  const donutData = [
    { value: 34007, name: 'Digital Marketing' },
    { value: 23643, name: 'Sales' },
    { value: 8100, name: 'Marketing' },
  ];
  const donutTotal = 65750;

  const lineData = [
    { name: 'Open', type: 'line', data: [30, 45, 42, 50, 45], color: '#8b5cf6' },
    { name: 'Replied', type: 'line', data: [20, 35, 35, 40, 35], color: '#06b6d4' },
    { name: 'Clicked', type: 'line', data: [15, 20, 25, 25, 20], color: '#f43f5e' },
  ];

  const pipelineData = [
    { value: 'Lead', amount: 4245, deals: 2 },
    { value: 'Proposal', amount: 16900, deals: 3 },
    { value: 'Negotiation', amount: 20345, deals: 2 },
    { value: 'Contract Send', amount: 2700, deals: 2 },
    { value: 'Deal Won', amount: 36534, deals: 3 },
    { value: 'Deal Lost', amount: 8100, deals: 1 },
  ];

  const totalAmount = 80724;
  const totalDeals = 13;

  return (
    <div className="w-full min-h-screen py-20">
      <div className="w-full mx-auto p-6 flex items-center justify-between">
        <div className="text-[#1c1f24]">
          <h1 className="text-2xl font-semibold">Sales Reports</h1>
          <p className="text-md font-normal">
            Take a look at your monthly sales report Aug 1 - Sep 30, 2022
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="h-10 px-4 bg-white text-[#1c1f24] text-md font-normal rounded-xl flex items-center">
            <IoCalendarClearOutline className="w-4 h-4 mr-2" /> Monthly{' '}
            <MdKeyboardArrowDown className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Donut Chart Card */}
        <div className="bg-white  rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Deal Revenue Forecast</h2>
          <DonutChart
            data={donutData}
            overlayContent={
              <>
                <div className="text-3xl font-bold">${donutTotal.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Deal Revenue</div>
              </>
            }
          />
        </div>

        {/* Line Chart Card */}
        <div className="bg-white  rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Email Performance</h2>
          <LineChart data={lineData} />
        </div>
      </div>

      {/* Sales Pipeline Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Sales Pipeline</h2>
          <div className="flex text-sm space-x-28 pt-6">
            <h2 className="text-3xl font-semibold">
              ${totalAmount.toLocaleString()}
              <p className="text-sm font-normal text-gray-500">Total Amount</p>
            </h2>
            <h2 className="text-3xl font-semibold">
              {totalDeals}
              <p className="text-sm font-normal text-gray-500">Total Deals</p>
            </h2>
          </div>
        </div>

        {/* Pipeline Bar Chart */}
        <PipelineChart data={pipelineData} />
      </div>
    </div>
  );
};

export default SalesReports;
