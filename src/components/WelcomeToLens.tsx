import {
  SessionType,
  useSession as useLensSession,
} from '@lens-protocol/react-web';
import { useAccount as useWagmiAccount } from 'wagmi';
import { motion } from 'framer-motion';

import { ConnectWalletButton } from './ConnectWalletButton';
import { LoginForm } from './LoginForm';
import { LogoutButton } from './LogoutButton';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { DisconnectWalletButton } from './DisconnectWalletButton';

export function WelcomeToLens() {
  const { isConnected, address } = useWagmiAccount();
  const { data: session } = useLensSession();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const commonClasses =
    'bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg border border-blue-500 text-white';

  if (!isConnected) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={commonClasses}
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-400">
          Welcome to Lens
        </h2>
        <p className="mb-4 text-gray-300">
          Connect your wallet to enter the Lens metaverse.
        </p>
        <ConnectWalletButton />
      </motion.div>
    );
  }

  if (!session?.authenticated && address) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={commonClasses}
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Almost There!</h2>
        <p className="mb-4 text-gray-300">
          Connected wallet:{' '}
          <span className="text-blue-300">{truncateEthAddress(address)}</span>
        </p>
        <LoginForm owner={address} />
        <div className="mt-4">
          <DisconnectWalletButton />
        </div>
      </motion.div>
    );
  }

  return null;
}
