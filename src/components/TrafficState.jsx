import React from "react";

const TrafficState = (props) => {
  // const displayTrafic = () => {
  //   if (props.trafficState.isLoading === true) {
  //     return <div>Loading...</div>;
  //   }
  // };

  return (
    <div>
      <div>
        {props.trafficState.isLoading === true && <div>Loading...</div>}
        {props.trafficState.error !== null && (
          <div>{props.trafficState.error}</div>
        )}
      </div>
    </div>
  );
};

export default TrafficState;
