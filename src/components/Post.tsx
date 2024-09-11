import { PublicationId, usePublication } from '@lens-protocol/react-web';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faRetweet,
  faComment,
} from '@fortawesome/free-solid-svg-icons';

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
      className="border border-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 mb-4"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <Link href={`/profile/${data.by.id}`} prefetch={true}>
              <p className="font-semibold text-gray-800 dark:text-white cursor-pointer">
                {data.by.handle?.fullHandle}
              </p>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate}
            </p>
          </div>
          <p className="text-gray-800 dark:text-gray-200 mb-2">
            {/* @ts-ignore */}
            {data.metadata.content}
          </p>
          {/* Engagement Buttons */}
          <div className="flex justify-between text-gray-500 dark:text-gray-400">
            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
              <FontAwesomeIcon icon={faHeart} />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
              <FontAwesomeIcon icon={faComment} />
              <span>Comment</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
