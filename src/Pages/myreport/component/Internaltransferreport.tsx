import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import './depositreport.css';

interface Filters {
  status: string;
  paymentMethod: string;
  fromDate: string;
  toDate: string;
}

const users = [
  {
    id: 1,
    nameemail: "tony",
    m5id: "anu@gmail.com",
    amount: "cvjv",
    withdrawto: "dgd",
    paymentmethod: "dhf",
    note: "cbs",
    comment: "dd",
    status: "fhjh",
    date: "23-07-23",
  },
  {
    id: 2,
    nameemail: "mony",
    m5id: "anu@gmail.com",
    amount: "cvjv",
    withdrawto: "dgd",
    paymentmethod: "dhf",
    note: "cbs",
    comment: "dd",
    status: "fhjh",
    date: "23-07-23",
  },
];

const Internaltransferreport = () => {
  const [sortState, setSortState] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState<Filters>({
    status: "",
    paymentMethod: "",
    fromDate: "",
    toDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleSortDirection = () => {
    setSortState(sortState === null ? true : sortState ? false : null);
  };

  const filteredUsers = users.filter((user) =>
    user.nameemail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.m5id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.paymentmethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="depositreport-main1">
      <div className="news-wrapper">
        <div className="user-list-main">
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
            <h1 className="fw-bold">Internal Transfer Report</h1>

            <div className="filter-row">
              <div className="filter-group">
                <label className="text-sm font-semibold">From</label>
                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="filter-group">
                <label className="text-sm font-semibold">To</label>
                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="userlist-container">
            <div className="search-section">
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">search...</Form.Control.Feedback>
              </Form.Group>
              <div className="user-list-btn">
                <button>
                  <i className="fa-solid fa-file-csv"></i> CSV
                </button>
                <button>
                  <i className="fa-solid fa-print"></i> PRINT
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="table caption-top table-hover">
                <thead className="table-light" style={{ minWidth: "180px", width: "220px" }}>
                  <tr>
                    {["#", "Name / Email", "m5Id", "Amount", "Payment Method", "Note", "Status", "Date"].map(
                      (col, index) => (
                        <th key={index} scope="col" onClick={toggleSortDirection}>
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <th>{user.nameemail}</th>
                      <td>{user.m5id}</td>
                      <td>{user.amount}</td>
                      <td>{user.paymentmethod}</td>
                      <td>{user.note}</td>
                      <td>{user.status}</td>
                      <td>{user.date}</td>
                      <td>{user.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination-container">
              <div className="table-bottom-content">
                <span>
                  Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, users.length)} of {users.length} entries
                </span>
                <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
                  {[5, 10, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pagination-controls">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                  ❮
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={currentPage === index + 1 ? "active" : ""}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                  ❯
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internaltransferreport;
