'use client';
import { useState } from 'react';

export default function DealForm({ onAdd }) {
  const [deal, setDeal] = useState({
    name: '',
    amount: '',
    closingDate: '',
    stage: 'Qualification',
    probability: '',
    expectedRevenue: '',
    description: '',
  });

  const handleChange = (e) => {
    setDeal({ ...deal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deal.name.trim()) return alert("Deal Name is required");

    await onAdd(deal);
    setDeal({
      name: '',
      amount: '',
      closingDate: '',
      stage: 'Qualification',
      probability: '',
      expectedRevenue: '',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Deal</h2>
      <div className="grid grid-cols-2 gap-4">
        <input name="name" placeholder="Deal Name" className="input" value={deal.name} onChange={handleChange} />
        <input name="amount" type="number" placeholder="Amount" className="input" value={deal.amount} onChange={handleChange} />
        <input name="closingDate" type="date" className="input" value={deal.closingDate} onChange={handleChange} />
        <select name="stage" className="input" value={deal.stage} onChange={handleChange}>
          <option>Qualification</option>
          <option>Prospecting</option>
          <option>Proposal</option>
          <option>Negotiation</option>
          <option>Won</option>
          <option>Lost</option>
        </select>
        <input name="probability" type="number" placeholder="Probability (%)" className="input" value={deal.probability} onChange={handleChange} />
        <input name="expectedRevenue" type="number" placeholder="Expected Revenue" className="input" value={deal.expectedRevenue} onChange={handleChange} />
      </div>
      <textarea name="description" placeholder="Description" className="input w-full" value={deal.description} onChange={handleChange}></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
