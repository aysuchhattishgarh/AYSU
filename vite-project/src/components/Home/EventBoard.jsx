const EventBoard = ({ events }) => (
  <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/2 mb-6">
    <div className="border-b pb-2 mb-4">
      <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
    </div>
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event._id || event.id} className="flex items-start gap-4">
          <div className="flex flex-col items-center justify-center bg-blue-100 text-blue-800 rounded-md w-12 h-12 text-sm font-semibold">
            <span>{event.date.day}</span>
            <span className="text-xs uppercase">{event.date.month}</span>
            <span className="text-[10px] text-gray-600">{event.date.year}</span>
          </div>
          <div className="flex-1">
            <p className="text-gray-700 text-sm">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EventBoard;
