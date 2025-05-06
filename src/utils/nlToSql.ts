
// Bu, doğal dil ifadelerini SQL'e çeviren basit bir simülasyon
// Gerçek bir uygulamada, bu bir AI servisi veya backend API'ye bağlı olurdu

export interface SqlGenerationResult {
  sql: string;
  explanation?: string;
  error?: string;
}

export async function generateSqlFromNaturalLanguage(input: string): Promise<SqlGenerationResult> {
  // Bu bir simülasyon - gerçek bir uygulamada bir AI servisi çağırırdınız
  // Şimdilik, desen eşleştirme ile basit bir yanıt simüle edeceğiz
  
  const normalizedInput = input.toLowerCase().trim();
  
  // Çok basit desen eşleştirme gösterimi
  if (normalizedInput.includes('kullanıcı') && (normalizedInput.includes('aktif') || normalizedInput.includes('en çok'))) {
    return {
      sql: `SELECT kullanıcı_id, COUNT(*) as toplam_aktivite
FROM kullanıcı_aktiviteleri
GROUP BY kullanıcı_id
ORDER BY toplam_aktivite DESC
LIMIT 10;`,
      explanation: "Bu sorgu, toplam aktivite sayılarına göre en aktif kullanıcıları bulur."
    };
  }
  
  if ((normalizedInput.includes('satış') || normalizedInput.includes('satis')) && (normalizedInput.includes('son ay') || normalizedInput.includes('geçen ay'))) {
    return {
      sql: `SELECT 
  DATE_TRUNC('day', oluşturulma_tarihi) as gün,
  SUM(tutar) as günlük_satış
FROM satışlar
WHERE oluşturulma_tarihi >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', oluşturulma_tarihi)
ORDER BY gün;`,
      explanation: "Bu sorgu, son 30 günün günlük satış toplamlarını hesaplar."
    };
  }
  
  if (normalizedInput.includes('gelir') || normalizedInput.includes('ürün') || normalizedInput.includes('urun')) {
    return {
      sql: `SELECT 
  p.ürün_adı, 
  p.kategori,
  SUM(o.miktar * o.fiyat) as gelir
FROM ürünler p
JOIN sipariş_öğeleri o ON p.ürün_id = o.ürün_id
GROUP BY p.ürün_adı, p.kategori
ORDER BY gelir DESC
LIMIT 10;`,
      explanation: "Bu sorgu, gelire göre en iyi 10 ürünü gösterir."
    };
  }
  
  // Diğer girişler için varsayılan yanıt
  return {
    sql: `-- Oluşturulan: "${input}"\nSELECT * FROM örnek_veri LIMIT 10;`,
    explanation: "Bu, verileri ön izlemek için basit bir sorgudur. Daha hedefli bir sorgu için lütfen daha spesifik ayrıntılar sağlayın."
  };
}
