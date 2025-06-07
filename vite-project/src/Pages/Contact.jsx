
import almendra from "../../public/almendra.png";
import sum from "../../public/Sum.png";

const Contact = () => {
  const contacts = [
    {
      name: "Almendra ...",
      picture: almendra,
      designation: "UX Designer",
    },
    {
      name: "Jane Smith",
      picture: sum,
      designation: "Product Manager",
    },
    {
      name: "Alice Johnson",
      picture: "https://via.placeholder.com/150",
      designation: "UX Designer",
    },
    {
      name: "Bob Brown",
      picture: "https://via.placeholder.com/150",
      designation: "Data Scientist",
    },
  ];

  return (
    <div
      className="w-full p-8 rounded-lg border border-gray-300"
      style={{
        background:
          "radial-gradient(circle, #b3ecff, #d0b3ff, #f8c8ec, #ffffff)",
      }}
    >
      <h2 className="text-3xl mt-20 font-bold mb-8 text-center text-gray-800">
        Contact List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="bg-yellow-300 rounded-lg p-4 flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={contact.picture}
              alt={contact.name}
              className="w-20 h-20 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {contact.name}
              </h3>
              <p className="text-gray-700">{contact.designation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
