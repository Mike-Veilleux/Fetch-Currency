import { useEffect } from "react";

const LetterSelectorButtons = (props) => {
  const buttons = [];
  if (Object.keys(props.pagesDictionary).length !== 0) {
    for (const key in props.pagesDictionary) {
      buttons.push(
        <button
          className="col btn btn-block btn-outline-dark btn-sm  "
          key={key}
          type="button"
          onClick={() => {
            props.onclickLetterBtn(key);
          }}
        >
          {key.toUpperCase()}
        </button>
      );
    }
  }
  return <div className="row gx-0 py-1">{buttons}</div>;
};

export default LetterSelectorButtons;
