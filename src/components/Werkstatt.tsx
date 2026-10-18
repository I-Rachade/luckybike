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
    titel: "Batterie et cellules",
    text: "Nous mesurons la capacité réelle et remplaçons les cellules une par une, au lieu de changer toute la batterie. Avant d’intervenir, nous vous disons si la réparation vaut le coup.",
    punkte: ["Test de capacité avec rapport", "Remplacement de cellules et équilibrage", "Chargeur et prise de charge"],
  },
  {
    teile: ["motor"],
    titel: "Moteur et transmission",
    text: "Moteur moyeu ou moteur pédalier : nous trouvons l’origine des bruits, des pertes de puissance et des coupures, puis réparons roulements, réducteur et capteurs.",
    punkte: ["Roulements et réducteur", "Courroie, chaîne et pignons", "Capteurs de couple et à effet Hall"],
  },
  {
    teile: ["elektronik"],
    titel: "Électronique",
    text: "Code d’erreur à l’écran, éclairage en panne, moteur qui ne répond plus : nous lisons le système de gestion et contrôlons contrôleur, faisceau et connecteurs.",
    punkte: ["Diagnostic et mises à jour logicielles", "Contrôleur et écran", "Faisceau, éclairage et commandes"],
  },
  {
    teile: ["fahrwerk", "scheibe-hinten", "scheibe-vorn", "hinterrad", "vorderrad"],
    titel: "Freins et suspensions",
    text: "Un véhicule lourd a besoin de freins solides. Nous contrôlons disques et plaquettes, purgeons le circuit hydraulique et réglons fourche et amortisseur selon votre gabarit.",
    punkte: ["Plaquettes, disques, purge hydraulique", "Entretien fourche et amortisseur", "Pneus et chambres à air"],
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
    <section ref={root} id="leistungen" className="werkstatt" aria-label="Nos prestations">
      <div className="pin mx-auto grid max-w-[90rem] grid-cols-1 gap-x-10 px-5 pt-24 pb-12 md:grid-cols-12 md:px-10">
        <div className="order-2 md:order-1 md:col-span-5 md:self-center">
          <div className="intro">
            <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] font-extrabold tracking-[-0.01em] text-balance">
              On remet votre véhicule électrique sur la route.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg text-tinte-weich">
              Atelier de réparation pour motos, vélos et scooters électriques.
              Batterie, moteur, électronique et freins sous un même toit, avec un
              devis avant chaque réparation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#termin"
                className="rounded-full bg-klee px-6 py-3 font-bold text-papier transition-colors hover:bg-klee-dunkel"
              >
                Prendre rendez-vous
              </a>
              <a
                href="#ersatzteile"
                className="rounded-full border-2 border-tinte px-6 py-[10px] font-bold transition-colors hover:bg-tinte hover:text-papier"
              >
                Voir les pièces détachées
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
                Remonté, prêt à repartir.
              </h2>
              <p className="mt-4 max-w-[32rem] text-tinte-weich">
                Vous suivez chaque étape depuis votre espace client et recevez
                un message dès que votre véhicule est prêt à être récupéré.
              </p>
              <a
                href="#termin"
                className="mt-6 inline-block rounded-full bg-klee px-6 py-3 font-bold text-papier transition-colors hover:bg-klee-dunkel"
              >
                Prendre rendez-vous
              </a>
            </li>
          </ol>
        </div>

        <div className="order-1 md:order-2 md:col-span-7 md:self-center">
          <BikeDrawing className="zeichnung mx-auto w-full max-w-[52rem] text-tinte" />
          <p className="hinweis mt-2 hidden text-center text-sm text-tinte-weich">
            Faites défiler pour démonter la moto.
          </p>
        </div>
      </div>
    </section>
  );
}
