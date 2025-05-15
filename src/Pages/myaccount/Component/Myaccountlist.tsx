import { useState } from 'react';
import { Form, Col, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './myaccountlist.css';

const initialUsers = [
    {
        id: 1,
        name: 'Mark',
        email: 'mark@example.com',
        phone: '1234567890',
        country: 'USA',
        balance: '$1000',
        ibName: 'IB001',
        mt5Id: 'MT501',
        regDate: '2023-01-01',
        status: 'Active',
        AccountType: 'Standard'
    },
    // Add more sample users as needed
];

const Myaccountlist = () => {
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
        AccountType: string;
    } | null>(null);

    const navigate = useNavigate();

    const handleViewMore = () => navigate('/viewuserlist');

    const toggleSortDirection = () => {
        setSortState(prev => (prev === null ? true : prev ? false : null));
    };

    const filteredUsers = users.filter(user =>
        Object.values(user)
            .join(' ')
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);

    const handleSave = () => {
        if (selectedUser) {
            setUsers(prev =>
                prev.map(user => (user.id === selectedUser.id ? selectedUser : user))
            );
        }
        setShowModal(false);
    };

    const exportToCSV = () => {
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Country', 'Balance', 'IB Name', 'MT5 ID', 'Registration Date'];
        const csvRows = [headers.join(',')];
        users.forEach(user => {
            csvRows.push([
                user.id,
                user.name,
                user.email,
                user.phone,
                user.country,
                user.balance,
                user.ibName,
                user.mt5Id,
                user.regDate
            ].join(','));
        });

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mt5_users.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handlePrint = () => {
        const printSection = document.getElementById('print-section');
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
            <h1 className="fw-bold">Account List</h1>

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
                                {['#', 'Name', 'MT5 ID', 'Account Type', 'Date', 'Balance', 'IB Name', 'MT5 ID', 'Date', 'Action'].map((col, i) => (
                                    <th key={i} onClick={toggleSortDirection}>
                                        {col}
                                        <span style={{ marginLeft: 8 }}>
                                            <i className={`fa-solid ${sortState === null ? 'fa-arrows-up-down' : sortState ? 'fa-arrow-up' : 'fa-arrow-down'}`} />
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.mt5Id}</td>
                                    <td>{user.AccountType}</td>
                                    <td>{user.regDate}</td>
                                    <td>{user.balance}</td>
                                    <td>{user.ibName}</td>
                                    <td>{user.mt5Id}</td>
                                    <td>{user.regDate}</td>
                                    <td>
                                        <div className="column-container">
                                            <div className="icon-container">
                                                <i
                                                    className="fa-solid fa-pen-to-square"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setShowModal(true);
                                                    }}
                                                />
                                                <i className="fa-solid fa-trash" />
                                                <i className="fa-solid fa-eye" onClick={handleViewMore} />
                                            </div>
                                            {user.id !== 1 && (
                                                <div className="action-btn1">
                                                    <button>Promote As IB</button>
                                                </div>
                                            )}
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
                            Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredUsers.length)} of {filteredUsers.length} entries
                        </span>
                        <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
                            {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    <div className="pagination-controls">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>❮</button>
                        {[...Array(totalPages)].map((_, idx) => (
                            <button key={idx} className={currentPage === idx + 1 ? 'active' : ''} onClick={() => setCurrentPage(idx + 1)}>
                                {idx + 1}
                            </button>
                        ))}
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>❯</button>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton style={{ borderBottom: 'none', background: '#fafafa' }}>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedUser.name}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={selectedUser.email}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedUser.phone}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Select
                                    value={selectedUser.country}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, country: e.target.value })}
                                >
                                    <option>United Arab Emirates</option>
                                    <option>India</option>
                                    <option>USA</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
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
                <Modal.Footer style={{ borderTop: 'none' }}>
                    <Button variant="success" onClick={handleSave}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Myaccountlist;
