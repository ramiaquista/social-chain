// @ts-nocheck
'use client';

import { ProfileComponent } from '@/components/ProfileComponent';
import { useSession } from '@lens-protocol/react-web';
import { motion } from 'framer-motion';
import { WelcomeToLens } from '@/components/WelcomeToLens';

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <motion.div
      className="p-4 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Your Profile
      </h1>
      {session?.authenticated ? (
        <ProfileComponent profileId={session.profile?.id} />
      ) : (
        <WelcomeToLens />
      )}
    </motion.div>
  );
}
