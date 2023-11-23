import Image from 'next/image';

export default function FeaturedArtisans() {
  const featuredArtisans = [
    {
      id: 1,
      name: 'Ugandan Artisans',
      description: 'Artisans specializing in traditional crafts and handmade artifacts from Uganda. Each piece reflects the rich cultural heritage of the region.',
      image: '/images/ugandan-crafts.webp',
      category: 'premium',
    },
    {
      id: 2,
      name: 'Scarbo Siu',
      description: 'I offer a diverse collection of handcrafted items using sustainable materials.',
      image: '/images/scarbor-siu.jpg',
      category: 'premium',
    },
    {
      id: 3,
      name: 'Soft Touch',
      description: 'I specialize in creating unique artwork inspired by nature and the surrounding environment.',
      image: '/images/soft-touch.avif',
      category: 'premium',
    },
    {
      id: 4,
      name: 'Annie Spratt',
      description: 'This store collection includes intricately designed jewelry pieces, handcrafted with attention to detail.',
      image: '/images/annie-spratt.webp',
      category: 'premium',
    },
    {
      id: 5,
      name: 'Jean Vella',
      description: 'I make a wide range of textile artworks, blending traditional techniques with modern designs and vibrant colors.',
      image: '/images/jean-vella.webp',
      category: 'premium',
    },
    {
      id: 6,
      name: 'Federico Di Dio',
      description: 'I create unique wooden sculptures that showcase exquisite craftsmanship and artistic expression.',
      image: '/images/federico-di-dio.webp',
      category: 'standard',
    },
  ];

  return (
    <section className="py-12 px-6 bg-gradient-to-r from-muted to-background m-4 rounded-lg">
      <h2 className="text-3xl font-semibold mb-4 font-heading">Featured Artisans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredArtisans.map((artisan) => (
          <div key={artisan.id} className="md:transition-transform md:duration-300 md:transform-gpu md:hover:scale-105 bg-background rounded-lg shadow-lg p-4">
 <Image
              width={2000}
              height={90}
              src={artisan.image}
              alt={artisan.name}
              className="rounded-sm mb-4 items-center"/>
            <h3 className="text-lg font-semibold font-heading mb-2">{artisan.name}</h3>
            <p className="text-text font-body">{artisan.description}</p>
            <button className="bg-muted hover:bg-link transition duration-30 text-white font-bold py-2 px-4 rounded mt-2 font-heading">
              View More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}