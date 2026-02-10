'use client';

import Image from 'next/image';
import sampleImage from '@/public/Image.jpeg';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1>sjgnsnvsdnsodvnsovn</h1>

      <Image
        src={sampleImage}
        alt="Sample Image"
        width={120}
        height={120}
        priority
        className="
          w-[120px]
          h-[120px]
          mx-auto
          mb-4
          rounded-full
          object-cover
          border-4
          border-indigo-500
        "
      />
    </div>
  );
}
