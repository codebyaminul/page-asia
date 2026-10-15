import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  type AdminUser,
} from "@/lib/admin-data";
import {
  Users,
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Save,
  Shield,
  Eye,
  UserCog,
  Briefcase,
  UserCheck,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
  head: () => ({
    meta: [{ title: "User Management — PAGE Admin" }],
  }),
});

function AdminUsers() {
  const [users, setUsers] = useState(() => getUsers());
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "viewer" as AdminUser["role"],
    status: "active" as AdminUser["status"],
  });

  const filtered = search
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  function handleAdd() {
    if (!formData.name || !formData.email) return;
    addUser(formData);
    setUsers(getUsers());
    setShowAdd(false);
    setFormData({ name: "", email: "", role: "viewer", status: "active" });
  }

  function startEdit(user: AdminUser) {
    setEditId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  }

  function handleUpdate() {
    if (!editId) return;
    updateUser(editId, formData);
    setUsers(getUsers());
    setEditId(null);
    setFormData({ name: "", email: "", role: "viewer", status: "active" });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this user?")) return;
    deleteUser(id);
    setUsers(getUsers());
  }

  function roleIcon(role: AdminUser["role"]) {
    switch (role) {
      case "admin":
        return <Shield className="h-3 w-3" />;
      case "product_manager":
        return <Briefcase className="h-3 w-3" />;
      case "staff":
        return <UserCheck className="h-3 w-3" />;
      default:
        return <Eye className="h-3 w-3" />;
    }
  }

  function roleColor(role: AdminUser["role"]) {
    switch (role) {
      case "admin":
        return "bg-red-500/15 text-red-400";
      case "product_manager":
        return "bg-purple-500/15 text-purple-400";
      case "staff":
        return "bg-blue-500/15 text-blue-400";
      default:
        return "bg-zinc-500/15 text-zinc-400";
    }
  }

  function roleLabel(role: AdminUser["role"]) {
    switch (role) {
      case "admin":
        return "Admin";
      case "product_manager":
        return "Product Manager";
      case "staff":
        return "Staff";
      default:
        return "Viewer";
    }
  }

  return (
    <AdminLayout activeRoute="/admin/users">
      <div className="p-6 lg:p-8 space-y-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Users</h1>
            <p className="text-[13px] text-zinc-500 mt-1">
              {users.length} registered users
            </p>
          </div>
          <button
            onClick={() => {
              setShowAdd(true);
              setEditId(null);
              setFormData({ name: "", email: "", role: "viewer", status: "active" });
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-[#232323] border border-white/[0.06] rounded-lg pl-9 pr-3 py-[7px] text-[13px] text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        {/* Add / Edit Modal */}
        {(showAdd || editId) && (
          <div className="bg-[#232323] border border-white/[0.06] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-white">
                {editId ? "Edit User" : "Add New User"}
              </h3>
              <button
                onClick={() => { setShowAdd(false); setEditId(null); }}
                className="h-7 w-7 rounded-md hover:bg-white/[0.06] text-zinc-400 flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-zinc-500 font-medium block mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-500 font-medium block mb-1.5">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. tanvir@company.com"
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-500 font-medium block mb-1.5">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminUser["role"] })}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none cursor-pointer"
                >
                  <option value="admin">Admin</option>
                  <option value="product_manager">Product Manager</option>
                  <option value="staff">Staff</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-zinc-500 font-medium block mb-1.5">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as AdminUser["status"] })}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { setShowAdd(false); setEditId(null); }}
                className="px-4 py-2 text-[13px] text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editId ? handleUpdate : handleAdd}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="h-3.5 w-3.5" />
                {editId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-[#232323] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">User</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Role</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Created</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Last Login</th>
                  <th className="text-center px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[12px] font-medium text-zinc-200 truncate">{user.name}</p>
                          <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleColor(user.role)}`}>
                        {roleIcon(user.role)}
                        {roleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        user.status === "active"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-red-500/15 text-red-400"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-zinc-400">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-[12px] text-zinc-500">
                      {user.lastLogin === "Never"
                        ? "Never"
                        : new Date(user.lastLogin).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => startEdit(user)}
                          className="h-7 w-7 rounded-md bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-200 transition-colors flex items-center justify-center"
                          title="Edit"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="h-7 w-7 rounded-md bg-white/[0.04] text-zinc-400 hover:bg-red-500/20 hover:text-red-400 transition-colors flex items-center justify-center"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-[13px] text-zinc-500">No users found</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
