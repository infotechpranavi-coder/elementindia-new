export type CustomerProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};
