import { PublicationId, usePublication } from '@lens-protocol/react-web';
import { motion } from 'framer-motion';

type PostProps = {
  publication: PublicationId;
};

export function Post({ publication }: PostProps) {
  const { data } = usePublication({ forId: publication });

  if (!data) return null;

  return (
    <motion.div
      className="border border-blue-400 p-6 rounded-lg bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg hover:shadow-blue-400/30 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <p className="font-bold text-blue-400 mb-2">
        By: {data.by.handle?.fullHandle}
      </p>
      {/*@ts-ignore*/}
      <p className="text-gray-300">{data.metadata.content}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button className="text-blue-400 hover:text-blue-300 transition-colors">
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
        </button>
        <button className="text-blue-400 hover:text-blue-300 transition-colors">
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
        </button>
      </div>
    </motion.div>
  );
}
