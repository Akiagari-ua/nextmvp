import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://graphql.anilist.co',
    documents: "src/**/*.gql",
    ignoreNoDocuments: true,
    generates: {
        ['./src/gqlGen/types.ts']: {
            plugins: ['typescript', "typescript-operations"]
        },
        ['./src/gqlGen/queries.ts']: {
            plugins: ["./generator.js"]
        }
    }
}

export default config