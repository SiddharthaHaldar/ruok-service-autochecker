import { createSchema } from 'graphql-yoga'
import { GraphQLJSON } from 'graphql-type-json';
import { aql } from "arangojs";

// #TODO use schema first definition - ie. "export const schema = new GraphQLSchema({"with fields and definitions & resolvers for this once working 
// upsertService(data: JSON): JSON

export const schema = createSchema({
    typeDefs: /* GraphQL */ `
        scalar JSON

        type Query {
           repoCheck(_key: String!): RepoCheck 
        }

        type Mutation {
            repoCheck(_key: String!): RepoCheck
        }

        type ComplianceCheck {
            checkPasses: Boolean
            metadata: JSON
        }

        type RepoCheck {
            vulnerabilityAlertsEnabled: ComplianceCheck
        }
    `,
    // upsertProjectWithGitHubRepoScan(project_name: String!, project_scan)
    resolvers: {
        JSON: GraphQLJSON,

        Query: {
            repoCheck: async (_, args, context) => {
                // TODO: pass collection name as config
                const cursor = await context.db.query(aql`
                    FOR doc in dataServices
                    FILTER doc._key == ${args._key}
                    RETURN doc
                `);
                const project = await cursor.next();
                return project;
            },
        },
        Mutation: {}
    }
})
