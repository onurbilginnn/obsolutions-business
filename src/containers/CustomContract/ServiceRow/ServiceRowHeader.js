import React, { useState } from 'react';
import {
    Form,
    Col,
} from 'react-bootstrap';

const ServiceRowHeader= props => {
    return (
        <Form.Group as={Col} className={props.colw} >
        <Form.Label className={props.labelclass}>{props.label}</Form.Label>
        </Form.Group>
    );
} 

export default ServiceRowHeader;
