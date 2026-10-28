const fs = require('fs');
const path = require('path');

const root = 'C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect';

// -----------------------------------------------------------------------------
// 1. UPDATE src/lib/db-queries.ts
// -----------------------------------------------------------------------------
{
  const filePath = path.join(root, 'src/lib/db-queries.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('export async function updateDbCustomerProfile')) {
    const target = 'export async function getDbCustomerBookings(customerId: string) {';
    const profileFns = `export async function updateDbCustomerProfile(
  customerId: string,
  data: {
    fullName?: string;
    phone?: string;
    companyName?: string;
    binVatNumber?: string;
    businessType?: string;
    streetAddress?: string;
    city?: string;
  }
) {
  const rows = await sql\`
    UPDATE customers
    SET
      full_name = COALESCE(\${data.fullName ? data.fullName.trim() : null}, full_name),
      phone = COALESCE(\${data.phone ? data.phone.trim() : null}, phone),
      company_name = COALESCE(\${data.companyName ? data.companyName.trim() : null}, company_name),
      bin_vat_number = COALESCE(\${data.binVatNumber ? data.binVatNumber.trim() : null}, bin_vat_number),
      business_type = COALESCE(\${data.businessType || null}, business_type),
      street_address = COALESCE(\${data.streetAddress ? data.streetAddress.trim() : null}, street_address),
      city = COALESCE(\${data.city ? data.city.trim() : null}, city),
      updated_at = NOW()
    WHERE id = \${customerId}
    RETURNING id, email, full_name, phone, company_name, bin_vat_number,
              business_type, street_address, city, status, email_verified,
              created_at, last_login
  \`;

  if (rows.length === 0) {
    throw new Error("Customer account not found.");
  }

  const c = rows[0];
  return {
    id: c.id,
    email: c.email,
    fullName: c.full_name,
    phone: c.phone,
    companyName: c.company_name,
    binVatNumber: c.bin_vat_number,
    businessType: c.business_type,
    streetAddress: c.street_address,
    city: c.city,
    status: c.status,
    emailVerified: c.email_verified,
    createdAt: new Date(c.created_at).toISOString(),
    lastLogin: c.last_login ? new Date(c.last_login).toISOString() : undefined,
  } as CustomerProfile;
}

export async function changeDbCustomerPassword(
  customerId: string,
  currentPassword: string,
  newPassword: string
) {
  const rows = await sql\`
    SELECT id, (password_hash = crypt(\${currentPassword}, password_hash)) AS valid_password
    FROM customers
    WHERE id = \${customerId}
    LIMIT 1
  \`;

  if (rows.length === 0) {
    return { success: false, error: "Customer account not found." };
  }
  if (!rows[0].valid_password) {
    return { success: false, error: "Current password does not match our records." };
  }
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "New password must be at least 6 characters long." };
  }

  await sql\`
    UPDATE customers
    SET password_hash = crypt(\${newPassword}, gen_salt('bf')), updated_at = NOW()
    WHERE id = \${customerId}
  \`;

  return { success: true };
}

`;

    content = content.replace(target, profileFns + target);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated src/lib/db-queries.ts with customer profile methods");
  }
}

// -----------------------------------------------------------------------------
// 2. UPDATE src/lib/server-api.ts
// -----------------------------------------------------------------------------
{
  const filePath = path.join(root, 'src/lib/server-api.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('export const updateCustomerProfileFn')) {
    // Import updateDbCustomerProfile & changeDbCustomerPassword
    content = content.replace(
      '  getDbCustomerBookings,',
      '  getDbCustomerBookings,\n  updateDbCustomerProfile,\n  changeDbCustomerPassword,'
    );

    const rpcFns = `\nexport const updateCustomerProfileFn = createServerFn({ method: "POST" })
  .validator((data: {
    fullName?: string;
    phone?: string;
    companyName?: string;
    binVatNumber?: string;
    businessType?: string;
    streetAddress?: string;
    city?: string;
  }) => data)
  .handler(async ({ data }) => {
    const currentCustomer = await getCustomerAuthContext();
    if (!currentCustomer) throw new Error("Unauthorized. Please log in.");
    return await updateDbCustomerProfile(currentCustomer.id, data);
  });

export const changeCustomerPasswordFn = createServerFn({ method: "POST" })
  .validator((data: { currentPassword: string; newPassword: string }) => data)
  .handler(async ({ data }) => {
    const currentCustomer = await getCustomerAuthContext();
    if (!currentCustomer) throw new Error("Unauthorized. Please log in.");
    return await changeDbCustomerPassword(currentCustomer.id, data.currentPassword, data.newPassword);
  });
`;

    content += rpcFns;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated src/lib/server-api.ts with profile update server RPCs");
  }
}

