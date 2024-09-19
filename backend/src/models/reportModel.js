import pool from '../config/db.js'

// Obtener datos del reporte
const getReportData = async () => {
  try {
    // Obtener total de usuarios
    const totalUsersResult = await pool.query(
      'SELECT COUNT(*) AS total_users FROM users'
    )
    const totalUsers = totalUsersResult.rows[0].total_users

    // Obtener total de productos
    const totalProductsResult = await pool.query(
      'SELECT COUNT(*) AS total_products FROM products'
    )
    const totalProducts = totalProductsResult.rows[0].total_products

    // Obtener total de ventas
    const totalSalesResult = await pool.query(
      'SELECT COUNT(*) AS total_sales FROM orders WHERE status = TRUE'
    )
    const totalSales = totalSalesResult.rows[0].total_sales

    // Obtener total de ingresos
    const totalRevenueResult = await pool.query(
      'SELECT SUM(amount) AS total_revenue FROM payments WHERE status = TRUE'
    )
    const totalRevenue = totalRevenueResult.rows[0].total_revenue || 0

    // Obtener usuarios registrados recientemente (últimos 30 días)
    const recentUsersResult = await pool.query(
      "SELECT id_user, name, email FROM users WHERE created_at >= NOW() - INTERVAL '30 days'"
    )
    const recentUsers = recentUsersResult.rows

    // Obtener productos más guardados como favoritos
    const topFavoriteProductsResult = await pool.query(`
      SELECT p.name, COUNT(f.id_favorite) AS favorite_count 
      FROM favorites f 
      JOIN products p ON p.id_product = f.id_product 
      GROUP BY p.name 
      ORDER BY favorite_count DESC 
      LIMIT 5
    `)
    const topFavoriteProducts = topFavoriteProductsResult.rows

    // Devolver todos los datos en un solo objeto
    return {
      totalUsers,
      totalProducts,
      totalSales,
      totalRevenue,
      recentUsers,
      topFavoriteProducts
    }
  } catch (error) {
    throw new Error('Error al obtener los datos del reporte: ' + error.message)
  }
}

export default { getReportData }
