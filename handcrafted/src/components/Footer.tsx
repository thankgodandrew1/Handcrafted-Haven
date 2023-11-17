export default function Footer() {
    return (
      <footer className="py-6 px-6 bg-gray-900 bg-gradient-to-l from-background to-muted">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-2xl">
          <div className="flex mb-4">
          <a href="#" className="mr-4 hover:bg-black hover:text-white hover:bg-gray-200 hover:rounded-full transition duration-300 p-2">
            <i className="fab fa-facebook-f"></i>
          </a>
            <a href="#" className="mr-4 hover:bg-black hover:text-white hover:bg-gray-200 hover:rounded-full transition duration-300 p-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="mr-4 hover:bg-black hover:text-white hover:bg-gray-200 hover:rounded-full transition duration-300 p-2">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className="text-center mb-2">Copyright &copy; 2023 | Handcrafted Haven | Brigham Young University - Idaho.</p>
          <div className="text-center">
            {/* If we will be working on these pages, I will change this a tag to Link for a better routing  */}
            <a href="#" className="text-gray-400 hover:bg-black hover:text-white hover:bg-gray-200 hover:rounded-full transition duration-300 p-2 mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:bg-black hover:text-white hover:bg-gray-200 hover:rounded-full transition duration-300 p-2 mx-2">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:bg-black hover:text-white hover:bg-gray-200 hover:rounded-full transition duration-300 p-2 mx-2">Contact Us</a>
          </div>
        </div>
            </footer>
        );
        };
  