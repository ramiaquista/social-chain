'use client';

import { ProfileComponent } from '../../../components/ProfileComponent';
import { useSession } from '@lens-protocol/react-web';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { ProfileId } from '@lens-protocol/react-web';

export default function ProfileByIdPage() {
  const { data: session } = useSession();
  const { id } = useParams();

  return (
    <motion.div
      className="p-4 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        User Profile
      </h1>
      {session?.authenticated ? (
        <ProfileComponent profileId={id as ProfileId} />
      ) : (
        <div className="text-center">Please log in to view profiles.</div>
      )}
    </motion.div>
  );
}
