const getProducts = async (_, res) => {
	res.status(200).json({
		message: `All Products`,
	});
};

export { getProducts };
