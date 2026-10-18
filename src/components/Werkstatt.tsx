"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import BikeDrawing from "./BikeDrawing";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

const FUNKE = "#3355ff";
const TINTE = "#17201c";

// Wohin jede Baugruppe in der Explosionszeichnung wandert (SVG-Einheiten).
const explode: Record<string, { x: number; y: number }> = {
  akku: { x: 0, y: -120 },
  motor: { x: 10, y: 70 },
  elektronik: { x: -30, y: -90 },
  fahrwerk: { x: 34, y: -10 },
  hinterrad: { x: -70, y: 0 },
  vorderrad: { x: 70, y: 0 },
  "scheibe-hinten": { x: -70, y: -170 },
  "scheibe-vorn": { x: 70, y: -170 },
  rahmen: { x: 0, y: 0 },
};

const leistungen = [
  {
    teile: ["akku"],
    titel: "Akku und Zellen",
    text: "Wir messen die echte Kapazität und tauschen einzelne Zellen, statt den ganzen Akku zu ersetzen. Vorher sagst du uns, ob sich die Reparatur für dich lohnt.",
    punkte: ["Kapazitätstest mit Protokoll", "Zellentausch und Balancing", "Ladegerät und Ladebuchse"],
  },
  {
    teile: ["motor"],
    titel: "Motor und Antrieb",
    text: "Nabenmotor oder Mittelmotor: Wir finden Geräusche, Leistungsverlust und Aussetzer und reparieren Lager, Getriebe und Sensoren.",
    punkte: ["Lager und Getriebe", "Riemen, Kette und Ritzel", "Drehmoment- und Hallsensoren"],
  },
  {
    teile: ["elektronik"],
    titel: "Elektronik",
    text: "Fehlercode im Display, Licht fällt aus, Motor reagiert nicht: Wir lesen die Steuerung aus und prüfen Controller, Kabelbaum und Stecker.",
    punkte: ["Diagnose und Software-Updates", "Controller und Display", "Kabelbaum, Licht und Schalter"],
  },
  {
    teile: ["fahrwerk", "scheibe-hinten", "scheibe-vorn", "hinterrad", "vorderrad"],
    titel: "Bremsen und Fahrwerk",
    text: "Schwere Fahrzeuge brauchen starke Bremsen. Wir prüfen Scheiben und Beläge, entlüften die Hydraulik und stellen Gabel und Federbein auf dich ein.",
    punkte: ["Beläge, Scheiben, Hydraulik", "Gabel- und Federbeinservice", "Reifen und Schläuche"],
  },
];

export default function Werkstatt() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = root.current!;
        section.dataset.motion = "on";

        const teil = (name: string) =>
          section.querySelector<SVGGElement>(`[data-teil="${name}"]`)!;
        const alleTeile = gsap.utils.toArray<SVGGElement>("[data-teil]", section);
        const panels = gsap.utils.toArray<HTMLElement>(".leistung", section);

        // Ladeanimation: die Zeichnung entsteht Strich für Strich.
        gsap.from(".linie", {
          drawSVG: 0,
          duration: 1.4,
          ease: "power2.inOut",
          stagger: { each: 0.025, from: "start" },
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 5}`,
            pin: ".pin",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        tl.to(".intro", { autoAlpha: 0, y: -24, duration: 0.6 });
        tl.to(".hinweis", { autoAlpha: 0, duration: 0.3 }, "<");
        for (const [name, pos] of Object.entries(explode)) {
          tl.to(teil(name), { x: pos.x, y: pos.y, duration: 1.2 }, "<");
        }

        leistungen.forEach((l, i) => {
          const gruppe = l.teile.map(teil);
          const label = `leistung-${i}`;
          tl.addLabel(label);
          tl.to(alleTeile, { opacity: 0.22, duration: 0.4 }, label);
          tl.to(gruppe, { opacity: 1, color: FUNKE, duration: 0.4 }, label);
          tl.fromTo(
            panels[i],
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            label,
          );
          tl.to({}, { duration: 0.8 });
          tl.to(panels[i], { autoAlpha: 0, y: -28, duration: 0.4 });
          tl.to(gruppe, { color: TINTE, duration: 0.4 }, "<");
        });

        // Zum Schluss baut sich das Motorrad wieder zusammen.
        tl.addLabel("fertig");
        tl.to(alleTeile, { x: 0, y: 0, opacity: 1, duration: 1.2 }, "fertig");
        tl.fromTo(
          panels[panels.length - 1],
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "fertig+=0.6",
        );
        tl.to({}, { duration: 0.6 });

        return () => {
          delete section.dataset.motion;
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="leistungen" className="werkstatt" aria-label="Unsere Leistungen">
      <div className="pin mx-auto grid max-w-[90rem] grid-cols-1 gap-x-10 px-5 pt-24 pb-12 md:grid-cols-12 md:px-10">
        <div className="order-2 md:order-1 md:col-span-5 md:self-center">
          <div className="intro">
            <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] font-extrabold tracking-[-0.01em] text-balance">
              Wir bringen dein <span className="whitespace-nowrap">E-Fahrzeug</span> zurück auf die Straße.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg text-tinte-weich">
              Werkstatt für E-Motorräder, E-Bikes und E-Roller. Akku, Motor,
              Elektronik und Bremsen unter einem Dach, mit Kostenvoranschlag vor
              jeder Reparatur.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#termin"
                className="rounded-full bg-klee px-6 py-3 font-bold text-papier transition-colors hover:bg-klee-dunkel"
              >
                Termin buchen
              </a>
              <a
                href="#ersatzteile"
                className="rounded-full border-2 border-tinte px-6 py-[10px] font-bold transition-colors hover:bg-tinte hover:text-papier"
              >
                Ersatzteile ansehen
              </a>
            </div>
          </div>

          <ol className="leistungen mt-20 space-y-12">
            {leistungen.map((l) => (
              <li key={l.titel} className="leistung">
                <h2 className="font-display text-5xl leading-none font-extrabold md:text-6xl">
                  {l.titel}
                </h2>
                <p className="mt-4 max-w-[32rem] text-tinte-weich">{l.text}</p>
                <ul className="mt-5 max-w-[32rem] border-t border-tinte/20">
                  {l.punkte.map((p) => (
                    <li key={p} className="border-b border-tinte/20 py-2">
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li className="leistung">
              <h2 className="font-display text-5xl leading-none font-extrabold md:text-6xl">
                Wieder zusammen, wieder unterwegs.
              </h2>
              <p className="mt-4 max-w-[32rem] text-tinte-weich">
                Du verfolgst jeden Schritt in deinem Kundenkonto und bekommst
                eine Nachricht, sobald dein Fahrzeug abholbereit ist.
              </p>
              <a
                href="#termin"
                className="mt-6 inline-block rounded-full bg-klee px-6 py-3 font-bold text-papier transition-colors hover:bg-klee-dunkel"
              >
                Termin buchen
              </a>
            </li>
          </ol>
        </div>

        <div className="order-1 md:order-2 md:col-span-7 md:self-center">
          <BikeDrawing className="zeichnung mx-auto w-full max-w-[52rem] text-tinte" />
          <p className="hinweis mt-2 hidden text-center text-sm text-tinte-weich">
            Scroll weiter, um das Motorrad zu zerlegen.
          </p>
        </div>
      </div>
    </section>
  );
}
