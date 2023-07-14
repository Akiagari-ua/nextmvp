import { PluginFunction } from '@graphql-codegen/plugin-helpers';
import { upperFirst, camelCase } from 'lodash'
import { print } from 'graphql';
import { format } from 'prettier';

export const plugin: PluginFunction = (schema, documents, config) => {
    let output = '';
    let importStatements: string[] = [];

    documents.forEach(doc => {
        doc.document?.definitions.forEach(def => {
            if (def.kind === 'OperationDefinition') {
                const operationName = camelCase(def.name?.value || '');
                const operationNamePascalCase = upperFirst(operationName);
                //@ts-ignore
                const query = print(doc.document);

                if (!importStatements.includes(operationNamePascalCase)) {
                    importStatements.push(`${operationNamePascalCase}Query, ${operationNamePascalCase}QueryVariables`)
                }

                output += `
                    export async function ${operationName}({variables, client}: { variables: ${operationNamePascalCase}QueryVariables, client: ApolloClient<NormalizedCacheObject> }): Promise<${operationNamePascalCase}Query> {
                        const { data } = await client.query({
                            query: gql\`${query}\`,
                            variables,
                        });
                        return data;
                    }
                `;
            }
        });
    });

    let unformattedCode = `
        import { ${importStatements.join(',')} } from './types';
        import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
        import gql from 'graphql-tag';

        ${output}
    `;

    let formattedCode = format(unformattedCode, { parser: "typescript" });

    return formattedCode;
};
