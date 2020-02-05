import _ from "lodash";

export const objectTransform = (state) => {
  const stateCopy = {};
  Object.assign(stateCopy, state);

  const fieldsObjectToArray=[];

  _.each(state.rows, row => {
    fieldsObjectToArray
    .push({
      field_name: row.value,
      field_type: row.valueType,
      allow_null: row.allowNull
    })
  });

  let publicVar;
  if (state.public === 'Public') publicVar = true;
  else publicVar = false;

  const ApiObjectToSend = {
    public: publicVar,
    api_name: stateCopy.api_name,
    description: stateCopy.description,
    api_key: stateCopy.api_key,
    api_secret_key: stateCopy.api_secret_key,
    api_fields: fieldsObjectToArray
  }

  return ApiObjectToSend;
}