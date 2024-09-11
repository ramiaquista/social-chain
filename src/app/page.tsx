'use client';

import { Feed } from '@/components/Feed';
import { WelcomeToLens } from '@/components/WelcomeToLens';
import { useSession } from '@lens-protocol/react-web';
import { motion } from 'framer-motion';

export default function Home() {
  const { data: session } = useSession();

  return (
    <motion.div
      className="p-4 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Lens Metaverse Hub
      </h1>
      <WelcomeToLens />
      <div className="max-w-4xl mx-auto space-y-8">
        {session?.authenticated && <Feed />}
      </div>
    </motion.div>
  );
}
