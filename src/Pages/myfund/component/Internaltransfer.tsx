import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Internaltransfer = () => {
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
        <h3 className="fw-bold mb-3" style={{ color: '#55da59' }}>Internal Transfer</h3>
        <Card className="p-4 shadow-sm" style={{ border: 'none' }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="fromAccount" className="mb-3">
                  <Form.Label>From Account</Form.Label>
                  <Form.Select value={formData.fromAccount} onChange={handleChange} required>
                    <option value="">Enter MT5 ID</option>
                    <option value="123456">123456</option>
                    <option value="654321">654321</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="toAccount" className="mb-3">
                  <Form.Label>To Account</Form.Label>
                  <Form.Select value={formData.toAccount} onChange={handleChange} required>
                    <option value="">Enter MT5 ID</option>
                    <option value="987654">987654</option>
                    <option value="456789">456789</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="amount" className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Amount"
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

export default Internaltransfer;
