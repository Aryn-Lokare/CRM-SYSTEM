// 'use client';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function DealChart({ deals }) {
//   // Group deals by stage and sum value
//   const stageTotals = deals.reduce((acc, deal) => {
//     const stage = deal.stage || 'Unknown';
//     const value = Number(deal.value) || 0;
//     acc[stage] = (acc[stage] || 0) + value;
//     return acc;
//   }, {});

//   const chartData = Object.entries(stageTotals).map(([stage, total]) => ({
//     stage,
//     total,
//   }));

//   return (
//     <Card className="mt-8">
//       <CardHeader>
//         <CardTitle>Deal Value by Stage</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="stage" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

// 
// 'use client';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
// } from 'recharts';

// export default function DealChart({ deals }) {
//   const grouped = deals.reduce((acc, deal) => {
//     const stage = deal.stage || 'Unknown';
//     acc[stage] = (acc[stage] || 0) + (parseFloat(deal.amount) || 0);
//     return acc;
//   }, {});

//   const chartData = Object.entries(grouped).map(([stage, amount]) => ({
//     stage, amount,
//   }));

//   return (
//     <div className="bg-white rounded shadow-md mt-8 p-4">
//       <h2 className="text-lg font-semibold mb-4">Deals by Stage (Amount)</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="stage" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="amount" fill="#4f46e5" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function DealChart({ deals }) {
  // ✅ Group deals by stage and sum values
  const stageTotals = deals.reduce((acc, deal) => {
    const stage = deal.stage || 'Unknown';
    const value = Number(deal.value) || 0;
    acc[stage] = (acc[stage] || 0) + value;
    return acc;
  }, {});

  // ✅ Convert to array for chart
  const chartData = Object.entries(stageTotals).map(([stage, total]) => ({
    stage,
    total,
  }));

  return (
    <div className="w-full h-64">
      <h2 className="text-lg font-semibold mb-2">Deals by Stage (Amount)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="stage" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
