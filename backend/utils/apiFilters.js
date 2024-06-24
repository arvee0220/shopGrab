const apiFilters = (_, queryStr) => {
	const search = (query) => {
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

	const filters = (query) => {
		const queryCopy = { ...queryStr };

		const fieldsToRemove = ["keyword", "page"];
		fieldsToRemove.forEach((elem) => delete queryCopy[elem]);

		// advance filters for price, ratings etc => check mongodb docs
		let queryStrCopy = JSON.stringify(queryCopy);
		queryStrCopy = queryStrCopy.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

		const filter = JSON.parse(queryStrCopy);

		query = query.find(filter);

		return query;
	};

	const pagination = (query, resPerPage) => {
		const currentPage = Number(queryStr.page) || 1;
		const skip = resPerPage * (currentPage - 1);

		query = query.limit(resPerPage).skip(skip);

		return query;
	};

	return { search, filters, pagination };
};

export default apiFilters;
