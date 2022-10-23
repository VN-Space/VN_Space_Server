import gql from "graphql-tag";

export const UserTypeDefs = gql`
    enum GENDER_OPTION {
        man
        woman
        unisex
        both
    }
    
    enum PROVIDER_OPTION {
        facebook
        google
        email
        other
    }
    
    type User {
        id: String
        fullName: String
        email: String!
        phoneNumber: String
        avatar: String
        background: String
        gender: GENDER_OPTION!
        dayOfBirth: String
        address: String
        provider: PROVIDER_OPTION
        providerId: String
    }

    type Query {
        getListUser(limit: Int, skip: Int): [User!]!
    }
`