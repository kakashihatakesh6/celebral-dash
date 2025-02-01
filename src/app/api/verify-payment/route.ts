import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()
  console.log("payment verification request =>", razorpay_order_id, razorpay_payment_id, razorpay_signature)

  const body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex")

    console.log("razorpay signature =>", razorpay_signature);
    console.log("expected signature =>", expectedSignature);
    const isAuthentic = expectedSignature === razorpay_signature

  if (isAuthentic) {
    return NextResponse.json({ message: "Payment verified successfully" })
  } else {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 })
  }
}

