
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IMedicine } from "@/types/medicines.type"
import Link from "next/link"

export default function MedicineCard({medi}:{medi:IMedicine}) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
     
        </CardAction>
        <CardTitle>{medi.name}</CardTitle>
        <CardDescription>
          {medi.description}
        </CardDescription>
        <CardDescription>
          {medi.price}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/medicines/${medi.id}`}>
        <Button className="w-full">View More</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
