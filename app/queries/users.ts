
import { User } from "../model/user-model";

interface UserInput {
  name: string;
  email: string;
  password: string;
  bio: string;
}

export async function CreateUser(user: UserInput) {
  await User.create(user);
}