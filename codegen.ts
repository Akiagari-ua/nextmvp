import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://graphql.anilist.co',
    documents: ['src/**/*.tsx'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        ['./src/gqlGen/types.ts']: {
            plugins: ['typescript']
        }
    }
}

export default config