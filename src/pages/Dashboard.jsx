import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { MdPeople, MdReceipt, MdTrendingUp, MdHistory, MdInfo, MdCheckCircle } from "react-icons/md";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";
import customers from "../data/customers.json";
import transactions from "../data/transactions.json";

// Shadcn components
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

        {/* Shadcn Alert - info sistem */}
        <Alert>
          <MdCheckCircle className="text-green-500" />
          <AlertTitle>Sistem Berjalan Normal</AlertTitle>
          <AlertDescription>
            Semua layanan laundry aktif. Data diperbarui secara real-time.
          </AlertDescription>
        </Alert>

        {/* StatCard dengan Tooltip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div>
                  <StatCard {...s} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Trend: {s.isUp ? "↑" : "↓"} {s.trend} dari bulan lalu</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Grafik */}
        <Card>
          <SectionTitle
            title="Sales Details"
            action={
              <select className="border border-garis text-sm rounded-lg px-3 py-1.5 text-teks-samping outline-none bg-latar">
                <option>Oktober</option>
              </select>
            }
          />
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: '#a3aed0', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a3aed0', fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="y" stroke="#2563eb" strokeWidth={3}
                  fillOpacity={1} fill="url(#colorSales)"
                  dot={{ r: 4, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, fill: "#2563eb" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

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
                <tr className="text-teks-samping text-xs border-b border-garis">
                  {["Pelanggan", "Layanan", "Berat", "Total", "Status"].map(h => (
                    <th key={h} className="text-left pb-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map(t => (
                  <tr key={t.id} className="border-b border-garis last:border-0 hover:bg-latar transition">
                    <td className="py-3 font-medium text-teks">{t.customerName}</td>
                    <td className="py-3 text-teks-samping">{t.service}</td>
                    <td className="py-3 text-teks-samping">{t.weight} kg</td>
                    <td className="py-3 font-semibold text-teks">Rp {t.price.toLocaleString()}</td>
                    <td className="py-3">
                      <Badge type={statusType[t.status]}>{t.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Shadcn Accordion - FAQ Layanan */}
        <Card>
          <SectionTitle title="Info Layanan" subtitle="Pertanyaan umum seputar layanan laundry" />
          <Accordion type="single" collapsible className="mt-2">
            <AccordionItem value="item-1">
              <AccordionTrigger>Berapa lama proses laundry reguler?</AccordionTrigger>
              <AccordionContent>
                Proses laundry reguler membutuhkan waktu 2-3 hari kerja tergantung antrian dan jenis pakaian.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Apakah tersedia layanan express?</AccordionTrigger>
              <AccordionContent>
                Ya, layanan express tersedia dengan estimasi selesai dalam 6-8 jam. Biaya tambahan berlaku.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Bagaimana cara tracking status laundry?</AccordionTrigger>
              <AccordionContent>
                Kamu bisa memantau status laundry melalui menu Tracking Laundry di sidebar kiri.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

      </div>
    </TooltipProvider>
  );
}