// -----------------------------------------------------------------------------
// 3. UPDATE src/routes/account.tsx
// -----------------------------------------------------------------------------
{
  const filePath = path.join(root, 'src/routes/account.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Import updateCustomerProfileFn and changeCustomerPasswordFn
  if (!content.includes('updateCustomerProfileFn')) {
    content = content.replace(
      '  getCustomerBookingsFn,',
      '  getCustomerBookingsFn,\n  updateCustomerProfileFn,\n  changeCustomerPasswordFn,'
    );

    // Add Edit / Password state in AccountPage
    const stateAnchor = '  const [activeTab, setActiveTab] = useState<"orders" | "quotes" | "bookings" | "profile">("orders");';
    const stateAnchorCRLF = '  const [activeTab, setActiveTab] = useState<"orders" | "quotes" | "bookings" | "profile">("orders");';
    const newStates = `  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [editFullName, setEditFullName] = useState("");
  const [editCompanyName, setEditCompanyName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editBinVat, setEditBinVat] = useState("");
  const [editCity, setEditCity] = useState("Dhaka");
  const [editBusinessType, setEditBusinessType] = useState("Workshop / Garage");

  // Password change state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
`;

    if (content.includes(stateAnchorCRLF)) {
      content = content.replace(stateAnchorCRLF, stateAnchorCRLF + '\n' + newStates.replace(/\n/g, '\r\n'));
    } else {
      content = content.replace(stateAnchor, stateAnchor + '\n' + newStates);
    }

    // Set edit form values when customer loads
    const loadAnchor = 'setCustomer(c);';
    const loadAnchorCRLF = 'setCustomer(c);';
    const loadEnhance = `setCustomer(c);
          setEditFullName(c.fullName || "");
          setEditCompanyName(c.companyName || "");
          setEditPhone(c.phone || "");
          setEditBinVat(c.binVatNumber || "");
          setEditCity(c.city || "Dhaka");
          setEditBusinessType(c.businessType || "Workshop / Garage");`;

    if (content.includes(loadAnchorCRLF)) {
      content = content.replace(loadAnchorCRLF, loadEnhance.replace(/\n/g, '\r\n'));
    } else {
      content = content.replace(loadAnchor, loadEnhance);
    }

    // Replace the profile tab view with interactive editable card and password card
    const profileTabStart = '/* PROFILE TAB */';
    const profileTabTarget = `<div className="max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-3">
                    Registered Workshop Credentials
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-zinc-500 uppercase tracking-wider font-semibold">Company Name</span>
                      <p className="mt-1 font-bold text-zinc-200">{customer.companyName || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 uppercase tracking-wider font-semibold">Contact Person</span>
                      <p className="mt-1 font-bold text-zinc-200">{customer.fullName}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 uppercase tracking-wider font-semibold">Official Email</span>
                      <p className="mt-1 font-mono text-zinc-200">{customer.email}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 uppercase tracking-wider font-semibold">Contact Phone</span>
                      <p className="mt-1 font-bold text-zinc-200">{customer.phone}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 uppercase tracking-wider font-semibold">VAT / BIN Registration</span>
                      <p className="mt-1 font-mono text-zinc-200">{customer.binVatNumber || "Not recorded"}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 uppercase tracking-wider font-semibold">City Location</span>
                      <p className="mt-1 font-bold text-zinc-200">{customer.city}</p>
                    </div>
                  </div>
                </div>`;

    const profileTabReplacement = `<div className="max-w-3xl space-y-6">
                  {/* Workshop Profile Card */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                          Registered B2B Facility Credentials
                        </h3>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          Commercial details pre-filled during quotation and equipment checkout.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsEditingProfile(!isEditingProfile);
                          setProfileMsg(null);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-all"
                      >
                        {isEditingProfile ? "Cancel" : "Edit Profile"}
                      </button>
                    </div>

                    {profileMsg && (
                      <div className={\`p-3 rounded-lg text-xs font-medium \${
                        profileMsg.type === "success"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }\`}>
                        {profileMsg.text}
                      </div>
                    )}

                    {!isEditingProfile ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">Company / Workshop Name</span>
                          <p className="mt-1 font-bold text-zinc-200 text-sm">{customer.companyName || "N/A"}</p>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">Lead Representative</span>
                          <p className="mt-1 font-bold text-zinc-200 text-sm">{customer.fullName}</p>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">Corporate Email</span>
                          <p className="mt-1 font-mono text-zinc-300">{customer.email}</p>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">Contact Phone / WhatsApp</span>
                          <p className="mt-1 font-bold text-zinc-200">{customer.phone}</p>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">VAT / BIN Registration</span>
                          <p className="mt-1 font-mono text-emerald-400">{customer.binVatNumber || "Not recorded"}</p>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">Facility City / Hub</span>
                          <p className="mt-1 font-bold text-zinc-200">{customer.city}</p>
                        </div>
                      </div>
                    ) : (
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setProfileSaving(true);
                          setProfileMsg(null);
                          try {
                            const updated = await updateCustomerProfileFn({
                              data: {
                                fullName: editFullName,
                                companyName: editCompanyName,
                                phone: editPhone,
                                binVatNumber: editBinVat,
                                city: editCity,
                                businessType: editBusinessType,
                              },
                            });
                            setCustomer(updated);
                            setIsEditingProfile(false);
                            setProfileMsg({ type: "success", text: "Workshop profile updated successfully." });
                          } catch (err: any) {
                            setProfileMsg({ type: "error", text: err.message || "Failed to update profile." });
                          } finally {
                            setProfileSaving(false);
                          }
                        }}
                        className="space-y-4 text-xs"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">Company Name</label>
                            <input
                              type="text"
                              value={editCompanyName}
                              onChange={(e) => setEditCompanyName(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">Lead Representative</label>
                            <input
                              type="text"
                              required
                              value={editFullName}
                              onChange={(e) => setEditFullName(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">Phone / WhatsApp</label>
                            <input
                              type="tel"
                              required
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">VAT / BIN Registration</label>
                            <input
                              type="text"
                              placeholder="e.g. 123456789-0101"
                              value={editBinVat}
                              onChange={(e) => setEditBinVat(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">Facility City</label>
                            <input
                              type="text"
                              value={editCity}
                              onChange={(e) => setEditCity(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">Business Sector</label>
                            <select
                              value={editBusinessType}
                              onChange={(e) => setEditBusinessType(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                            >
                              <option value="Workshop / Garage">Workshop / Garage</option>
                              <option value="Tyre Service Center">Tyre Service Center</option>
                              <option value="Dealership Workshop">Dealership Workshop</option>
                              <option value="Fleet Operator">Fleet Operator</option>
                              <option value="EV Business">EV Business</option>
                              <option value="Distributor">Distributor</option>
                              <option value="Independent Technician">Independent Technician</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsEditingProfile(false)}
                            className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={profileSaving}
                            className="btn btn-primary h-9 px-5 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                          >
                            {profileSaving ? "Saving..." : "Save Changes"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Security / Password Card */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-3">
                      Account Security & Password
                    </h3>

                    {pwMsg && (
                      <div className={\`p-3 rounded-lg text-xs font-medium \${
                        pwMsg.type === "success"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }\`}>
                        {pwMsg.text}
                      </div>
                    )}

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (newPw !== confirmPw) {
                          setPwMsg({ type: "error", text: "New passwords do not match." });
                          return;
                        }
                        setPwSaving(true);
                        setPwMsg(null);
                        try {
                          const res = await changeCustomerPasswordFn({
                            data: { currentPassword: currentPw, newPassword: newPw },
                          });
                          if (res.success) {
                            setPwMsg({ type: "success", text: "Password changed successfully." });
                            setCurrentPw("");
                            setNewPw("");
                            setConfirmPw("");
                          } else {
                            setPwMsg({ type: "error", text: (res as any).error || "Failed to change password." });
                          }
                        } catch (err: any) {
                          setPwMsg({ type: "error", text: err.message || "Failed to update password." });
                        } finally {
                          setPwSaving(false);
                        }
                      }}
                      className="space-y-4 text-xs max-w-md"
                    >
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">Current Password</label>
                        <input
                          type="password"
                          required
                          value={currentPw}
                          onChange={(e) => setCurrentPw(e.target.value)}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">New Password (min 6 characters)</label>
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={newPw}
                          onChange={(e) => setNewPw(e.target.value)}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">Confirm New Password</label>
                        <input
                          type="password"
                          required
                          value={confirmPw}
                          onChange={(e) => setConfirmPw(e.target.value)}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={pwSaving}
                        className="btn btn-outline h-9 px-5 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                      >
                        {pwSaving ? "Updating..." : "Update Password"}
                      </button>
                    </form>
                  </div>
                </div>`;

    const profileTabTargetCRLF = profileTabTarget.replace(/\n/g, '\r\n');
    if (content.includes(profileTabTargetCRLF)) {
      content = content.replace(profileTabTargetCRLF, profileTabReplacement.replace(/\n/g, '\r\n'));
    } else if (content.includes(profileTabTarget)) {
      content = content.replace(profileTabTarget, profileTabReplacement);
    } else {
      console.warn("Could not find profileTabTarget in account.tsx");
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated src/routes/account.tsx with Profile editing and Password change forms");
  }
}
