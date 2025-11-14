# GST Compliance Guide for SaaS in India
## Complete Guide for InventoryFlow

**Updated:** November 2025  
**Applicable:** All SaaS businesses in India

---

## 🇮🇳 Quick Overview

### **What You Need to Know:**
- **GST Rate for SaaS:** 18% (9% CGST + 9% SGST for intra-state, 18% IGST for inter-state)
- **SAC Code:** 998314 (Online data processing services)
- **Threshold:** ₹20 lakhs (but register early for B2B)
- **Filing:** Monthly returns
- **Invoicing:** Must include GSTIN, SAC code, breakdown

---

## 📋 Step 1: GST Registration

### **Who Needs GST:**
✅ If you're selling B2B SaaS  
✅ Even if turnover < ₹20 lakhs (voluntary registration recommended)  
✅ Required for input tax credit  
✅ Professional credibility with business customers

### **Documents Required:**
1. **PAN Card** (Company/Proprietor)
2. **Aadhaar Card** (Proprietor/Directors)
3. **Business Address Proof:**
   - Electricity bill
   - Rent agreement
   - Property tax receipt
4. **Bank Account Details:**
   - Cancelled cheque
   - Bank statement (1 month)
5. **Digital Signature** (for Pvt Ltd companies)
6. **Photos** (Passport size of proprietor/directors)
7. **Authorization Letter** (if CA is applying)

### **Registration Process:**

**Option A: Self-Registration (Free)**
1. Go to https://www.gst.gov.in
2. Click "Register Now" → "New Registration"
3. Fill Part A (Basic details) → Get TRN (Temporary Reference Number)
4. Complete Part B (Detailed application)
5. Upload documents
6. E-sign and submit
7. Receive GSTIN within 3-7 working days

**Option B: Through CA (₹5,000 - ₹10,000)**
- Faster (2-3 days)
- No hassle
- Expert handling
- Recommended if first time

### **Your GSTIN Format:**
```
29AAAAA1234A1Z5
││││││││││││││└─ Check digit
│││││││││││││└── State code (A-Z)
││││││││││││└─── 1 (default)
│││││││││││└──── Taxpayer type (A-Z)
││││││││││└───── 4 digit code (0001-9999)
│││││││└──────── PAN (10 digits)
││└──────────────State code (01-37)

Example: 29ABCDE1234F1Z5
- 29 = Karnataka
- ABCDE1234F = Your PAN
- 1 = First registration
- Z = Company type
- 5 = Check digit
```

---

## 💰 Step 2: Pricing with GST

### **Always Price GST-Inclusive:**

```typescript
// Your pricing structure
const plans = {
  starter: {
    displayPrice: 2999,      // What customer sees
    basePrice: 2542,         // Actual revenue (without GST)
    gst: 457,                // 18% GST
    cgst: 228.5,             // 9% CGST (if same state)
    sgst: 228.5,             // 9% SGST (if same state)
    // OR
    igst: 457                // 18% IGST (if different state)
  },
  professional: {
    displayPrice: 7999,
    basePrice: 6779,
    gst: 1220
  },
  business: {
    displayPrice: 14999,
    basePrice: 12711,
    gst: 2288
  }
};
```

### **Pricing Page Display:**
```
Starter Plan
₹2,999/month (inclusive of GST)

Professional Plan
₹7,999/month (inclusive of GST)

Business Plan
₹14,999/month (inclusive of GST)

* All prices are inclusive of 18% GST
* GST breakdown will be shown in invoice
```

---

## 🧾 Step 3: GST Invoicing

### **Invoice Format (Mandatory Fields):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    TAX INVOICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Invoice No: INV-2025-001             Date: 15/11/2025
Original for Recipient

SUPPLIER (Your Company):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
InventoryFlow Technologies Pvt Ltd
GSTIN: 29XXXXX1234X1Z5
Address: #123, MG Road, Bangalore - 560001
State: Karnataka (29)
Email: billing@inventoryflow.com
Phone: +91-XXXXXXXXXX

RECIPIENT (Customer):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Customer Company Name
GSTIN: 29YYYYY5678Y1Z3 (if available)
Address: Customer address
State: Karnataka (29)
Email: customer@example.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESCRIPTION OF SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Description: InventoryFlow Professional Plan
Period: 01/11/2025 to 30/11/2025
SAC Code: 998314
HSN Code: N/A (Services)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AMOUNT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Taxable Value:                           ₹6,779.00
CGST @ 9%:                                 ₹610.11
SGST @ 9%:                                 ₹610.11
                                        ───────────
