import React, { useState } from 'react';
import {
    Button,
    Form,
    Accordion,
    Card
} from 'react-bootstrap';

const OBAccordion = props => {
    return (
        <Accordion>
<Card>
    <Card.Header>
        <Accordion.Toggle
            as={Button}
            variant="info"
            eventKey="0"
            onClick={props.onToggleTxtAccordion}>
            {props.title} {props.isPlus ? "-" : "+"}
        </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
        <Form.Control
         as={props.type}
          rows={props.rows}
           placeholder={props.placeholder}
           onChange={e => props.onTextChange(e)} />
    </Accordion.Collapse>
</Card>
</Accordion>
    );
}

export default OBAccordion;
