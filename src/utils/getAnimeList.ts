import { cache } from 'react';

import getClient from '@/libs/apollo/getClient';

import { getAnimeList } from '@/gqlGen/queries';

const getList = cache(() => {
    const client = getClient()
    return getAnimeList({ client, variables: { page: 1, perPage: 50 } }).then(d => d.Page)
})

export default getList