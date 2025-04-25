import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Streamlining Petroleum Import Negotiations
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Bangladesh Petroleum Corporation (BPC) imports petroleum products like Gasoil, Jet A-1, Gasoline,
                  HSFO, and Marine Fuel. This system helps improve data accessibility, minimize paperwork, and
                  streamline the negotiation process.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button size="lg">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
