import {
  profileId,
  useLogin,
  useProfilesManaged,
} from '@lens-protocol/react-web';

import { ErrorMessage } from './ErrorMessage';
import { Loading } from './Loading';
import { motion } from 'framer-motion';

export function LoginForm({
  owner,
  onSuccess,
}: {
  owner: string;
  onSuccess?: () => void;
}) {
  const { execute: login, loading: isLoginPending } = useLogin();
  const {
    data: profiles,
    error,
    loading,
  } = useProfilesManaged({ for: owner, includeOwned: true });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const id = profileId(formData.get('id') as string);

    const result = await login({
      address: owner,
      profileId: id,
    });

    if (result.isSuccess()) {
      console.info(
        `Welcome ${String(
          result.value?.handle?.fullHandle ?? result.value?.id
        )}`
      );
      return onSuccess?.();
    }

    console.error(result.error.message);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (profiles.length === 0) {
    return (
      <p className="text-gray-300">No Lens Profiles found in this wallet.</p>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-blue-300 mb-2">
          Select a Lens Profile to login with
        </legend>
        <div className="space-y-3">
          {profiles.map((profile, idx) => (
            <label
              key={profile.id}
              className="flex items-center p-3 rounded-lg cursor-pointer bg-gray-800 border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <input
                disabled={isLoginPending}
                type="radio"
                defaultChecked={idx === 0}
                name="id"
                value={profile.id}
                className="form-radio h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-200 text-sm font-medium">
                {profile.handle?.fullHandle ?? profile.id}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoginPending}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoginPending ? 'Signing message...' : 'Login to Lens'}
      </motion.button>
    </motion.form>
  );
}
