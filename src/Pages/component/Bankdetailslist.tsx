import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
// import './documentlist.css';

interface BankUser {
  id: number;
  accountName: string;
  accountNo: string;
  country: string;
  bankAddress: string;
  status: string;
  bankName: string;
  swiftCode: string;
  registrationDate: string;
}

const users: BankUser[] = [
  {
    id: 1,
    accountName: "Test Name",
    accountNo: "2342342342",
    country: "United Arab Emirates",
    bankAddress: "asdasd",
    status: "Approved",
    bankName: "asdas",
    swiftCode: "zasdasd",
    registrationDate: "2025-02-28",
  },
  {
    id: 2,
    accountName: "dsfd",
    accountNo: "342342",
    country: "United Arab Emirates",
    bankAddress: "sdfsd",
    status: "Approved",
    bankName: "sdfsdf",
    swiftCode: "sdfsd",
    registrationDate: "2025-02-28",
  },
  {
    id: 3,
    accountName: "ddsf",
    accountNo: "324342",
    country: "India",
    bankAddress: "asda",
    status: "Approved",
    bankName: "asda",
    swiftCode: "asdasd",
    registrationDate: "2025-03-03",
  },
];

const Bankdetailslist = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  return (
    <div className="depositreport-main1">
      <div className="news-wrapper">
        <div className="user-list-main">
          <h1 className="fw-bold">Bank Details List</h1>

          <div className="search-section">
            <Form.Group as={Col} md="3">
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
              <thead className="table-light">
                <tr>
                  {[
                    "Id",
                    "Account name",
                    "Account no",
                    "Country",
                    "Bank Address",
                    "Status",
                    "Bank Name",
                    "IFSC/SWIFT Code",
                    "Registration Date"
                  ].map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.accountName}</td>
                    <td>{user.accountNo}</td>
                    <td>{user.country}</td>
                    <td>{user.bankAddress}</td>
                    <td>{user.status}</td>
                    <td>{user.bankName}</td>
                    <td>{user.swiftCode}</td>
                    <td>{user.registrationDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-container">
            <div className="table-bottom-content">
              <span>
                Showing {indexOfFirstEntry + 1} to{" "}
                {Math.min(indexOfLastEntry, filteredUsers.length)} of{" "}
                {filteredUsers.length} entries
              </span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                {[5, 10, 15, 20].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="pagination-controls">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ❮
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bankdetailslist;
