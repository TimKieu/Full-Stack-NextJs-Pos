export interface tokenType {
  id: string;
  username: string;
  role: string;
  exp: number;
}

export interface dataVerifyCompany {
  id?: number;
  name: string;
  address: string;
  tax: string;
  phone: string;
  email: string;
  logo: string;
  status: "Active" | "InActive";
}

export interface dataVerifyBranch {
  id?: number;
  name: string;
  codeReceipt: string;
  address: string;
  expiration: Date;
  phone: string;
  companyId: number;
  status: "Active" | "InActive";
}

export interface dataVerifyPosition {
  id?: number;
  name: string;
  salary: number;
  companyId: number;
  status: "Active" | "InActive";
}

export interface dataVerifyEmployee {
  id?: number;
  name: string;
  subname: string;
  age: number;
  cardId: string;
  userName: string;
  passWord: string;
  companyId: number;
  branchId: number;
  positionId: number;
  role: "admin" | "userAdmin" | "user";
  status: "Active" | "InActive";
}

export interface dataVerifyUnit {
  id?: number;
  name: string;
  companyId: number;
  status: "Active" | "InActive";
}

export interface dataVerifyProductType {
  id?: number;
  name: string;
  companyId: number;
  status: "Active" | "InActive";
}

export interface dataVerifyProduct {
  id?: number;
  name: string;
  cost: number;
  price: number;
  stock: number;
  img?: File | undefined;
  imageUrl?: string;
  unitId: number;
  productTypeId: number;
  companyId: number;
  statusSail: "Active" | "InActive";
  status: "Active" | "InActive";
}

export interface dataVerifyPromotion {
  id?: number;
  name: string;
  detail: string;
  promotionalPrice: number;
  startDate: Date;
  endDate: Date;
  img?: File | undefined;
  imageUrl?: string;
  companyId: number;
  status: "Active" | "InActive";
}

export interface dataVerifyItemPromotion {
  id?: number;
  productId: number;
  stock: number;
  promotionId: number;
  status: "Active" | "InActive";
}

export interface dataVerifyIUpdatetemPromotion {
  deleteItemPromotionData: dataVerifyItemPromotion[];
  itemPromotionData: dataVerifyItemPromotion[];
}

export interface dataVerifyTable {
  id?: string;
  name: string;
  stoves: number;
  people: number;
  expiration: number;
  branchId: number;
  companyId: number;
  status: "Active" | "InActive";
}

export interface dataVerifyExpenses {
  id?: number;
  name: string;
  companyId: number;
  status: "Active" | "InActive";
}

export interface dataVerifyItemExpenses {
  id?: number;
  price: number;
  orderDate: Date;
  expensesId: number;
  branchId: number;
  status: "Active" | "InActive";
}

export interface promiseDataVerify {
  message: string;
}

export interface uploadImagesType {
  fileName: string;
  originFileObj: any;
}

export interface dataVerifyUpdateImgPd {
  companyId: number;
  fileName: string;
}

export interface dataUpdateImg {
  fileName: string;
  companyId: number;
  pdId: number;
}

export interface dataUpdateImgPromotion {
  fileName: string;
  companyId: number;
  promotionId: number;
}