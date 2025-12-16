export default function Profiles({ school }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Hotspot Profiles</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Profile Name
          </label>
          <input
            type="text"
            placeholder="e.g., Basic"
            className="mt-1 block w-full border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Speed Limit</label>
          <input
            type="text"
            placeholder="e.g., 2Mbps"
            className="mt-1 block w-full border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none py-2"
          />
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
          Add Profile
        </button>
      </form>
    </div>
  );
}