TOTAL AMOUNT:                            ₹7,999.22
                                        ===========

Amount in Words: Seven Thousand Nine Hundred 
Ninety-Nine Rupees and Twenty-Two Paise Only

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAYMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Payment Method: Online (Razorpay)
Transaction ID: pay_XXXXXXXXXXXXXXX
Date: 15/11/2025
Status: PAID

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERMS & CONDITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. This is a computer-generated invoice
2. Service period: Monthly subscription
3. Auto-renewal: Unless cancelled
4. Refund policy: As per Terms of Service
5. Support: support@inventoryflow.com

Place of Supply: Karnataka (29)
Whether tax is payable under reverse charge: No

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                 Digitally Signed
          InventoryFlow Technologies Pvt Ltd
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### **Code to Generate Invoice:**

```typescript
// lib/invoice.ts
import { jsPDF } from 'jspdf';

export async function generateGSTInvoice(subscription: {
  id: string;
  customerId: string;
  planName: string;
  basePrice: number;
  gstAmount: number;
  totalPrice: number;
  customerGSTIN?: string;
  customerName: string;
  customerAddress: string;
  customerState: string;
  invoiceNumber: string;
  date: Date;
  razorpayPaymentId: string;
}) {
  const doc = new jsPDF();
  
  // Your company details
  const companyDetails = {
    name: 'InventoryFlow Technologies Pvt Ltd',
    gstin: process.env.COMPANY_GSTIN,
    address: '#123, MG Road, Bangalore - 560001',
    state: 'Karnataka (29)',
    email: 'billing@inventoryflow.com',
    phone: '+91-XXXXXXXXXX'
  };
  
  // Add content to PDF
  // ... (detailed PDF generation code)
  
  // Save PDF
  const pdfBuffer = doc.output('arraybuffer');
  
  // Upload to storage
  const pdfUrl = await uploadToS3(pdfBuffer, `invoices/${subscription.invoiceNumber}.pdf`);
  
  // Send email
  await sendInvoiceEmail({
    to: subscription.customerEmail,
    invoiceNumber: subscription.invoiceNumber,
    pdfUrl
  });
  
  return pdfUrl;
}
```

### **Razorpay Integration with GST:**

```typescript
// Create subscription with GST details
const subscription = await razorpay.subscriptions.create({
  plan_id: 'plan_professional',
  customer_notify: 1,
  total_count: 12,
  notes: {
    gstin: customerGSTIN,
    place_of_supply: customerState,
    invoice_number: invoiceNumber
  }
});

// Webhook to generate invoice on payment
app.post('/webhooks/razorpay', async (req, res) => {
  const event = req.body.event;
  
  if (event === 'subscription.charged') {
    const payment = req.body.payload.payment.entity;
    
    // Generate GST invoice
    await generateGSTInvoice({
      // ... subscription details
    });
  }
});
```

---

## 📊 Step 4: GST Filing (Monthly)

### **Returns to File:**

#### **GSTR-1 (Outward Supplies)**
- **Due Date:** 11th of next month
- **What:** All sales/invoices issued
- **Data:**
  - B2B sales (with GSTIN)
  - B2C sales (without GSTIN)
  - Export sales (if any)
  - Credit/debit notes

#### **GSTR-3B (Summary Return)**
- **Due Date:** 20th of next month
- **What:** Summary of sales, purchases, tax paid
- **Important:** Pay GST liability before filing

### **Example GSTR-3B:**
```
Month: November 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OUTWARD SUPPLIES (Sales):
Taxable value:                          ₹3,38,000
CGST @ 9%:                               ₹30,420
SGST @ 9%:                               ₹30,420
IGST @ 18%:                              ₹60,840
Total tax on sales:                    ₹1,21,680

INWARD SUPPLIES (Purchases):
Software subscriptions (Vercel, etc.)     ₹5,000
GST on purchases:                           ₹900
Input Tax Credit claimed:                   ₹900

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NET GST PAYABLE:
Total tax on sales:                    ₹1,21,680
Less: Input Tax Credit:                    (₹900)
                                       ──────────
NET TAX TO PAY:                        ₹1,20,780
                                       ==========
```

### **Payment Process:**
1. Login to GST portal
2. Go to "Services" → "Payments"
3. Select "Create Challan"
4. Enter amounts (CGST, SGST, IGST)
5. Pay via net banking
6. Save challan for records

---

