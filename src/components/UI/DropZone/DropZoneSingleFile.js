import React, {useEffect, useState} from 'react';
// import { InputGroup, Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

import './dropzone.css';

const DropZoneSingleFile = props => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [base64Image, setBase64Image] = useState('');

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: props.acceptedFiles,
        maxFiles: 1,
        maxSize: props.maxFileSize * 1024 * 1024,
    });

    const removeAll = () => {
        acceptedFiles.length = 0
        acceptedFiles.splice(0, acceptedFiles.length)
      }

    if(props.formClear) {
        removeAll();
    }

    const acceptedFileItems = acceptedFiles.map(file => {
        return (<li key={file.path}>
            {file.path}/{file.size} bytes - <img height="70" src={base64Image} alt={file.path} />
        </li>);
    });

    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        switch (errors[0].code) {
            case 'file-invalid-type':
                return props.file_type_error;
            case 'file-too-large':
                return 'Dosya boyutu çok büyük!';
            case 'file-too-small':
                return 'Dosya boyutu çok küçük!';
            case 'too-many-files':
                return 'Toplam dosya adedi çok fazla!';
            default:
                return 'Bilinmeyen hata!';
        }
    }); 


    const getBase64 = async (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
      
        return new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        })
      }

    useEffect(() => {
        if(acceptedFileItems.length > 0) {
            setIsBtnDisabled(false);
            getBase64(acceptedFiles[0]).then(result => setBase64Image(result));
            props.getBase64Img(base64Image);
        } else {
            setIsBtnDisabled(true);
        }
    }, [acceptedFileItems]);

    
    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>{props.droptext}</p>
                <em>{props.dropnote}</em>
            </div>
            <aside>
                <ul className="dropzone-list mt-3 text-success">{acceptedFileItems}</ul>
                <ul className="dropzone-list mt-3 text-danger">{fileRejectionItems[0]}</ul>             
                {/* <InputGroup className="mb-3">                   
                    <InputGroup.Append>
                        <Button variant="outline-primary" disabled={isBtnDisabled}>Upload</Button>
                    </InputGroup.Append>
                </InputGroup> */}
            </aside>
        </section>
    );
}

export default DropZoneSingleFile;