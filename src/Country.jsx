import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchCountries,
	setCountrySearch,
	setIsOpen,
	setSortBy,
	toggleIndependent,
	toggleRegion,
	toggleUNMember,
} from "../src/store"; // Adjust import path

import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@heroicons/react/24/solid";
import CountryLineUp from "./CountryLineUp";

const regions = [
	"Americas",
	"Antarctic",
	"Africa",
	"Asia",
	"Europe",
	"Oceania",
];

const CountryList = () => {
	const dispatch = useDispatch();
	const {
		countryList,
		status,
		error,
		sortBy,
		countrySearch,
		isOpen,
		selectedRegions,
		unMember,
		independent,
	} = useSelector((state) => state.countries);

	// Fetch countries on mount
	useEffect(() => {
		dispatch(fetchCountries());
	}, [dispatch]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleSortChange = (sortType) => {
		dispatch(setSortBy(sortType)); // Set the selected sort type
		dispatch(setIsOpen()); // Close the dropdown after selection
	};

	console.log(status);

	return (
		<div className="bg-[#1B1D1F] py-7 px-3 sm:px-7 md:px-10 lg:px-8 rounded-xl border border-[#505051] max-w-lg mx-auto md:max-w-xl lg:max-w-6xl xl:max-w-7xl">
			<div className="lg:flex lg:items-center lg:justify-between lg:mb-8">
				<p className="text-[#D2D5DA] text-[17px] font-semibold">
					Found {countryList.length} countries
				</p>
				<div className="relative w-full max-w-md lg:max-w-sm">
					{/* Search Icon */}
					<svg
						className="absolute left-12 lg:left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D2D5DA]"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={3}
							d="M21 21l-4.35-4.35M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
						/>
					</svg>

					{/* Search Input */}
					<input
						type="text"
						placeholder="Search by Name, Region, Subregion"
						value={countrySearch}
						onChange={(e) => dispatch(setCountrySearch(e.target.value))}
						className="bg-[#282B30] mt-7 lg:mt-0 lg:mb-0 mb-8 text-[#D2D5DA] placeholder-gray-300 rounded-xl pl-20 lg:pl-11 pr-14 py-3 w-full outline-none focus:ring-2 focus:ring-gray-400 placeholder:font-bold placeholder:text-[15px] overflow-hidden overflow-ellipsis transition-all duration-300 ease-in-out"
					/>
				</div>
			</div>

			<div className="lg:flex lg:justify-between lg:space-x-9">
				<div>
					<p className="text-[#D2D5DA] text-[14px] font-semibold">Sort by</p>

					<div className="relative w-full max-w-sm">
						{/* Dropdown Button */}
						<button
							onClick={() => dispatch(setIsOpen(!isOpen))} // Ensure it toggles correctly
							className="text-[#D2D5DA] border-2 border-[#505051] text-[15px] rounded-xl pl-4 pr-6 py-2 w-full flex justify-between mt-2 mb-1 items-center outline-none focus:ring-2 focus:ring-gray-400 font-semibold transition-all duration-300 ease-in-out hover:bg-[#505051]/40"
						>
							{sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}{" "}
							{/* Display Selected Sort Type */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={5}
								stroke="currentColor"
								className={`size-3 text-[#D2D5DA] transition-transform duration-300 ${
									isOpen ? "rotate-180" : "rotate-0"
								}`}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m19.5 8.25-7.5 7.5-7.5-7.5"
								/>
							</svg>
						</button>

						{/* Dropdown Options */}
						<ul
							className={`absolute left-0 mt-1 w-full bg-[#6C727F] text-[#D2D5DA] rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform ${
								isOpen
									? "opacity-100 scale-100 visible"
									: "opacity-0 scale-95 invisible"
							} z-50`}
						>
							<li
								onClick={() => handleSortChange("name")}
								className="px-4 py-3 hover:bg-gray-600 cursor-pointer transition-all duration-200"
							>
								Name (A-Z)
							</li>
							<li
								onClick={() => handleSortChange("population")}
								className="px-4 py-3 hover:bg-gray-600 cursor-pointer transition-all duration-200"
							>
								Population (High to Low)
							</li>
							<li
								onClick={() => handleSortChange("area")}
								className="px-4 py-3 hover:bg-gray-600 cursor-pointer transition-all duration-200"
							>
								Area (High to Low)
							</li>
						</ul>
					</div>

					<div>
						<p className="text-[#D2D5DA] text-[14px] font-semibold mt-8">
							Region
						</p>
						<div className="mt-1 mb-8 max-w-sm lg:max-w-md flex flex-wrap gap-2">
							{regions.map((region) => (
								<button
									key={region}
									onClick={() => dispatch(toggleRegion(region))}
									className={`text-[#D2D5DA] text-[15px] font-semibold py-1.5 px-4 mt-3 rounded-xl transition-all duration-300 ease-in-out shadow-md ${
										selectedRegions.includes(region)
											? "bg-[#282B30] scale-105 shadow-lg"
											: "bg-transparent hover:bg-[#282B30]/50 hover:scale-105"
									}`}
								>
									{region}
								</button>
							))}
						</div>
					</div>

					<p className="text-[#D2D5DA] text-[14px] font-semibold">Status</p>
					<div className="flex flex-col gap-3 mt-2 mb-8">
						{/* UN Member Checkbox */}
						<div className="flex items-center space-x-3 transition-all duration-300 ease-in-out hover:scale-[1.02]">
							<Checkbox.Root
								checked={unMember}
								onCheckedChange={() => dispatch(toggleUNMember())}
								className="w-6 h-6 flex items-center justify-center border-2 rounded-md border-gray-400 transition-all duration-300 ease-in-out data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 hover:border-blue-300 hover:shadow-lg"
							>
								<Checkbox.Indicator>
									<CheckIcon className="w-4 h-4 text-white" />
								</Checkbox.Indicator>
							</Checkbox.Root>
							<p className="text-[#D2D5DA] text-[15px] font-semibold select-none">
								Member of the United Nations
							</p>
						</div>

						{/* Independent Checkbox */}
						<div className="flex items-center space-x-3 transition-all duration-300 ease-in-out hover:scale-[1.02]">
							<Checkbox.Root
								checked={independent}
								onCheckedChange={() => dispatch(toggleIndependent())}
								className="w-6 h-6 flex items-center justify-center border-2 rounded-md border-gray-400 transition-all duration-300 ease-in-out data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 hover:border-blue-300 hover:shadow-lg"
							>
								<Checkbox.Indicator>
									<CheckIcon className="w-4 h-4 text-white" />
								</Checkbox.Indicator>
							</Checkbox.Root>
							<p className="text-[#D2D5DA] text-[15px] font-semibold select-none">
								Independent
							</p>
						</div>
					</div>
				</div>
				{status === "succeeded" ? (
					<div className="w-full lg:w-[700px] xl:w-[900px] min-w-[300px]">
						<CountryLineUp />
					</div>
				) : (
					<div className="flex justify-center items-center lg:mx-auto mt-5">
						<div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CountryList;
