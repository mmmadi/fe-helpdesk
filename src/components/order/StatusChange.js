export const StatusChange = (cancelData, doneData, userData, status) => {
  if (doneData) {
    if (doneData.isDone) {
      return doneData.status;
    } else if (!doneData.isDone) {
      if (userData) {
        if (!doneData.isDone && !userData.isLock) {
          return userData.status;
        }
      } else {
        return doneData.status;
      }
    }
  }

  if (userData) {
    return userData.status;
  }

  if (cancelData) {
    return cancelData.status;
  }

  if (!userData && !doneData && !cancelData) {
    return status;
  }
};
