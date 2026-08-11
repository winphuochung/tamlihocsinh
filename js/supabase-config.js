/* ==========================================================================
   Supabase Database Connection & Client Config
   Trường THCS Phước Hưng - Xã Nhơn Hội - An Giang
   ========================================================================== */

const SUPABASE_URL = "https://qoyppvklftetrutmgwfk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveXBwdmtsZnRldHJ1dG1nd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MzMzMTQsImV4cCI6MjEwMTUwOTMxNH0.pbb1UIhxVxmcb2Eo1BxYAeQknMR9lqKY3kX1pnreEfc";

let supabaseClient = null;

// Khởi tạo Supabase JS SDK Client
if (window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("🟢 Đã kết nối Supabase Cloud Database thành công!");
} else {
  console.warn("⚠️ Chưa tải Supabase CDN JS SDK. Hệ thống sẽ sử dụng LocalStorage làm bộ nhớ dự phòng.");
}
