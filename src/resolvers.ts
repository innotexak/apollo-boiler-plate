import { AccountMutation, AccountQuery } from "./services/account/resolver.js"

const Mutation = {
    ...AccountMutation

}
const Query = {
    ...AccountQuery

}

export { Mutation, Query }
