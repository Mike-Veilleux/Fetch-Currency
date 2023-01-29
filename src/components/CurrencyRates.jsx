import { useEffect } from "react";

const CurrencyRates = (props) => {
  const renderResult = props.page.map((item, index) => {
    return (
      <div
        key={index}
        className="row justify-content-md-center border rounded-1 mb-2 p-1 shadow-sm mx-0"
      >
        <div className="col col-lg-2">{item.code}</div>
        <div className="col col-lg-4">{item.fullName}</div>
        <div className="col col-lg-2 ">{item.value}$</div>
      </div>
    );
  });
  return (
    <div>
      {props.page.length > 0 && (
        <div className="row justify-content-md-center border rounded-2 my-3 p-1 shadow-sm mx-0 ">
          <h5 className="col col-lg-2 ">Code</h5>
          <h5 className="col col-lg-4">Full Name</h5>
          <h5 className="col col-lg-2 ">Value</h5>
        </div>
      )}
      <div>{renderResult}</div>
    </div>
  );
};

export default CurrencyRates;
