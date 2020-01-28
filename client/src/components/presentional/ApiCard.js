import React from "react";

const ApiCard = ({apiInfo}) => {


  return (
    <>
      <h1>API CARD</h1>
      <div style={{}}>
        <div>
        {apiInfo.public}
        </div>
        <div>
        {apiInfo.api_name}
        </div>
        <div>
        {apiInfo.description}
        </div>
        <div>
        {apiInfo.date_created}
        </div>
        <div>
        {apiInfo.date_last_updated}
        </div>
      </div>
    </>
  );
};

export default ApiCard;






