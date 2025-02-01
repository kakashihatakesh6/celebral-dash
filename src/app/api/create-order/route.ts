import { NextResponse } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: Request) {
  const { amount, currency, receipt } = await request.json()
  console.log("creating order with amount:", amount, currency, receipt)

  try {
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
    })
    console.log("order created =>", order)

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json({ message: "Error creating order" }, { status: 500 })
  }
}

