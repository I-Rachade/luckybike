// Technische Zeichnung eines E-Motorrads. Jede Baugruppe ist eine <g> mit
// data-teil, damit die Explosionsanimation sie einzeln bewegen kann.
// Alle Linien nutzen currentColor, damit eine Baugruppe per `color`
// hervorgehoben werden kann.

const spokes = [0, 72, 144, 216, 288];

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <circle className="linie" cx={cx} cy={cy} r={96} strokeWidth={14} />
      <circle className="linie" cx={cx} cy={cy} r={76} strokeWidth={2} />
      <circle className="linie" cx={cx} cy={cy} r={14} strokeWidth={3} />
      {spokes.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            className="linie"
            x1={cx + Math.cos(rad) * 14}
            y1={cy + Math.sin(rad) * 14}
            x2={cx + Math.cos(rad + 0.25) * 76}
            y2={cy + Math.sin(rad + 0.25) * 76}
            strokeWidth={3}
          />
        );
      })}
    </>
  );
}

function Disc({ cx, cy, caliperDeg }: { cx: number; cy: number; caliperDeg: number }) {
  const rad = (caliperDeg * Math.PI) / 180;
  const x = cx + Math.cos(rad) * 44;
  const y = cy + Math.sin(rad) * 44;
  return (
    <>
      <circle className="linie" cx={cx} cy={cy} r={46} strokeWidth={3} />
      <circle
        className="linie"
        cx={cx}
        cy={cy}
        r={36}
        strokeWidth={4}
        strokeDasharray="3 9"
      />
      <rect
        className="linie"
        x={x - 9}
        y={y - 16}
        width={18}
        height={32}
        rx={5}
        strokeWidth={3}
        transform={`rotate(${caliperDeg} ${x} ${y})`}
      />
    </>
  );
}

export default function BikeDrawing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-40 -80 900 640"
      className={className}
      role="img"
      aria-label="Dessin technique d’une moto électrique avec batterie, moteur, électronique, freins et roues"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g data-teil="hinterrad">
        <Wheel cx={190} cy={370} />
      </g>
      <g data-teil="vorderrad">
        <Wheel cx={640} cy={370} />
      </g>

      <g data-teil="rahmen">
        {/* Lenkkopf, Hauptrahmen, Schwinge */}
        <path className="linie" d="M556 146 L572 206" strokeWidth={8} />
        <path className="linie" d="M562 162 L430 196 L300 206" strokeWidth={6} />
        <path className="linie" d="M570 204 L470 312 L376 334" strokeWidth={6} />
        <path className="linie" d="M376 334 L190 370 M384 352 L190 370" strokeWidth={5} />
        <path className="linie" d="M300 206 L214 192 M222 198 L330 296" strokeWidth={4} />
        {/* Sitzbank und Lenker */}
        <path className="linie" d="M206 184 Q262 164 336 192" strokeWidth={12} />
        <path className="linie" d="M540 122 L594 104 L626 112" strokeWidth={5} />
      </g>

      <g data-teil="fahrwerk">
        {/* Gabel */}
        <path className="linie" d="M550 140 L630 368 M566 134 L646 362" strokeWidth={5} />
        {/* Federbein */}
        <path
          className="linie"
          d="M292 224 L300 240 L284 250 L308 262 L284 274 L308 286 L292 296 L300 316"
          strokeWidth={3}
        />
      </g>

      <g data-teil="akku">
        <rect className="linie" x={330} y={206} width={180} height={94} rx={12} strokeWidth={4} />
        <path className="linie" d="M366 218 V288 M402 218 V288 M438 218 V288 M474 218 V288" strokeWidth={2} />
        <rect className="linie" x={480} y={194} width={18} height={12} rx={3} strokeWidth={3} />
        <rect className="linie" x={346} y={194} width={18} height={12} rx={3} strokeWidth={3} />
      </g>

      <g data-teil="motor">
        <circle className="linie" cx={396} cy={346} r={38} strokeWidth={4} />
        <circle className="linie" cx={396} cy={346} r={22} strokeWidth={2} />
        <path
          className="linie"
          d="M396 324 V312 M415 335 L426 329 M415 357 L426 363 M396 368 V380 M377 357 L366 363 M377 335 L366 329"
          strokeWidth={3}
        />
        {/* Riemen zum Hinterrad */}
        <path className="linie" d="M392 308 L188 354 M392 384 L188 386" strokeWidth={2} />
      </g>

      <g data-teil="elektronik">
        {/* Controller unter der Sitzbank */}
        <rect className="linie" x={236} y={212} width={58} height={34} rx={5} strokeWidth={3} />
        <path className="linie" d="M248 246 V256 M262 246 V256 M276 246 V256" strokeWidth={2} />
        {/* Kabelbaum zum Cockpit */}
        <path
          className="linie"
          d="M294 222 C360 170 470 150 590 128"
          strokeWidth={2}
          strokeDasharray="6 6"
        />
        {/* Display und Scheinwerfer */}
        <rect
          className="linie"
          x={584}
          y={112}
          width={42}
          height={26}
          rx={4}
          strokeWidth={3}
          transform="rotate(-12 605 125)"
        />
        <circle className="linie" cx={598} cy={176} r={15} strokeWidth={3} />
        <path className="linie" d="M618 168 L646 160 M620 178 L650 178" strokeWidth={2} />
      </g>

      <g data-teil="scheibe-hinten">
        <Disc cx={190} cy={370} caliperDeg={-30} />
      </g>
      <g data-teil="scheibe-vorn">
        <Disc cx={640} cy={370} caliperDeg={210} />
      </g>
    </svg>
  );
}
