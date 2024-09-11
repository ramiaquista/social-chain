import { useState } from 'react';
import { useCreatePost } from '@lens-protocol/react-web';

export function CreatePost() {
  const [content, setContent] = useState('');
  const { execute: createPost, error, loading } = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({
      metadata: content,
    });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="What's on your mind?"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Post
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
}
