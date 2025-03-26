import {
	configureStore,
	createSlice,
	createAsyncThunk,
} from "@reduxjs/toolkit";

// Fetch countries data once
export const fetchCountries = createAsyncThunk(
	"countries/fetchCountries",
	async () => {
		const res = await fetch("https://restcountries.com/v3.1/all");
		return res.json();
	}
);

// Create a slice for managing country data
const countrySlice = createSlice({
	name: "countries",
	initialState: {
		data: [],
		status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
		error: null,
		allCountries: [], // Stores the full list of countries
		countryList: [], // Stores the filtered list
		countrySearch: "",
		isOpen: false,
		selectedRegions: [],
		unMember: false, // Member of the United Nations
		independent: false, // Independent status
		sortBy: "population", // Default sorting by Population (Descending)
		selectedCountry: null,
	},
	reducers: {
		setCountryList(state) {
			// Always filter from allCountries
			let filteredCountries = state.allCountries;

			// Filter by search (name, region, subregion)
			if (state.countrySearch) {
				const searchLower = state.countrySearch.toLowerCase();
				filteredCountries = filteredCountries.filter((country) =>
					[
						country.name.common.toLowerCase(),
						country.region.toLowerCase(),
						country.subregion?.toLowerCase(),
					].some((value) => value?.includes(searchLower))
				);
			}

			// Filter by selected regions (case-insensitive)
			if (state.selectedRegions.length) {
				filteredCountries = filteredCountries.filter((country) =>
					state.selectedRegions.some(
						(region) => region.toLowerCase() === country.region.toLowerCase()
					)
				);
			}

			// Filter by UN membership
			if (state.unMember) {
				filteredCountries = filteredCountries.filter(
					(country) => country.unMember
				);
			}

			// Filter by independence
			if (state.independent) {
				filteredCountries = filteredCountries.filter(
					(country) => country.independent
				);
			}

			// Sorting Logic (Default: Descending)
			if (state.sortBy === "name") {
				filteredCountries.sort((a, b) =>
					a.name.common.localeCompare(b.name.common)
				);
			} else if (state.sortBy === "population") {
				filteredCountries.sort((a, b) => b.population - a.population);
			} else if (state.sortBy === "area") {
				filteredCountries.sort((a, b) => b.area - a.area);
			}

			// Update state
			state.countryList = filteredCountries;
		},
		setCountrySearch(state, action) {
			state.countrySearch = action.payload;
			countrySlice.caseReducers.setCountryList(state);
		},
		setIsOpen(state) {
			state.isOpen = !state.isOpen;
		},
		setSortBy(state, action) {
			state.sortBy = action.payload;
			countrySlice.caseReducers.setCountryList(state);
		},
		toggleRegion(state, action) {
			const region = action.payload;
			if (state.selectedRegions.includes(region)) {
				state.selectedRegions = state.selectedRegions.filter(
					(r) => r !== region
				);
			} else {
				state.selectedRegions.push(region);
			}
			countrySlice.caseReducers.setCountryList(state);
		},
		toggleUNMember(state) {
			state.unMember = !state.unMember;
			countrySlice.caseReducers.setCountryList(state);
		},
		toggleIndependent(state) {
			state.independent = !state.independent;
			countrySlice.caseReducers.setCountryList(state);
		},
		setSelectedCountry(state, action) {
			state.selectedCountry = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCountries.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
				state.allCountries = action.payload; // Store full country list
				countrySlice.caseReducers.setCountryList(state);
			})
			.addCase(fetchCountries.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const {
	setCountryList,
	setCountrySearch,
	setIsOpen,
	setSortBy,
	toggleRegion,
	toggleUNMember,
	toggleIndependent,
	setSelectedCountry,
} = countrySlice.actions;

// Create the store
const store = configureStore({
	reducer: {
		countries: countrySlice.reducer,
	},
});

export default store;
