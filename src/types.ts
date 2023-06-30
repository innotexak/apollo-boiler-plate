import gql from 'graphql-tag'
import { typeDefs as scalarTypeDefs } from 'graphql-scalars'
import AccountSchema from './services/account/typeDefs.js'




const rootTypeDefs = gql`
  enum gender {
    male
    female
  }

  type Mutation {
    _: Boolean
  }

  type Query {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`
export default [
  rootTypeDefs,
  AccountSchema,
  ...scalarTypeDefs,
]
