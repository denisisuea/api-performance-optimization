export const getProducts = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit

    const products = await Product.findAll({
      limit,
      offset
    })

    res.json({
      page,
      limit,
      data: products
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}