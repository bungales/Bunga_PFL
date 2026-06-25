import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Toast from "../../components/Toast";
import EmptyState from "../../components/EmptyState";
import Loading from "../../components/Loading";
import { usersAPI } from "../../services/usersAPI";
import { MdAdd, MdEdit, MdDelete, MdPeople } from "react-icons/md";

const emptyForm = { name: "", email: "", password: "", role: "user" };

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });

  const showToast = (type, message) => setToast({ show: true, type, message });

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await usersAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditData(null); setShowModal(true); };
  const openEdit = (u) => {
    setForm({ name: u.name, email: "", password: "", role: u.role });
    setEditData(u);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;
    try {
      await usersAPI.deleteUser(id);
      showToast("success", "User berhasil dihapus.");
      loadUsers();
    } catch (err) {
      showToast("danger", "Gagal menghapus: " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await usersAPI.updateUser(editData.id, { name: form.name, role: form.role });
        showToast("success", "Data user berhasil diperbarui.");
      } else {
        if (!form.password || form.password.length < 6) {
          showToast("danger", "Password minimal 6 karakter.");
          return;
        }
        await usersAPI.createUser(form.name, form.email, form.password, form.role);
        showToast("success", "User baru berhasil ditambahkan.");
      }
      setShowModal(false);
      loadUsers();
    } catch (err) {
      showToast("danger", "Gagal: " + err.message);
    }
  };

  return (
    <div>
      <PageHeader title="Manajemen User" breadcrumb={["Dashboard", "Users"]}>
        <Button type="primary" onClick={openAdd}>
          <span className="flex items-center gap-1"><MdAdd className="text-lg" /> Tambah User</span>
        </Button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-10 text-center text-gray-400">Memuat data user...</div>
        ) : users.length === 0 ? (
          <EmptyState
            icon={<MdPeople />}
            title="Belum ada user"
            description="Tambah user pertama sekarang."
            action={<Button type="primary" onClick={openAdd}>Tambah User</Button>}
          />
        ) : (
          <Table headers={["Nama", "Role", "Dibuat", "Aksi"]}>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-garis last:border-0 hover:bg-latar transition">
                <td className="py-3">
                  <p className="font-medium text-teks">{u.name}</p>
                  <p className="text-xs text-teks-samping">{u.id.slice(0, 8)}...</p>
                </td>
                <td className="py-3">
                  <Badge type={u.role === "admin" ? "gold" : "info"}>{u.role}</Badge>
                </td>
                <td className="py-3 text-sm text-teks-samping">
                  {new Date(u.created_at).toLocaleDateString("id-ID")}
                </td>
                <td className="py-3">
                  <div className="flex space-x-2">
                    <Button type="primary" size="sm" onClick={() => openEdit(u)}><MdEdit /></Button>
                    <Button type="danger" size="sm" onClick={() => handleDelete(u.id)}><MdDelete /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title={editData ? "Edit User" : "Tambah User"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Nama" placeholder="Nama lengkap" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} required />
          {!editData && (
            <>
              <InputField label="Email" type="email" placeholder="email@domain.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required />
              <InputField label="Password" type="password" placeholder="Min. 6 karakter" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required />
            </>
          )}
          <SelectField label="Role" value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            options={["user", "admin"]} />
          <div className="flex gap-3 pt-2">
            <Button type="secondary" className="flex-1" onClick={() => setShowModal(false)}>Batal</Button>
            <Button type="primary" className="flex-1">Simpan</Button>
          </div>
        </form>
      </Modal>

      <Toast show={toast.show} type={toast.type} message={toast.message}
        onClose={() => setToast(t => ({ ...t, show: false }))} />
    </div>
  );
}
