import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import studentId from '../config';

const StudentLedger = () => {
  const { id } = useParams();
  const [ledger, setLedger] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/ledgers/getLedgerByStudentId/${studentId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLedger(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLedger();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-600 py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  const { entries = [] } = ledger || {};

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-7xl mx-auto mt-6">
      <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Student Ledger</h3>

      <div className="hidden md:block">
        {/* Desktop Table View */}
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Receipt Number</th>
              <th className="py-3 px-4 border-b">Description</th>
              <th className="py-3 px-4 border-b">Debit Amount</th>
              <th className="py-3 px-4 border-b">Credit Amount</th>
              <th className="py-3 px-4 border-b">Balance</th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((entry, index) => (
                <tr key={index} className="border-b text-center hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{entry.receiptNumber || '-'}</td>
                  <td className="py-2 px-4">{entry.description}</td>
                  <td className="py-2 px-4">{entry.debitAmount ? entry.debitAmount.toLocaleString('en-IN') : '-'}</td>
                  <td className="py-2 px-4">{entry.creditAmount ? entry.creditAmount.toLocaleString('en-IN') : '-'}</td>
                  <td className="py-2 px-4">{entry.balance.toLocaleString('en-IN')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-600">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {/* Mobile Card View */}
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <div key={index} className="mb-4 bg-white p-4 rounded-lg shadow-md">
              <div className="mb-2">
                <span className="font-semibold">Date: </span>{new Date(entry.date).toLocaleDateString()}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Receipt Number: </span>{entry.receiptNumber || '-'}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Description: </span>{entry.description}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Debit Amount: </span>{entry.debitAmount ? entry.debitAmount.toLocaleString('en-IN') : '-'}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Credit Amount: </span>{entry.creditAmount ? entry.creditAmount.toLocaleString('en-IN') : '-'}
              </div>
              <div>
                <span className="font-semibold">Balance: </span>{entry.balance.toLocaleString('en-IN')}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No data available</div>
        )}
      </div>
    </div>
  );
};

export default StudentLedger;
