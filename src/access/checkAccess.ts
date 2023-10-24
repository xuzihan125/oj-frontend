import AccessEnum from "@/access/accessEnum";

/**
 * check if the user have certain authorization
 * @param user current user
 * @param accessRequired authorization required
 * @return boolean have authorization or not
 */
const checkAccess = (user: any, accessRequired = AccessEnum.NOT_LOGIN) => {
  const loginUserAccess = user?.userRole ?? AccessEnum.NOT_LOGIN;
  if (accessRequired === AccessEnum.NOT_LOGIN) {
    return true;
  } else if (accessRequired === AccessEnum.USER) {
    if (loginUserAccess === AccessEnum.NOT_LOGIN) {
      return false;
    } else {
      return true;
    }
  } else if (accessRequired === AccessEnum.ADMIN) {
    if (loginUserAccess !== AccessEnum.ADMIN) {
      return false;
    } else {
      return true;
    }
  }
};

export default checkAccess;
