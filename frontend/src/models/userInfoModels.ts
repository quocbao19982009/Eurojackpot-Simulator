interface userInfoModel {
  name: string;
  email: string;
  bankAccount: number;
  isAdmin: boolean;
  token?: string;
  avatar?: string;
}

export default userInfoModel;
