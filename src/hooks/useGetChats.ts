import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

const getChatDocuments = graphql(`
  query Chats {
    chats {
      ...ChatFragment
    }
  }
`);

export const useGetChats = () => {
  return useQuery(getChatDocuments);
};
