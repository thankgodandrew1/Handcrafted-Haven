import Image from 'next/image';
export default function Testimonials() {
    const testimonials = [
      {
        id: 1,
        message: "Absolutely stunning craftsmanship! The attention to detail in every piece is remarkable.",
        author: "James Brown",
        image: "/images/testimonial1.jpg", 
      },
      {
        id: 2,
        message: "I'm impressed by the quality and uniqueness of the handcrafted items. Will definitely be a returning customer!",
        author: "Daniella Smith",
        image: "/images/testimonial2.jpg", 
      },
      {
        id: 3,
        message: "The artisans' dedication shines through their work. My purchase exceeded my expectations!",
        author: "Sophia Garcia",
        image: "/images/testimonial3.jpg", 
      },
      {
        id: 4,
        message: "Exceptional service and exquisite products. Handcrafted Haven truly celebrates artistry and talent.",
        author: "Anietie Ukeh",
        image: "/images/testimonial4.jpg", 
      },
    ];
  
    return (
        <section className="py-12 px-6 bg-gray-100 bg-muted rounded-lg m-3 bg-opacity-80">
          <h2 className="text-3xl font-semibold mb-4">Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="relative overflow-hidden
               bg-background bg-opacity-80 rounded-lg shadow-lg p-4 flex items-center 
               transition-transform duration-300 transform-gpu hover:scale-105">
                <div className="flex-shrink-0">
                  <Image src={testimonial.image} alt={testimonial.author} width={48} height={48} className="rounded-full" />
                </div>
                <div className="ml-4">
                  <p className="text-lg">{testimonial.message}</p>
                  <p className="text-md mt-2">- {testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    };