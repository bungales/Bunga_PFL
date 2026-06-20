import { supabase } from './supabase'

export const usersAPI = {
  // Login dengan email & password via Supabase Auth
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  // Register user baru, lalu simpan data tambahan ke tabel public.users
  async register(name, email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error

    // Simpan data tambahan ke tabel public.users
    const { error: insertError } = await supabase
      .from('users')
      .insert({ id: data.user.id, name, role: 'user' })
    if (insertError) throw insertError

    return data
  },

  // Logout
  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Ambil semua user dari tabel public.users
  async fetchUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  // Tambah user baru (dari admin): buat auth user + insert ke tabel users
  async createUser(name, email, password, role = 'user') {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error

    const { error: insertError } = await supabase
      .from('users')
      .insert({ id: data.user.id, name, role })
    if (insertError) throw insertError

    return data
  },

  // Update data user di tabel public.users
  async updateUser(id, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data
  },

  // Hapus user dari tabel public.users
  async deleteUser(id) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    if (error) throw error
  },
}
