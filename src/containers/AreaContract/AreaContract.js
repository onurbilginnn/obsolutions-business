import React, { useState} from 'react';

import {
  Form,
  Col,
  InputGroup,
  FormControl,
  Accordion,
  Card,
  Button,
  ButtonGroup
} from 'react-bootstrap';

import CompanyAndLogo from '../../components/UI/CompanyAndLogo/CompanyAndLogo';
import expoContractToWord from '../../util/Word/expoContract_word';

import styles from './AreaContract.module.css';

const AreaContract = (props) => {
  const date = new Date();
  const [clearForm, setClearForm] = useState(false);
  const [companyLogo, setCompanyLogo] = useState('');
  const [isAccordionShown, setIsAccordionShown] = useState(false);  
  const [controls, setControls] = useState({
    isTouched: false,
    companyName: '',
    meterSq: 0,
    currency: 1,
    currencyType: 'TL',
    date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
    unitPrice: 0,
    stampTax: 0,
    isSignAreaVisible: false,   
  });
  const fixedDecimalDigit = 2;

  const unitPriceTL = controls.unitPrice * controls.currency;
  const netTotalTL = unitPriceTL * controls.meterSq;
  const KDVTL = netTotalTL * 0.18;
  const stampTaxTL = netTotalTL * controls.stampTax;
  const totalTL = netTotalTL + KDVTL + stampTaxTL;

  const inputHandler = (e) => {
     const id =  e.target.id;
    setControls((prevState) => {
      return {
        ...prevState,
        [id]: e.target.value,
        isTouched: true
      };
    });
  };  

  const signatureToggleHandler = e => {
    setControls(prevState => {
        return {
            ...prevState,
            isSignAreaVisible: !prevState.isSignAreaVisible,
        isTouched: true

        }
    });
};

  const companyNameHandler = (e) => {
    const compName = e.target.value.toString();
    setControls((prevState) => {
      return {
        ...prevState,
        companyName: compName,
        isTouched: true
      };
    });
  };

  const base64ImgHandler = (base64Img) => {
    setCompanyLogo(base64Img);
  
      console.log(base64Img);
  };
  const onToggleAccordion = () => {
      setIsAccordionShown(!isAccordionShown);
  };


  const clearFormHandler = () => {
    setClearForm(true);
    setCompanyLogo('');
    setIsAccordionShown(false);
    setControls({
      isTouched: false,
      companyName: '',
      meterSq: 0,
      currency: 1,
      currencyType: 'TL',
      date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
      unitPrice: 0,
      stampTax: 0,
      isSignAreaVisible: false,   
    });
  };
  const createWordHandler = () => {
    const contractRowHeaderArr = ['M2','Br. Fiyat','Kur Tipi','Kur/TL','Damga Vergisi Oranı'];
    const wordData = {
      logo: companyLogo.split(',')[1],
      formData: {...controls,
        unitPriceTL: unitPriceTL,
        netTotalTL: netTotalTL,
        KDVTL: KDVTL,
        stampTaxTL: stampTaxTL,
        totalTL: totalTL
      },
      contractTableHeaders: contractRowHeaderArr
  };
  expoContractToWord(wordData.logo, wordData.formData, wordData.contractTableHeaders);
};

  return (
    <>
    <div className="desktop-only" >
      <Accordion className="mb-5" style={{marginTop:"100px"}}>
        <Card>
          <Card.Header className="text-center">
            <Accordion.Toggle
              as={Button}
              variant="info"
              eventKey="0"
              onClick={onToggleAccordion}
            >
              Şirket {isAccordionShown ? '-' : '+'}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
          <CompanyAndLogo
        classes={'col col-md-12 text-center'}
        noMargin
        onInputChange={companyNameHandler}
        inputValue={controls.companyName}
        inputType="text"
        inputPlaceholder="Şirket İsmi"
        dropZoneLabel="Logo"
        onClearDropzone={clearForm}
        dropTxt="Bu alana tıklayın veya dosyayı sürükleyin"
        dropNote="Sadece 3MB'den küçük jpg,jpeg,png dosyası yüklenebilir!"
        fileTypes="image/jpeg, image/jpg, image/png"
        file_type_error_msg="Lütfen sadece 3MB'den küçük jpg,jpeg,png dosyası yükleyin!"
        ongetbase64={base64ImgHandler}
        maxFileSize={3}
      />
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
      <div className="mb-5 container">
        <div className="row">
          <div className="col col-md-3"></div>
          <Form className="col-md-6 mt-2 text-center">
      <h3>Veri Girişi</h3>
            <hr />
            <div className="row ">
              <Form.Group as={Col}>
                <Form.Label>Metrekare</Form.Label>
                <Form.Control
                 id="meterSq"
                  type="number"
                  onChange={inputHandler}
                  value={controls.meterSq}
                  placeholder="Metrekare"
                />
              </Form.Group>
              <Col>
                <Form.Label>Kur</Form.Label>
                <InputGroup className="mb-2">
                  <FormControl
                  id="currency"
                    className="col-md-9"
                    type="number"
                    onChange={inputHandler}
                    value={controls.currency}
                    placeholder="Kur"
                  />
                  <Form.Control
                    className="col-md-4"
                    onChange={inputHandler}
                    as="select"
                    id="currencyType"
                    defaultValue={controls.currencyType}
                  >
                    <option value="TL">TL</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </Form.Control>
                </InputGroup>
              </Col>
            </div>

            <div className="row">
              <Col>
                <Form.Label>Br. Fiyat</Form.Label>
                <InputGroup className="mb-2">
                  <FormControl
                  id="unitPrice"
                    className="col-md-9"
                    type="number"
                    onChange={inputHandler}
                    value={controls.unitPrice}
                    placeholder="Br. Fiyat"
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text>{controls.currencyType}</InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Col>

              <Form.Group as={Col}>
                <Form.Label>Damga Vergisi Oranı</Form.Label>
                <Form.Control
                  onChange={inputHandler}
                  as="select"
                  defaultValue={controls.stampTax}
                  id="stampTax"
                >
                  <option value="0">0</option>
                  <option value="0.00474">0.00474</option>
                  <option value="0.00948">0.00948</option>
                </Form.Control>
              </Form.Group>
            </div>

            <h3>Hesaplamalar</h3>
            <hr />

            <Col>
              <Form.Label>Br. Fiyat</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="Br. Fiyat"
                  value={Number(
                    unitPriceTL.toFixed(fixedDecimalDigit)
                  ).toLocaleString()}
                  disabled
                />
                <InputGroup.Prepend>
                  <InputGroup.Text>TL</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Net Tutar</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="Net Tutar"
                  value={Number(
                    netTotalTL.toFixed(fixedDecimalDigit)
                  ).toLocaleString()}
                  disabled
                />
                <InputGroup.Prepend>
                  <InputGroup.Text>TL</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>KDV 18%</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="KDV Tutarı"
                  value={Number(
                    KDVTL.toFixed(fixedDecimalDigit)
                  ).toLocaleString()}
                  disabled
                />
                <InputGroup.Prepend>
                  <InputGroup.Text>TL</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Damga Vergisi Tutarı</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  value={Number(
                    stampTaxTL.toFixed(fixedDecimalDigit)
                  ).toLocaleString()}
                  disabled
                />
                <InputGroup.Prepend>
                  <InputGroup.Text>TL</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Toplam Tutar</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="Toplam Tutar"
                  value={Number(
                    totalTL.toFixed(fixedDecimalDigit)
                  ).toLocaleString()}
                  disabled
                />
                <InputGroup.Prepend>
                  <InputGroup.Text>TL</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>

            <div className="desktop-only" >
            <Form.Row className="justify-content-around align-items-center" >
                <Form.Group >
                    <Form.Check
                        onChange={signatureToggleHandler}
                        size="lg"
                        type="checkbox"
                        label="İmza Alanı Ekle"
                        checked={controls.isSignAreaVisible} />
                </Form.Group>
            </Form.Row>
            <ButtonGroup className="col-md-12 mt-3">
                <Button onClick={createWordHandler} disabled={controls.companyName === '' } >Word Oluştur</Button>
                <Button variant="danger" onClick={clearFormHandler} >Temizle</Button>
            </ButtonGroup>
                {(controls.companyName === '' && controls.isTouched) && <p className="text-danger" >Word çıktısı için şirket ismi giriniz!</p>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AreaContract;
