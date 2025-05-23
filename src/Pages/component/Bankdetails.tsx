import React, { useEffect, useState } from 'react';

import './bankdetails.css';
import { addBankDetail } from '../../api/bank/BankdetailsApi';

import {

  Container,

  Row,

  Col,

  Form,

  Button,

  Card,

} from 'react-bootstrap';

import toast from 'react-hot-toast';

import { QueryClient, useMutation } from '@tanstack/react-query';


// Types

interface Country {

  cca2: string;

  name: { common: string };

  flag: string;

  callingCodes: string[];

}

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

    countryCode: '',

    phoneNumber: '',

  });

  const [errors, setErrors] = useState({

    country: '',

    phoneNumber: '',

  });

  const [fileName, setFileName] = useState('No file chosen');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [validated, setValidated] = useState(false);

  const [countries, setCountries] = useState<Country[]>([]);

  const [loadingCountries, setLoadingCountries] = useState(true);

  // Fetch countries on mount

  useEffect(() => {

    const fetchCountries = async () => {

      try {

        const response = await fetch(

          'https://restcountries.com/v2/all?fields=alpha2Code,name,flag,callingCodes'

        );

        const data = await response.json();

        const formattedData = data

          .filter(

            (country: any) =>

              country.callingCodes &&

              country.callingCodes.length > 0 &&

              country.callingCodes[0] !== ''

          )

          .map((country: any) => ({

            cca2: country.alpha2Code,

            name: { common: country.name },

            flag: country.flag,

            callingCodes: country.callingCodes,

          }))

          .sort((a: Country, b: Country) =>

            a.name.common.localeCompare(b.name.common)

          );

        setCountries(formattedData);

        const defaultCountry: Country =
          formattedData.find((c: Country) => c.cca2 === 'US') || formattedData[0];

        setFormData(prev => ({

          ...prev,

          country: defaultCountry.name.common,

          countryCode: `+${defaultCountry.callingCodes[0]}`,

        }));

      } catch (error) {

        console.error('Failed to fetch countries:', error);

        toast.error('Failed to load country data');

      } finally {

        setLoadingCountries(false);

      }

    };

    fetchCountries();

  }, []);

  const handleInputChange = (

    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

  ) => {

    const { id, value } = e.target;

    setFormData({

      ...formData,

      [id]: value,

    });

    if (errors[id as keyof typeof errors]) {

      setErrors(prev => ({ ...prev, [id]: '' }));

    }

  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    setFileName(file ? file.name : 'No file chosen');

    setSelectedFile(file || null);

  };

  // Mutation for adding bank details

  const mutation = useMutation({
    mutationFn: (formDataToSend: FormData) => addBankDetail(formDataToSend),
    mutationKey: ['bankDetails'],
    onSuccess: (data) => {
      
      console.log('success', data);
      
      toast.success('Bank details submitted successfully!');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Submission failed');
      console.log('error', err.response?.data?.message || 'Submission failed');
      
    },
  });
 


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    event.stopPropagation();

    const newErrors = {

      country: formData.country ? '' : 'Country is required',

      phoneNumber: formData.phoneNumber ? '' : 'Phone number is required',

    };

    setErrors(newErrors);

    setValidated(true);

    if (!formData.country || !formData.phoneNumber) return;

    const form = new FormData();

    form.append('account_name', formData.accountName);

    form.append('account_number', formData.accountNumber);

    form.append('account_type', formData.accountType);

    form.append('ifsc_swift_code', formData.ifscCode);

    form.append('iban_number', formData.ibanNumber);

    form.append('bank_name', formData.bankName);

    form.append('bank_address', formData.bankAddress);

    form.append('country', formData.country);

    if (selectedFile) {

      form.append('passbook_file', selectedFile);

    }

    mutation.mutate(form);

  };

  return (
    <div className="bankdetails-container">
      <Container className="mt-4">
        <h3 className="fw-bold mb-3" style={{ color: '#55da59' }}>

          Add Bank Details
        </h3>
        <Card className="p-4 shadow-sm" style={{ border: 'none' }}>
          <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="accountName" className="mb-3">
                  <Form.Label>Account Name</Form.Label>
                  <Form.Control

                    type="text"

                    placeholder="Enter Account Name"

                    value={formData.accountName}

                    onChange={handleInputChange}

                    required

                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="accountNumber" className="mb-3">
                  <Form.Label>Account No.</Form.Label>
                  <Form.Control

                    type="text"

                    placeholder="Enter Account Number"

                    value={formData.accountNumber}

                    onChange={handleInputChange}

                    required

                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="accountType" className="mb-3">
                  <Form.Label>Account Type</Form.Label>
                  <Form.Select

                    value={formData.accountType}

                    onChange={handleInputChange}

                    required
                  >
                    <option value="">Select...</option>
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="ifscCode" className="mb-3">
                  <Form.Label>IFSC/Swift Code</Form.Label>
                  <Form.Control

                    type="text"

                    placeholder="Enter IFSC/Swift Code"

                    value={formData.ifscCode}

                    onChange={handleInputChange}

                    required

                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="ibanNumber" className="mb-3">
                  <Form.Label>IBAN No.</Form.Label>
                  <Form.Control

                    type="text"

                    placeholder="Enter IBAN Number"

                    value={formData.ibanNumber}

                    onChange={handleInputChange}

                    required

                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="bankName" className="mb-3">
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Control

                    type="text"

                    placeholder="Enter Bank Name"

                    value={formData.bankName}

                    onChange={handleInputChange}

                    required

                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="bankAddress" className="mb-3">
                  <Form.Label>Bank Address</Form.Label>
                  <Form.Control

                    type="text"

                    placeholder="Enter Bank Address"

                    value={formData.bankAddress}

                    onChange={handleInputChange}

                    required

                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="country" className="mb-3">
                  <Form.Label>

                    Country <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select

                    value={formData.country}

                    onChange={(e) => {

                      handleInputChange(e);

                      const selected = countries.find(

                        (c) => c.name.common === e.target.value

                      );

                      if (selected) {

                        setFormData((prev) => ({

                          ...prev,

                          countryCode: `+${selected.callingCodes[0]}`,

                        }));

                      }

                    }}

                    isInvalid={!!errors.country}
                  >
                    <option value="">Select a country</option>

                    {countries.map((country) => (
                      <option key={country.cca2} value={country.name.common}>

                        {country.name.common}
                      </option>

                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">

                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="passbook_file" className="mb-3">
              <Form.Label>Bank Book</Form.Label>
              <div className="input-group">
                <label className="input-group-text btn btn-primary mb-0" htmlFor="fileUpload">

                  Choose File
                </label>
                <input

                  type="file"

                  id="fileUpload"

                  name="passbook_file"

                  className="d-none"

                  onChange={handleFileChange}

                />
                <Form.Control type="text" value={fileName} readOnly className="bg-white" />
              </div>
            </Form.Group>

            <Button

              type="submit"

              className="btn fw-bold px-4"

              style={{

                background: 'linear-gradient(45deg, #32cd32, #00b300, #007f00)',

                border: 'none',

              }}

              disabled={loadingCountries || mutation.status === 'pending'}
            >

              {mutation.status === 'pending' ? 'Submitting...' : 'Submit Form'}
            </Button>
          </Form>
        </Card>
      </Container>
    </div>

  );

};

export default Bankdetails;
