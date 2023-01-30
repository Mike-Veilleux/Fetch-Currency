const LetterSelectorButtons = (props) => {
  const buttons = [];
  if (Object.keys(props.currencies) !== null) {
    for (const key in props.currencies) {
      buttons.push(
        <button
          className="col btn btn-block btn-outline-dark btn-sm  "
          key={key}
          type="button"
          onClick={() => {
            props.onClickLetterBtn(key);
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
