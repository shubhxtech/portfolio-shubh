import { CopyEmail } from "@/components/CopyEmail";
import { ExperienceEntry } from "@/components/ExperienceEntry";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { Reveal } from "@/components/Reveal";
import { Label, Section } from "@/components/Section";
import { SiteHeader } from "@/components/SiteHeader";
import { competitive, interests, recognition } from "@/content/beyond";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { glance, site } from "@/content/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Mandi" },
  sameAs: [site.links.github, site.links.linkedin, site.links.leetcode, site.links.codeforces, site.links.codechef],
};

function Out({ href, children, className = "link" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {children}
      <Arrow />
    </a>
  );
}

function Arrow() {
  return (
    <>
      <span aria-hidden className="arrow arrow-ne ml-[0.3em]">
        ↗
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}

export default function Home() {
  const figureStarts = projects.reduce<number[]>((acc, p, i) => {
    acc.push(i === 0 ? 1 : acc[i - 1] + projects[i - 1].figures.length);
    return acc;
  }, []);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:font-mono focus:text-[13px] focus:text-paper"
      >
        Skip to work
      </a>
      <SiteHeader />
      <Reveal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <main id="top">
        {/* Hero */}
        <section aria-label="Introduction" className="mx-auto max-w-[1120px] px-5 pt-14 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:gap-20">
            <div>
              <p className="meta">Software engineer · IIT Mandi, class of 2027</p>
              <h1 className="mt-5 font-serif text-[clamp(3.4rem,10vw,6.75rem)] leading-[0.92] font-[380] tracking-[-0.035em] text-ink">
                Shubh Sahu
              </h1>
              <p className="mt-7 max-w-[34ch] text-[20px] leading-[1.5] text-ink-2 sm:mt-8 sm:text-[25px] sm:leading-[1.45]">
                I study computer science at IIT Mandi and build software systems — lately, a distributed key-value store
                with its own storage engine and Raft implementation. Most recently I was a software engineering intern at{" "}
                <span className="text-ink">Google</span>, on Play Games.
              </p>
              <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 font-mono text-[13px]">
                <li>
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-[3px] bg-ink px-4 py-2.5 text-paper transition-colors hover:bg-ink-2"
                  >
                    Selected work <span className="arrow arrow-s">↓</span>
                  </a>
                </li>
                <li>
                  <Out href={site.links.github}>GitHub</Out>
                </li>
                <li>
                  <Out href={site.links.linkedin}>LinkedIn</Out>
                </li>
                <li>
                  <Out href={site.resume}>Résumé (PDF)</Out>
                </li>
              </ul>
            </div>

            <dl className="border-t border-ink text-[15.5px] leading-snug">
              {glance.map((g) => (
                <div key={g.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 border-b border-rule py-3">
                  <dt className="meta pt-[3px]">{g.label}</dt>
                  <dd className="text-ink-2">{g.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Section id="work" index="01" title="Selected work">
          <div className="space-y-24 sm:space-y-32">
            {projects.map((p, i) => (
              <ProjectCaseStudy key={p.slug} project={p} index={i + 1} figureStart={figureStarts[i]} />
            ))}
          </div>
          <p data-reveal className="mt-20 border-t border-rule pt-6 text-ink-2">
            More experiments, hackathon projects and coursework are on{" "}
            <Out href={site.links.github}>GitHub</Out>
          </p>
        </Section>

        <Section id="experience" index="02" title="Experience">
          <div className="divide-y divide-rule">
            {experience.map((r) => (
              <ExperienceEntry key={`${r.org}-${r.period}`} role={r} />
            ))}
          </div>
        </Section>

        <Section id="beyond" index="03" title="Beyond the projects">
          <div data-reveal className="grid gap-12 md:grid-cols-2 md:gap-x-14">
            <div>
              <Label>Competitive programming</Label>
              <ul className="divide-y divide-rule border-y border-rule">
                {competitive.map((c) => (
                  <li key={c.platform}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener"
                      className="group flex items-baseline justify-between gap-4 py-3 transition-colors"
                    >
                      <span className="text-ink group-hover:underline group-hover:decoration-signal group-hover:underline-offset-4">
                        {c.platform}
                      </span>
                      <span className="font-mono text-[13px] text-ink-3 transition-colors group-hover:text-ink">
                        {c.standing}
                        <Arrow />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Label>Hackathons & teaching</Label>
              <ul className="divide-y divide-rule border-y border-rule">
                {recognition.map((r) => (
                  <li key={r.where} className="py-3 leading-snug">
                    <span className="text-ink">{r.what}</span>
                    <span className="text-ink-2"> — {r.where}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p data-reveal className="mt-12 max-w-[60ch] text-[20px] leading-[1.5] text-ink-2">
            The things I keep coming back to:{" "}
            {interests.map((t, i) => (
              <span key={t}>
                <span className="text-ink">{t}</span>
                {i < interests.length - 2 ? ", " : i === interests.length - 2 ? ", and " : "."}
              </span>
            ))}
          </p>
        </Section>

        <Section id="about" index="04" title="About">
          <div data-reveal className="prose-body max-w-[60ch] text-[20px] leading-[1.6] text-ink-2">
            <p>
              I like knowing how things work underneath. Most of what I&apos;ve learned has come from carrying projects past
              the point where tutorials stop — writing a storage engine instead of reaching for one, or implementing Raft
              to see why each rule in the paper is there.
            </p>
            <p>
              I&apos;m in my final year of a B.Tech in Computer Science at IIT Mandi, where my coursework has covered
              operating systems, computer networks, databases, and deep learning. I learn best from problems that are
              hard to get right.
            </p>
          </div>
        </Section>

        <Section id="contact" index="05" title="Contact">
          <div data-reveal>
            <p className="max-w-[44ch] text-[20px] leading-[1.5] text-ink-2">
              Whether you&apos;re hiring, building something, or want to talk about systems, email is the most direct way
              to reach me.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block font-serif text-[clamp(1.7rem,5.2vw,3rem)] leading-tight tracking-[-0.02em] text-ink underline decoration-rule-strong decoration-1 underline-offset-[0.18em] transition-colors hover:decoration-signal"
            >
              {site.email}
            </a>
            <div className="mt-3">
              <CopyEmail email={site.email} />
            </div>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[13px]">
              <li>
                <Out href={site.links.linkedin}>LinkedIn</Out>
              </li>
              <li>
                <Out href={site.links.github}>GitHub</Out>
              </li>
              <li>
                <Out href={site.resume}>Résumé (PDF)</Out>
              </li>
            </ul>
          </div>
        </Section>
      </main>

      <footer className="border-t border-rule">
        <div className="meta mx-auto flex max-w-[1120px] flex-wrap justify-between gap-x-8 gap-y-2 px-5 py-8 sm:px-8">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Set in Newsreader and IBM Plex Mono</p>
          <p>
            <Out href={site.links.source} className="link">
              Source
            </Out>
          </p>
        </div>
      </footer>
    </>
  );
}
