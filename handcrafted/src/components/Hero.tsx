export default function Hero () {
    return (
        <div className="bg-cover hg-100%" style={{ 
            backgroundImage: `url("/images/background.svg")`, 
        }}>
            <div className="grid grid-cols-4 h-full p-8 mb-2 bg-gray-600 mt-4 ml-20" >
                <div className="border-white bg-opacity-40 bg-black border-solid 
                                border-2 max-w-md mt-16 p-8 mb-64 rounded-2xl col-start-1 col-end-3 row-start-1 row-end-4">
                    <h1 className="font-bold underline text-white">You are Welcome to Handcrafted Haven</h1>
                    <p className="text-white text-opacity-100 mt-4">Handcrafted Haven is an innovative web application that aims to 
                        provide a platform for artisans and crafters to showcase and sell
                        their unique handcrafted items. It serves as a virtual marketplace, connecting 
                        talented creators with potential customers who appreciate the beauty 
                        and quality of handmade products. 
                    </p>
                </div>
                <div className="border-white border-2 bg-opacity-60 bg-black rounded-2xl 
                                col-start-3 col-end-5 mr-28 mt-16 p-8 text-center 
                                h-44 hover:bg-opacity-80 hover:bg-accent hover:first-line:text-black
                                transition ease-in-out delay-150 bg-accent-200 hover:-translate-y-1 hover:scale-110 duration-300">
                    <h1 className="text-white font-extrabold mt-10 shadow-2xl hover:text-black">The Home of Artisans</h1>
                </div>
                <div className="border-white bg-opacity-40 max-w-md border-solid bg-black border-2 
                                rounded-2xl mt-24 mb-2 p-8 col-start-3 col-end-5 h-auto hover:">
                    <p className="text-white">Handcrafted Haven aims to revolutionize the way handcrafted items are discovered, 
                        appreciated, and acquired. By providing a digital platform for artisans to showcase 
                        their creativity and connect with a broader audience, the web application fosters a 
                        thriving community of passionate creators and conscious consumers. 
                        With its user-friendly features, secure e-commerce capabilities, and emphasis 
                        on customization and community engagement, Handcrafted Haven is set to become the go-to 
                        destination for those seeking unique, handcrafted treasures.
                    </p>

                </div>
            </div>
        </div>  
    );
}