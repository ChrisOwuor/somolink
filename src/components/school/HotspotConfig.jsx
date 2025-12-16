export default function HotspotConfig({ school }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Hotspot Setup</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Hotspot Name
          </label>
          <input
            type="text"
            placeholder="e.g., SchoolHotspot1"
            className="mt-1 block w-full border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Assign Profile
          </label>
          <select className="mt-1 block w-full border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none py-2">
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
          Save Hotspot
        </button>
      </form>
    </div>
  );
}
