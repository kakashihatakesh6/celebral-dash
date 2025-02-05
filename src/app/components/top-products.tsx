/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

const products = [
  {
    id: 1,
    name: "Camera Mi 360°",
    sold: 432,
    price: "$120",
    revenue: "$51,840",
    rating: 4.81,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new_dashboard_fast_api-VI9OvfcGEoqEsBfCRPtI5AFUygNmwl.png",
  },
  {
    id: 2,
    name: "Massage Gun",
    sold: 120,
    price: "$112",
    revenue: "$25,440",
    rating: 3.44,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new_dashboard_fast_api-VI9OvfcGEoqEsBfCRPtI5AFUygNmwl.png",
  },
  {
    id: 3,
    name: "Vacuum-Mop 2 Pro",
    sold: 221,
    price: "$320",
    revenue: "$15,123",
    rating: 3.22,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new_dashboard_fast_api-VI9OvfcGEoqEsBfCRPtI5AFUygNmwl.png",
  },
  {
    id: 4,
    name: "Vacuum-Mop 2",
    sold: 223,
    price: "$234",
    revenue: "$32,812",
    rating: 3.0,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new_dashboard_fast_api-VI9OvfcGEoqEsBfCRPtI5AFUygNmwl.png",
  },
]

export function TopProducts() {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl font-bold">Top Products</CardTitle>
        <Button variant="link" className="text-base font-semibold text-blue-600 p-0 h-auto rounded-full border px-4 py-2">
          Full results
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-bold text-muted-foreground pl-6">Product</TableHead>
              <TableHead className="text-xs font-bold text-muted-foreground">Sold amount</TableHead>
              <TableHead className="text-xs font-bold text-muted-foreground">Unit price</TableHead>
              <TableHead className="text-xs font-bold text-muted-foreground">Revenue</TableHead>
              <TableHead className="text-xs font-bold text-muted-foreground pr-6">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-8 w-8 rounded-lg bg-gray-100 object-cover"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell><span className="font-semibold text-zinc-700">{product.sold}</span></TableCell>
                <TableCell><span className="font-semibold text-zinc-700">{product.price}</span></TableCell>
                <TableCell><span className="font-semibold text-zinc-700">{product.revenue}</span></TableCell>
                <TableCell className="pr-6">
                  <div className="flex items-center gap-1 text-zinc-700 font-semibold">
                    <span className="text-amber-400">★</span>
                    {product.rating.toFixed(2)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

