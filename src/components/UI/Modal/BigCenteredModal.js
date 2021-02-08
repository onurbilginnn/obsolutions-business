import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const BigCenteredModal = props => {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign: "center"}}>
          {props.body}
          </div>
          <div>{props.dropzone}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default BigCenteredModal;