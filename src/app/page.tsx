import type { ReactNode } from "react";
import { CopyEmail } from "@/components/CopyEmail";
import { ExperienceEntry } from "@/components/ExperienceEntry";
import { Portrait } from "@/components/Portrait";
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
  ...(site.url ? { url: site.url, image: `${site.url}${site.shareImage}` } : {}),
  alumniOf: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Mandi" },
  sameAs: [site.links.github, site.links.linkedin, site.links.leetcode, site.links.codeforces, site.links.codechef],
};

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

function Out({ href, children, className = "link" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {children}
      <Arrow />
    </a>
  );
}

const contactLinks = [
  { label: "LinkedIn", detail: "in/shubhxtech", href: site.links.linkedin },
  { label: "GitHub", detail: "shubhxtech", href: site.links.github },
  { label: "Résumé", detail: "PDF", href: site.resume },
];

export default function Home() {
  const figureStarts = projects.reduce<number[]>((acc, p, i) => {
    acc.push(i === 0 ? 1 : acc[i - 1] + projects[i - 1].figures.length);
    return acc;
  }, []);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-[3px] focus:bg-accent focus:px-3 focus:py-2 focus:font-mono focus:text-[13px] focus:text-bg"
      >
        Skip to work
      </a>
      <SiteHeader />
      <Reveal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <main id="top">
        {/* Hero */}
        <section aria-label="Introduction" className="mx-auto max-w-[1180px] px-5 pt-12 pb-8 sm:px-8 sm:pt-20">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_240px] md:items-center md:gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
            <div>
              <p className="kicker flex items-center gap-3 !text-accent">
                <span aria-hidden className="h-px w-8 bg-accent" />
                Software engineer · IIT Mandi &apos;27
              </p>
              <h1 className="mt-6 font-display text-[clamp(3.25rem,9vw,6.5rem)] leading-[0.92] font-medium tracking-[-0.045em] text-fg">
                Shubh Sahu
              </h1>
              <p className="mt-7 max-w-[40ch] text-[19px] leading-[1.6] text-fg-2 sm:text-[21px]">
                I study computer science at IIT Mandi and build software systems — lately, a distributed key-value store
                with its own storage engine and Raft implementation. Most recently I was a software engineering intern at{" "}
                <span className="text-fg">Google</span>, on Play Games.
              </p>
              <ul className="mt-10 flex flex-wrap items-center gap-3 font-mono text-[13px]">
                <li>
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-[3px] bg-accent px-4 py-2.5 font-medium text-bg transition-colors hover:bg-fg"
                  >
                    Selected work
                    <span aria-hidden className="arrow arrow-s">
                      ↓
                    </span>
                  </a>
                </li>
                {[
                  { label: "GitHub", href: site.links.github },
                  { label: "LinkedIn", href: site.links.linkedin },
                  { label: "Résumé", href: site.resume },
                ].map((l) => (
                  <li key={l.label}>
                    <Out
                      href={l.href}
                      className="inline-flex items-center rounded-[3px] border border-line-strong px-3.5 py-2.5 text-fg-2 transition-colors hover:border-accent hover:text-fg"
                    >
                      {l.label}
                    </Out>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-first md:order-none">
              <Portrait />
            </div>
          </div>

          <dl className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {glance.map((g, i) => (
              <div key={g.label} className="bg-surface/95 px-5 py-4">
                <dt className="kicker flex items-center justify-between">
                  {g.label}
                  <span aria-hidden className="text-line-strong">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </dt>
                <dd className="mt-2 text-[15px] leading-snug text-fg">{g.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Section id="work" index="01" kicker="Selected work" title="Projects">
          <div className="space-y-28 sm:space-y-36">
            {projects.map((p, i) => (
              <ProjectCaseStudy key={p.slug} project={p} index={i + 1} figureStart={figureStarts[i]} />
            ))}
          </div>
          <p data-reveal className="mt-20 flex flex-wrap items-center gap-x-2 border-t border-line pt-6 text-fg-2">
            More experiments, hackathon projects and coursework are on
            <Out href={site.links.github} className="link text-fg">
              GitHub
            </Out>
          </p>
        </Section>

        <Section id="experience" index="02" kicker="Experience" title="Where I've worked">
          <div className="relative">
            <span aria-hidden className="absolute top-3 bottom-0 left-[4.5px] w-px bg-line md:left-[calc(10rem+1.75rem)]" />
            {experience.map((r, i) => (
              <ExperienceEntry key={`${r.org}-${r.period}`} role={r} latest={i === 0} />
            ))}
          </div>
        </Section>

        <Section id="beyond" index="03" kicker="Beyond the projects" title="Practice & interests">
          <div data-reveal className="grid gap-4 lg:grid-cols-3">
            <div className="panel p-6">
              <Label>Competitive programming</Label>
              <ul className="divide-y divide-line">
                {competitive.map((c) => (
                  <li key={c.platform}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener"
                      className="group flex items-baseline justify-between gap-4 py-3 transition-colors"
                    >
                      <span className="text-fg transition-colors group-hover:text-accent">{c.platform}</span>
                      <span className="font-mono text-[13px] text-fg-2 transition-colors group-hover:text-fg">
                        {c.standing}
                        <Arrow />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel p-6">
              <Label>Hackathons & teaching</Label>
              <ul className="space-y-3.5">
                {recognition.map((r) => (
                  <li key={r.where} className="text-[15px] leading-snug">
                    <span className="font-mono text-[12px] text-hi">{r.what}</span>
                    <p className="mt-0.5 text-fg-2">{r.where}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel p-6">
              <Label>Interests</Label>
              <p className="text-[17px] leading-[1.6] text-fg-2">
                The things I keep coming back to:{" "}
                {interests.map((t, i) => (
                  <span key={t}>
                    <span className="text-fg">{t}</span>
                    {i < interests.length - 2 ? ", " : i === interests.length - 2 ? ", and " : "."}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Section>

        <Section id="about" index="04" kicker="About" title="About me">
          <div data-reveal className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
            <p className="font-display text-[28px] leading-[1.2] font-medium tracking-[-0.02em] text-fg sm:text-[34px]">
              <span aria-hidden className="mr-1 text-accent">
                “
              </span>
              I like knowing how things work underneath.
            </p>
            <div className="prose-body max-w-[60ch] text-[18px] leading-[1.7] text-fg-2">
              <p>
                Most of what I&apos;ve learned has come from carrying projects past the point where tutorials stop —
                writing a storage engine instead of reaching for one, or implementing Raft to see why each rule in the
                paper is there.
              </p>
              <p>
                I&apos;m in my final year of a B.Tech in Computer Science at IIT Mandi, where my coursework has covered
                operating systems, computer networks, databases, and deep learning. I learn best from problems that are
                hard to get right.
              </p>
            </div>
          </div>
        </Section>

        <Section id="contact" index="05" kicker="Contact" title="Get in touch">
          <div data-reveal className="panel grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="p-6 sm:p-10">
              <p className="max-w-[46ch] text-[18px] leading-[1.6] text-fg-2">
                Whether you&apos;re hiring, building something, or want to talk about systems, email is the most direct
                way to reach me.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-8 inline-block font-display text-[clamp(1.6rem,5vw,2.75rem)] leading-tight font-medium tracking-[-0.03em] break-all text-fg transition-colors hover:text-accent sm:break-normal"
              >
                {site.email}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-[3px] bg-accent px-3 py-2 font-mono text-[12.5px] font-medium text-bg transition-colors hover:bg-fg"
                >
                  Send an email
                </a>
                <CopyEmail email={site.email} />
              </div>
            </div>
            <ul className="border-t border-line lg:border-t-0 lg:border-l">
              {contactLinks.map((l) => (
                <li key={l.label} className="border-b border-line last:border-b-0">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-raised/60 sm:px-8"
                  >
                    <span>
                      <span className="block text-fg transition-colors group-hover:text-accent">{l.label}</span>
                      <span className="font-mono text-[12px] text-fg-3">{l.detail}</span>
                    </span>
                    <span className="font-mono text-fg-3 transition-colors group-hover:text-accent">
                      <Arrow />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-x-8 gap-y-2 px-5 py-8 font-mono text-[12px] text-fg-3 sm:px-8">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Set in Space Grotesk, Geist and IBM Plex Mono</p>
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
