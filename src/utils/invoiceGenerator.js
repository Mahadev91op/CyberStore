"use client";

export const generateInvoice = async (order) => { // 🔥 फंक्शन को async रखें
  
  // सर्वर साइड रेंडरिंग से बचने के लिए सुरक्षा जांच
  if (typeof window === 'undefined') {
    console.error("PDF generation skipped on server side.");
    return;
  }
  
  try {
    // 1. jsPDF और Autotable को बटन दबाने पर ही (dynamically) लोड करें
    const jsPDFModule = await import("jspdf");
    await import("jspdf-autotable"); 
    
    // jsPDF कंस्ट्रक्टर को सही तरीके से निकालें
    const PDFConstructor = jsPDFModule.jsPDF || jsPDFModule.default;
    
    if (!PDFConstructor) {
      throw new Error("jsPDF constructor failed to load.");
    }
    
    const doc = new PDFConstructor(); 

    // आخری सुरक्षा जांच: अगर autoTable अभी भी काम नहीं कर रहा, तो एरर दें
    if (typeof doc.autoTable !== 'function') {
        throw new Error("JSPDF-AUTOTABLE PLUGIN FAILED TO LOAD. Please refresh the page.");
    }

    // --- Invoice Generation Starts Here ---
    
    // 1. Header (Company Details) 
    doc.setFontSize(22);
    doc.setTextColor(220, 38, 38); 
    doc.text("DEVSAMP SERVICES", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Gondalpara, West Bengal, India - 712137", 14, 26);
    doc.text("Phone: +91-9876543210 | Email: support@devsamp.com", 14, 32);

    // 2. Invoice Title & Info
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("INVOICE", 140, 20);
    
    doc.setFontSize(10);
    doc.text(`Invoice No: #${order._id.slice(-6).toUpperCase()}`, 140, 28);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 140, 34);
    doc.text(`Status: ${order.status}`, 140, 40);

    // Line Divider
    doc.setDrawColor(200);
    doc.line(14, 45, 196, 45);

    // 3. Customer Details (Shipping)
    doc.setFontSize(12);
    doc.text("Bill To:", 14, 55);
    
    doc.setFontSize(10);
    doc.text(order.shippingAddress.address, 14, 62);
    doc.text(`${order.shippingAddress.city} - ${order.shippingAddress.postalCode}`, 14, 68);
    doc.text(order.shippingAddress.country, 14, 74);

    // 4. Order Items Table
    const tableColumn = ["#", "Product Name", "Qty", "Unit Price", "Total"];
    const tableRows = [];

    order.orderItems.forEach((item, index) => {
      const price = item.price || 0; 
      const itemData = [
        index + 1,
        item.name,
        item.qty,
        `Rs. ${price.toLocaleString()}`,
        `Rs. ${(price * item.qty).toLocaleString()}`,
      ];
      tableRows.push(itemData);
    });

    // 5. autoTable call (यह अब काम करना चाहिए)
    doc.autoTable({ 
      head: [tableColumn],
      body: tableRows,
      startY: 85,
      theme: 'grid',
      headStyles: { fillColor: [220, 38, 38] }, 
      styles: { fontSize: 9 },
    });

    // 6. Total Amount
    const finalY = doc.lastAutoTable.finalY + 10;
    
    doc.setFontSize(12);
    doc.text(`Subtotal:`, 140, finalY);
    doc.text(`Rs. ${order.totalPrice.toLocaleString()}`, 170, finalY, { align: 'right' });

    doc.text(`Shipping:`, 140, finalY + 6);
    doc.text(`Free`, 170, finalY + 6, { align: 'right' });

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Grand Total:`, 140, finalY + 15);
    doc.setTextColor(220, 38, 38);
    doc.text(`Rs. ${order.totalPrice.toLocaleString()}`, 170, finalY + 15, { align: 'right' });

    // 7. Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for shopping with Devsamp Services!", 105, 280, null, null, "center");

    // Save PDF
    doc.save(`Invoice_${order._id}.pdf`);
    
  } catch (error) {
      console.error("Invoice generation failed:", error);
      alert(`Invoice generation failed: ${error.message}. Check console.`);
  }
};