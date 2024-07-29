import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const createNewDungeon = () => {
    const slug = Math.random().toString(36).substring(2, 10); // Generate a random slug
    navigate(`/dungeon/${slug}`);
  };

  return (
    <div className='h-[80vh]'>
      <button
        onClick={createNewDungeon}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
      >
        Delve into a new dungeon
      </button>
      <div>Select a dungeon or create a new one!</div>
    </div>
  );
};
