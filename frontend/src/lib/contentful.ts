import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';


const client = new ApolloClient({
  link: new HttpLink({
    uri: `http://localhost:4000/graphql`,
  }),
  cache: new InMemoryCache(),
});

// GraphQL queries
export const GET_TASKS = gql`
  query GetAllTasks {
  tasks {
       id
       title
       completed
     }
   }
 `;


// Fetch all blog posts
export async function fetchEntries(): Promise<Task[]> {
  const { data } = await client.query<{ pageBlogPostCollection: { items: Task[] } }>({ query: GET_TASKS });
  return data.pageBlogPostCollection.items;
}
