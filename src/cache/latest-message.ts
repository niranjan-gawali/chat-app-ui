/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloCache } from '@apollo/client';
import { Message } from '../gql/graphql';
import { getChatDocuments } from '../hooks';

export const updateLatestMessage = (
  cache: ApolloCache<any>,
  message: Message
) => {
  const chats = [
    ...(cache.readQuery({ query: getChatDocuments })?.chats ?? []),
  ];

  const cachedChatIndex = chats.findIndex(
    (chat) => chat._id === message.chatId
  );

  if (cachedChatIndex === -1) {
    return;
  }

  const cachedChat = chats[cachedChatIndex];
  const cachedChatCopy = { ...cachedChat };
  cachedChatCopy.latestMessages = message;
  chats[cachedChatIndex] = cachedChatCopy;

  cache.writeQuery({
    query: getChatDocuments,
    data: {
      chats,
    },
  });
};
