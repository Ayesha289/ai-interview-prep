import * as React from 'react'
import Image from 'next/image';

export default function CoFounders() {
  const founders = [
    {
      name: 'Athikash',
      role: 'Frontend Developer',
      image: '/assets/me.jpg',
      linkedin: 'https://www.linkedin.com/in/athikash-jeyaganthan-283580231/',
    },
    {
      name: 'Ayesha Mulani',
      role: 'Full Stack Developer',
      image: '/assets/AM.jpg',
      linkedin: 'https://www.linkedin.com/in/ayesha-mulani-173b6b207/',
    },
    {
      name: 'Favour Orji',
      role: 'Full Stack Developer',
      image: '/assets/Favour.JPG',
      linkedin: 'https://www.linkedin.com/in/favour-orji-03413b263',
    },
    {
        name: 'Sudhanshu Wani',
        role: 'ML Engineer',
        image: '/assets/sudhanshu.jpg',
        linkedin: 'https://www.linkedin.com/in/sudhanshu-wani/',
      },
  ];

  return (
    <div className="bg-black text-white py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Meet the Team!</h2>
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
