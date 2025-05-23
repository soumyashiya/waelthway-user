import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Newticket = () => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Transfer Data:', formData);
    // Submit logic here
  };

  return (
    <div className='bankdetails-container'>
      <Container className="mt-4">
        <h3 className="fw-bold mb-3" style={{ color: '#55da59' }}>Create New Ticket</h3>
        <Card className="p-4 shadow-sm" style={{ border: 'none' }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="fromAccount" className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select value={formData.fromAccount} onChange={handleChange} required>
                    <option value="">Trading Operations</option>
                    <option value="123456">Non-trading Operations</option>
                    <option value="654321">Account Opening</option>
                    <option value="654321">KYC</option>
                    <option value="654321">Deposit</option>
                    <option value="654321">Withdrawals</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="toAccount" className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select value={formData.toAccount} onChange={handleChange} required>
                    <option value="">Low</option>
                    <option value="987654">Medium</option>
                    <option value="456789">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="amount" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="amount" className="mb-3">
                  <Form.Label>Describe Your Problem</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Button
                  type="submit"
                  className="fw-bold px-5"
                  style={{
                    background: "linear-gradient(45deg, #32cd32, #00b300, #007f00)",
                    border: "none",
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                  }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Newticket;
