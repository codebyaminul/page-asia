const fs = require('fs');
const path = require('path');

const root = 'C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect';

// 1. services.book.tsx
{
  const filePath = path.join(root, 'src/routes/services.book.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('getCurrentCustomerFn')) {
    content = content.replace(
      'import { useState } from "react";',
      'import { useState, useEffect } from "react";\nimport { getCurrentCustomerFn } from "@/lib/server-api";'
    );

    const targetState = '  const [info, setInfo] = useState({\n    contactPerson: "",\n    phone: "",\n    email: "",\n    notes: "",\n  });';
    const targetStateCRLF = targetState.replace(/\n/g, '\r\n');
    
    const replacement = `${targetState}\n\n  const [customer, setCustomer] = useState<any>(null);\n\n  useEffect(() => {\n    getCurrentCustomerFn()\n      .then((c) => {\n        if (c) {\n          setCustomer(c);\n          setBiz((prev) => ({\n            ...prev,\n            businessName: c.companyName || prev.businessName,\n            businessType: c.businessType || prev.businessType,\n          }));\n          setInfo((prev) => ({\n            ...prev,\n            contactPerson: c.fullName || prev.contactPerson,\n            phone: c.phone || prev.phone,\n            email: c.email || prev.email,\n          }));\n        }\n      })\n      .catch(() => {});\n  }, []);`;

    if (content.includes(targetStateCRLF)) {
      content = content.replace(targetStateCRLF, replacement.replace(/\n/g, '\r\n'));
    } else if (content.includes(targetState)) {
      content = content.replace(targetState, replacement);
    } else {
      console.warn("Could not find targetState in services.book.tsx");
    }

    // Add customer banner if logged in above the step progress
    const bannerTarget = '{/* Step Progress Tracker */}';
    const bannerCode = `{customer && (
          <div className="mt-6 flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-4 text-xs">
            <div className="flex items-center gap-2.5">
              <Building2 className="h-4 w-4 text-primary" />
              <span>
                Authenticated as <strong className="text-foreground">{customer.companyName || customer.fullName}</strong> ({customer.email}) &bull; Pre-filled your client details.
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
              Linked Account
            </span>
          </div>
        )}\n\n        {/* Step Progress Tracker */}`;

    content = content.replace(bannerTarget, bannerCode);

    // Also update completion screen buttons to include View in Client Portal
    const completionTarget = `<Link
            to="/shop"
            search={{ cat: "Garage Equipment" }}
            className="btn btn-primary h-11 px-6 text-xs font-bold uppercase tracking-wider"
          >
            Explore Equipment Catalogue
          </Link>`;
    const completionTargetCRLF = completionTarget.replace(/\n/g, '\r\n');

    const completionReplacement = `<Link
            to="/account"
            className="btn btn-primary h-11 px-6 text-xs font-bold uppercase tracking-wider"
          >
            View in Client Portal
          </Link>
          <Link
            to="/shop"
            search={{ cat: "Garage Equipment" }}
            className="btn btn-outline h-11 px-6 text-xs font-bold uppercase tracking-wider"
          >
            Explore Equipment Catalogue
          </Link>`;

    if (content.includes(completionTargetCRLF)) {
      content = content.replace(completionTargetCRLF, completionReplacement.replace(/\n/g, '\r\n'));
    } else if (content.includes(completionTarget)) {
      content = content.replace(completionTarget, completionReplacement);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated services.book.tsx");
  }
}

// 2. QuoteModal.tsx
{
  const filePath = path.join(root, 'src/components/site/QuoteModal.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('getCurrentCustomerFn')) {
    content = content.replace(
      'import { useState } from "react";',
      'import { useState, useEffect } from "react";\nimport { Link } from "@tanstack/react-router";\nimport { getCurrentCustomerFn } from "@/lib/server-api";'
    );

    const targetState = `  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    businessType: "Workshop / Garage",
    city: "Dhaka",
    notes: "",
  });`;
    const targetStateCRLF = targetState.replace(/\n/g, '\r\n');

    const replacement = `${targetState}\n  const [customer, setCustomer] = useState<any>(null);\n\n  useEffect(() => {\n    getCurrentCustomerFn()\n      .then((c) => {\n        if (c) {\n          setCustomer(c);\n          setFormData((prev) => ({\n            ...prev,\n            companyName: c.companyName || prev.companyName,\n            contactName: c.fullName || prev.contactName,\n            phone: c.phone || prev.phone,\n            email: c.email || prev.email,\n            businessType: c.businessType || prev.businessType,\n            city: c.city || prev.city,\n          }));\n        }\n      })\n      .catch(() => {});\n  }, []);`;

    if (content.includes(targetStateCRLF)) {
      content = content.replace(targetStateCRLF, replacement.replace(/\n/g, '\r\n'));
    } else if (content.includes(targetState)) {
      content = content.replace(targetState, replacement);
    }

    // Add account link in completion screen
    const doneCloseTarget = `<button
              onClick={handleReset}
              className="btn btn-outline h-11 px-6 text-xs font-bold uppercase tracking-wider"
            >
              Close Window
            </button>`;
    const doneCloseTargetCRLF = doneCloseTarget.replace(/\n/g, '\r\n');
    const doneCloseReplacement = `<Link
              to="/account"
              className="btn btn-primary h-11 px-6 text-xs font-bold uppercase tracking-wider"
            >
              View in Client Portal
            </Link>
            <button
              onClick={handleReset}
              className="btn btn-outline h-11 px-6 text-xs font-bold uppercase tracking-wider"
            >
              Close Window
            </button>`;

    if (content.includes(doneCloseTargetCRLF)) {
      content = content.replace(doneCloseTargetCRLF, doneCloseReplacement.replace(/\n/g, '\r\n'));
    } else if (content.includes(doneCloseTarget)) {
      content = content.replace(doneCloseTarget, doneCloseReplacement);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated QuoteModal.tsx");
  }
}

// 3. cart.tsx
{
  const filePath = path.join(root, 'src/routes/cart.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('getCurrentCustomerFn')) {
    content = content.replace(
      'import { useState } from "react";',
      'import { useState, useEffect } from "react";\nimport { getCurrentCustomerFn } from "@/lib/server-api";'
    );

    const targetState = `  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    city: "Dhaka",
    notes: "",
  });`;
    const targetStateCRLF = targetState.replace(/\n/g, '\r\n');

    const replacement = `${targetState}\n  const [customer, setCustomer] = useState<any>(null);\n\n  useEffect(() => {\n    getCurrentCustomerFn()\n      .then((c) => {\n        if (c) {\n          setCustomer(c);\n          setFormData((prev) => ({\n            ...prev,\n            companyName: c.companyName || prev.companyName,\n            contactName: c.fullName || prev.contactName,\n            phone: c.phone || prev.phone,\n            email: c.email || prev.email,\n            city: c.city || prev.city,\n          }));\n        }\n      })\n      .catch(() => {});\n  }, []);`;

    if (content.includes(targetStateCRLF)) {
      content = content.replace(targetStateCRLF, replacement.replace(/\n/g, '\r\n'));
    } else if (content.includes(targetState)) {
      content = content.replace(targetState, replacement);
    }

    // Add account link in completion screen of cart.tsx
    const cartDoneTarget = `<Link to="/shop" className="btn btn-primary h-11 px-6 text-xs font-bold uppercase">
            Browse More Equipment
          </Link>`;
    const cartDoneTargetCRLF = cartDoneTarget.replace(/\n/g, '\r\n');
    const cartDoneReplacement = `<Link to="/account" className="btn btn-primary h-11 px-6 text-xs font-bold uppercase">
            Track in Client Portal
          </Link>
          <Link to="/shop" className="btn btn-outline h-11 px-6 text-xs font-bold uppercase">
            Browse More Equipment
          </Link>`;

    if (content.includes(cartDoneTargetCRLF)) {
      content = content.replace(cartDoneTargetCRLF, cartDoneReplacement.replace(/\n/g, '\r\n'));
    } else if (content.includes(cartDoneTarget)) {
      content = content.replace(cartDoneTarget, cartDoneReplacement);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated cart.tsx");
  }
}

// 4. shop.$slug.tsx
{
  const filePath = path.join(root, 'src/routes/shop.$slug.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('getCurrentCustomerFn')) {
    content = content.replace(
      'import { addQuote } from "@/lib/admin-data";',
      'import { addQuote } from "@/lib/admin-data";\nimport { getCurrentCustomerFn } from "@/lib/server-api";'
    );

    const targetState = `  const [quoteData, setQuoteData] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    businessType: "Workshop",
    quantity: String(qty),
    notes: "",
  });`;
    const targetStateCRLF = targetState.replace(/\n/g, '\r\n');

    const replacement = `${targetState}\n  const [customer, setCustomer] = useState<any>(null);\n\n  useEffect(() => {\n    getCurrentCustomerFn()\n      .then((c) => {\n        if (c) {\n          setCustomer(c);\n          setQuoteData((prev) => ({\n            ...prev,\n            businessName: c.companyName || prev.businessName,\n            contactPerson: c.fullName || prev.contactPerson,\n            phone: c.phone || prev.phone,\n            email: c.email || prev.email,\n            businessType: c.businessType || prev.businessType,\n          }));\n        }\n      })\n      .catch(() => {});\n  }, []);`;

    if (content.includes(targetStateCRLF)) {
      content = content.replace(targetStateCRLF, replacement.replace(/\n/g, '\r\n'));
    } else if (content.includes(targetState)) {
      content = content.replace(targetState, replacement);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated shop.$slug.tsx");
  }
}
