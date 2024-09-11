import {
  useExplorePublications,
  ExplorePublicationType,
  ExplorePublicationsOrderByType,
} from '@lens-protocol/react-web';
import { Post } from './Post';
import { motion } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner';

export function Feed() {
  const {
    data: publications,
    loading,
    error,
  } = useExplorePublications({
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    },
    orderBy: ExplorePublicationsOrderByType.Latest,
  });

  if (loading) return <LoadingSpinner />;
  if (error)
    return <p className="text-red-400">Error loading feed: {error.message}</p>;

  return (
    <motion.div
      className="grid gap-6 grid-cols-1 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {publications?.map((publication, index) => (
        <motion.div
          key={publication.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Post publication={publication.id} />
        </motion.div>
      ))}
    </motion.div>
  );
}
