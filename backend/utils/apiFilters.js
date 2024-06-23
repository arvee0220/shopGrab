const apiFilters = (query, queryStr) => {
	const search = () => {
		if (queryStr.keyword) {
			const keyword = {
				name: {
					$regex: queryStr.keyword,
					$options: "i",
				},
			};
			query = query.find({ ...keyword });
		}

		return query;
	};

	search();

	const filters = () => {
		const queryCopy = { ...queryStr };

		const fieldsToRemove = ["keyword"];
		fieldsToRemove.forEach((elem) => delete queryCopy[elem]);

		// advance filters for price, ratings etc => check mongodb docs
		let queryStrCopy = JSON.stringify(queryCopy);
		queryStrCopy = queryStrCopy.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

		const filter = JSON.parse(queryStrCopy);

		query = query.find(filter);

		return query;
	};

	filters();

	return query;
};

export default apiFilters;
