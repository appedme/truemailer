import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { TrueMailerNavbar } from "@/components/ui/navbar";
import { Hero } from "@/components/ui/animated-hero";
import { Features } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { Footer } from "@/components/footer";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <TrueMailerNavbar />
      <div className="pt-20">
        <Hero />
        <div id="features">
          <Features />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <Footer />
      </div>
    </div>
  );
}