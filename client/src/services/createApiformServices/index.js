import _ from 'lodash';
import jwt from 'jsonwebtoken'

export const handleApiSubmit = (e, fieldRows, apiName, submitApi, isPublic ) => {
  e.preventDefault();


  const { id } = jwt.decode(localStorage.token);

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
      public: isPublic ? 'true' : 'false',
      name: apiName,
      description: 'description',
      fields: fieldsObjectArray,
      user: id //userId
    },
  }
  console.log('OBJECT SENT', sendApiObject)
  submitApi(sendApiObject)
}

