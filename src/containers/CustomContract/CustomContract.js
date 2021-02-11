import React, { useEffect, useRef, useState } from 'react';

import {
    Button,
    Form,
    ButtonGroup,
    Row,
    Col,
    InputGroup
} from 'react-bootstrap';

import CompanyAndLogo from '../../components/UI/CompanyAndLogo/CompanyAndLogo';
import ServiceRow from './ServiceRow/ServiceRow';
import OBAccordion from '../../components/UI/OBAccordion/OBAccordion';
import ServiceRowHeader from './ServiceRow/ServiceRowHeader';
import customContractToWord from '../../util/Word/customContract_word';

import styles from './CustomContract.module.css';
import './customContract.css';

const CustomContract = props => {
    const pageLoadedCount = useRef(0);
    const date = new Date();
    const [isAccordionShown, setIsAccordionShown] = useState({
        entryTxt: false,
        lastTxt: false
    });
    const [clearForm, setClearForm] = useState(false);
    const [isDeletion, setIsDeletion] = useState(false);
    const [companyLogo, setCompanyLogo] = useState('');
    const [childServiceRowValue, setChildServiceRowValue] = useState({});
    const [controls, setControls] = useState({
        isTouched: false,
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
                companyName: compName,
                isTouched: true
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

    const deleteServiceRowHandler = values => {
        setChildServiceRowValue(values);
        setIsDeletion(true);
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
        const discountperc = e.target.value || 0;
        const discAmount = parseFloat(controls.grandTotal) * parseFloat(discountperc) / 100;
        const netTotal = parseFloat(controls.grandTotal) - (parseFloat(controls.taxAmount) + parseFloat(discAmount));
        setControls(prevState => {
            return {
                ...prevState,
                discount: discountperc,
                discountAmount: discAmount,
                netAmount: netTotal
            }
        })
    };

    const taxHandler = e => {
        const taxperc = parseFloat(e.target.value);
        const taxAmount = parseFloat(controls.grandTotal) * parseFloat(taxperc);
        const netTotal = parseFloat(controls.grandTotal) - (parseFloat(controls.discountAmount) + parseFloat(taxAmount));
        setControls(prevState => {
            return {
                ...prevState,
                tax: taxperc,
                taxAmount: taxAmount,
                netAmount: netTotal
            }
        })
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

    useEffect(() => {
        let index = -1;
        for (let i = 0; i < serviceRows.length; i++) {
            if (serviceRows[i].key === childServiceRowValue.rowId) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            let updatedServiceItems = controls.serviceItems;
            let updatedGrandTotal = 0;
            let updatedTaxAmount = 0;
            let updatedDiscountAmount = 0;
            let updatedNetAmount = 0;

            if (!isDeletion) {
                updatedServiceItems[index] = childServiceRowValue;      
           
            } else {
                const updatedServiceRows = serviceRows.filter(item => item.key !== childServiceRowValue.rowId);
                setServiceRows(updatedServiceRows);
                setIsDeletion(false);
                updatedServiceItems = controls.serviceItems.filter(item => item.rowId !== childServiceRowValue.rowId);
            }
            for (let el in updatedServiceItems) {
                updatedGrandTotal += updatedServiceItems[el].totalAmount;
            }
            updatedTaxAmount = updatedGrandTotal * controls.tax;
            updatedDiscountAmount = updatedGrandTotal * (controls.discount / 100);
            updatedNetAmount = updatedGrandTotal - updatedTaxAmount - updatedDiscountAmount;

            setControls(prevState => {
                return {
                    ...prevState,
                    serviceItems: updatedServiceItems,
                    grandTotal: updatedGrandTotal,
                    taxAmount: updatedTaxAmount,
                    discountAmount: updatedDiscountAmount,
                    netAmount: updatedNetAmount,
                }
            });

            if(pageLoadedCount.current >= 2) {
                setControls(prevState => {
                    return {
                        ...prevState,
                        isTouched: true                   
                    }
                });
            }
        }

    }, [childServiceRowValue, isDeletion]);

    useEffect(() => {
        setClearForm(false);
        pageLoadedCount.current++;
    }, [controls]);


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

    const createWordHandler = () => {
        const updatedcontractRowHeaderArr = contractRowHeaderArr.map(el => el);
        updatedcontractRowHeaderArr[0].label = 'No';
        const wordData = {
            logo: companyLogo.split(',')[1],
            formData: controls,
            contractTableHeaders: updatedcontractRowHeaderArr
        };
        customContractToWord(wordData.logo, wordData.formData, wordData.contractTableHeaders);
    };

    return (
        <div className={styles.CustomContractContainer + " customContractContainer"}>
            <CompanyAndLogo 
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
                <Form.Row className="justify-content-around align-items-center" >

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>İndirim</Form.Label>
                        <Col sm={10}>
                            <InputGroup className="col-md-6">
                                <Form.Control
                                    onChange={discountHandler}
                                    value={controls.discount}
                                    type="number" />
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
                </Form.Row>
                <div className={styles.TotalsContainer} >
                    <Form.Row >
                        <Form.Label>Toplam Tutar_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _{parseFloat(controls.grandTotal).toFixed(2)}</Form.Label>
                    </Form.Row>
                    {parseFloat(controls.discount) !== 0 && <Form.Row >
                        <Form.Label>İndirim Tutarı_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _{parseFloat(controls.discountAmount).toFixed(2)}</Form.Label>
                    </Form.Row>}

                    {controls.tax !== 0 &&
                        <Form.Row >
                            <Form.Label>KDV Tutarı_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ {parseFloat(controls.taxAmount).toFixed(2)}</Form.Label>
                        </Form.Row>}
                    <Form.Row >
                        <Form.Label>Net Tutar _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ {parseFloat(controls.netAmount).toFixed(2)}</Form.Label>
                    </Form.Row>
                </div>
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
                <Form.Group >
                    <Form.Check
                        onChange={signatureToggleHandler}
                        size="lg"
                        type="checkbox"
                        label="İmza Alanı Ekle"
                        checked={controls.isSignAreaVisible} />
                </Form.Group>
            </Form.Row>
            <ButtonGroup className="col-md-6">
                <Button onClick={createWordHandler} disabled={controls.companyName === '' } >Word Oluştur</Button>
                <Button variant="danger" onClick={clearFormHandler} >Temizle</Button>
            </ButtonGroup>
                {(controls.companyName === '' && controls.isTouched) && <p className="text-danger" >Word çıktısı için şirket ismi giriniz!!</p>}
        </div>
    );
};

export default CustomContract;