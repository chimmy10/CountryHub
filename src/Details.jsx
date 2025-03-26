import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

function Details() {
	const { cca3 } = useParams();
	const navigate = useNavigate();
	const selectedCountry = useSelector(
		(state) =>
			state.countries.selectedCountry ??
			state.countries.allCountries.find((c) => c.cca3 === cca3)
	);
	const allCountries = useSelector((state) => state.countries.allCountries);

	const handleClick = () => {
		navigate(`/country`); // Navigate back to home page
	};

	const neighboringCountries = useMemo(() => {
		if (!selectedCountry?.borders || allCountries.length === 0) return [];

		return selectedCountry.borders
			.map((borderCode) =>
				allCountries.find(
					(c) => c.cca3.toUpperCase() === borderCode.toUpperCase()
				)
			)
			.filter(Boolean);
	}, [selectedCountry, allCountries]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div className="sm:pb-16 sm:border sm:border-[#505051] sm:rounded-xl sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl sm:mx-auto sm:relative sm:bg-[#1B1D1F]">
				<img
					src={selectedCountry.flags?.png || "/placeholder-image.png"}
					className="rounded-xl w-56 h-44 mx-auto sm:w-64 sm:h-48 -mt-12 relative"
					alt="Country flag"
				/>
				<p className="text-center text-[35px] text-[#D2D5DA] font-bold mt-6">
					{selectedCountry.name?.common || "Not Available"}
				</p>
				<p className="text-center text-[18px] text-[#D2D5DA] font-semibold mb-7">
					{selectedCountry.name?.official || "Not Available"}
				</p>

				<div className="sm:flex sm:items-center sm:justify-center px-7 max-w-lg mx-auto sm:gap-x-10">
					<div className="border bg-[#282B30] flex items-center rounded-xl justify-center space-x-5 px-4 sm:px-6 sm:py-7 py-2 h-12 mb-4">
						<span className="font-semibold text-[15px] text-[#D2D5DA]">
							Population
						</span>
						<span className="h-9 w-[2px] bg-[#1B1D1F]"></span>
						<span className="text-[#D2D5DA] text-[18px] font-semibold">
							{selectedCountry.population
								? selectedCountry.population.toLocaleString()
								: "N/A"}
						</span>
					</div>

					<div className="border bg-[#282B30] flex items-center rounded-xl justify-center space-x-5 px-4 sm:px-6 sm:py-7 py-2 h-12 mb-4">
						<span className="font-semibold text-[15px] text-[#D2D5DA]">
							Area(km<sup>2</sup>)
						</span>
						<span className="h-9 w-[2px] bg-[#1B1D1F]"></span>
						<span className="text-[#D2D5DA] text-[18px] font-semibold">
							{selectedCountry.area
								? selectedCountry.area.toLocaleString()
								: "N/A"}
						</span>
					</div>
				</div>

				<div className="border-t border-[#505051] mt-7 mb-6"></div>
				<div className="flex justify-between gap-10 px-4 sm:px-6">
					<p className="text-[#D2D5DA] font-semibold">Capital</p>
					<p className="text-[#D2D5DA] font-semibold">
						{selectedCountry.capital?.[0] || "Not Available"}
					</p>
				</div>

				<div className="border-t border-[#505051] mt-7 mb-6"></div>
				<div className="flex justify-between gap-15 sm:gap-25 md:gap-35 px-4 sm:px-6">
					<p className="text-[#D2D5DA] font-semibold whitespace-nowrap">
						Subregion
					</p>
					<p className="text-[#D2D5DA] font-semibold  flex-1 text-right break-words">
						{selectedCountry.subregion || "Not Available"}
					</p>
				</div>

				<div className="border-t border-[#505051] mt-7 mb-6"></div>
				<div className="flex justify-between gap-15 sm:gap-25 md:gap-35 px-4 sm:px-6">
					<p className="text-[#D2D5DA] font-semibold whitespace-nowrap">
						Language(s)
					</p>
					<p className="text-[#D2D5DA] font-semibold flex-1 text-right break-words">
						{selectedCountry.languages
							? Object.values(selectedCountry.languages).join(", ")
							: "None"}
					</p>
				</div>

				<div className="border-t border-[#505051] mt-7 mb-6"></div>
				<div className="flex justify-between gap-15 sm:gap-25 md:gap-35 px-4 sm:px-6">
					<p className="text-[#D2D5DA] font-semibold whitespace-nowrap">
						Currencies
					</p>
					<p className="text-[#D2D5DA] font-semibold  flex-1 text-right break-words">
						{selectedCountry.currencies
							? Object.values(selectedCountry.currencies)
									.map((c) => c.name)
									.join(", ")
							: "None"}
					</p>
				</div>

				<div className="border-t border-[#505051] mt-7 mb-6"></div>
				<div className="flex justify-between gap-20 px-4 sm:px-6">
					<p className="text-[#D2D5DA] font-semibold">Continent(s)</p>
					<p className="text-[#D2D5DA] font-semibold">
						{selectedCountry.continents
							? selectedCountry.continents.join(", ")
							: "Not Available"}
					</p>
				</div>

				<div className="border-t border-[#505051] mt-7 mb-6"></div>
				<div className="px-4 sm:px-6">
					<p className="text-[#D2D5DA] font-semibold mb-5">
						Neighbouring Countries
					</p>
					<div className="flex flex-wrap gap-4">
						{neighboringCountries.length > 0 ? (
							neighboringCountries.map((neighbor) => (
								<img
									key={neighbor.cca3}
									src={neighbor.flags?.png || "/placeholder-image.png"}
									alt={neighbor.name?.common || "Unknown"}
									className="w-24 h-16 rounded-md"
								/>
							))
						) : (
							<p className="text-[#D2D5DA]">No Neighboring Countries</p>
						)}
					</div>
				</div>
				<div className="flex justify-center mt-8">
					<button
						onClick={() => handleClick()}
						className="flex items-center gap-2 bg-[#282B30] text-[#D2D5DA] font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out 
			hover:bg-[#3A3D42] hover:scale-[1.05] active:scale-95"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:-translate-x-1"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Back
					</button>
				</div>
			</div>
		</>
	);
}

export default Details;
