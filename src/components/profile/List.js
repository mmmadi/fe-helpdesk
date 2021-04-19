export const List = () => {
  return (
    <div className="list-group list-group-flush account-settings-links">
      <button
        className="list-group-item list-group-item-action"
        id="account-general-tab"
        data-bs-toggle="tab"
        data-bs-target="#account-general"
        type="button"
        role="tab"
        aria-controls="account-general"
        aria-selected="true"
      >
        Общие настройки
      </button>
      <button
        className="list-group-item list-group-item-action"
        id="account-change-password-tab"
        data-bs-toggle="tab"
        data-bs-target="#account-change-password"
        type="button"
        role="tab"
        aria-controls="account-change-password"
      >
        Безопасность
      </button>
      <button
        className="list-group-item list-group-item-action"
        id="account-info-tab"
        data-bs-toggle="tab"
        data-bs-target="#account-info"
        type="button"
        role="tab"
        aria-controls="account-info"
      >
        Интерфейс
      </button>
      <button
        className="list-group-item list-group-item-action"
        id="account-notifications-tab"
        data-bs-toggle="tab"
        data-bs-target="#account-notifications"
        type="button"
        role="tab"
        aria-controls="account-notifications"
      >
        Уведомления
      </button>
    </div>
  );
};
