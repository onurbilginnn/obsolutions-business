import React from 'react';

import {
    Form,
} from 'react-bootstrap';

import SingleFileDropZone from '../DropZone/DropZoneSingleFile';

import styles from './CompanyAndLogo.module.css';

const CompanyAndLogo = props => {
    return (
        <Form.Row className={"justify-content-around align-items-center " + props.classes}>
<div className={styles.SectionContainer} >
    <Form.Label>{props.inputLabel}</Form.Label>
    <Form.Control
        onChange={props.onInputChange}
        value={props.inputValue}
        type={props.inputType}
        placeholder={props.inputPlaceholder} />
</div>
<div className={styles.SectionContainer} >
    <Form.Label>{props.dropZoneLabel}</Form.Label>
    <SingleFileDropZone
        formClear={props.onClearDropzone}
        droptext={props.dropTxt}
        dropnote={props.dropNote}
        acceptedFiles={props.fileTypes}
        file_type_error={props.file_type_error_msg}
        getBase64Img={props.ongetbase64}
        maxFileSize={props.maxFileSize}
    />
</div>
</Form.Row>
    );
}

export default CompanyAndLogo;