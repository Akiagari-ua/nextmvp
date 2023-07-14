"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
var lodash_1 = require("lodash");
var graphql_1 = require("graphql");
var prettier_1 = require("prettier");
var plugin = function (schema, documents, config) {
    var output = '';
    var importStatements = [];
    documents.forEach(function (doc) {
        var _a;
        (_a = doc.document) === null || _a === void 0 ? void 0 : _a.definitions.forEach(function (def) {
            var _a;
            if (def.kind === 'OperationDefinition') {
                var operationName = (0, lodash_1.camelCase)(((_a = def.name) === null || _a === void 0 ? void 0 : _a.value) || '');
                var operationNamePascalCase = (0, lodash_1.upperFirst)(operationName);
                //@ts-ignore
                var query = (0, graphql_1.print)(doc.document);
                if (!importStatements.includes(operationNamePascalCase)) {
                    importStatements.push("".concat(operationNamePascalCase, "Query, ").concat(operationNamePascalCase, "QueryVariables"));
                }
                output += "\n                    export async function ".concat(operationName, "({variables, client}: { variables: ").concat(operationNamePascalCase, "QueryVariables, client: ApolloClient<NormalizedCacheObject> }): Promise<").concat(operationNamePascalCase, "Query> {\n                        const { data } = await client.query({\n                            query: gql`").concat(query, "`,\n                            variables,\n                        });\n                        return data;\n                    }\n                ");
            }
        });
    });
    var unformattedCode = "\n        import { ".concat(importStatements.join(','), " } from './types';\n        import { ApolloClient, NormalizedCacheObject } from '@apollo/client';\n        import gql from 'graphql-tag';\n\n        ").concat(output, "\n    ");
    var formattedCode = (0, prettier_1.format)(unformattedCode, { parser: "typescript" });
    return formattedCode;
};
exports.plugin = plugin;
