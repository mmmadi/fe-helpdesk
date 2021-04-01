export const Alert = ({ message, type, section, close }) => {
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      {message}
      {section ? (
        <button type="button" className="btn-close" onClick={close}></button>
      ) : null}
    </div>
  );
};