## 🤖 Step 5: Automate GST Compliance

### **Option A: Use ClearTax (Recommended)**

**Cost:** ₹1,500 - ₹3,000/month

**Features:**
- Auto-generate GSTR-1
- Auto-generate GSTR-3B
- Razorpay integration
- E-invoicing
- E-way bill
- One-click filing

**Setup:**
```bash
# Connect Razorpay to ClearTax
1. Login to ClearTax
2. Go to Integrations
3. Connect Razorpay account
4. Auto-sync all transactions
5. Review and file returns
```

### **Option B: Hire CA (₹2,000/month)**

**Services:**
- Monthly filing
- Tax calculation
- Compliance advice
- Notice handling

### **Option C: DIY (Free, but time-consuming)**

Manual filing via GST portal

---

## 💻 Step 6: Code Implementation

### **Database Schema:**

```prisma
model Tenant {
  id            String   @id @default(cuid())
  companyName   String
  gstin         String?  @unique
  
  // Billing address
  addressLine1  String
  addressLine2  String?
  city          String
  state         String
  pincode       String
  stateCode     String   // "29" for Karnataka
  
  // Contact
  email         String
  phone         String
  
  subscriptions Subscription[]
  invoices      Invoice[]
}

model Invoice {
  id              String   @id @default(cuid())
  invoiceNumber   String   @unique
  
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  tenantId        String
  
  // Amounts
  baseAmount      Decimal  @db.Decimal(10, 2)
  cgst            Decimal  @db.Decimal(10, 2)
  sgst            Decimal  @db.Decimal(10, 2)
  igst            Decimal  @db.Decimal(10, 2)
  totalAmount     Decimal  @db.Decimal(10, 2)
  
  // Details
  description     String
  sacCode         String   @default("998314")
  periodStart     DateTime
  periodEnd       DateTime
  
  // Payment
  razorpayPaymentId String?
  paymentStatus   String   @default("PENDING")
  paidAt          DateTime?
  
  // Invoice file
  pdfUrl          String?
  
  // Status
  status          String   @default("DRAFT")
  sentAt          DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([tenantId])
  @@index([invoiceNumber])
}
```

### **GST Calculation Helper:**

```typescript
// lib/gst.ts

export interface GSTCalculation {
  baseAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  isInterState: boolean;
}

export function calculateGST(
  baseAmount: number,
  supplierState: string,
  customerState: string
): GSTCalculation {
  const gstRate = 0.18; // 18%
  const gstAmount = baseAmount * gstRate;
  
  // Same state = CGST + SGST
  // Different state = IGST
  const isInterState = supplierState !== customerState;
  
  if (isInterState) {
    return {
      baseAmount,
      cgst: 0,
      sgst: 0,
      igst: gstAmount,
      totalAmount: baseAmount + gstAmount,
      isInterState: true
    };
  } else {
    return {
      baseAmount,
      cgst: gstAmount / 2,
      sgst: gstAmount / 2,
      igst: 0,
      totalAmount: baseAmount + gstAmount,
      isInterState: false
    };
  }
}

// Usage
const supplierState = '29'; // Karnataka
const customerState = '27'; // Maharashtra
const baseAmount = 6779;

const gst = calculateGST(baseAmount, supplierState, customerState);
console.log(gst);
// {
//   baseAmount: 6779,
//   cgst: 0,
//   sgst: 0,
//   igst: 1220.22,
//   totalAmount: 7999.22,
//   isInterState: true
// }
```

### **Invoice Generation:**

