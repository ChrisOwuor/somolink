import TrafficCard from "../school monitoring cards/TrafficCard";

export default function SchoolMonitoring({ school }) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Network Traffic
        </h2>
        <TrafficCard metrics={school.metrics} />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Alerts</h2>
        <div className="bg-white border rounded p-4">
          {school.alerts.length === 0 ? (
            <p className="text-sm text-gray-500">No active alerts</p>
          ) : (
            school.alerts.map((a) => (
              <div key={a.id} className="text-sm text-red-600 border-b py-2">
                {a.message}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
