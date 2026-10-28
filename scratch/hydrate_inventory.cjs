const fs = require('fs');
const filePath = 'C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect/src/routes/admin/inventory.tsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('getProductsFn')) {
  content = content.replace(
    'import { useState, useMemo, useRef } from "react";',
    'import { useState, useMemo, useRef, useEffect } from "react";\nimport { getProductsFn } from "@/lib/server-api";'
  );
  content = content.replace(
    '  deleteInventoryItem,',
    '  deleteInventoryItem,\n  saveInventory,'
  );
  const target = '  const [inventory, setInventory] = useState(() => getInventory());';
  const targetCRLF = target.replace(/\n/g, '\r\n');
  const replacement = `  const [inventory, setInventory] = useState(() => getInventory());

  useEffect(() => {
    getProductsFn()
      .then((data) => {
        if (data && data.length) {
          setInventory(data as InventoryItem[]);
          saveInventory(data as InventoryItem[]);
        }
      })
      .catch((err) => console.warn("Failed to fetch live inventory from DB:", err));
  }, []);`;

  if (content.includes(targetCRLF)) {
    content = content.replace(targetCRLF, replacement.replace(/\n/g, '\r\n'));
  } else if (content.includes(target)) {
    content = content.replace(target, replacement);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated inventory.tsx with live DB hydration');
}
