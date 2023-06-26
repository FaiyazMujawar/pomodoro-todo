import { DateTimeResolver } from 'graphql-scalars';
import mutations from './mutation';
import queries from './queries';

export default {
  DateTime: DateTimeResolver,
  Query: {
    sayHi: () => 'Hello',
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
};
