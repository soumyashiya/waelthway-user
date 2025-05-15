import React, { useState } from 'react';
import './bankdetails.css'
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Button,
  InputGroup,
  Card
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 // For custom styling

const Bankdetails = () => {
  const [formData, setFormData] = useState({
    accountName: '',
    accountNumber: '',
    accountType: '',
    ifscCode: '',
    ibanNumber: '',
    bankName: '',
    bankAddress: '',
    country: '',
  });
  
  const [fileName, setFileName] = useState('No file chosen');
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        setFileName(files[0].name);
      } else {
        setFileName('No file chosen');
      }
    };

  const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Form is valid, process data
      console.log('Form submitted', formData);
      // Here you would send the data to your backend
    }

    setValidated(true);
  };

  return (
    <div className='bankdetails-container'>
<Container className="mt-4">
  <h3 className="fw-bold mb-3" style={{color:' #55da59'}} >Add Bank Details</h3>
  <Card className="p-4 shadow-sm" style={{border:'none'}}>
    <Form onSubmit={handleSubmit}  noValidate validated={validated}>
      <Row>
        {/* Row 1: Account Name & Account No. */}
        <Col md={6}>
          <Form.Group controlId="accountName" className="mb-3">
            <Form.Label>Account Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Account Name" required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="accountNumber" className="mb-3">
            <Form.Label>Account No.</Form.Label>
            <Form.Control type="text" placeholder="Enter Account Number" required />
          </Form.Group>
        </Col>

        {/* Row 2: Account Type & IFSC/Swift Code */}
        <Col md={6}>
          <Form.Group controlId="accountType" className="mb-3">
            <Form.Label>Account Type</Form.Label>
            <Form.Select value={formData.accountType} onChange={handleInputChange} required>
              <option value="">Select...</option>
              <option value="savings">Savings</option>
              <option value="current">Current</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="ifscCode" className="mb-3">
            <Form.Label>IFSC/Swift Code</Form.Label>
            <Form.Control type="text" placeholder="Enter IFSC/Swift Code" required />
          </Form.Group>
        </Col>

        {/* Row 3: IBAN No. & Bank Name */}
        <Col md={6}>
          <Form.Group controlId="ibanNumber" className="mb-3">
            <Form.Label>IBAN No.</Form.Label>
            <Form.Control type="text" placeholder="Enter IBAN Number" required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="bankName" className="mb-3">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Bank Name" required />
          </Form.Group>
        </Col>

        {/* Row 4: Bank Address & Country */}
        <Col md={6}>
          <Form.Group controlId="bankAddress" className="mb-3">
            <Form.Label>Bank Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Bank Address" required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="country" className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Select value={formData.country} onChange={handleInputChange} required>
              <option value="">Select a country</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="India">India</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Row 5: File Upload Full Width */}
        <Col md={12}>
          <Form.Group controlId="bankBook" className="mb-3">
            <Form.Label>Bank Book</Form.Label>
            <input type="file" className="form-control" onChange={(e) => handleFileChange(e)} required />
          </Form.Group>
        </Col>

        {/* Row 6: Submit Button */}
        <Col md={12}>
          <Button
            type="submit"
            className="btn btn-success fw-bold px-5"
            style={{
              background: "linear-gradient(45deg, #32cd32, #00b300, #007f00)",
              border: "none",
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

export default Bankdetails;