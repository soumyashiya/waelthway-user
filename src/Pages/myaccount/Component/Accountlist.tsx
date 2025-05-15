import React, { useState } from "react";
import { FaFileCsv, FaPrint } from "react-icons/fa";

const mockData = [
  { id: 1, name: "Textdxb", mt5: "888891275", type: "test0403", date: "2025-03-04" },
  { id: 2, name: "Textdxb", mt5: "888891276", type: "test0403", date: "2025-03-05" },
  { id: 3, name: "Textdxb", mt5: "888891279", type: "Zero Spread", date: "2025-03-06" },
];

interface AccountlistProps {
  isSidebarOpen: boolean;
}

const Accountlist: React.FC<AccountlistProps> = ({ isSidebarOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mt5.includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className={`p-6 bg-gray-50 min-h-screen transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'ml-250 w-[calc(100%-250px)]' : 'ml-0 w-full'
      }`}
      style={{
        marginLeft: isSidebarOpen ? '250px' : '0',
        width: isSidebarOpen ? 'calc(100% - 250px)' : '100%',
      }}
    >
      <h1 className="text-2xl font-bold text-green-500 mb-4">Account List</h1>

      <div className="bg-white rounded-xl p-6 shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
          />

          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700">
              <FaFileCsv /> CSV
            </button>
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700">
              <FaPrint /> PRINT
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="p-3">Id</th>
                <th className="p-3">Name</th>
                <th className="p-3">Mt5 id</th>
                <th className="p-3">Account Type</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="text-sm text-gray-800 border-t">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.mt5}</td>
                  <td className="p-3">{item.type}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">
                    <button className="bg-green-600 text-white px-4 py-1 rounded-lg shadow hover:bg-green-700">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div>
            Showing 1 to {filtered.length} of {filtered.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-gray-200 px-3 py-1 rounded-full" disabled>
              &lt;
            </button>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full">1</span>
            <button className="bg-gray-200 px-3 py-1 rounded-full" disabled>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountlist;