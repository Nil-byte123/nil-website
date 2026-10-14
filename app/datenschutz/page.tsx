import Link from "next/link";
import type { Metadata } from "next";
import { NilLogo } from "../components/NilLogo";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der NIL gemäß DSGVO.",
  robots: { index: false, follow: false },
};

export default function Datenschutz() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "0 24px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <NilLogo size={24} />
        </Link>
        <Link href="/" style={{
          textDecoration: "none", color: "#FAFAFA", fontSize: "14px", fontWeight: 500,
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          ← Zurück zur Startseite
        </Link>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: "8px" }}>Datenschutzerklärung</h1>
        <p style={{ color: "#6B6B6B", fontSize: "14px", marginBottom: "48px" }}>Stand: Oktober 2026 | Gemäß DSGVO, BDSG und TDDDG</p>

        <section style={sectionStyle}>
          <h2 style={h2Style}>1. Verantwortlicher</h2>
          <p style={pStyle}>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br /><br />
            Nil Elian Quezada Capa<br />
            NIL<br />
            Aschauerstraße 17<br />
            82445 Schwaigen<br />
            E-Mail: <a href="mailto:info@nilogik.de" style={linkStyle}>info@nilogik.de</a><br /><br />
            Gesetzlich vertreten durch Cecilia Quezada Capa, Anschrift wie oben.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>2. Überblick</h2>
          <p style={pStyle}>
            Wir verarbeiten personenbezogene Daten nur, soweit dies für den Betrieb dieser Website, die Beantwortung
            deiner Anfragen oder – mit deiner Einwilligung – für die Reichweitenmessung nötig ist. Wir verkaufen keine
            Daten und nutzen sie nicht für Werbung. Daten werden gelöscht, sobald der Zweck entfällt und keine
            gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>3. Hosting und Server-Logfiles</h2>
          <p style={pStyle}>
            Diese Website wird gehostet von <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA.
            Beim Aufruf der Website werden automatisch technische Daten verarbeitet, die dein Browser übermittelt:
          </p>
          <ul style={listStyle}>
            <li>IP-Adresse</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>aufgerufene Seite bzw. Datei</li>
            <li>Browsertyp und Betriebssystem</li>
          </ul>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Diese Daten sind nötig, um die Website sicher und stabil auszuliefern. Zum Schutz vor Missbrauch
            (z.&nbsp;B. massenhaften Anfragen) wird die IP-Adresse außerdem kurzzeitig im Arbeitsspeicher des
            Servers gezählt; sie wird dabei nicht dauerhaft gespeichert. Mit Vercel besteht ein Vertrag zur
            Auftragsverarbeitung. Eine Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy
            Framework bzw. von Standardvertragsklauseln der EU-Kommission. Mehr dazu:{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={linkStyle}>vercel.com/legal/privacy-policy</a>.
          </p>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren Betrieb).
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>4. Cookies, lokale Speicherung und Einwilligung</h2>
          <p style={pStyle}>
            Deine Auswahl im Cookie-Banner („Nur notwendige“ oder „Alle akzeptieren“) speichern wir im lokalen
            Speicher deines Browsers (localStorage, Eintrag „nil-cookie-consent“), damit der Banner nicht bei jedem
            Besuch erneut erscheint. Diese Speicherung ist technisch notwendig (§ 25 Abs. 2 Nr. 2 TDDDG).
          </p>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Alle anderen Cookies – insbesondere die von Google Analytics – werden <strong>nur mit deiner
            Einwilligung</strong> gesetzt (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO). Du kannst deine
            Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem du im Footer auf
            „Cookie-Einstellungen“ klickst und „Nur notwendige“ wählst. Die Analytics-Cookies werden dann gelöscht.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>5. Google Analytics (nur mit Einwilligung)</h2>
          <p style={pStyle}>
            Wenn du einwilligst, nutzen wir Google Analytics 4, einen Webanalysedienst der <strong>Google Ireland
            Limited</strong>, Gordon House, Barrow Street, Dublin 4, Irland. Damit sehen wir in zusammengefasster Form,
            wie Besucher unsere Website nutzen (z.&nbsp;B. aufgerufene Seiten, Verweildauer, Gerätetyp, ungefähre Region),
            um sie zu verbessern.
          </p>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Google Analytics setzt dafür Cookies (z.&nbsp;B. „_ga“). IP-Adressen werden in Google Analytics 4 nicht
            gespeichert. Es kann jedoch nicht ausgeschlossen werden, dass Daten an die Google LLC in den USA
            übermittelt werden; diese ist unter dem EU-US Data Privacy Framework zertifiziert. Die Daten werden
            nach spätestens 14 Monaten gelöscht.
          </p>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Rechtsgrundlage: deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG), die du jederzeit
            widerrufen kannst (siehe Abschnitt 4). Mehr dazu:{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>policies.google.com/privacy</a>.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>6. Kontaktformular und E-Mail</h2>
          <p style={pStyle}>
            Wenn du uns über das Kontaktformular oder per E-Mail schreibst, verarbeiten wir deinen Namen, deine
            E-Mail-Adresse und deine Nachricht, um deine Anfrage zu beantworten. Die Nachricht wird per E-Mail über
            unseren E-Mail-Anbieter STRATO (Berlin, Deutschland) an uns zugestellt. Wir geben deine Daten nicht an
            Dritte weiter und löschen sie, sobald deine Anfrage erledigt ist, sofern keine gesetzlichen
            Aufbewahrungspflichten bestehen (z.&nbsp;B. wenn daraus ein Auftrag entsteht).
          </p>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertrags) bzw. Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an der Beantwortung allgemeiner Anfragen).
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>7. Live-Demo des Chat-Assistenten</h2>
          <p style={pStyle}>
            Auf der Startseite kannst du einen Demo-Assistenten ausprobieren. Die automatische Vorführung beim
            Hinscrollen läuft nur in deinem Browser, dabei werden keine Daten übertragen.
          </p>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Wenn du selbst eine Nachricht schreibst, wird diese zusammen mit dem bisherigen Gesprächsverlauf an unseren
            Server und von dort an den KI-Dienst <strong>Groq, Inc.</strong> (USA) gesendet, um eine Antwort zu erzeugen.
            Wir speichern die Chat-Nachrichten nicht. Bitte gib in der Demo <strong>keine persönlichen Daten</strong>{" "}
            (z.&nbsp;B. Name, Telefonnummer, Gesundheitsdaten) ein – es handelt sich nur um eine Vorführung mit
            erfundenen Beispiel-Betrieben. Dabei werden die eingegebenen Texte in die USA übermittelt. Mehr dazu:{" "}
            <a href="https://groq.com/privacy-policy" target="_blank" rel="noopener noreferrer" style={linkStyle}>groq.com/privacy-policy</a>.
          </p>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse, unser Angebot vorzuführen); die
            Nutzung der Demo ist freiwillig.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>8. Terminbuchung über Calendly</h2>
          <p style={pStyle}>
            Für die Buchung eines Erstgesprächs verlinken wir auf <strong>Calendly</strong> (Calendly LLC, 115 E Main St,
            Ste A1B, Buford, GA 30518, USA). Calendly ist nicht in unsere Website eingebunden; Daten werden erst
            übertragen, wenn du den Link anklickst und dort einen Termin buchst. Dann gilt die Datenschutzerklärung von
            Calendly:{" "}
            <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>calendly.com/privacy</a>.
            Die Daten deiner Buchung (Name, E-Mail, Termin, ggf. Notiz) nutzen wir zur Durchführung des Gesprächs.
          </p>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertrags).
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>9. Schriftarten</h2>
          <p style={pStyle}>
            Die verwendeten Schriftarten werden direkt von unserem Server ausgeliefert. Es findet keine Verbindung zu
            Google Fonts oder anderen Schrift-Anbietern statt.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>10. Deine Rechte</h2>
          <p style={pStyle}>Du hast nach der DSGVO folgende Rechte:</p>
          <ul style={listStyle}>
            <li><strong>Auskunft</strong> (Art. 15 DSGVO) über die zu deiner Person gespeicherten Daten</li>
            <li><strong>Berichtigung</strong> (Art. 16 DSGVO) unrichtiger Daten</li>
            <li><strong>Löschung</strong> (Art. 17 DSGVO) deiner gespeicherten Daten</li>
            <li><strong>Einschränkung</strong> (Art. 18 DSGVO) der Verarbeitung</li>
            <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
            <li><strong>Widerspruch</strong> (Art. 21 DSGVO) gegen Verarbeitungen auf Grundlage berechtigter Interessen</li>
            <li><strong>Widerruf</strong> einer erteilten Einwilligung jederzeit mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
          </ul>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Schreib uns dazu einfach an <a href="mailto:info@nilogik.de" style={linkStyle}>info@nilogik.de</a>.
          </p>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Du hast außerdem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für uns zuständig
            ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach,{" "}
            <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer" style={linkStyle}>www.lda.bayern.de</a>.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>11. Datensicherheit</h2>
          <p style={pStyle}>
            Diese Website nutzt eine SSL/TLS-Verschlüsselung (erkennbar an „https://“ in der Adresszeile). Daten, die du
            uns übermittelst, können dadurch nicht von Dritten mitgelesen werden.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={h2Style}>12. Änderungen</h2>
          <p style={pStyle}>
            Wir passen diese Datenschutzerklärung an, wenn sich unsere Website oder die rechtlichen Anforderungen
            ändern. Es gilt die jeweils hier veröffentlichte Fassung.
          </p>
        </section>

        <div style={{ paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Link href="/impressum" style={{ color: "#FAFAFA", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
            Zum Impressum →
          </Link>
        </div>
      </div>
    </main>
  );
}

const sectionStyle: React.CSSProperties = {
  marginBottom: "40px",
  paddingBottom: "40px",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const h2Style: React.CSSProperties = {
  fontSize: "18px", fontWeight: 600, color: "#FAFAFA",
  marginBottom: "12px", letterSpacing: "-0.02em",
};

const pStyle: React.CSSProperties = {
  color: "#A3A3A3", fontSize: "15px", lineHeight: 1.75,
};

const listStyle: React.CSSProperties = {
  ...pStyle, paddingLeft: "20px", marginTop: "10px",
};

const linkStyle: React.CSSProperties = {
  color: "#FAFAFA", textDecoration: "underline", textUnderlineOffset: "3px",
};
