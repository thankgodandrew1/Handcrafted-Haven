export default function Hero() {
  return (
    <div
      className="bg-cover hg-100%"
      style={{
        backgroundImage: `url("/images/background.svg")`,
      }}
    >
      <div className="md:grid md:grid-cols-4 h-full md:p-14 p-4 mb-2 bg-gray-600 mt-0 flex flex-col">
        <div className="border-white bg-black bg-opacity-40 border-solid md:m-8 m-0 border-2 md:mt-24 p-8 rounded-2xl md:col-start-1 md:col-end-3 col-start-1 col-end-5 row-start-1 h-80 md:h-auto md:w-auto w-full">
          <h1 className="font-bold underline text-white font-heading">
            You are Welcome to Handcrafted Haven
          </h1>
          <p className="text-white text-opacity-100 mt-4 font-body">
            Handcrafted Haven is an innovative web application that aims to
            provide a platform for artisans and crafters to showcase and sell
            their unique handcrafted items. It serves as a virtual marketplace,
            connecting talented creators with potential customers who appreciate
            the beauty and quality of handmade products.
          </p>
        </div>
        <div
          className="hidden xmd:block xmd:border-white xmd:border-solid xmd:border-2 xmd:h-44 xmd:p-8 xmd:rounded-2xl xmd:bg-black xmd:bg-opacity-40 
                                xmd:col-start-3 xmd:col-end-5 xmd:mr-16 xmd:mt-24 xmd:transition xmd:ease-in-out xmd:delay-150 xmd:hover:bg-accent xmd:hover:-translate-y-1 xmd:hover:scale-110 xmd:duration-300 xmd:hover:first-line:text-black"
        >
          <h1 className="text-center text-white mt-10 text font-bold font-heading">
            The Home of Artisans
          </h1>
        </div>
        <div className="border-white bg-black bg-opacity-40 md:ml-6 ml-0 m-0 md:m-5 md:max-w-md max-w-fit border-solid border-2 rounded-2xl mt-4 mb-2 p-8 col-start-1 col-end-5 md:col-start-3 md:col-end-5 md:h-auto h-auto">
          <p className="text-white font-body">
            Handcrafted Haven aims to revolutionize the way handcrafted items
            are discovered, appreciated, and acquired. By providing a digital
            platform for artisans to showcase their creativity and connect with
            a broader audience, the web application fosters a thriving community
            of passionate creators and conscious consumers. With its
            user-friendly features, secure e-commerce capabilities, and emphasis
            on customization and community engagement, Handcrafted Haven is set
            to become the go-to destination for those seeking unique,
            handcrafted treasures.
          </p>
        </div>
      </div>
    </div>
  )
}
