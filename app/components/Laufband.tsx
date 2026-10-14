/* ─── Branchen-Laufband ──────────────────────────────────────────
   Läuft endlos von rechts nach links und hält beim Drüberfahren an.
   Später können hier Kunden-Logos oder Zitate stehen.             */

export function Laufband({ titel, liste }: { titel: string; liste: string[] }) {
  return (
    <div className="laufband-wrap">
      <p className="laufband-titel">{titel}</p>
      <span className="sr-only">{liste.join(", ")}</span>
      <div className="laufband">
        <div className="laufband-spur" aria-hidden="true">
          {/* doppelt, damit der Übergang nahtlos ist */}
          {[0, 1].map((n) =>
            liste.map((b) => (
              <span key={`${n}-${b}`} className="laufband-pill">
                <span className="laufband-punkt" />
                {b}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
