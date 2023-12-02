import Image from "next/image"
import Link from "next/link"
import Alert from "@/assets/Alerts"

export default function Ratings () {
    return (
        <section className="py-12 px-6 bg-gradient-to-r from-muted to-background m-4 rounded-lg mt-0">
            <div className="h-auto rounded-xl border-2 p-10 m-6 grid grid-cols-4 w-max mt-16">
                    <Image 
                        width={200}
                        height={400}
                        src="/productImages/pngwing.com13.png"
                        alt="Rate img"
                        className="rounded-sm mb-4 items-center border-r-2"/>
                <div className="col-start-2 col-end-4 border-l-2 p-8 ml-16">
                    <h1 className="font-bold">
                        Rate and Review
                    </h1>
                    <p>
                        Let us know what you feel about our services
                    </p>
                    <Link href="#recommend">
                    <button type="submit" className="bg-muted hover:bg-link transition duration-30 text-white font-bold py-2 px-4 rounded font-heading mt-28">Start Review</button>
                    </Link>
                </div>
            </div>
            <div id="recommend" className="h-auto rounded-xl border-2 p-10 m-6 grid grid-cols-4 w-max mt-16">
                    <Image 
                        width={200}
                        height={400}
                        src="/productImages/pngwing.com13.png"
                        alt="Rate img"
                        className="rounded-sm mb-4 items-center border-r-2"/>
                <div className="col-start-2 col-end-4 border-l-2 p-8 ml-16">
                    <h1 className="font-bold">
                        Would you recommend us to your friends?
                    </h1>
                    <ul className="w-48 text-sm font-medium text-gray-900 border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="strongly-agree-checkbox" type="checkbox" value="" className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label htmlFor="strongly-agree-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Strongly Agree</label>
                            </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="agree-checkbox" type="checkbox" value="" className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label htmlFor="agree-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agree</label>
                            </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="neutral-checkbox" type="checkbox" value="" className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label htmlFor="neutral-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Neutral</label>
                            </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="disagree-checkbox" type="checkbox" value="" className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label htmlFor="angular-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Disagree</label>
                            </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="strongly-disagree-checkbox" type="checkbox" value="" className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label htmlFor="laravel-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Strongly Disagree</label>
                            </div>
                        </li>
                    </ul>
                    <Link href="#">
                    <button type="submit" onClick={Alert} className="bg-muted hover:bg-link transition duration-30 text-white font-bold py-2 px-4 rounded font-heading mt-28">Submit Review</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}