import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import Journey from "@/components/Journey";
import Markets from "@/components/home/Markets";
import Services from "@/components/home/Services";
import Industries from "@/components/home/Industries";
import Partners from "@/components/home/Partners";
import Insights from "@/components/home/Insights";
import ConsultForm from "@/components/ConsultForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Journey />
      <Markets />
      <Services />
      <Industries />
      <Partners />
      <Insights />
      <ConsultForm />
    </>
  );
}
