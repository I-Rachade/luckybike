# Lucky Bike – Design-Richtung (v1)

**Thema:** Werkstatt für E-Motorräder, E-Bikes und E-Roller. Publikum: Pendler und Fahrer, deren Fahrzeug gerade nicht fährt. Hauptaufgabe der Seite: Vertrauen schaffen und zur Terminbuchung führen.

## Idee
Die Startseite zeigt das Fahrzeug so, wie die Werkstatt es sieht: als technische Zeichnung. Beim Laden zeichnet sich ein E-Motorrad Strich für Strich, beim Scrollen zerlegt es sich in Baugruppen (Explosionszeichnung). Jede Baugruppe ist eine Leistung: Akku, Motor, Elektronik, Bremsen und Räder. Das ist der eine große Motion-Moment, alles andere bleibt ruhig.

## Farben
| Name | Hex | Rolle |
|---|---|---|
| Zink | `#E4E7E3` | Seitenhintergrund, kühles Metall statt Creme |
| Papier | `#F6F7F5` | Flächen, Listen |
| Tinte | `#17201C` | Text, Linien der Zeichnung |
| Kleeblatt | `#1F6F4A` | Markenfarbe (das „Lucky“), Buttons, Buchungsband |
| Funke | `#3355FF` | nur für „Strom“: aktive Linien, Hervorhebung der Baugruppe |
| Signal | `#F2B705` | sparsam für Status, z. B. „Wartet auf Teile“ im Backoffice |

## Schrift
- **Big Shoulders** (schmal, industriell, wie Typenschilder) für Überschriften, groß und eng gesetzt.
- **Big Shoulders Stencil** nur für die Wortmarke.
- **Atkinson Hyperlegible Next** für Fließtext und Bedienelemente: sehr gut lesbar, auch für Preise und Formulare im Backoffice.

## Layout
Linksbündig, 12-Spalten-Raster. Hero: Text links (5 Spalten), Zeichnung rechts (7 Spalten). Im Scroll-Abschnitt bleibt die Zeichnung stehen und links wechselt der Text pro Baugruppe. Darunter ruhige Abschnitte: Ablauf (echte Schrittfolge, daher nummeriert), Fahrzeuge, Ersatzteile als Liste, grünes Buchungsband, Footer.

## Prinzipien
- Ein Motion-Moment (Zeichnung + Explosion), keine Einblend-Animationen pro Abschnitt.
- Keine Karten-Raster; Informationen als Listen und Spalten mit Linien.
- `prefers-reduced-motion`: keine Animation, Leistungen als normale Liste.
- Geprüfte Alternative: Schwarz + Neongrün (typischer E-Mobility-Look) bewusst verworfen, weil austauschbar.
