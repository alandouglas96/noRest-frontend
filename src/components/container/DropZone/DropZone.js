import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions/createApiActions';

import './style.css';

function DropZone ({ match }) {
  const apiName = match.params.apiName;

  const onDrop = useCallback(file => {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file[0]);

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/file/${apiName}`;

    const options = {
      method: 'POST',
      body: formData,
    }

    fetch(url, options)
      .then(response => {
        if (response.status !== 200 && response.status !== 204) {
          response.json().then(result => window.alert(result.error));
          throw new Error('bypass');
        } else return response;
      })
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(error => {
        if (error.message !== 'bypass') console.error('Error fetching user APIs:', error);
      });
  }, [apiName]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="dropzone" style={{maxWidth:'300px'}} {...getRootProps()}>
      <input {...getInputProps()} /> {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default connect(null, actions)(withRouter(DropZone));
