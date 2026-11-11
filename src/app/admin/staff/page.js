import { apiFetch } from "@/lib/api";
import { StaffRow } from "@/components/admin/StaffRow";
import { CreateStaffForm } from '@/components/admin/CreateStaffForm';

export default async function StaffPage() {
  const res = await apiFetch("/api/admin/staff");
  const failed = !res.ok;
  const staff = failed ? [] : await res.json();

  return (
    <main>
      <h1>Staff accounts</h1>

      <CreateStaffForm />

      {failed && <p role="alert">Could not load staff.</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((user) => (
            <StaffRow key={user.id} user={user} />
          ))}
          {!failed && staff.length === 0 && (
            <tr>
              <td colSpan={5}>No staff accounts yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
