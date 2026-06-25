import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import SectionTitle from "../../components/SectionTitle";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import { MdPeople, MdReceipt, MdTrendingUp, MdHistory, MdCheckCircle } from "react-icons/md";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";
import customers from "../../data/customers.json";
import transactions from "../../data/transactions.json";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent
} from "@/components/ui/accordion";
import {
  TooltipProvider, Tooltip, TooltipTrigger, TooltipContent
} from "@/components/ui/tooltip";

const chartData = [
  { x: '5k', y: 20 }, { x: '10k', y: 30 }, { x: '15k', y: 50 },
  { x: '20k', y: 40 }, { x: '25k', y: 85 }, { x: '30k', y: 35 },
  { x: '35k', y: 55 }, { x: '40k', y: 50 }, { x: '45k', y: 65 },
  { x: '50k', y: 25 }, { x: '55k', y: 35 }, { x: '60k', y: 30 },
  { x: '65k', y: 75 }, { x: '70k', y: 45 }, { x: '75k', y: 60 },
  { x: '80k', y: 50 }, { x: '85k', y: 45 }, { x: '90k', y: 55 }
];

const statusType = { Selesai: "success", Proses: "primary", Menunggu: "warning" };

const stats = [
  {
    label: "Total Pelanggan", value: customers.length,
    trend: "8.5%", isUp: true,
    icon: <MdPeople />, iconBg: "bg-[#e5e7ff]", iconColor: "text-[#4318ff]"
  },
  {
    label: "Total Transaksi", value: transactions.length,
    trend: "1.3%", isUp: true,
    icon: <MdReceipt />, iconBg: "bg-[#fff3e0]", iconColor: "text-[#ffb547]"
  },
  {
    label: "Total Pendapatan",
    value: "Rp " + (transactions.reduce((a, b) => a + b.price, 0) / 1000000).toFixed(1) + "jt",
    trend: "4.3%", isUp: false,
    icon: <MdTrendingUp />, iconBg: "bg-[#e2f9f0]", iconColor: "text-[#00b69b]"
  },
  {
    label: "Pending", value: transactions.filter(t => t.status === "Menunggu").length,
    trend: "1.8%", isUp: true,
    icon: <MdHistory />, iconBg: "bg-[#ffe5e5]", iconColor: "text-[#f93c65]"
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const recentTransactions = transactions.slice(0, 5);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <PageHeader title="Dashboard" breadcrumb={["Dashboard"]} />

        {/* Alert */}
        <Alert className="border-green-200 bg-green-50">
          <MdCheckCircle className="text-green-500 text-lg" />
          <AlertTitle className="text-green-800 font-semibold ml-1">Sistem Berjalan Normal</AlertTitle>
          <AlertDescription className="text-green-600 ml-1">
            Semua layanan laundry aktif. Data diperbarui secara real-time.
          </AlertDescription>
        </Alert>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div className="cursor-default">
                  <StatCard {...s} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                <p>Trend: {s.isUp ? "↑" : "↓"} {s.trend} dari bulan lalu</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Chart + Transaksi side by side on large screens */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* Grafik - lebih lebar */}
          <div className="xl:col-span-2">
            <Card>
              <SectionTitle
                title="Sales Details"
                action={
                  <select className="border border-garis text-sm rounded-lg px-3 py-1.5 text-teks-samping outline-none bg-latar focus:border-primary transition">
                    <option>Oktober</option>
                  </select>
                }
              />
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: '#a3aed0', fontSize: 11 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a3aed0', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                    <RechartsTooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px' }}
                      cursor={{ stroke: '#2563eb', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area type="monotone" dataKey="y" stroke="#2563eb" strokeWidth={2.5}
                      fillOpacity={1} fill="url(#colorSales)"
                      dot={{ r: 3.5, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 5.5, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Info Layanan - lebih sempit */}
          <div className="xl:col-span-1">
            <Card className="h-full">
              <SectionTitle title="Info Layanan" subtitle="FAQ layanan laundry" />
              <Accordion type="single" collapsible className="mt-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm text-teks hover:text-primary transition-colors">
                    Berapa lama proses reguler?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-teks-samping leading-relaxed">
                    Proses laundry reguler membutuhkan waktu 2–3 hari kerja tergantung antrian dan jenis pakaian.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm text-teks hover:text-primary transition-colors">
                    Tersedia layanan express?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-teks-samping leading-relaxed">
                    Ya, layanan express tersedia dengan estimasi selesai 6–8 jam. Biaya tambahan berlaku.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm text-teks hover:text-primary transition-colors">
                    Cara tracking status laundry?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-teks-samping leading-relaxed">
                    Pantau status laundry melalui menu Tracking Laundry di sidebar kiri.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>
        </div>

        {/* Transaksi Terbaru */}
        <Card>
          <SectionTitle
            title="Transaksi Terbaru"
            subtitle="5 transaksi terakhir"
            action={
              <Button type="secondary" size="sm" onClick={() => navigate("/transactions")}>
                Lihat Semua
              </Button>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-teks-samping text-xs border-b border-garis bg-latar/50">
                  {["Pelanggan", "Layanan", "Berat", "Total", "Status"].map(h => (
                    <th key={h} className="text-left py-3 px-2 first:pl-0 font-semibold tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map(t => (
                  <tr key={t.id} className="border-b border-garis last:border-0 hover:bg-latar/60 transition-colors">
                    <td className="py-3.5 px-2 first:pl-0 font-semibold text-teks">{t.customerName}</td>
                    <td className="py-3.5 px-2 text-teks-samping">{t.service}</td>
                    <td className="py-3.5 px-2 text-teks-samping">{t.weight} kg</td>
                    <td className="py-3.5 px-2 font-bold text-primary">Rp {t.price.toLocaleString()}</td>
                    <td className="py-3.5 px-2">
                      <Badge type={statusType[t.status]}>{t.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </TooltipProvider>
  );
}
