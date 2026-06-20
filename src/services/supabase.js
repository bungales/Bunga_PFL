import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://gsnmreyunossyhjymgrr.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzbm1yZXl1bm9zc3loanltZ3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDAxOTEsImV4cCI6MjA5NzUxNjE5MX0.W1yubzOHgXKklPpP2ggVyEaClsrhlTYayAHh2j7-2iY"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
