import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        cars: [Car!]!
    }

    type Mutation {
        gropuDelete(groupId: ID!)
        groupPublish(groupId: ID!)
        groupUnpublish(groupId: ID!)
        groupAddCars(groupId: ID!,carId: ID!)
        groupRemoveCars(groupId: ID!,carId: ID!)
        groupCreate(
            groupInput: GroupInput!
        )
        groupUpdate(
            groupId: ID!
            groupInput: GroupInput!
        ): GroupUpdatePayload!
    }

    type GroupUpdatePayload {
        userErrors: [UserErrors!]!
        group: Group
    }

    type UserErrors {
        message:String!
        field: [String!]!
    }

    input GroupInput{
        name: String
        image: ImageInput
        description: String
        featureSet: GroupFeatureFields
    }

    input ImageInput {
        url: String!
    }

    type Car {
        id: ID!
        color: String!
        make: String!
    }

    type Group {
        id: ID!
        featureSet: GroupFeaturesSet
        hasCar(id: ID!): Boolean!
        cars(skip: Int!, take: Int!): [Car!]!
        name: String!
        image: Image!
        description: String!
    }

    type Image {
        id: ID!
        url: String!
    }

    type GroupFeaturesSet {
        features: [GroupFeatures!]!
        applyFeaturesSeparately: Boolean!
    }

    type GroupFeatures {
        feature: GroupFeatureFields!
    }

    enum GroupFeatureFields {
        INCLINE_ENGINE
        FOUR_CYLINDER_ENGINE
        TWIN_CYLENDER_ENGINE
        RED_PAINT
        BLACK_PAINT
    }
`;

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            cars: () => [{ id: 1, color: 'blue', make: 'Toyota' }],
        },
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
