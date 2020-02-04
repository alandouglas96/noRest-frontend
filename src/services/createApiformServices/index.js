import _ from 'lodash';
import jwt from 'jsonwebtoken'
import { submitApi } from '../../services'
export const handleApiSubmit = (e, fieldRows, apiName, isPublic, history, description) => {
  e.preventDefault();

  const { id } = jwt.decode(localStorage.token);

  const fieldsObjectArray=[];
  _.each(fieldRows.rows, row => {
    fieldsObjectArray
    .push({
      field_name: row.value,
      field_type: row.valueType,
      allow_null: row.allowNull,
      default_value: '',
    })
  });

  const sendApiObject = {
    api: {
      public: isPublic ? 'true' : 'false',
      name: apiName.value, // apiName is an object
      description: description.value,
      fields: fieldsObjectArray, //userId
    },
    user: { id }
  }

  return submitApi(sendApiObject, history)
}

