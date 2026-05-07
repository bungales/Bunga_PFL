import React from "react";
import PageHeader from "../components/PageHeader";
import { 
  MdPeople, MdReceipt, MdTrendingUp, MdHistory, 
  MdArrowUpward, MdArrowDownward 
} from "react-icons/md";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";

import customers from "../data/customers.json";
import transactions from "../data/transactions.json";

// Data Grafik agar mirip lekukannya dengan foto
const chartData = [
  { x: '5k', y: 20 }, { x: '10k', y: 30 }, { x: '15k', y: 50 },
  { x: '20k', y: 40 }, { x: '25k', y: 85 }, { x: '30k', y: 35 },
  { x: '35k', y: 55 }, { x: '40k', y: 50 }, { x: '45k', y: 65 },
  { x: '50k', y: 25 }, { x: '55k', y: 35 }, { x: '60k', y: 30 },
  { x: '65k', y: 75 }, { x: '70k', y: 45 }, { x: '75k', y: 60 },
  { x: '80k', y: 50 }, { x: '85k', y: 45 }, { x: '90k', y: 55 }
];

const stats = [
  {
    label: "Total User", value: "40,689",
    trend: "8.5%", isUp: true, 
    icon: <MdPeople />, iconBg: "bg-[#e5e7ff]", iconColor: "text-[#4318ff]"
  },
  {
    label: "Total Order", value: "10,293",
    trend: "1.3%", isUp: true,
    icon: <MdReceipt />, iconBg: "bg-[#fff3e0]", iconColor: "text-[#ffb547]"
  },
  {
    label: "Total Sales", value: "$89,000",
    trend: "4.3%", isUp: false,
    icon: <MdTrendingUp />, iconBg: "bg-[#e2f9f0]", iconColor: "text-[#00b69b]"
  },
  {
    label: "Total Pending", value: "2040",
    trend: "1.8%", isUp: true,
    icon: <MdHistory />, iconBg: "bg-[#ffe5e5]", iconColor: "text-[#f93c65]"
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 bg-[#f5f6fa] min-h-screen pb-10">
      <h1 className="text-2xl font-bold text-[#202224] mb-6">Dashboard</h1>

      {/* --- STATS CARDS (Sesuai Foto) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">{s.label}</p>
                <h3 className="text-2xl font-bold text-[#202224] mt-1">{s.value}</h3>
              </div>
              <div className={`p-3 rounded-2xl text-2xl ${s.iconBg} ${s.iconColor}`}>
                {s.icon}
              </div>
            </div>
            <div className="flex items-center mt-4 text-[13px]">
              <span className={`flex items-center font-bold ${s.isUp ? "text-[#00b69b]" : "text-[#f93c65]"}`}>
                {s.isUp ? <MdArrowUpward className="mr-1" /> : <MdArrowDownward className="mr-1" />}
                {s.trend}
              </span>
              <span className="text-gray-400 ml-1">Up from yesterday</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- SALES DETAILS (GRAFIK PERSIS FOTO) --- */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-bold text-[#202224]">Sales Details</h3>
          <select className="border border-gray-200 text-sm rounded-lg px-3 py-1.5 text-gray-500 outline-none">
            <option>October</option>
          </select>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4318ff" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4318ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f1f1" />
              <XAxis 
                dataKey="x" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#a3aed0', fontSize: 12}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#a3aed0', fontSize: 12}}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip 
                cursor={{ stroke: '#4318ff', strokeWidth: 2 }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="y" 
                stroke="#4318ff" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSales)" 
                dot={{ r: 4, fill: "#4318ff", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#4318ff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- DEALS DETAILS (TABEL PERSIS FOTO) --- */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[#202224]">Deals Details</h3>
          <select className="border border-gray-200 text-sm rounded-lg px-3 py-1.5 text-gray-500 outline-none">
            <option>October</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f9f9fb] text-[#202224] text-sm">
                <th className="px-4 py-4 rounded-l-xl font-bold">Product Name</th>
                <th className="px-4 py-4 font-bold">Location</th>
                <th className="px-4 py-4 font-bold">Date - Time</th>
                <th className="px-4 py-4 font-bold">Piece</th>
                <th className="px-4 py-4 font-bold">Amount</th>
                <th className="px-4 py-4 rounded-r-xl font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="px-4 py-5">
                  <div className="flex items-center gap-3">
                    <img src="https://m.media-amazon.com/images/I/71L2iBSySjL._AC_SL1500_.jpg" className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <span className="font-semibold text-[#202224]">Apple Watch</span>
                  </div>
                </td>
                <td className="px-4 py-5 text-gray-600">6096 Marjolaine Landing</td>
                <td className="px-4 py-5 text-gray-600">12.09.2026 - 12.53 PM</td>
                <td className="px-4 py-5 text-gray-600">423</td>
                <td className="px-4 py-5 font-bold text-[#202224]">$34,295</td>
                <td className="px-4 py-5">
                  <span className="px-6 py-2 rounded-full text-xs font-bold bg-[#00b69b] text-white">
                    Delivered
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}