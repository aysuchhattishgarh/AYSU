import { Link } from "react-router-dom";

const NoticeBoard = ({ notices }) => (
  console.log("Notices:", notices),
  <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/2 mb-6">
    <div className="border-b pb-2 mb-4">
      <h2 className="text-xl font-semibold text-gray-800">Notice Board</h2>
    </div>

    <div className="space-y-4">
      {notices.length === 0 ? (
        <p className="text-gray-500 text-sm">No notices found.</p>
      ) : (
        notices.map((notice) => (
          <div key={notice._id} className="border p-3 rounded-md shadow-sm hover:shadow-md transition">
            <Link to={`/PDFViewer?file=${encodeURIComponent(notice.url)}`} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* SVG Document Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <p className="text-gray-800 text-sm font-medium">
                  {notice.title || notice.filename}
                </p>
              </div>

              {/* Download Button */}
              <a
                href={notice.url}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md transition"
              >
                ⬇ Download
              </a>
            </Link>
          </div>
        ))
      )}
    </div>
  </div>
);

export default NoticeBoard;
