/* ==========================================================================
   Supabase Database Connection & Client Config (Bulletproof Client Init)
   Trường THCS Phước Hưng - Xã Nhơn Hội - An Giang
   ========================================================================== */

const SUPABASE_URL = "https://qoyppvklftetrutmgwfk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveXBwdmtsZnRldHJ1dG1nd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MzMzMTQsImV4cCI6MjEwMTUwOTMxNH0.pbb1UIhxVxmcb2Eo1BxYAeQknMR9lqKY3kX1pnreEfc";

let supabaseClient = null;

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  if (window.supabaseClient) return window.supabaseClient;

  if (window.supabase && typeof window.supabase.createClient === 'function') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.supabaseClient = supabaseClient;
    console.log("🟢 Đã kết nối Supabase Cloud Database thành công!");
    return supabaseClient;
  }

  console.warn("⚠️ Chưa sẵn sàng Supabase CDN JS SDK.");
  return null;
}

// Tự động khởi tạo ngay khi script load
document.addEventListener('DOMContentLoaded', () => {
  getSupabaseClient();
});

// Thử khởi tạo ngay lập tức
getSupabaseClient();
