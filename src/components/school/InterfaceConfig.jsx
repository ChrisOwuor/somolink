export default function InterfaceConfig({ school }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Interface Configuration
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Interface Name
          </label>
          <input
            type="text"
            placeholder="e.g., ether1"
            className="mt-1 block w-full border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">IP Address</label>
          <input
            type="text"
            placeholder="e.g., 192.168.1.1/24"
            className="mt-1 block w-full border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">DHCP Pool</label>
          <input
            type="text"
            placeholder="e.g., 192.168.1.100-192.168.1.200"
            className="mt-1 block w-full border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none py-2"
          />
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
          Save Configuration
        </button>
      </form>
    </div>
  );
}
