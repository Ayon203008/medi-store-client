import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IMedicine } from "@/types/medicines.type"
import Image from "next/image"
import Link from "next/link"

export default function MedicineCard({ medi }: { medi: IMedicine }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden flex flex-col h-full">
      {/* Image Container with Fixed Height & Aspect Ratio */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={medi.image || "/placeholder-medicine.jpg"} // Fallback image if null
          alt={medi.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-1">{medi.name}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[40px]">
          {medi.description}
        </CardDescription>
        <div className="mt-2 text-lg font-bold text-primary">
          {medi.price.toFixed(2)} tk
        </div>
      </CardHeader>

      <CardFooter>
        <Link href={`/medicines/${medi.id}`} className="w-full">
          <Button className="w-full">View More</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}