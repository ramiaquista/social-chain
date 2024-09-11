import { PublicationId, usePublication } from '@lens-protocol/react-web';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

type PostProps = {
  publication: PublicationId;
};

export function Post({ publication }: PostProps) {
  const { data } = usePublication({ forId: publication });
  const [isLiked, setIsLiked] = useState(false);

  if (!data) return null;

  const formattedDate = formatDistanceToNow(new Date(data.createdAt), {
    addSuffix: true,
  });

  return (
    <motion.div
      className="border border-primary bg-background rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center mb-3">
        <div>
          <p className="font-semibold text-foreground">
            {data.by.handle?.fullHandle}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formattedDate}
          </p>
        </div>
      </div>
      {/*@ts-ignore*/}
      <p className="text-foreground mb-4">{data.metadata.content}</p>
      <div className="flex justify-between items-center">
        <button
          className={`flex items-center space-x-1 text-sm ${
            isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
          } hover:text-red-500 transition-colors`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>
        <button className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
          <span>Comment</span>
        </button>
      </div>
    </motion.div>
  );
}
