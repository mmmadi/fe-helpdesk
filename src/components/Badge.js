export const Badge = ({ count }) => {
  return (
    <div className="badge bg-success badge-count">
      {count ? count.count : null}
    </div>
  );
};
