import { useState } from "react";
import { Form, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Myticket.css";

const initialUsers = [
        {
          id: 1,
          EnquiryType: "Account Issue",
          Title: "Cannot login to my account",
          status: "Open",
          LastUpdate: "2023-01-01",

        },
        {
          id: 2,
          EnquiryType: "Withdrawal",
          Title: "Pending withdrawal request",
          status: "In Progress",
          LastUpdate: "2023-01-02",
        },
        {
          id: 3,
          EnquiryType: "Deposit",
          Title: "Deposit not credited",
          status: "Resolved",
          LastUpdate: "2023-01-03",

        },
        {
          id: 4,
          EnquiryType: "Account Issue",
          Title: "Password reset request",
          status: "Open",
          LastUpdate: "2023-01-04",

        },
        {
          id: 5,
          EnquiryType: "Withdrawal",
          Title: "Withdrawal fee inquiry",
          status: "In Progress",
          LastUpdate: "2023-01-05",
        }
      ];

const Myticket = () => {
  const [users, setUsers] = useState(initialUsers);
  const [sortState, setSortState] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    EnquiryType: string;
    Title: string;
    LastUpdate: string;
    Action: string;
    status: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleViewMore = () => navigate("/viewticket");

  const toggleSortDirection = () => {
    setSortState((prev) => (prev === null ? true : prev ? false : null));
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleSave = () => {
    if (selectedUser) {
      setUsers((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? selectedUser : user))
      );
    }
    setShowModal(false);
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Enquiry Type",
      "Title",
      "status",
      "Last Update",
      "Action",
    ];
    const csvRows = [headers.join(",")];
    users.forEach((user) => {
      csvRows.push(
        [
          user.id,
          user.EnquiryType,
          user.Title,
          user.LastUpdate,
          user.status,
        ].join(",")
      );
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mt5_users.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    const printSection = document.getElementById("print-section");
    const originalContents = document.body.innerHTML;
    if (printSection) {
      document.body.innerHTML = printSection.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  return (
    <div className="user-list-main">
      <div className="user-list-btnn mb-3 d-flex justify-content-center gap-2">
        <button>
          Open Ticket
        </button>
        <button>
          Close Ticket
        </button>
      </div>

      <div className="userlist-container">
        <div className="search-section">
          <Form.Group as={Col} md="3">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </Form.Group>

          <div className="user-list-btn">
            <button onClick={exportToCSV}>
              <i className="fa-solid fa-file-csv"></i> CSV
            </button>
            <button onClick={handlePrint}>
              <i className="fa-solid fa-print"></i> PRINT
            </button>
          </div>
        </div>

        <div className="table-container" id="print-section">
          <table className="table caption-top table-hover">
            <thead className="table-light">
              <tr>
                {[
                  "ID",
                  "Enquiry Type",
                  "Title",
                  "status",
                  "Last Update",
                  "Action",
                ].map((col, i) => (
                  <th key={i} onClick={toggleSortDirection}>
                    {col}
                    <span style={{ marginLeft: 8 }}>
                      <i
                        className={`fa-solid ${
                          sortState === null
                            ? "fa-arrows-up-down"
                            : sortState
                            ? "fa-arrow-up"
                            : "fa-arrow-down"
                        }`}
                      />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.EnquiryType}</td>
                  <td>{user.Title}</td>
                  <td>{user.LastUpdate}</td>
                  <td>{user.status}</td>
                  <td>
                    <div className="column-container">
                      <div className="icon-container">
                        <i
                          className="fa-solid fa-eye"
                          onClick={handleViewMore}
                        />
                      </div>
                    </div>
                  </td>
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
              {[5, 10, 15, 20].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="pagination-controls">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              ❮
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={currentPage === idx + 1 ? "active" : ""}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myticket;
