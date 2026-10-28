const fs = require('fs');
const path = require('path');

const root = 'C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect';

// 1. UPDATE src/routes/admin/quotes.tsx
{
  const filePath = path.join(root, 'src/routes/admin/quotes.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('getQuotesFn')) {
    content = content.replace(
      'import { useState } from "react";',
      'import { useState, useEffect } from "react";\nimport { getQuotesFn } from "@/lib/server-api";'
    );

    const initTarget = '  const [quotes, setQuotes] = useState(() => getQuotes());';
    const initTargetCRLF = '  const [quotes, setQuotes] = useState(() => getQuotes());';
    const effectCode = `  const [quotes, setQuotes] = useState(() => getQuotes());

  useEffect(() => {
    getQuotesFn()
      .then((data) => {
        if (data && data.length) {
          setQuotes(data);
          saveQuotes(data);
        }
      })
      .catch((err) => console.warn("Failed to fetch live quotes from DB:", err));
  }, []);`;

    if (content.includes(initTargetCRLF)) {
      content = content.replace(initTargetCRLF, effectCode.replace(/\n/g, '\r\n'));
    } else if (content.includes(initTarget)) {
      content = content.replace(initTarget, effectCode);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated src/routes/admin/quotes.tsx with live DB hydration");
  }
}

// 2. UPDATE src/routes/admin/bookings.tsx
{
  const filePath = path.join(root, 'src/routes/admin/bookings.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('getBookingsFn')) {
    content = content.replace(
      'import { useState } from "react";',
      'import { useState, useEffect } from "react";\nimport { getBookingsFn } from "@/lib/server-api";\nimport { saveBookings } from "@/lib/admin-data";'
    );

    const initTarget = '  const [bookings, setBookings] = useState(() => getBookings());';
    const initTargetCRLF = '  const [bookings, setBookings] = useState(() => getBookings());';
    const effectCode = `  const [bookings, setBookings] = useState(() => getBookings());

  useEffect(() => {
    getBookingsFn()
      .then((data) => {
        if (data && data.length) {
          setBookings(data);
          saveBookings(data);
        }
      })
      .catch((err) => console.warn("Failed to fetch live bookings from DB:", err));
  }, []);`;

    if (content.includes(initTargetCRLF)) {
      content = content.replace(initTargetCRLF, effectCode.replace(/\n/g, '\r\n'));
    } else if (content.includes(initTarget)) {
      content = content.replace(initTarget, effectCode);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated src/routes/admin/bookings.tsx with live DB hydration");
  }
}

// 3. UPDATE src/routes/admin/index.tsx
{
  const filePath = path.join(root, 'src/routes/admin/index.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('getAdminStatsFn')) {
    content = content.replace(
      'import { getAdminStats, getQuotes, getBookings } from "@/lib/admin-data";',
      'import { getAdminStats, getQuotes, getBookings, getOrders, type AdminOrder } from "@/lib/admin-data";\nimport { getAdminStatsFn, getQuotesFn, getBookingsFn, getAdminOrdersFn } from "@/lib/server-api";\nimport { useState, useEffect } from "react";'
    );

    content = content.replace(
      'import {\n  Package,',
      'import {\n  Package,\n  ShoppingBag,'
    );

    const dashboardFuncTarget = `function AdminDashboard() {
  const stats = getAdminStats();
  const quotes = getQuotes();
  const bookings = getBookings();

  const recentQuotes = quotes.slice(0, 5);
  const recentBookings = bookings.slice(0, 5);`;

    const dashboardFuncTargetCRLF = dashboardFuncTarget.replace(/\n/g, '\r\n');

    const dashboardFuncReplacement = `function AdminDashboard() {
  const [stats, setStats] = useState<any>(() => getAdminStats());
  const [quotes, setQuotes] = useState(() => getQuotes());
  const [bookings, setBookings] = useState(() => getBookings());
  const [orders, setOrders] = useState<AdminOrder[]>(() => getOrders());

  useEffect(() => {
    Promise.allSettled([
      getAdminStatsFn(),
      getQuotesFn(),
      getBookingsFn(),
      getAdminOrdersFn(),
    ]).then(([sRes, qRes, bRes, oRes]) => {
      if (sRes.status === "fulfilled" && sRes.value) setStats(sRes.value);
      if (qRes.status === "fulfilled" && qRes.value) setQuotes(qRes.value);
      if (bRes.status === "fulfilled" && bRes.value) setBookings(bRes.value);
      if (oRes.status === "fulfilled" && oRes.value) setOrders(oRes.value as AdminOrder[]);
    });
  }, []);

  const recentQuotes = quotes.slice(0, 5);
  const recentBookings = bookings.slice(0, 5);
  const recentOrders = orders.slice(0, 5);`;

    if (content.includes(dashboardFuncTargetCRLF)) {
      content = content.replace(dashboardFuncTargetCRLF, dashboardFuncReplacement.replace(/\n/g, '\r\n'));
    } else if (content.includes(dashboardFuncTarget)) {
      content = content.replace(dashboardFuncTarget, dashboardFuncReplacement);
    } else {
      console.warn("Could not find dashboardFuncTarget in admin/index.tsx");
    }

    // Add 5th Stat Card for Orders in Stats Grid
    const statGridTarget = `<StatCard
            icon={CalendarCheck}
            label="Upcoming Bookings"
            value={stats.confirmedBookings}
            sub={\`\${stats.pendingBookings} awaiting confirmation\`}
            trend="+8.7%"
            trendUp
            color="#8b5cf6"
          />`;
    const statGridTargetCRLF = statGridTarget.replace(/\n/g, '\r\n');

    const ordersStatCard = `<StatCard
            icon={CalendarCheck}
            label="Upcoming Bookings"
            value={stats.confirmedBookings}
            sub={\`\${stats.pendingBookings} awaiting confirmation\`}
            trend="+8.7%"
            trendUp
            color="#8b5cf6"
          />
          <StatCard
            icon={ShoppingBag}
            label="Customer Orders"
            value={stats.totalOrders || orders.length}
            sub={\`\${stats.pendingOrders || 0} pending fulfillment\`}
            trend="+18.4%"
            trendUp
            color="#06b6d4"
          />`;

    if (content.includes(statGridTargetCRLF)) {
      content = content.replace(statGridTargetCRLF, ordersStatCard.replace(/\n/g, '\r\n'));
    } else if (content.includes(statGridTarget)) {
      content = content.replace(statGridTarget, ordersStatCard);
    }

    // Change stat grid from 4 cols to 5 cols (or responsive xl:grid-cols-5)
    content = content.replace(
      'className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"',
      'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"'
    );

    // Add Recent Customer Orders table before Recent Quotes & Bookings
    const tablesTarget = '{/* Tables Row */}\n        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">';
    const tablesTargetCRLF = '{/* Tables Row */}\r\n        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">';

    const tablesReplacement = `{/* Tables Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Recent Orders */}
          <div className="bg-[#232323] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-white">Recent Customer Orders</h3>
              <a
                href="/admin/orders"
                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                View all →
              </a>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {recentOrders.map((o) => (
                <div key={o.id} className="px-5 py-3 flex items-center gap-3 hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-zinc-200 truncate">
                      {o.companyName || o.fullName}
                    </p>
                    <p className="text-[11px] text-zinc-500 truncate font-mono">
                      #{o.id} &bull; {taka(o.total)}
                    </p>
                  </div>
                  <span
                    className={\`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 \${
                      o.status === "pending"
                        ? "bg-amber-500/15 text-amber-400"
                        : o.status === "confirmed"
                        ? "bg-blue-500/15 text-blue-400"
                        : o.status === "dispatched"
                        ? "bg-purple-500/15 text-purple-400"
                        : o.status === "delivered"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }\`}
                  >
                    {o.status}
                  </span>
                </div>
              ))}
              {recentOrders.length === 0 && (
                <p className="text-zinc-600 text-[12px] text-center py-8">No customer orders yet</p>
              )}
            </div>
          </div>`;

    if (content.includes(tablesTargetCRLF)) {
      content = content.replace(tablesTargetCRLF, tablesReplacement.replace(/\n/g, '\r\n'));
    } else if (content.includes(tablesTarget)) {
      content = content.replace(tablesTarget, tablesReplacement);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated src/routes/admin/index.tsx with live stats & recent orders");
  }
}
