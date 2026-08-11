/* ==========================================================================
   Supabase Database Connection & Client Config (Bulletproof Native REST API + SDK)
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
    console.log("🟢 Đã kết nối Supabase JS SDK thành công!");
    return supabaseClient;
  }

  return null;
}

/**
 * GỬI MÃ OTP / EMAIL MAGIC LINK (TỰ ĐỘNG CHUYỂN SANG NATIVE REST API KHI CHƯA CÓ SDK)
 */
async function supabaseApiSendOtp(email) {
  const client = getSupabaseClient();
  if (client && client.auth) {
    return await client.auth.signInWithOtp({
      email: email,
      options: { emailRedirectTo: window.location.href }
    });
  }

  // Gọi trực tiếp REST API của Supabase (Không phụ thuộc vào SDK CDN)
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        create_user: true
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return { error: { message: errData.msg || errData.message || errData.error_description || "Không thể gửi OTP tới Email này. Vui lòng kiểm tra lại cấu hình Supabase!" } };
    }

    const data = await response.json().catch(() => ({}));
    return { data, error: null };
  } catch (err) {
    return { error: { message: `Lỗi kết nối mạng: ${err.message}` } };
  }
}

/**
 * ĐĂNG NHẬP MẬT KHẨU (NATIVE REST API)
 */
async function supabaseApiSignInWithPassword(email, password) {
  const client = getSupabaseClient();
  if (client && client.auth) {
    return await client.auth.signInWithPassword({ email, password });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return { error: { message: errData.msg || errData.message || errData.error_description || "Mật khẩu chưa chính xác hoặc tài khoản chưa đăng ký." } };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return { error: { message: `Lỗi kết nối: ${err.message}` } };
  }
}

/**
 * TẠO TÀI KHOẢN MỚI (NATIVE REST API)
 */
async function supabaseApiSignUp(email, password) {
  const client = getSupabaseClient();
  if (client && client.auth) {
    return await client.auth.signUp({ email, password });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return { error: { message: errData.msg || errData.message || errData.error_description || "Lỗi đăng ký tài khoản." } };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return { error: { message: `Lỗi kết nối: ${err.message}` } };
  }
}

// Khởi tạo ngay
getSupabaseClient();
