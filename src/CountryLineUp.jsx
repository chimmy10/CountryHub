import { useDispatch, useSelector } from "react-redux";
import { setSelectedCountry } from "./store";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CountryLineUp() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { countryList } = useSelector((state) => state.countries);

	const handleClick = (country) => {
		dispatch(setSelectedCountry(country));
		navigate(`/details/${country.cca3}`); // Navigate to details page with country code
	};

	// Framer Motion Variants
	const listVariants = {
		hidden: { opacity: 0, y: 20 }, // Start slightly below
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
		}),
	};

	return (
		<div className="text-[#D2D5DA]">
			{/* Header Row */}
			<div className="grid grid-cols-[100px_2fr_1fr] lg:grid-cols-[100px_2fr_1fr_1fr] xl:grid-cols-[100px_2fr_1fr_1fr_1fr] items-center gap-4 font-semibold pb-5">
				<p className="text-left text-[14px] font-semibold">Flag</p>
				<p className="text-left text-[14px] font-semibold">Name</p>
				<p className="text-left text-[14px] font-semibold">Population</p>
				<p className="text-left text-[14px] font-semibold lg:block hidden">
					Area(km<sup>2</sup>)
				</p>
				<p className="text-left text-[14px] font-semibold xl:block hidden">
					Region
				</p>
			</div>

			{/* Divider Line */}
			<div className="border-t border-[#505051] mb-2"></div>

			{countryList.length > 0 ? (
				<div>
					{countryList.map((s, i) => (
						<motion.button
							key={s.cca3}
							onClick={() => handleClick(s)}
							className="grid cursor-pointer grid-cols-[100px_2fr_1fr] lg:grid-cols-[100px_2fr_1fr_1fr] xl:grid-cols-[100px_2fr_1fr_1fr_1fr] gap-4 items-center w-full py-2"
							custom={i}
							variants={listVariants}
						>
							<img src={s.flags.png} className="w-16 h-12 rounded-md" />
							<p className="text-[#D2D5DA] text-[17px] font-semibold text-left">
								{s.name.common}
							</p>
							<p className="text-[#D2D5DA] font-semibold text-left text-[17px] overflow-hidden overflow-ellipsis">
								{s.population.toLocaleString()}
							</p>
							<p className="text-[#D2D5DA] font-semibold text-left text-[17px] lg:block hidden">
								{s.area.toLocaleString()}
							</p>
							<p className="text-[#D2D5DA] font-semibold text-left text-[17px] xl:block hidden">
								{s.region}
							</p>
						</motion.button>
					))}
				</div>
			) : (
				<p>No countries match your search.</p>
			)}
		</div>
	);
}

export default CountryLineUp;
