import _ from 'lodash';

export const handleApiSubmit = (e, fieldRows, apiName, submitApi ) => {
  e.preventDefault();

  const fieldsObjectArray=[];
  _.each(fieldRows.rows, row => {
    fieldsObjectArray
    .push({
      field_name: row.value,
      field_type: row.valueType,
      allow_null: false,
      default_value: '',
    })
  });
  
  const sendApiObject = {
    api: {
      public: 'false',
      name: apiName,
      description: 'description',
      fields: fieldsObjectArray
    },
    user: {
      id: 1111,
      name: 'Jose Fran'
    },
  }
  submitApi(sendApiObject)
}

