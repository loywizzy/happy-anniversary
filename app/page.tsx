import { Countdown } from "./components/Countdown";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { FloatingHearts } from "./components/FloatingHearts";
import { LoveLetter } from "./components/LoveLetter";
import { Section } from "./components/Section";
import { Stats } from "./components/Stats";
import { Timeline } from "./components/Timeline";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <Section
        id="countdown"
        title="นับถอยหลังสู่วันสำคัญ"
        subtitle="Anniversary Countdown"
      >
        <Countdown />
      </Section>
      <Section
        id="stats"
        title="สถิติรักละมุน"
        subtitle="Love In Numbers"
      >
        <Stats />
      </Section>
      <Section
        id="timeline"
        title="เรื่องราวของเรา"
        subtitle="Milestones"
      >
        <Timeline />
      </Section>
      <Section
        id="gallery"
        title="แกลเลอรีความทรงจำ"
        subtitle="Sweet Moments"
      >
        <Gallery />
      </Section>
      <Section
        id="love-letter"
        title="จดหมายถึงเธอ"
        subtitle="Words From The Heart"
      >
        <LoveLetter />
      </Section>
      <FloatingHearts />
    </main>
  );
}
