"use client";
import { FiPhone, FiMapPin, FiActivity } from "react-icons/fi";

export default function ContactInfo() {
  const info = [
    {
      icon: <FiActivity className="w-8 h-8 text-white" />,
      title: "ABOUT CLUB",
      details: ["Running Guide", "Workouts"],
    },
    {
      icon: <FiPhone className="w-8 h-8 text-white" />,
      title: "PHONE (LANDLINE)",
      details: ["+912 3 567 8987", "+912 5 252 3336"],
    },
    {
      icon: <FiMapPin className="w-8 h-8 text-white" />,
      title: "OUR OFFICE LOCATION",
      details: [
        "The Interior Design Studio Company",
        "The Courtyard, Al Quoz 1, Colorado, USA",
      ],
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center py-12 px-6 bg-gray-100 rounded-lg shadow-sm">
        {info?.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="bg-teal-500 rounded-full p-4 -mt-14 shadow-md">
              {item.icon}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <div className="mt-2 space-y-1 text-gray-600">
              {item.details.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
