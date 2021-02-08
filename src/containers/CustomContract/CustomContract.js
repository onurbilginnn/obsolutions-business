import React, { useEffect, useState } from 'react';

import {
    Button,
    Form,
    ButtonGroup,
    Row,
    Col,
    InputGroup
} from 'react-bootstrap';

import SingleFileDropZone from '../../components/UI/DropZone/DropZoneSingleFile';
import ServiceRow from './ServiceRow/ServiceRow';
import OBAccordion from '../../components/UI/OBAccordion/OBAccordion';
import ServiceRowHeader from './ServiceRow/ServiceRowHeader';
import customContractToWord from './customContract_word';

import styles from './CustomContract.module.css';
import './customContract.css';

const CustomContract = props => {

    const date = new Date();
    const [isAccordionShown, setIsAccordionShown] = useState({
        entryTxt: false,
        lastTxt: false
    });
    const [clearForm, setClearForm] = useState(false);
    const [deleteKey, setDeleteKey] = useState('');
    const [companyLogo, setCompanyLogo] = useState('');
    const [childServiceRowValue, setChildServiceRowValue] = useState({});
    const [controls, setControls] = useState({
        companyName: '',
        entryTxt: '',
        serviceItems: [],
        lastTxt: '',
        date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
        discount: 0,
        tax: 0,
        isSignAreaVisible: false,
        grandTotal: 0,
        taxAmount: 0,
        discountAmount: 0,
        netAmount: 0
    });
    const contractRowHeaderArr = [
        { label: '-', colW: 'col-md-1', labelClass: 'text-light' },
        { label: 'Miktar', colW: 'col-md-1', labelClass: '' },
        { label: 'Br.', colW: 'col-md-1', labelClass: '' },
        { label: 'Ürün/Hizmet Açıklama', colW: '', labelClass: '' },
        { label: 'Br. Fiyat', colW: 'col-md-2', labelClass: '' },
        { label: 'Toplam Tutar', colW: 'col-md-2', labelClass: '' },
    ];

    const contractRowHeaders = contractRowHeaderArr.map(obj =>
        <ServiceRowHeader
            key={obj.label}
            colw={obj.colW}
            labelclass={obj.labelClass}
            label={obj.label}
        />
    );

    const toggleTxtAccordionHandler = e => {
        if (e.target.innerHTML.split(" ")[0] === "Giriş") {
            setIsAccordionShown(prevState => {
                return {
                    ...prevState,
                    entryTxt: !prevState.entryTxt
                }
            });
        } else {
            setIsAccordionShown(prevState => {
                return {
                    ...prevState,
                    lastTxt: !prevState.lastTxt
                }
            });
        };
    };
    const companyNameHandler = e => {
        const compName = e.target.value.toString();
        setControls(prevState => {
            return {
                ...prevState,
                companyName: compName
            }
        })
    };

    const base64ImgHandler = base64Img => {
        setCompanyLogo(base64Img);
    };

    const entryTextChangeHandler = e => {
        setControls(prevState => {
            return {
                ...prevState,
                entryTxt: e.target.value
            };
        });
    };
    const lastTextChangeHandler = e => {
        setControls(prevState => {
            return {
                ...prevState,
                lastTxt: e.target.value
            }
        });
    };

    const getServiceRowValuesHandler = values => {
           setChildServiceRowValue(values);
    }

    const firstRowKey = Date.now();
    const [serviceRows, setServiceRows] = useState([<ServiceRow 
    onGetServiceRowValues={getServiceRowValuesHandler}
     key={firstRowKey} jsxkey={firstRowKey.toString()} first />]);

    const deleteServiceRowHandler = key => {
        setDeleteKey(key);
    };

    const addServiceRowHandler = () => {
        const serviceRowArr = serviceRows.map(obj => obj);
        const objKey = Date.now();
        serviceRowArr.push(<ServiceRow 
        onGetServiceRowValues={getServiceRowValuesHandler}
         onDelete={deleteServiceRowHandler}
          key={objKey}
           jsxkey={objKey.toString()} />);
        setServiceRows(serviceRowArr);
    };

    const discountHandler = e => {
        setControls(prevState => {
            return {
                ...prevState,
                discount: parseFloat(e.target.value)
            }
        })
    };

    const taxHandler = e => {
        setControls(prevState => {
            return {
                ...prevState,
                tax: parseFloat(e.target.value)
            }
        })
    };

    const signatureToggleHandler = e => {
        setControls(prevState => {
            return {
                ...prevState,
                isSignAreaVisible: !prevState.isSignAreaVisible
            }
        });
    };


    useEffect(() => {
        const updatedServiceRows = serviceRows.filter(item => item.key !== deleteKey.toString());
        setServiceRows(updatedServiceRows);
    }, [deleteKey]);

    useEffect(() => {
        let index = -1;
        for(let i = 0; i< serviceRows.length; i++) {
            if(serviceRows[i].key === childServiceRowValue.rowId) {
                index = i;
                break;
            }
        }
        if(index !== -1) {
          const updatedServiceItems = controls.serviceItems;
          updatedServiceItems[index] = childServiceRowValue;
          let updatedGrandTotal = 0;
          let updatedTaxAmount = 0;
          let updatedDiscountAmount = 0;
          let updatedNetAmount = 0;
          for(let el in updatedServiceItems) {
            updatedGrandTotal += updatedServiceItems[el].totalAmount;            
          }
          updatedTaxAmount = updatedGrandTotal * controls.tax;
          updatedDiscountAmount = updatedGrandTotal * (controls.discount/100);
          updatedNetAmount = updatedGrandTotal - updatedTaxAmount - updatedDiscountAmount;
          setControls(prevState => {
              return {
                  ...prevState,
                  serviceItems: updatedServiceItems,
                  grandTotal: updatedGrandTotal,
                  taxAmount: updatedTaxAmount,
                  discountAmount: updatedDiscountAmount,
                  netAmount: updatedNetAmount
                }
            });
      }

    }, [childServiceRowValue]);

    useEffect(() => {
        setClearForm(false);

    }, [controls]);

    const createWordHandler = () => {
        const wordData = {
            logo: companyLogo.split(',')[1],
            formData: controls
        };

        customContractToWord(wordData.logo, wordData.formData);

        console.log(wordData);
    };


    const clearFormHandler = () => {
        setClearForm(true);
        setCompanyLogo('');
        setControls({
            companyName: '',
        entryTxt: '',
        serviceItems: [],
        lastTxt: '',
        date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
        discount: 0,
        tax: 0,
        isSignAreaVisible: false
        });
        setServiceRows([<ServiceRow 
            onGetServiceRowValues={getServiceRowValuesHandler}
             key={firstRowKey} jsxkey={firstRowKey.toString()} first />]);

    }

    return (
        <div className={styles.CustomContractContainer + " customContractContainer"}>
            <Form.Row className="justify-content-around align-items-center">
                <div className={styles.SectionContainer} >
                    <Form.Label>Şirket İsmi</Form.Label>
                    <Form.Control
                        onChange={companyNameHandler}
                        value={controls.companyName}
                        type="text"
                        placeholder="Şirket İsmi" />
                </div>
                <div className={styles.SectionContainer} >
                    <Form.Label>Logo</Form.Label>
                    <SingleFileDropZone
                    formClear={clearForm}
                        droptext={"Bu alana tıklayın veya dosyayı sürükleyin"}
                        dropnote={"Sadece 3MB'den küçük jpg,jpeg,png dosyası yüklenebilir!"}
                        acceptedFiles={"image/jpeg, image/jpg, image/png"}
                        file_type_error={"Lütfen sadece 3MB'den küçük jpg,jpeg,png dosyası yükleyin!"}
                        getBase64Img={base64ImgHandler}
                        maxFileSize={3}
                    />
                </div>
            </Form.Row>
            <div className={styles.SectionContainer} >
                <OBAccordion
                    title="Giriş Yazısı"
                    onToggleTxtAccordion={toggleTxtAccordionHandler}
                    isPlus={isAccordionShown.entryTxt}
                    rows={5}
                    type="textarea"
                    placeholder="Giriş yazısı yazınız"
                    onTextChange={entryTextChangeHandler}
                />
            </div>
            <div className={styles.SectionContainer} >
                <hr />
                <Form.Row style={{ marginBottom: "-25px" }}>
                    {contractRowHeaders}
                </Form.Row>
                {serviceRows}
                <Form.Row className="justify-content-end">
                    <Button variant="success"
                        disabled={props.first}
                        onClick={addServiceRowHandler}
                    >Satır Ekle</Button>
                </Form.Row>
                <hr />
                <div className={styles.SectionContainer} >
                    <OBAccordion
                        title="Son Yazı"
                        onToggleTxtAccordion={toggleTxtAccordionHandler}
                        placeholder="Son yazı yazınız"
                        isPlus={isAccordionShown.lastTxt}
                        rows={5}
                        type="textarea"
                        onTextChange={lastTextChangeHandler}
                    />
                </div>
            </div>
            <Form.Row className="justify-content-around align-items-center" >

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>İndirim</Form.Label>
                    <Col sm={10}>
                        <InputGroup className="col-md-6">
                            <Form.Control onChange={discountHandler} value={controls.discount} type="number" />
                            <InputGroup.Prepend>
                                <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup.Prepend>

                        </InputGroup>
                    </Col>

                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>KDV</Form.Label>
                    <Col sm={10}>
                        <InputGroup className="col-md-11">
                            <Form.Control as="select" onChange={taxHandler} value={controls.tax} >
                                <option value={0} >0</option>
                                <option value={0.08}>%8</option>
                                <option value={0.18}>%18</option>
                            </Form.Control>
                        </InputGroup>
                    </Col>

                </Form.Group>
                <Form.Group >
                    <Form.Check
                     onChange={signatureToggleHandler}
                      size="lg"
                       type="checkbox"
                        label="İmza Alanı Ekle"
                       checked={controls.isSignAreaVisible} />
                </Form.Group>
            </Form.Row>
            <ButtonGroup>
                <Button onClick={createWordHandler} >Word Oluştur</Button>
                <Button variant="danger" onClick={clearFormHandler} >Temizle</Button>
            </ButtonGroup>
        </div>
    );
};

export default CustomContract;