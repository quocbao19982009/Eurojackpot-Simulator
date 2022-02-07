interface userInfoModel {
  name: string;
  email: string;
  bankAccount: number;
  isAdmin: boolean;
  token?: string;
}

export default userInfoModel;
