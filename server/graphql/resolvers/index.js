
import task from "./task.js";

export const resolver = {
  Query: {
    ...task.Query,
  },
  Mutation: {
    ...task.Mutation
  }
};
