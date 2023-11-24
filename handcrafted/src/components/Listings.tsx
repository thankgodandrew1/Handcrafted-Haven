import Image from 'next/image';

export default function ProductListings() {
  const productlistings = [
    {
      id: 1,
      name: 'Paints and Puns',
      description: 'A captivating and vibrant acrylic painting that transcends boundaries and sparks the imagination.',
      image: '/productImages/buttons.jpg',
      price: '$20',
    },
    {
      id: 2,
      name: 'Artful Antics',
      description: 'Made with premium quality materials, our pieces are not just artworks—they are statements.',
      image: '/productImages/face.webp',
      price: '$50',
    },
    {
      id: 3,
      name: 'Whisimal Wonders',
      description: 'Antiquity beautiful watercolor illustration, body of water surrounded by tree near to castle painting.',
      image: '/productImages/first.jpg',
      price: '$30',
    },
    {
      id: 4,
      name: 'madrid',
      description: 'Madrid Drawing Illustrator Art Illustration, Long-haired girl, red and teal smoke, fashion Girl, black Hair.',
      image: '/productImages/flower.webp',
      price: '$50',
    },
    {
      id: 5,
      name: 'Abstract',
      description: 'Abstract art Painting Drawing, Creative color ink splash tiger Avatar, tiger abstract art, watercolor Painting, color Splash.',
      image: '/productImages/handmade.jpg',
      price: '$45',
    },
    {
      id: 6,
      name: 'Multiculored Abstract',
      description: 'Multicolored abstract painting, Bird Artist Work of art Printmaking, Creative girls Avatar.',
      image: '/productImages/images.jpg',
      price: '$40',
    },
    {
      id: 7,
      name: 'Water Illustration',
      description: 'Pagoda temple near body of water illustration, Namsan Gyeongbokgung N Seoul Tower Namdaemun Jeju Province.',
      image: '/productImages/images1.jpg',
      price: '$35',
    },
    {
      id: 8,
      name: 'Water Color Painting',
      description: 'Parrot Bird Watercolor painting Drawing, parrot, color Splash, splash',
      image: '/productImages/lord.jpg',
      price: '$60',
    },
    {
      id: 9,
      name: 'Harmony in Hues',
      description: 'Harmony in Hues canvas series! Immerse yourself in a symphony of colors expertly blended to evoke emotions and ignite imagination',
      image: '/productImages/pngwing.com15.png',
      price: '$82',
    },
    {
      id: 10,
      name: 'Abstract Illustration',
      description: 'Artist Drawing Painting, Girls Avatar, two woman face abstract illustrations, watercolor Painting, ink',
      image: '/productImages/pngwing.com1.png',
      price: '$55',
    },
    {
      id: 11,
      name: 'Kahlo Museum',
      description: "Woman's face, Diego Rivera Frida Kahlo Museum Watercolor painting Art",
      image: '/productImages/pngwing.com2.png',
      price: '$57',
    },
    {
      id: 12,
      name: 'Multicolored Lion',
      description: 'Paper Color Painting Canvas Drawing, lion, multicolored lion illustration, watercolor Painting',
      image: '/productImages/pngwing.com3.png',
      price: '$60',
    },
    {
      id: 13,
      name: 'Watercolor Giraffe',
      description: 'Watercolor painting Drawing Visual arts Canvas print, Watercolor Giraffe, multicolored giraffe and butterflies painting, watercolor Leaves',
      image: '/productImages/pngwing.com4.png',
      price: '$50',
    },
    {
      id: 14,
      name: 'Ink Splashes',
      description: 'Ink splashes border, pink 3D, watercolor Painting, border',
      image: '/productImages/pngwing.com5.png',
      price: '$80',
    },
    {
      id: 15,
      name: 'Ballet Dancer',
      description: 'Ballet Dancer Watercolor painting, Swan Dance, woman doing ballerina dance illustration',
      image: '/productImages/pngwing.com6.png',
      price: '$74',
    },
    {
      id: 16,
      name: 'Dancing Girl',
      description: 'Dancing Girl Dance Watercolor painting, Silhouette, animals, mural, shoe png',
      image: '/productImages/pngwing.com7.png',
      price: '$66',
    },
    {
      id: 17,
      name: 'Multicolored Horse',
      description: 'Multicolored horse illustration, American Paint Horse Painting Abstract art Oil paint',
      image: '/productImages/pngwing.com8.png',
      price: '$90',
    },
    {
      id: 18,
      name: 'Horse Watercolor',
      description: 'Horse Watercolor painting Tattoo Drawing, Drawing Ritmeester, blue and brown horse splatter painting',
      image: '/productImages/pngwing.com9.png',
      price: '$85',
    },
    {
      id: 19,
      name: 'Chow Chow',
      description: 'Chow Chow Horse Art Poster Printing, horse, horse, animals, poster png',
      image: '/productImages/pngwing.com10.png',
      price: '$49',
    },
    {
      id: 20,
      name: 'Canvas Painting',
      description: 'A stunning canvas painting that transcends boundaries and sparks imagination. Crafted by the skilled hands of talented artisans',
      image: '/productImages/pngwing.com11.png',
      price: '$77',
    },
    {
      id: 21,
      name: 'Ethereal Harmony',
      description: 'Ethereal Harmony canvas painting! Immerse yourself in a symphony of colors and emotions expertly woven together by our talented artist',
      image: '/productImages/pngwing.com12.png',
      price: '$69',
    },
    {
      id: 22,
      name: 'Ethereal Serenity',
      description: 'Ethereal Serenity. This captivating artwork transcends boundaries, drawing you into a realm where vibrant hues dance harmoniously on the canvas, evoking a sense of tranquility and wonder',
      image: '/productImages/pngwing.com13.png',
      price: '$58',
    },
    {
      id: 23,
      name: 'Aurora Elegance',
      description: 'Aurora Elegance handcrafted sculpture. Crafted with meticulous attention to detail, this stunning piece embodies the ethereal beauty of the Northern Lights',
      image: '/productImages/pngwing.com14.png',
      price: '$60',
    },
    {
      id: 24,
      name: 'Harmony in Hues',
      description: 'Harmony in Hues canvas series! Immerse yourself in a symphony of colors expertly blended to evoke emotions and ignite imagination',
      image: '/productImages/pngwing.com15.png',
      price: '$82',
    },
  ];

  return (
    <section className="py-12 px-6 bg-gradient-to-r from-muted to-background m-4 rounded-lg mt-0">
      <h2 className="text-3xl font-semibold mb-4 font-heading mt-28">Product Listings</h2>
      <div className="grid grid-cols-6 md:grid-cols-5 gap-6">
        <div className="row-start-1 row-end-7">
          <input className="p-2 rounded-xl text-center" type="text" placeholder='Search'/>
          <h1 className="mt-3">Categories</h1>
          <p></p>
        </div>
        {productlistings.map((products) => (
          <div key={products.id} className="transition-transform duration-300 transform-gpu hover:scale-105 bg-background rounded-lg shadow-lg p-4">
            <Image
              width={400}
              height={60}
              src={products.image}
              alt={products.name}
              className="mb-4 items-center"/>
            <h3 className="text-lg font-semibold font-heading mb-2">{products.name}</h3>
            <p className="text-text font-body">{products.description}</p>
            <button className="bg-muted hover:bg-link transition duration-30 text-white font-bold py-2 px-4 rounded mt-2 font-heading">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
