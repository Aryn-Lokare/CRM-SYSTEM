// 'use client';

// import { useEffect, useState } from 'react';

// export default function DealsPage() {
//   const [deals, setDeals] = useState([]);

//   useEffect(() => {
//     const fetchDeals = async () => {
//       try {
//         const res = await fetch('/api/deals');
//         const data = await res.json();
//         setDeals(data);
//       } catch (error) {
//         console.error('Failed to load deals:', error);
//       }
//     };

//     fetchDeals();
//   }, []);

//   return (
//     <main className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Deals Tracker</h1>

//       {deals.length === 0 ? (
//         <p className="text-gray-500">No deals found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="py-3 px-4 border-b">Title</th>
//                 <th className="py-3 px-4 border-b">Stage</th>
//                 <th className="py-3 px-4 border-b">Expected Revenue</th>
//               </tr>
//             </thead>
//             <tbody>
//               {deals.map((deal) => (
//                 <tr key={deal.id} className="hover:bg-gray-50 transition">
//                   <td className="py-3 px-4 border-b">{deal.title || '-'}</td>
//                   <td className="py-3 px-4 border-b">{deal.stage}</td>
//                   <td className="py-3 px-4 border-b">
//                     {deal.value != null ? `$${deal.value.toFixed(2)}` : 'N/A'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </main>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import DealChart from '../../components/DealChart';



export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [newDeal, setNewDeal] = useState({ title: '', value: '', stage: 'Prospecting' });

  // ✅ Fetch all deals
  const fetchDeals = async () => {
    const res = await fetch('/api/deals');
    const data = await res.json();
    setDeals(data);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // ✅ Create a new deal with title & value validation
  const createDeal = async () => {
    if (!newDeal.title.trim()) {
      alert('⚠️ Title is required!');
      return;
    }

    if (!newDeal.value || isNaN(newDeal.value) || Number(newDeal.value) <= 0) {
      alert('⚠️ Please enter a valid deal value!');
      return;
    }

    await fetch('/api/deals', {
      method: 'POST',
      body: JSON.stringify(newDeal),
    });

    setNewDeal({ title: '', value: '', stage: 'Prospecting' });
    fetchDeals();
  };

  // ✅ Update a deal
  const updateDeal = async (id, updated) => {
    await fetch(`/api/deals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updated),
    });
    fetchDeals();
  };

  // ✅ Delete a deal
  const deleteDeal = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this deal?");
  if (!confirmDelete) return;

  await fetch(`/api/deals/${id}`, { method: 'DELETE' });
  fetchDeals();
};


  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Deal Tracker (CRUD)</h1>

      {/* ➕ Add New Deal Form */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Add New Deal</h2>
        <input
          placeholder="Title"
          className="border p-2 mr-2"
          value={newDeal.title}
          onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Value"
          className="border p-2 mr-2"
          value={newDeal.value}
          onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
        />
        <select
          className="border p-2 mr-2"
          value={newDeal.stage}
          onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value })}
        >
          {['Prospecting', 'Proposal', 'Negotiation', 'Won', 'Lost'].map((stage) => (
            <option key={stage} value={stage}>{stage}</option>
          ))}
        </select>
        <button onClick={createDeal} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>

      {/* 📋 Deal Table */}
      <table className="min-w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Value</th>
            <th className="p-2 border">Stage</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id} className="border-t">
              <td className="p-2 border">
                <input
                  value={deal.title || ''}
                  onChange={(e) =>
                    updateDeal(deal.id, { ...deal, title: e.target.value })
                  }
                  className="border p-1 w-full"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={deal.value || ''}
                  onChange={(e) =>
                    updateDeal(deal.id, { ...deal, value: parseFloat(e.target.value) })
                  }
                  className="border p-1 w-full"
                />
              </td>
              <td className="p-2 border">
                <select
                  value={deal.stage}
                  onChange={(e) =>
                    updateDeal(deal.id, { ...deal, stage: e.target.value })
                  }
                  className="border p-1 w-full"
                >
                  {['Prospecting', 'Proposal', 'Negotiation', 'Won', 'Lost'].map((stage) => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteDeal(deal.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DealChart deals={deals} />
    </main>
  );
}
