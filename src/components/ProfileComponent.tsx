// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import {
  useProfile,
  usePublications,
  ProfileId,
} from '@lens-protocol/react-web';
import { motion } from 'framer-motion';
import { Post } from './Post';
import { LoadingSpinner } from './LoadingSpinner';

interface ProfileComponentProps {
  profileId: ProfileId;
}

export function ProfileComponent({ profileId }: ProfileComponentProps) {
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useProfile({ forProfileId: profileId });
  const {
    data: publications,
    loading: pubsLoading,
    error: pubsError,
  } = usePublications({
    where: { from: [profileId] },
  });

  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    if (profile?.stats) {
      setPostCount(profile.stats.posts);
    }
  }, [profile]);

  if (profileLoading || pubsLoading) return <LoadingSpinner />;
  if (profileError)
    return <div>Error loading profile: {profileError.message}</div>;
  if (pubsError)
    return <div>Error loading publications: {pubsError.message}</div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto rounded-lg shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 animate-wave"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-white mb-2 transition-transform duration-300 transform hover:scale-105">
              {profile?.handle?.fullHandle}
            </h2>
            <p className="text-gray-200 mb-2">{profile?.bio}</p>
            <p className="text-gray-200 font-semibold">
              Profile ID: <span className="text-yellow-300">{profileId}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-around mb-6">
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="block text-4xl font-bold text-white">
              {profile?.stats?.followers || 0}
            </span>
            <span className="text-gray-200">Followers</span>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="block text-4xl font-bold text-white">
              {profile?.stats?.following || 0}
            </span>
            <span className="text-gray-200">Following</span>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="block text-4xl font-bold text-white">
              {postCount}
            </span>
            <span className="text-gray-200">Posts</span>
          </motion.div>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-b-lg">
        <h3 className="text-2xl font-semibold mb-4 text-white">Recent Posts</h3>
        <div className="space-y-4">
          {publications?.map((publication) => (
            <motion.div
              key={publication.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <Post publication={publication.id} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
