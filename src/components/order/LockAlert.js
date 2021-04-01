export const LockAlert = ({ data, text, type }) => {
  return (
    <div className="card mb-1">
      <div className="card-body">
        <div className={`alert ${type} fade show`}>
          {text}: {data.userfio}
        </div>
      </div>
    </div>
  );
};
