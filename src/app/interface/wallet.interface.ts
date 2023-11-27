export interface Wallet {
  uid:           string;
  type:          WalletType;
  description:   string;
  amount:        number;
}


export enum WalletType {
  INCOME = "INCOME",
  EGRESS = "EGRESS",
}
