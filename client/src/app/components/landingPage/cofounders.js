import * as React from 'react'
import Image from 'next/image';

export default function CoFounders() {
  const founders = [
    {
      name: 'Athikash',
      role: 'Frontend Developer & CEO',
      image: '/assets/me.jpg',
      linkedin: 'https://www.linkedin.com/in/athikash-jeyaganthan-283580231/',
    },
    {
      name: 'Ayesha Mulani',
      role: 'ML Engineer & CTO',
      image: '/path-to-image/navya.png',
      linkedin: 'https://www.linkedin.com/in/navya-bijoy/',
    },
    {
      name: 'Favour Orji',
      role: 'Fullstack Developer & CFO',
      image: '/assets/Favour.JPG',
      linkedin: 'https://www.linkedin.com/in/favour-orji-03413b263',
    },
    {
        name: 'Sudhanshu Wani',
        role: 'ML Engineer & CFO',
        image: '/path-to-image/pulkit.png',
        linkedin: 'https://www.linkedin.com/in/pulkit-kumar/',
      },
  ];

  return (
    <div className="bg-black text-white py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Meet the Co-Founders</h2>
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
        {founders.map((founder, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg text-center w-72">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
              <Image
                src={founder.image}
                alt={founder.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">{founder.name}</h3>
            <p className="text-blue-400">
              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
            <p className="mt-2 text-sm">{founder.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
