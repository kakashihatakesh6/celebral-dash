/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'orders.json')

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir)
  }
}

// Helper function to get a single order
async function getOrderById(orderId: string) {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    const orders = JSON.parse(fileContent)
    const order = orders.find((o: any) => o.id === orderId)
    console.log("order api single =>", order);
    return order || null
  } catch {
    return null
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDataDirectory()
    
    // This endpoint is specifically for getting a single order by ID
    const orderId = params?.id
    const order = await getOrderById(orderId)
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}