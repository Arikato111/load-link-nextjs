interface UserValid {
  id: string;
  name: string;
  username: string;
  photo: string;
  token: string;
}

declare namespace Express {
  export interface Request {
    user?: UserValid;
  }
}
