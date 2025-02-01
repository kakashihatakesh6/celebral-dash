import { jsPDF } from "jspdf"
import type { Order } from "./types"

export const generatePDF = (order: Order) => {
  const doc = new jsPDF()

  // Set font
  doc.setFont("helvetica")

  // Add title
  doc.setFontSize(20)
  doc.text("Receipt", 105, 15, { align: "center" })

  // Add order details
  doc.setFontSize(12)
  doc.text(`Order ID: ${order.id}`, 20, 30)
  doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 20, 40)
  doc.text(`Status: ${order.status}`, 20, 50)

  // Add customer details
  doc.text("Customer Details:", 20, 65)
  doc.text(`Name: ${order.customer.name}`, 30, 75)
  doc.text(`Email: ${order.customer.email}`, 30, 85)
  doc.text(`Phone: ${order.customer.phone}`, 30, 95)

  // Add items
  doc.text("Items:", 20, 110)
  let yPos = 120
  order.items.forEach((item) => {
    doc.text(`${item.name} x${item.quantity}`, 30, yPos)
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 170, yPos, { align: "right" })
    yPos += 10
  })

  // Add total
  doc.setFont("helvetica", "bold")
  doc.text(`Total: $${order.total.toFixed(2)}`, 170, yPos + 10, { align: "right" })

  // Add payment details
  doc.setFont("helvetica", "normal")
  doc.text(`Payment ID: ${order.paymentId}`, 20, yPos + 25)

  // Save the PDF
  doc.save(`receipt_${order.id}.pdf`)
}