```typescript
// lib/invoice-generator.ts
import { jsPDF } from 'jspdf';

export async function generateInvoice(data: {
  invoiceNumber: string;
  date: Date;
  tenant: Tenant;
  subscription: Subscription;
  gst: GSTCalculation;
}) {
  const doc = new jsPDF();
  
  // Company details
  doc.setFontSize(20);
  doc.text('TAX INVOICE', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Invoice No: ${data.invoiceNumber}`, 20, 40);
  doc.text(`Date: ${format(data.date, 'dd/MM/yyyy')}`, 150, 40);
  
  // Supplier details
  doc.setFontSize(12);
  doc.text('SUPPLIER:', 20, 50);
  doc.setFontSize(10);
  doc.text(process.env.COMPANY_NAME!, 20, 55);
  doc.text(`GSTIN: ${process.env.COMPANY_GSTIN}`, 20, 60);
  // ... more details
  
  // Customer details
  doc.setFontSize(12);
  doc.text('RECIPIENT:', 20, 90);
  doc.setFontSize(10);
  doc.text(data.tenant.companyName, 20, 95);
  if (data.tenant.gstin) {
    doc.text(`GSTIN: ${data.tenant.gstin}`, 20, 100);
  }
  // ... more details
  
  // Line items
  doc.setFontSize(12);
  doc.text('DESCRIPTION OF SERVICES', 20, 120);
  doc.setFontSize(10);
  doc.text(data.subscription.planName, 20, 125);
  doc.text(`SAC Code: 998314`, 20, 130);
  
  // Amounts
  doc.text(`Taxable Value: ₹${data.gst.baseAmount.toFixed(2)}`, 20, 145);
  
  if (data.gst.isInterState) {
    doc.text(`IGST @ 18%: ₹${data.gst.igst.toFixed(2)}`, 20, 150);
  } else {
    doc.text(`CGST @ 9%: ₹${data.gst.cgst.toFixed(2)}`, 20, 150);
    doc.text(`SGST @ 9%: ₹${data.gst.sgst.toFixed(2)}`, 20, 155);
  }
  
  doc.setFontSize(12);
  doc.text(
    `TOTAL: ₹${data.gst.totalAmount.toFixed(2)}`,
    20,
    165
  );
  
  // Convert to buffer
  return doc.output('arraybuffer');
}
```

---

## ✅ Checklist

### **Before Launch:**
- [ ] GST registration complete
- [ ] GSTIN received
- [ ] Invoice format finalized
- [ ] GST calculation code tested
- [ ] Razorpay webhooks working
- [ ] Invoice email automation working
- [ ] ClearTax account setup (or CA hired)
- [ ] Terms of Service mentions GST
- [ ] Pricing page shows GST-inclusive prices

### **Monthly Tasks:**
- [ ] Generate all invoices by 5th
- [ ] File GSTR-1 by 11th
- [ ] Pay GST liability by 20th
- [ ] File GSTR-3B by 20th
- [ ] Reconcile Razorpay with GST portal
- [ ] Save challan copies

### **Quarterly:**
- [ ] Review GST compliance
- [ ] Check input tax credit
- [ ] Optimize tax planning

### **Annually:**
- [ ] File GSTR-9 (annual return)
- [ ] Get accounts audited (if turnover > ₹2Cr)
- [ ] Review GST savings

---

## 🚨 Common Mistakes to Avoid

1. **Not registering early:** Register before first sale
2. **Wrong SAC code:** Always use 998314 for SaaS
3. **Not collecting customer GSTIN:** Ask during signup
4. **Wrong state code:** Verify customer's state
5. **Missing invoice details:** Include all mandatory fields
6. **Late filing:** File by due date to avoid penalty
7. **Not claiming ITC:** Claim input tax credit on purchases
8. **Wrong place of supply:** Should be customer's location

---

## 💰 GST Optimization Tips

### **Claim Input Tax Credit on:**
- ✅ Cloud hosting (AWS, Vercel)
- ✅ Software subscriptions (Supabase, etc.)
- ✅ Marketing expenses (Google Ads, etc.)
- ✅ Professional services (CA, lawyer)
- ✅ Office rent (if GST registered)
- ✅ Electricity, internet
- ✅ Computer hardware
- ✅ Mobile phones (for business)

### **Cannot Claim ITC on:**
- ❌ Personal expenses
- ❌ Food and beverages
- ❌ Employee perks
- ❌ Life insurance

---

## 📞 Support & Resources

### **GST Portal:**
https://www.gst.gov.in

### **GST Helpline:**
1800-103-4786 (Toll-free)

### **ClearTax:**
https://cleartax.in
support@cleartax.in

### **Recommended CA:**
Find a CA who specializes in SaaS/startups

### **GST Rates Reference:**
https://cbic-gst.gov.in

---

## ✅ Your Action Items

1. **This Week:**
   - [ ] Contact CA for GST registration
   - [ ] Prepare documents
   - [ ] Apply for GSTIN

2. **Before Launch:**
   - [ ] Implement GST calculation code
   - [ ] Setup invoice generation
   - [ ] Test with dummy data
   - [ ] Setup ClearTax

3. **After Launch:**
   - [ ] Generate invoices for all customers
   - [ ] File returns on time
   - [ ] Maintain records
   - [ ] Annual review

---

**GST is not scary! With proper setup and automation, it's just a few clicks every month.** 🎉

**Questions? Need help with implementation? Let me know!**
