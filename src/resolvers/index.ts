import { Query } from "./Query/Query";
import { Mutation } from "./Mutation/Mutation";

interface ISignUp{
    name: string,
    email: string,
    password: string,
    bio?: string
}


export const resolvers = {
    Query,
    Mutation
  };
