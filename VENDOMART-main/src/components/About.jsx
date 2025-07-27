import React from 'react';

const teamMembers = [
  {
    name: 'Sakshi Nande',
    phone: '8605562147',
    email: 'sakshinande371@gmail.com',
    img: '/sn.jpg',
  },
  {
    name: 'Devki Darandale',
    phone: '8999825189',
    email: 'devkidarandale01@gmail.com',
    img: '/d.jpeg',
  },
  {
    name: 'Sakshi Kanase',
    phone: '9579086040',
    email: 'sakshikanase2020@gmail.com',
    img: '/sk.jpg',
  },
  {
    name: 'Yash Sonawane',
    phone: '7588465413',
    email: 'ysonawane014@gmail.com',
    img: '/ys.jpg',
  },
  {
    name: 'Prathamesh Kokadwar',
    phone: '8482874925',
    email: 'prathameshkokadwar123@gmail.com',
    img: '/pk.jpg',
  },
];

const About = () => {
  return (
    <div className="bg-black py-10 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-10 text-white">Meet Our Team</h2>

      {/* First row: 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 w-full max-w-6xl px-4">
        {teamMembers.slice(0, 3).map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md w-full max-w-xs p-4 text-center hover:shadow-lg transition"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-72 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
            <p className="text-gray-700 mt-1"><strong>Phone:</strong> {member.phone}</p>
            <p className="text-gray-700"><strong>Email:</strong> {member.email}</p>
          </div>
        ))}
      </div>

      {/* Second row: 2 cards centered */}
      <div className="flex justify-center gap-6 flex-wrap mt-8 w-full">
        {teamMembers.slice(3).map((member, index) => (
          <div
            key={index + 3}
            className="bg-white rounded-xl shadow-md w-full max-w-xs p-4 text-center hover:shadow-lg transition"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-72 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
            <p className="text-gray-700 mt-1"><strong>Phone:</strong> {member.phone}</p>
            <p className="text-gray-700"><strong>Email:</strong> {member.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
