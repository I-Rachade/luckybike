import Werkstatt from "@/components/Werkstatt";

const ablauf = [
  {
    titel: "Prendre rendez-vous",
    text: "Choisissez votre véhicule, décrivez le problème, ajoutez des photos et réservez un créneau libre.",
  },
  {
    titel: "Diagnostic",
    text: "Nous lisons l’électronique, testons la batterie et contrôlons tout le véhicule.",
  },
  {
    titel: "Valider le devis",
    text: "Vous recevez le prix à l’avance et validez la réparation en un clic.",
  },
  {
    titel: "Réparation",
    text: "Vous voyez en direct si nous attendons des pièces ou si nous sommes déjà à l’œuvre.",
  },
  {
    titel: "Récupérer",
    text: "Dès que tout est prêt, vous recevez un message et payez au retrait ou en ligne.",
  },
];

const fahrzeuge = [
  {
    titel: "Vélos électriques",
    text: "Ville, trekking, vélo cargo et VTT électrique. Moteurs pédalier et moyeu de toutes les marques courantes.",
  },
  {
    titel: "Motos électriques",
    text: "Équivalent 125 cm³ et plus, route et tout-terrain. Batteries haute tension manipulées uniquement par du personnel habilité.",
  },
  {
    titel: "Scooters électriques",
    text: "Scooters et trottinettes homologués. Batterie, motorisation, freins et éclairage remis en conformité.",
  },
];

// Beispielsortiment, bis der Shop an die Datenbank angebunden ist.
const ersatzteile = [
  { name: "Plaquettes de frein à disque, organiques", passt: "Shimano, Tektro, Magura", preis: "24,90 €" },
  { name: "Chargeur 42 V, 4 A", passt: "Batteries 36 V avec connecteur Rosenberger", preis: "89,00 €" },
  { name: "Courroie de transmission 118 dents", passt: "Gates CDX", preis: "64,50 €" },
  { name: "Pneu 17 pouces, route", passt: "Motos électriques équivalent 125 cm³", preis: "119,00 €" },
];

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-zink/85 backdrop-blur">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-5 py-4 md:px-10">
          <a href="#" className="font-stencil text-3xl leading-none tracking-wide">
            Lucky Bike
          </a>
          <nav aria-label="Navigation principale" className="hidden gap-8 md:flex">
            <a href="#leistungen" className="hover:text-klee">Prestations</a>
            <a href="#ablauf" className="hover:text-klee">Déroulement</a>
            <a href="#ersatzteile" className="hover:text-klee">Pièces détachées</a>
            <a href="#kontakt" className="hover:text-klee">Contact</a>
          </nav>
          <a
            href="#termin"
            className="rounded-full bg-tinte px-5 py-2 text-sm font-bold text-papier transition-colors hover:bg-klee"
          >
            Prendre rendez-vous
          </a>
        </div>
      </header>

      <main>
        <Werkstatt />

        <section id="ablauf" className="scroll-mt-20 bg-papier">
          <div className="mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-32">
            <h2 className="max-w-[18ch] font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-extrabold">
              Comment se passe votre réparation
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
              Ce que nous réparons
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
                Les pièces de notre atelier
              </h2>
              <a
                href="#ersatzteile"
                className="rounded-full border-2 border-papier px-6 py-[10px] font-bold transition-colors hover:bg-papier hover:text-tinte"
              >
                Voir la boutique
              </a>
            </div>
            <p className="mt-6 max-w-[40rem] text-papier/70">
              Les pièces que nous montons nous-mêmes. Commandez en ligne et
              retirez-les à l’atelier, ou faites-les poser lors de votre rendez-vous.
            </p>
            <table className="mt-12 w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Pièce</th>
                  <th>Compatible avec</th>
                  <th>Prix</th>
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
              Votre véhicule ne roule plus ? Prenez rendez-vous.
            </h2>
            <div className="md:col-span-5 md:self-end">
              <p className="text-lg text-papier/85">
                La réservation en ligne arrive bientôt. En attendant, joignez-nous
                par téléphone ou par e-mail.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:+33000000000"
                  className="rounded-full bg-papier px-6 py-3 font-bold text-klee-dunkel transition-colors hover:bg-zink"
                >
                  Appeler
                </a>
                <a
                  href="mailto:werkstatt@luckybike.example"
                  className="rounded-full border-2 border-papier px-6 py-[10px] font-bold transition-colors hover:bg-papier hover:text-klee-dunkel"
                >
                  Écrire un e-mail
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
              Atelier de réparation pour motos, vélos et scooters électriques.
            </p>
          </div>
          <div className="md:col-span-3">
            <h2 className="font-bold">Adresse</h2>
            <p className="mt-2 text-tinte-weich">
              1 rue de l’Exemple<br />
              00000 Ville
            </p>
          </div>
          <div className="md:col-span-3">
            <h2 className="font-bold">Horaires</h2>
            <p className="mt-2 text-tinte-weich">
              Lun–ven : 9 h–18 h<br />
              Sam : 10 h–14 h
            </p>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-bold">Informations légales</h2>
            <p className="mt-2 text-tinte-weich">
              <a href="#" className="hover:text-klee">Mentions légales</a>
              <br />
              <a href="#" className="hover:text-klee">Confidentialité</a>
            </p>
          </div>
        </div>
        <div className="border-t border-tinte/15">
          <p className="mx-auto max-w-[90rem] px-5 py-6 text-sm text-tinte-weich md:px-10">
            Site réalisé par{" "}
            <a
              href="https://poinderecharge.com"
              target="_blank"
              rel="noopener"
              className="font-bold text-tinte underline decoration-tinte/30 underline-offset-4 hover:text-klee hover:decoration-klee"
            >
              poinderecharge
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
