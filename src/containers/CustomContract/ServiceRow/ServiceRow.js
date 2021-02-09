import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Col,
    ButtonGroup,
    InputGroup,
    FormControl,
} from 'react-bootstrap';

const ServiceRow = props => {
    const [serviceRowValues, setServiceRowValues] = useState({
        rowId: props.jsxkey,
        qty: '',
        unitType: 'Adet',
        serviceDesc: '',
        unitPrice: '',
        totalAmount: ''
    });

    const onGetQty = e => {
        setServiceRowValues(prevState => {
           return{
               ...prevState,
               qty: e.target.value,
               totalAmount: parseFloat(e.target.value) * parseFloat(prevState.unitPrice) || 0
           };
        });
    };

    const onGetUnitType = e => {
        setServiceRowValues(prevState => {
           return{
               ...prevState,
               unitType: e.target.value
           };
        });
    };

    const onGetServiceDesc = e => {
        setServiceRowValues(prevState => {
           return{
               ...prevState,
               serviceDesc: e.target.value
           };
        });
    };

    const onGetUnitPrice = e => {
        setServiceRowValues(prevState => {
            return{
                ...prevState,
                unitPrice: e.target.value ,
                totalAmount: parseFloat(e.target.value) * parseFloat(prevState.qty) || 0
            };
         });
    }
    
    useEffect(() => {     
        props.onGetServiceRowValues(serviceRowValues);
    }, [serviceRowValues]);

    return (
        <Form.Row >
<Form.Group as={Col} className="col-md-1">
    <ButtonGroup >
        <Button
         variant="danger"
         onClick={() => props.onDelete(serviceRowValues)}
          disabled={props.first} >Sil</Button>
    </ButtonGroup>
</Form.Group>

<Form.Group as={Col} className="col-md-1" >
    <Form.Control onChange={onGetQty} value={serviceRowValues.qty} type="number" />
</Form.Group>

<Form.Group as={Col} className="col-md-1">
    <Form.Control as="select" onChange={onGetUnitType} value={serviceRowValues.unitType}>
        <option>Adet</option>
        <option>GR</option>
        <option>KG</option>
        <option>M</option>
        <option>M2</option>
        <option>CM3</option>
        <option>Litre</option>
        <option>M3</option>
    </Form.Control>
</Form.Group>

<Form.Group onChange={onGetServiceDesc} value={serviceRowValues.serviceDesc} as={Col} >
    <Form.Control />
</Form.Group>
<Form.Group as={Col} className="col-md-2" >
    <InputGroup className="mb-2 mr-sm-2">
        <FormControl onChange={onGetUnitPrice} value={serviceRowValues.unitPrice} type="number" />
        <InputGroup.Prepend>
            <InputGroup.Text>TL</InputGroup.Text>
        </InputGroup.Prepend>
    </InputGroup>
</Form.Group>

<Form.Group as={Col} className="col-md-2" >
    <InputGroup className="mb-2 mr-sm-2">
        <FormControl value={serviceRowValues.totalAmount} type="number" disabled/>
        <InputGroup.Prepend>
            <InputGroup.Text>TL</InputGroup.Text>
        </InputGroup.Prepend>
    </InputGroup>
</Form.Group>
</Form.Row>
    );
} 

export default ServiceRow;