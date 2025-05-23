import { Form, Col, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import './userlist.css';
import { useState } from 'react';
import './myaccountlist.css'

const initialUsers = [
  { id: 1, name: 'Mark', email: 'Otto', phone: '@mdo', country: 'UAE', balance: '100' },
  // Add more users...
];

const Userlist = () => {
  const [users, setUsers] = useState(initialUsers);
  const [sortState, setSortState] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
    email: string;
    phone: string;
    country: string;
    balance: string;
    ibName: string;
    mt5Id: string;
    regDate: string;
    status: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/viewuserlist');
  };

  const toggleSortDirection = () => {
    setSortState(sortState === null ? true : sortState ? false : null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.country.toLowerCase().includes(searchQuery.toLowerCase())
    // user.mt5Id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // user.ibName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleSave = () => {
    if (selectedUser) {
      setUsers(prev =>
        prev.map(user =>
          user.id === selectedUser.id ? selectedUser : user
        )
      );
    }
    setShowModal(false);
    console.log('Updated user:', selectedUser);
  };

  const exportToCSV = () => {
    const csvRows = [];
    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'Country',
      'Wallet Balance',
      'IB Name',
      'MT5 ID',
      'Registration Date',
    ];
    csvRows.push(headers.join(','));

    users.forEach((user) => {
      const row = [
        user.id,
        user.email,
        user.phone,
        user.country,
        user.balance,
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'mt5_users.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    const printSection = document.getElementById('print-section');
    const printContents = printSection ? printSection.innerHTML : '';
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className='user-list-main'>
      <h1 className="fw-bold">Account List</h1>

      <div className='userlist-container'>
        <div className='search-section'>
          <Form.Group as={Col} xs={12} md={3} controlId="validationCustom04">
  <Form.Label></Form.Label>
  <Form.Control
    type="text"
    placeholder="Search..."
    required
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    }}
  />
  <Form.Control.Feedback type="invalid">search...</Form.Control.Feedback>
</Form.Group>

          <div className='user-list-btn'>
            <button onClick={exportToCSV}><i className="fa-solid fa-file-csv"></i> CSV</button>
            <button onClick={handlePrint}><i className="fa-solid fa-print"></i> PRINT</button>
          </div>
        </div>

        <div className='table-container' id="print-section">
          <table className="table caption-top table-hover">
            <thead className="table-light">
              <tr>
                {['#', 'Name', 'Mt5 id', 'Account Type', 'Date', 'Action'].map((col, index) => (
                  <th key={index} className={`col-${index}`} onClick={toggleSortDirection}>
                    {col}
                    <span style={{ marginLeft: '8px' }}>
                      <i className={`fa-solid ${sortState === null ? 'fa-arrows-up-down' : sortState ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <th className="col-0">{user.id}</th>
                  <td className="col-1">{user.name}</td>
                  <td className="col-2">{user.email}</td>
                  <td className="col-3">{user.phone}</td>
                  <td className="col-4">{user.country}</td>
                  {/* <td className="col-5">{user.balance}</td> */}
                  
                  <td className="col-9 column-container" colSpan={2}>
                    <div className='column-container'>
                      {/* <div className='icon-container'>
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => {
                            setSelectedUser({ ...user });
                            setShowModal(true);
                          }}
                        ></i>
                        <i className="fa-solid fa-trash"></i>
                        <i className="fa-solid fa-eye" onClick={handleViewMore}></i>
                      </div> */}
                      {/* {user.id !== 1 && ( */}
                        <Button type="submit" style={{ background: ' linear-gradient(45deg, #32cd32, #00b300, #007f00)', border: 'none' }} className="btn  fw-bold px-4">
                          Details
                        </Button>
                      {/* )} */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='pagination-container'>
          <div className='table-bottom-content'>
            <span>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredUsers.length)} of {filteredUsers.length} entries</span>
            <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
              {[5, 10, 15, 20].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className='pagination-controls'>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>❮</button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>❯</button>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ borderBottom: "none", background: "#fafafa" }}>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.phone}
                  onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Country <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Select
                  value={selectedUser.country}
                  onChange={(e) => setSelectedUser({ ...selectedUser, country: e.target.value })}
                >
                  <option>United Arab Emirates</option>
                  <option>India</option>
                  <option>USA</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Status <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Select
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                >
                  <option>Active</option>
                  <option>Block</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer style={{ borderTop: "none" }}>
          <Button
            style={{
              backgroundColor: "green",
              border: "none",
              padding: "10px 30px",
              borderRadius: "7px",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
              fontWeight: 600
            }}
            onClick={handleSave}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Userlist;
