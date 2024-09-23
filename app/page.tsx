import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-3">

        <h1 className="text-4xl"> Welcome <span className="font-semibold text-5xl">{session?.user?.name}</span></h1>
        <p>Ready to see our books ?</p>
        <Link href="/books">
          <Button 
            children= "View some books"
            className="text-lg"/>
        </Link>
    </main>
  );
}