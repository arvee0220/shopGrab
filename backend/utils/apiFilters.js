const APIFilters = (query, queryStr) => {
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

export default APIFilters;
