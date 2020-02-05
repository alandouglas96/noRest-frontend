import React from "react";
import { connect } from "react-redux";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import _ from 'lodash';

import BackButton from '../../presentional/BackButton';

import './style.css';


const ApiDocs = ({ userApis, match }) => {
  
  const apiName = match.params.apiName;
  let currentApi = _.filter(userApis, (api) => (api.api_name === apiName));
  if (currentApi.length > 0) currentApi = currentApi[0]
  
  console.log(currentApi);
  // <--- CODE SNIPPETS --->

  function bodyGenerator (api) {
    console.log('called', api, !api.length)
    if (!api.api_name) return '';
    let helper = ''

    function bodyGeneratorTypeHelper (type) {
      let value = '';
      switch (type) {
        case  'String':
          value = '\'Your string\'';
          break;
        case 'Number':
          value = 23;
          break;
        case 'Boolean':
          value = true;
          break;
        case 'Date':
          value = '1996-03-18';
          break; 
        default:
          value = '';
      }
      return value;
    }
    api.api_fields.forEach(field => {
      helper += `${field.field_name}: ${bodyGeneratorTypeHelper(field.field_type)},\n\t`
    });
    const fields = helper.slice(0,-3);
    return fields;
  }

  const codeStandardGetJS = 
  `const url = 'https://no-rest-api.herokuapp.com/api/${currentApi.api_name}';
const options = {
  method: 'GET',
  headers: {
    'API_KEY': '${currentApi.api_key}',
    'API_SECRET_KEY': '${currentApi.api_secret_key}'
  }
};

fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));`;

  const codePostJS = 
  `const url = 'https://no-rest-api.herokuapp.com/api/${currentApi.api_name}';
const options = {
  method: 'POST',
  headers: {
    'API_KEY': '${currentApi.api_key}',
    'API_SECRET_KEY': '${currentApi.api_secret_key}'
  },
  body: {
    ${currentApi.api_key ? bodyGenerator(currentApi) : 'test: test'}
  }
};

fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));`;

  const codePutJS = 
  `// substitute recordId at the end of URL with the ID of the record you want to update
const url = 'https://no-rest-api.herokuapp.com/api/${currentApi.api_name}/recordID';
const options = {
  method: 'PUT',
  headers: {
    'API_KEY': '${currentApi.api_key}',
    'API_SECRET_KEY': '${currentApi.api_secret_key}'
  },
  body: {
    // only pass the fields you want to modify
    // if a field is not passed its value will be respected
    ${currentApi.api_key ? bodyGenerator(currentApi) : 'test: test'}
  }
};

fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));`;

const codeDeleteJS = 
  `// substitute recordId at the end of URL with the ID of the record you want to DELETE
const url = 'https://no-rest-api.herokuapp.com/api/${currentApi.api_name}/recordID';
const options = {
  method: 'DELETE',
  headers: {
    'API_KEY': '${currentApi.api_key}',
    'API_SECRET_KEY': '${currentApi.api_secret_key}'
  },
};

fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));`;

  return (
    <div className="box">
      
      <div className="bread-crumb">
        <div className="bc">Dashboard / API / Docs</div>
        <div className="flex">
          <BackButton />
        </div>
      </div>
      <div className="ApiDocsBox">
      <div className="bigTitle">{currentApi.api_name} API Documentation</div>

      <div className="docs-title">Getting Started</div>
      <div className="body-text">
        If you are new to programming in general, or you still have doubts about
        what APIs are, we recommend you read this comprehensive&nbsp; 
        <a className="docs-link" href="https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/">
        article</a>.
      </div>

      <div className="body-text">
        The examples in this page already include your KEYS and the model of your data. 
        This means you can copy the example code, and only modify whatever you need.
      </div>

      {/* <--- Standard GET Request */}
        <div className="docs-subtitle">'GET' Request - Standard</div>
        <div className="body-text">
          The basic action you can do with your api is to make a GET Request without
          any kind of parameters. This will return all of your data as an array of objects. Each object being a record of you data.
        </div>
        <div className="input-output">
          <div className="text-io">
            <div className="text-io-title">Input (Body):</div>
            <div className="text-io-value">Nothing</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Output:</div>
            <div className="text-io-value">Status: 200 | Body: JSON Array of objects with all the data in your API.</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Error Output:</div>
            <div className="text-io-value">Status: 500 | Reason: Internal server error | Body: {'{'} error: 'server error message' {'}'}</div>
          </div>
        </div>
        <div className="code-block">
          <SyntaxHighlighter language="javascript" style={okaidia} showLineNumbers={false}>
           {codeStandardGetJS}
          </SyntaxHighlighter>
        </div>

      {/* <--- Standard POST Request */}
        <div className="docs-subtitle">'POST' Request</div>
        <div className="body-text">
          Saves data sent in the body to the API. Takes an object or an array of objects
          if you want to input multiple data in one request. Returns the created data.
          <br />Careful with your data types, if the inpit data types don't match your model it can cause errors.
          <br />Always check that the output of the API call matches your expected output.
        </div>
        <div className="input-output">
          <div className="text-io">
            <div className="text-io-title">Input (Body):</div>
            <div className="text-io-value">Object with key (field name) value pairs to be input. Also accepts an array of objects.</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Output:</div>
            <div className="text-io-value">Status: 200 | Body: JSON Array the created objects.</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Error Output:</div>
            <div className="text-io-value">Status: 500 | Reason: Internal server error | Body: {'{'} error: 'server error message' {'}'}</div>
          </div>
        </div>
        <div className="code-block">
          <SyntaxHighlighter language="javascript" style={okaidia} showLineNumbers={false}>
           {codePostJS}
          </SyntaxHighlighter>
        </div>

      {/* <--- Standard PUT Request */}
        <div className="docs-subtitle">'PUT' Request</div>
        <div className="body-text">
          Requires that you specify the ID of the record you want to update at the end of the endpoint url.
          Modifies the data of such record with the one sent in the body. The body takes an object with the key value pairs
          of the fields you want to modify. In the object only specify the key value pairs of the property you want to change.
          <br/>Returns the updated object.
          <br/>Careful with your data types, if the inpit data types don't match your model it can cause errors.
          <br/>Always check that the output of the API call matches your expected output.
        </div>
        <div className="input-output">
          <div className="text-io">
            <div className="text-io-title">Input (endpoint path):</div>
            <div className="text-io-value">Input desired record ID in the path after the api name e.g. .../{currentApi.api_name}/219873189</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Input (Body):</div>
            <div className="text-io-value">Object with key (field name) value pairs to be modified.</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Output:</div>
            <div className="text-io-value">Status: 200 | Body: JSON Object containing the resulting modified record.</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Error Output:</div>
            <div className="text-io-value">Status: 404 | Reason: Incorrect record ID | Body: {'{'} error: 'server error message' {'}'}</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Error Output:</div>
            <div className="text-io-value">Status: 500 | Reason: Internal server error | Body: {'{'} error: 'server error message' {'}'}</div>
          </div>
        </div>
        <div className="code-block">
          <SyntaxHighlighter language="javascript" style={okaidia} showLineNumbers={false}>
           {codePutJS}
          </SyntaxHighlighter>
        </div>

      {/* <--- Standard PUT Request */}
        <div className="docs-subtitle">'DELETE' Request</div>
        <div className="body-text">
          Requires that you specify the ID of the record you want to delete at the end of the endpoint url.
          <br/>Returns the deleted object.
          <br/>Careful, once the data / object is deleted there is no "undo".
        </div>
        <div className="input-output">
          <div className="text-io">
            <div className="text-io-title">Input (endpoint path):</div>
            <div className="text-io-value">Input desired record ID in the path after the api name e.g. .../{currentApi.api_name}/219873189</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Input (Body):</div>
            <div className="text-io-value">Nothing</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Output:</div>
            <div className="text-io-value">Status: 200 | Body: JSON Object containing the deleted record.</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Error Output:</div>
            <div className="text-io-value">Status: 404 | Reason: Incorrect record ID | Body: {'{'} error: 'server error message' {'}'}</div>
          </div>
          <div className="text-io">
            <div className="text-io-title">Error Output:</div>
            <div className="text-io-value">Status: 500 | Reason: Internal server error | Body: {'{'} error: 'server error message' {'}'}</div>
          </div>
        </div>
        <div className="code-block">
          <SyntaxHighlighter language="javascript" style={okaidia} showLineNumbers={false}>
           {codeDeleteJS}
          </SyntaxHighlighter>
        </div>
     
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userApis: state.userApis.userApis
});

export default connect(mapStateToProps, null)(ApiDocs);