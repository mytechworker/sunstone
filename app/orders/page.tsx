"use client";
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { AiOutlineMail, AiOutlinePhone, AiOutlinePlus } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';

const OrderPage = () => {
    const orderDetailsData = [
        { orderNo: '#00238', itemName: 'Olive Women Padded Jacket', quantity: 24, cost: 26.31, tax: '10%', total: 694.58 },
        { orderNo: '#00335', itemName: 'Veja Volley Sneakers', quantity: 10, cost: 76.24, tax: '10%', total: 836.64 }
    ];

    const totals = {
        landedCostSubtotal: '$0.00',
        itemSubtotal: '$1,531.22',
        plusvat: '$153.12',
        totalUnits: '34',
        total: '$1,684.34'
    };

    const [orderDetails] = useState(orderDetailsData);
    const [selectedOrders, setSelectedOrders] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);

    const toggleSelectAll = useCallback(() => {
        setSelectAll(prev => {
            const newSelectAll = !prev;
            setSelectedOrders(newSelectAll ? new Set(orderDetails.map((_, index) => index)) : new Set());
            return newSelectAll;
        });
    }, [orderDetails]);

    const toggleSelectOrder = useCallback((index:number) => {
        setSelectedOrders(prev => {
            const updatedSelection = new Set(prev);
            updatedSelection.has(index) ? updatedSelection.delete(index) : updatedSelection.add(index);
            setSelectAll(updatedSelection.size === orderDetails.length);
            return updatedSelection;
        });
    }, [orderDetails.length]);

    return (
        <div className="w-full min-h-screen flex flex-col pt-20">
            <div className="w-full p-4 flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[#6b6e74] text-xs font-normal">
                            Orders / <span className="text-[#1c1f24] font-medium">Purchase Orders</span>
                        </p>
                        <h1 className="text-[#1c1f24] text-3xl font-semibold">Order #344112</h1>
                        <div className="flex items-center gap-1.5 text-[#6b6e74] text-xs font-normal">
                            <span>Oct 17, 2022, 5:48 (ET)</span>
                            <span className="w-[3px] h-[3px] bg-[#c0c5c9] rounded-full"></span>
                            <div className="bg-[#e5f3dd] rounded-full px-1.5 py-px flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-[#429482] rounded-full"></span>
                                <span className="text-[#429482]">Finalized</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="h-10 px-4 bg-white text-[#1c1f24] text-md font-medium rounded-xl flex items-center">
                            More options <MdKeyboardArrowDown className="w-4 h-4 ml-2" />
                        </button>
                        <button className="h-10 px-4 bg-[#7662e9] text-white text-md font-medium rounded-xl flex items-center">
                            <AiOutlinePlus className="w-4 h-4 mr-2" /> Add new purchase order
                        </button>
                    </div>
                </header>
            </div>

            <div className="flex flex-row space-x-4">
                <div className="mt-4 bg-white p-6 rounded-xl shadow-md w-full">
                    <div className="flex items-center gap-2 font-medium">
                        <h2 className="text-xl">Purchase order details</h2>
                        <div className="bg-[#7662e9] rounded-xl w-8 h-8 text-sm flex items-center justify-center text-white font-semibold">{orderDetails.length}</div>
                    </div>

                    <table className="w-full mt-6 text-left border-collapse">
                        <thead>
                            <tr className="text-[#6b6e74] text-sm">
                                <th className="px-4 py-2">
                                    <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
                                </th>
                                <th className="px-4 py-2">ORDER NO.</th>
                                <th className="px-4 py-2">ITEM NAME</th>
                                <th className="px-4 py-2">QUANTITY</th>
                                <th className="px-4 py-2">COST/ITEM ($)</th>
                                <th className="px-4 py-2">TAX</th>
                                <th className="px-4 py-2 text-right">TOTAL ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((order, index) => (
                                <tr key={index} className="text-[#1c1f24] text-sm font-normal border-t">
                                    <td className="px-4 py-3">
                                        <input type="checkbox" checked={selectedOrders.has(index)} onChange={() => toggleSelectOrder(index)} />
                                    </td>
                                    <td className="px-4 py-3">{order.orderNo}</td>
                                    <td className="px-4 py-3 flex items-center gap-2">
                                        <Image alt="" width={32} height={32} className="w-8 h-8 rounded-lg" src="/images/orderimage.png" />
                                        <span>{order.itemName}</span>
                                    </td>
                                    <td className="px-4 py-3">{order.quantity}</td>
                                    <td className="px-4 py-3">${order.cost.toFixed(2)}</td>
                                    <td className="px-4 py-3">{order.tax}</td>
                                    <td className="px-4 py-3 text-right">${order.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="mt-4 h-5 rounded-lg flex items-center gap-2.5 cursor-pointer text-[#7662e9] text-md font-medium">
                        <AiOutlinePlus className="w-4 h-4" /> Add landed costs
                    </button>

                    <div className="mt-4 flex flex-col gap-2 text-sm font-medium text-[#6b6e74]">
                        {Object.entries(totals).map(([label, amount]) => (
                            <div className={`flex justify-end ${label === 'total' ? 'font-semibold text-[#1c1f24]' : ''}`} key={label}>
                                <span className="text-left w-1/5">{label.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                                <span className="text-right w-1/5">{amount}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full max-w-[360px] h-fit mt-4 p-6 bg-white rounded-2xl shadow-md">
                    <h2 className="text-xl font-medium text-[#1c1f24]">Customer</h2>
                    <div className="flex items-center gap-4 mt-4">
                        <Image alt="" width={44} height={44} className="w-11 h-11 rounded-full" src="/images/orderimage.png" />
                        <div>
                            <div className="text-sm font-medium text-[#1c1f24]">Alyssia Volkov</div>
                            <div className="text-xs font-normal text-[#6b6e74]">Customer for 3 months</div>
                        </div>
                    </div>
                    <div className="mt-6 text-xs font-normal text-[#393d44] space-y-2">
                        {[{ icon: <AiOutlineMail />, text: 'alysiaa23@email.com' }, { icon: <AiOutlinePhone />, text: '(123) 9613 5502' }].map((item, idx) => (
                            <div className="flex items-center gap-2" key={idx}>
                                <span className="text-[#393d44]">{item.icon}</span>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full mt-6 p-5 bg-white rounded-xl border border-[#e0e2e7] space-y-5">
                        {['Bill to', 'Ship to'].map((label, idx) => (
                            <div key={idx}>
                                <div className="text-[#6b6e74] text-xs font-normal">{label}</div>
                                <div className="text-sm font-medium text-[#1c1f24]">Alyssia Volkov</div>
                                <address className="text-[#393d44] text-xs font-normal not-italic">
                                    2393 Main Avenue<br />Penasauka, New Jersey 87896
                                </address>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
