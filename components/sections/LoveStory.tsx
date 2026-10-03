import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const stories = [
  {
    year: "2022",
    title: "Awal Bertemu",
    description:
      "Berawal dari sebuah pertemuan sederhana yang perlahan menjadi awal dari perjalanan panjang kami.",
  },
  {
    year: "2023",
    title: "Mulai Bersama",
    description:
      "Dari berbagai cerita, tawa, dan perjalanan yang dilewati bersama, kami mulai mengenal satu sama lain lebih dalam.",
  },
  {
    year: "2025",
    title: "Menuju Keseriusan",
    description:
      "Dengan segala doa dan keyakinan, kami memutuskan untuk melangkah ke tahap yang lebih serius.",
  },
  {
    year: "2026",
    title: "Hari Bahagia",
    description:
      "Dengan penuh syukur, kami mengikat janji untuk menjalani kehidupan bersama dalam sebuah ikatan pernikahan.",
  },
];

export default function LoveStory() {
  return (
    <Section id="love-story" className="bg-paper/60">
      <Reveal>
        <p className="font-serif text-sm uppercase tracking-[0.35em] text-brown">
          Our Journey
        </p>

        <h2 className="mt-3 font-script text-6xl text-rose-deep">
          Love Story
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brown">
          Setiap kisah memiliki awal, dan inilah beberapa bagian dari
          perjalanan yang membawa kami sampai di hari ini.
        </p>
      </Reveal>

      <div className="relative mx-auto mt-14 max-w-2xl">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-rose/40" />

        <div className="space-y-14">
          {stories.map((story, index) => (
            <Reveal
              key={story.year}
              delay={index * 0.12}
              className={index % 2 === 0 ? "pr-[52%]" : "pl-[52%]"}
            >
              <article className="relative">
                <div className="absolute left-[calc(100%+0.75rem)] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-rose-deep bg-paper" />

                <p className="font-serif text-sm tracking-[0.25em] text-rose-deep">
                  {story.year}
                </p>

                <h3 className="mt-2 font-script text-4xl">
                  {story.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-brown">
                  {story.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}