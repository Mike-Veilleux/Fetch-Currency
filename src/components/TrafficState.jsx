import React from "react";

const TrafficState = (props) => {
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
