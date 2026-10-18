import Werkstatt from "@/components/Werkstatt";

const ablauf = [
  {
    titel: "Termin buchen",
    text: "Fahrzeug wählen, Problem beschreiben, Fotos hochladen und einen freien Termin aussuchen.",
  },
  {
    titel: "Diagnose",
    text: "Wir lesen die Elektronik aus, testen den Akku und prüfen das ganze Fahrzeug.",
  },
  {
    titel: "Kostenvoranschlag freigeben",
    text: "Du bekommst den Preis vorab und gibst die Reparatur mit einem Klick frei.",
  },
  {
    titel: "Reparatur",
    text: "Du siehst live, ob wir auf Teile warten oder schon schrauben.",
  },
  {
    titel: "Abholen",
    text: "Sobald alles fertig ist, bekommst du eine Nachricht und bezahlst bei Abholung oder online.",
  },
];

const fahrzeuge = [
  {
    titel: "E-Bikes und Pedelecs",
    text: "City, Trekking, Lastenrad und E-MTB. Mittel- und Nabenmotoren aller gängigen Systeme.",
  },
  {
    titel: "E-Motorräder",
    text: "Leichtkraft- und Motorradklasse, Offroad und Straße. Hochvolt-Akkus nur von geschultem Personal.",
  },
  {
    titel: "E-Roller",
    text: "Roller und Scooter mit Zulassung. Akku, Antrieb, Bremsen und Licht für den TÜV.",
  },
];

// Beispielsortiment, bis der Shop an die Datenbank angebunden ist.
const ersatzteile = [
  { name: "Scheibenbremsbeläge, organisch", passt: "Shimano, Tektro, Magura", preis: "24,90 €" },
  { name: "Ladegerät 42 V, 4 A", passt: "36-V-Akkus mit Rosenberger-Stecker", preis: "89,00 €" },
  { name: "Antriebsriemen 118 Zähne", passt: "Gates CDX", preis: "64,50 €" },
  { name: "Reifen 17 Zoll, Straße", passt: "E-Motorräder bis 125 cm³-Klasse", preis: "119,00 €" },
];

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-zink/85 backdrop-blur">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-5 py-4 md:px-10">
          <a href="#" className="font-stencil text-3xl leading-none tracking-wide">
            Lucky Bike
          </a>
          <nav aria-label="Hauptnavigation" className="hidden gap-8 md:flex">
            <a href="#leistungen" className="hover:text-klee">Leistungen</a>
            <a href="#ablauf" className="hover:text-klee">Ablauf</a>
            <a href="#ersatzteile" className="hover:text-klee">Ersatzteile</a>
            <a href="#kontakt" className="hover:text-klee">Kontakt</a>
          </nav>
          <a
            href="#termin"
            className="rounded-full bg-tinte px-5 py-2 text-sm font-bold text-papier transition-colors hover:bg-klee"
          >
            Termin buchen
          </a>
        </div>
      </header>

      <main>
        <Werkstatt />

        <section id="ablauf" className="scroll-mt-20 bg-papier">
          <div className="mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-32">
            <h2 className="max-w-[18ch] font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-extrabold">
              So läuft deine Reparatur ab
            </h2>
            <ol className="mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
              {ablauf.map((schritt, i) => (
                <li key={schritt.titel} className="border-t-4 border-tinte pt-5">
                  <span className="font-display text-5xl font-extrabold text-klee">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{schritt.titel}</h3>
                  <p className="mt-2 text-tinte-weich">{schritt.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="fahrzeuge-titel">
          <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
            <h2
              id="fahrzeuge-titel"
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-extrabold md:col-span-4"
            >
              Was wir reparieren
            </h2>
            <dl className="md:col-span-8">
              {fahrzeuge.map((f) => (
                <div
                  key={f.titel}
                  className="grid gap-2 border-t border-tinte/25 py-6 md:grid-cols-[16rem_1fr] md:gap-8"
                >
                  <dt className="font-display text-3xl font-bold">{f.titel}</dt>
                  <dd className="max-w-[36rem] text-tinte-weich">{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="ersatzteile" className="scroll-mt-20 bg-tinte text-papier">
          <div className="mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-[16ch] font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-extrabold">
                Ersatzteile aus unserer Werkstatt
              </h2>
              <a
                href="#ersatzteile"
                className="rounded-full border-2 border-papier px-6 py-[10px] font-bold transition-colors hover:bg-papier hover:text-tinte"
              >
                Zum Shop
              </a>
            </div>
            <p className="mt-6 max-w-[40rem] text-papier/70">
              Die Teile, die wir selbst verbauen. Bestell online und hol sie ab
              oder lass sie direkt bei deinem Termin einbauen.
            </p>
            <table className="mt-12 w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Teil</th>
                  <th>Passt für</th>
                  <th>Preis</th>
                </tr>
              </thead>
              <tbody>
                {ersatzteile.map((t) => (
                  <tr key={t.name} className="border-t border-papier/20 align-baseline">
                    <td className="py-5 pr-4 text-lg font-bold">{t.name}</td>
                    <td className="hidden py-5 pr-4 text-papier/70 md:table-cell">{t.passt}</td>
                    <td className="py-5 text-right font-display text-2xl font-bold whitespace-nowrap">
                      {t.preis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="termin" className="scroll-mt-20 bg-klee text-papier">
          <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-28">
            <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] font-extrabold md:col-span-7">
              Dein Fahrzeug fährt nicht? Buch dir einen Termin.
            </h2>
            <div className="md:col-span-5 md:self-end">
              <p className="text-lg text-papier/85">
                Die Online-Buchung kommt in Kürze. Bis dahin erreichst du uns
                telefonisch oder per E-Mail.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:+490000000000"
                  className="rounded-full bg-papier px-6 py-3 font-bold text-klee-dunkel transition-colors hover:bg-zink"
                >
                  Anrufen
                </a>
                <a
                  href="mailto:werkstatt@luckybike.example"
                  className="rounded-full border-2 border-papier px-6 py-[10px] font-bold transition-colors hover:bg-papier hover:text-klee-dunkel"
                >
                  E-Mail schreiben
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="kontakt" className="scroll-mt-20">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <p className="font-stencil text-4xl leading-none">Lucky Bike</p>
            <p className="mt-3 text-tinte-weich">
              Werkstatt für E-Motorräder, E-Bikes und E-Roller.
            </p>
          </div>
          <div className="md:col-span-3">
            <h2 className="font-bold">Adresse</h2>
            <p className="mt-2 text-tinte-weich">
              Musterstraße 1<br />
              00000 Musterstadt
            </p>
          </div>
          <div className="md:col-span-3">
            <h2 className="font-bold">Öffnungszeiten</h2>
            <p className="mt-2 text-tinte-weich">
              Mo–Fr 9–18 Uhr<br />
              Sa 10–14 Uhr
            </p>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-bold">Rechtliches</h2>
            <p className="mt-2 text-tinte-weich">
              <a href="#" className="hover:text-klee">Impressum</a>
              <br />
              <a href="#" className="hover:text-klee">Datenschutz</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
