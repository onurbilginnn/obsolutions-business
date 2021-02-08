import React, { useState } from 'react';

import { Form, Col, InputGroup, FormControl } from 'react-bootstrap';

import styles from './ExpoContract.module.css';

const ExpoContract = props => {
    const [meterSq, setmeterSq] = useState(0);
    const [currency, setCurrency] = useState(1);
    const [currencyType, setCurrencyType] = useState('TL');
    const [unitPrice, setUnitPrice] = useState(0);
    const [stampTax, setStampTax] = useState(0);

    const fixedDecimalDigit = 2;

    const unitPriceTL = unitPrice * currency;
    const netTotalTL = unitPriceTL * meterSq;
    const KDVTL = netTotalTL * .18;
    const stampTaxTL = netTotalTL * stampTax;
    const totalTL = netTotalTL + KDVTL + stampTaxTL;


    const meterSqHandler = event => {
        setmeterSq(event.target.value);
    };

    const currencyHandler = event => {
        setCurrency(event.target.value);
    };

    const currencyTypeHandler = event => {
        setCurrencyType(event.target.value);
    };

    const unitPriceHandler = event => {
        setUnitPrice(event.target.value);
    };

    const stampTaxHandler = event => {
        setStampTax(event.target.value);
    };
    

    return (
        <div className={styles.FormContainer + " container"}>
            <div className="row">
            <div className="col col-md-6"></div>
                <Form className="col-md-6 text-center">
                    <h3>Veri Giriş</h3>
                    <hr />

                    <div className="row ">
                        <Form.Group as={Col}>
                            <Form.Label>Metrekare</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={meterSqHandler}
                                value={meterSq}
                                placeholder="Metrekare" />
                        </Form.Group>
                        <Col >
                            <Form.Label >Kur</Form.Label>
                            <InputGroup className="mb-2">
                                <FormControl className="col-md-9"
                                    type="number"
                                    onChange={currencyHandler}
                                    value={currency}
                                    placeholder="Kur" />
                                <Form.Control className="col-md-4" onChange={currencyTypeHandler} as="select" defaultValue={currencyType}>
                                    <option value="TL">TL</option>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                </Form.Control>
                            </InputGroup>
                        </Col>
                    </div>



                    <div className="row">
                        <Col >
                            <Form.Label >Br. Fiyat</Form.Label>
                            <InputGroup className="mb-2">
                                <FormControl className="col-md-9"
                                    type="number"
                                    onChange={unitPriceHandler}
                                    value={unitPrice}
                                    placeholder="Br. Fiyat" />
                                <InputGroup.Prepend>
                                    <InputGroup.Text>{currencyType}</InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>

                        <Form.Group as={Col}>
                            <Form.Label>Damga Vergisi Oranı</Form.Label>
                            <Form.Control onChange={stampTaxHandler} as="select" defaultValue={stampTax}>
                                <option value="0">0</option>
                                <option value="0.00474">0.00474</option>
                                <option value="0.00948">0.00948</option>
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <h3>Hesaplamalar</h3>
                    <hr />

                    <Col >
                            <Form.Label >Br. Fiyat</Form.Label>
                            <InputGroup className="mb-2">
                            <Form.Control
                                placeholder="Br. Fiyat"
                                value={Number(unitPriceTL.toFixed(fixedDecimalDigit)).toLocaleString()}
                                disabled />
                                <InputGroup.Prepend >
                                    <InputGroup.Text>TL</InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>
                        <Col >
                            <Form.Label >Net Tutar</Form.Label>
                            <InputGroup className="mb-2">
                            <Form.Control
                                placeholder="Net Tutar"
                                value={Number(netTotalTL.toFixed(fixedDecimalDigit)).toLocaleString()}
                                disabled />
                                <InputGroup.Prepend >
                                    <InputGroup.Text>TL</InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>     
                        <Col >
                            <Form.Label >KDV 18%</Form.Label>
                            <InputGroup className="mb-2">
                            <Form.Control
                                placeholder="KDV Tutarı"
                                value={Number(KDVTL.toFixed(fixedDecimalDigit)).toLocaleString()}
                                disabled />
                                <InputGroup.Prepend >
                                    <InputGroup.Text>TL</InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>      
                        <Col >
                            <Form.Label >Damga Vergisi Tutarı</Form.Label>
                            <InputGroup className="mb-2">
                            <Form.Control
                                value={Number(stampTaxTL.toFixed(fixedDecimalDigit)).toLocaleString()}
                                disabled />
                                <InputGroup.Prepend >
                                    <InputGroup.Text>TL</InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>     
                        <Col >
                            <Form.Label >Toplam Tutar</Form.Label>
                            <InputGroup className="mb-2">
                            <Form.Control
                                placeholder="Toplam Tutar"
                                value={Number(totalTL.toFixed(fixedDecimalDigit)).toLocaleString()}
                                disabled />
                                <InputGroup.Prepend >
                                    <InputGroup.Text>TL</InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>
                    {/* <Button variant="primary" type="submit">
                Submit
    </Button> */}
                </Form>

            </div>
        </div>
    );
};

export default ExpoContract;