/**
 * 取得公共資源的完整路徑
 * 自動處理 base URL (例如 /newtea/)
 */
export function getPublicPath(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  // 移除開頭的 / 如果存在
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // 確保 base 以 / 結尾
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  return `${cleanBase}${cleanPath}`
}
