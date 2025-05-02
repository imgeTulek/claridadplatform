
// This is a simple mock implementation of a natural language to SQL converter
// In a real application, this would be connected to an AI service or backend API

export interface SqlGenerationResult {
  sql: string;
  explanation?: string;
  error?: string;
}

export async function generateSqlFromNaturalLanguage(input: string): Promise<SqlGenerationResult> {
  // This is a mock implementation - in a real app you would call an AI service
  // For now, we'll simulate a response based on pattern matching
  
  const normalizedInput = input.toLowerCase().trim();
  
  // Very basic pattern matching for demonstration
  if (normalizedInput.includes('user') && normalizedInput.includes('most active')) {
    return {
      sql: `SELECT user_id, COUNT(*) as total_activity
FROM user_activities
GROUP BY user_id
ORDER BY total_activity DESC
LIMIT 10;`,
      explanation: "This query finds the most active users based on their total activity count."
    };
  }
  
  if (normalizedInput.includes('sales') && normalizedInput.includes('last month')) {
    return {
      sql: `SELECT 
  DATE_TRUNC('day', created_at) as day,
  SUM(amount) as daily_sales
FROM sales
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY day;`,
      explanation: "This query calculates daily sales totals from the past 30 days."
    };
  }
  
  if (normalizedInput.includes('revenue') || normalizedInput.includes('product')) {
    return {
      sql: `SELECT 
  p.product_name, 
  p.category,
  SUM(o.quantity * o.price) as revenue
FROM products p
JOIN order_items o ON p.product_id = o.product_id
GROUP BY p.product_name, p.category
ORDER BY revenue DESC
LIMIT 10;`,
      explanation: "This query shows the top 10 products by revenue."
    };
  }
  
  // Default response for any other input
  return {
    sql: `-- Generated from: "${input}"\nSELECT * FROM sample_data LIMIT 10;`,
    explanation: "This is a simple query to preview data. Please provide more specific details for a more targeted query."
  };
}
