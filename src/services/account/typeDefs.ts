import gql from "graphql-tag";


const AccountTypeDefs = gql`

type Mutation {
    RegisterUser(data:RegistrationInput! ):MessageResponse!
}



type Query {
    GetUserProfile:[ResponseJsonplaceholer!]!

}


type MessageResponse{
    message:String!
    error:Boolean!
}


input RegistrationInput{
    email:String!
    firstName:String!
    lastName:String!
    phone:String!

}

type ResponseJsonplaceholer{
    userId:Int!
    id:Int!
    body:String!
    title:String!
}

`

export default AccountTypeDefs

