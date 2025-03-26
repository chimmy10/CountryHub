import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Details from "./Details"; // Country details
import Country from "./Country"; // Wrapper with CountryLineUp inside
import CountryLineUp from "./CountryLineUp";

function App() {
	return (
		<div className="bg-[#1B1D1F] h-screen ">
			<div className="bg-[#1B1D1F] min-h-screen sm:pb-12">
				{/* Hero Section with Image */}
				<div className="bg-black pt-10 sm:pt-0 relative">
					<img src="/hero-image.jpg" className="w-full h-52 object-cover" />

					{/* Centered Logo on the Image */}
					<img
						src="/Logo.svg"
						className="absolute top-[15%] left-1/2 transform -translate-x-1/2 w-[170px] h-auto sm:top-[35%]"
					/>
				</div>

				{/* Routes for Navigation */}
				<Routes>
					{/* Default Route: Show Country Component (Includes CountryLineUp) */}
					<Route path="/" element={<Country />} />
					<Route path="/country" element={<Country />} />
					<Route path="/countrylist" element={<CountryLineUp />} />

					{/* Details Page with Animation */}
					<Route
						path="/details/:cca3"
						element={
							<motion.div
								className="lg:mx-7 relative -mt-24 sm:-mt-16 py-10"
								initial={{ y: 100, scale: 0.9, opacity: 0 }}
								animate={{ y: 0, scale: 1, opacity: 1 }}
								exit={{ y: 100, scale: 0.95, opacity: 0 }}
								transition={{ type: "spring", stiffness: 100, damping: 15 }}
							>
								<Details />
							</motion.div>
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
