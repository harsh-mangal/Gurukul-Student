import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StudentLedger = () => {
  const { id } = useParams();
  const [ledger, setLedger] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const schoolName = "Gurukul 2.0";
  const schoolAddress = "123 School Lane, Education City, Country";
  const phoneNumber = "(123) 456-7890";
  const email = "info@schooldomain.com";
  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/ledgers/getLedgerByStudentId/66da9ee5d94e5d3fad0399b6`);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { entries = [], studentId, feeStructureId, totalAmount } = ledger || {};

  const generatePDF = () => {
    const doc = new jsPDF();
    const schoolName = "Gurukul 2.0";
    const schoolAddress = "123 School Lane, Education City, Country";
    const phoneNumber = "(123) 456-7890";
    const email = "info@schooldomain.com";
  
    // Title Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(schoolName, 14, 20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(schoolAddress, 14, 30);
    doc.text(`Phone: ${phoneNumber} | Email: ${email}`, 14, 40);
    doc.line(14, 45, 200 - 14, 45); // Horizontal line
  
    // Ledger Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text('Student Ledger', 14, 55);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Student ID: ${id}`, 14, 65);
    doc.text(`Total Amount (INR): ${totalAmount?.toLocaleString('en-IN')}`, 14, 75);
  
    // Table
    const tableStartY = 85;
    doc.autoTable({
      startY: tableStartY,
      head: [['Date', 'Receipt Number', 'Description', 'Credit Amount', 'Debit Amount', 'Balance']],
      body: entries.map(entry => [
        new Date(entry.date).toLocaleDateString(),
        entry.receiptNumber || '-',
        entry.description,
        entry.creditAmount ? entry.creditAmount.toLocaleString('en-IN') : '-',
        entry.debitAmount ? entry.debitAmount.toLocaleString('en-IN') : '-',
        entry.balance.toLocaleString('en-IN')
      ]),
      headStyles: { fillColor: [0, 0, 0] },
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { left: 14, right: 14 },
      theme: 'grid'
    });
  
    // Footer
    const footerText = `Page ${doc.internal.getNumberOfPages()}`;
    doc.setFontSize(10);
    doc.text(footerText, 14, doc.internal.pageSize.height - 10);
  
    doc.save(`ledger_${id}.pdf`);
  };
  

  const printPage = () => {
    const printContent = document.getElementById('ledgerContent').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `
      <html>
        <head>
          <style>
            @media print {
              /* Hide elements that should not be printed */
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="no-print">
            <h1>${schoolName}</h1>
            <p>${schoolAddress}</p>
            <p>Phone: ${phoneNumber} | Email: ${email}</p>
          </div>
          ${printContent}
        </body>
      </html>
    `;

    window.print();

    // Restore original content after printing
    document.body.innerHTML = originalContent;
  };

  return (
    <div className="p-6 bg-gray-50">
      

      <h3 className="text-2xl font-medium mb-4">Ledger Entries</h3>
      <div id="ledgerContent">
        <table className="min-w-full bg-white border border-gray-300">
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
                <tr key={index} className="border-b text-center">
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
                <td colSpan="7" className="py-2 px-4 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentLedger;
