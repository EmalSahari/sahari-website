# Kunde-onboarding checkliste

En praktisk gennemgang fra første samtale til efter launch. Brug den så du
ikke vender tilbage med småspørgsmål en gang om dagen.

**Hvordan du bruger den:**
- Print den, eller åbn den i en parallel fane mens du snakker med kunden
- Kopier sektioner du har brug for til Notion / mail
- Tilføj og slet noter efterhånden som du bliver mere erfaren

---

## 1. Før første møde

- [ ] Læs kundens nuværende hjemmeside (hvis de har en)
- [ ] Tjek deres CVR på cvr.dk så du ved virksomheden er reel
- [ ] Kig på deres Instagram og Google Business Profile for brand-feeling
- [ ] Find 2-3 lignende virksomheder (konkurrenter) der har gode sider
- [ ] Klargør 5 spørgsmål specifikt til deres branche

---

## 2. Første samtale (30-45 min)

Du behøver ikke spørge alt på første møde, men dæk i hvert fald:

### Forretning
- [ ] Hvad sælger de, og hvem er kunden?
- [ ] Hvor finder kunder dem i dag (telefon, Facebook, Google, mund-til-mund)?
- [ ] Hvor mange forespørgsler får de om ugen lige nu?
- [ ] Hvad er målet med en ny side? (flere leads, mere troværdig, en
      konkret feature som booking)

### Smag og scope
- [ ] Vis 3 sider de elsker — hvorfor specifikt?
- [ ] Vis 3 sider de hader — hvorfor?
- [ ] Beskriv brandet i 3 ord (premium / friendly / traditionel / rå)
- [ ] Hvor mange sider tænker de?

### Praktik
- [ ] Har de set pricing-siden? Hvilken pakke matcher de sig selv med
      (single / standard / premium / custom)?
- [ ] Hvornår skal det være live senest?
- [ ] Vil de selv eje hosting/domæne (Option B) eller skal jeg fakturere
      årligt (Option A)?
- [ ] Hvem er kontaktperson hos dem til hele projektet?

**Note om budget:** Spørg ikke direkte om budget. Pricing-siden gør det
arbejde for dig — hvis de kontakter dig, har de set tallene. Spørg i
stedet hvilken pakke de tænker, så ved du allerede hvad de regner med
at betale. Hvis de skal have noget custom over Premium, prissæt efter
scope, ikke budget.

### Bookkeeping
- [ ] Officielt firmanavn til faktura
- [ ] CVR-nummer
- [ ] Faktureringsadresse + email
- [ ] EAN-nummer hvis offentlig kunde

---

## 3. Efter første samtale (samme dag)

- [ ] Send opsummering på email med deres egne ord (så de føler sig hørt)
- [ ] Send skriftligt tilbud med scope, pris, deadline, betalingsplan
- [ ] Betaling: 50% op front, 50% før go-live
- [ ] Lav projektmappe (Notion side eller lokal folder)
- [ ] Tilføj kunden til din kalender for tracking
- [ ] Sæt en deadline for hvornår du skal høre fra dem

---

## 4. Information du SKAL have FØR du begynder at kode

Send en checkliste til kunden med præcis hvad du har brug for. Sig at
projektet ikke starter timeren før det er der.

### Brand & content
- [ ] Logo i vektorformat (.svg eller .ai) hvis de har et
- [ ] Brand-farver (hex-koder) hvis de har et
- [ ] Brand-skrifter (eller aftale om jeg vælger)
- [ ] Højopløsnings-billeder af produkter, lokaler, medarbejdere
- [ ] Tekst-indhold per side (eller aftale om vi skriver sammen via AI)
- [ ] Sociale medier handles (Instagram, Facebook, LinkedIn)

### Teknisk
- [ ] Har de et eksisterende domæne? Hvor er det registreret?
- [ ] Hvis ja, hvad er login til domæneudbyderen?
- [ ] Eksisterende email-løsning? Vil de beholde den?
- [ ] Eksisterende analytics konto de vil have migreret?

**Vigtig regel:** hvis de ikke leverer dette inden for 14 dage, så har de
ikke energi til projektet. Pause indtil de er klar.

---

## 5. Kontoer — hvem opretter hvad

### KUNDEN SKAL oprette i deres eget navn

- [ ] **Stripe** (hvis betaling)
  - De skal have CVR + bankkonto i firmanavn
  - Du sidder ved siden af dem under signup (15 min)
  - Brug Stripe Standard (ikke Connect)

- [ ] **Domæne** (name.dk, Simply.com osv.)
  - Registreret i deres firma-navn med dem som ejer
  - Kun deres email og bankoplysninger

- [ ] **Google Workspace** (hvis custom email som info@dinvirksomhed.dk)
  - ~50 kr/md per bruger
  - Skal verificere domæne-ejerskab

- [ ] **MobilePay Business** (hvis relevant)
  - Søges via Vipps MobilePay erhverv
  - Process tager 1-2 uger — start tidligt

- [ ] **Mokio** (hvis booking)
  - 200 kr/md per stol
  - De opretter konto, du sætter widget på siden

- [ ] **Google Analytics property** (i deres Google-konto)
  - Du tilføjer dig selv som admin

- [ ] **Google Business Profile** (hvis lokal forretning)

- [ ] **OpenAI / Anthropic API** (hvis AI features)
  - De opretter konto, sætter betalingsmetode op
  - Du får API-nøgle via 1Password

### DU OPRETTER (under dit navn eller deres login)

- [ ] **Vercel team** — opret nyt team per kunde, ikke samme team
- [ ] **GitHub repo** — privat, klar til at overdrage senere
- [ ] **Resend** (til contact form / email sending) — dit subscription
- [ ] **Supabase** (kun hvis projektet kræver database)

### Logins du har brug for fra dem (i 1Password)

- [ ] Vercel admin access (hvis Option B)
- [ ] Domæneudbyder (til DNS-opsætning)
- [ ] Stripe (read-only, så du ikke kan flytte penge)
- [ ] Google Analytics admin
- [ ] Google Workspace admin (hvis du sætter email op)

---

## 6. Under projektet

### Setup-dag
- [ ] Opret Vercel-team for kunden
- [ ] Opret privat GitHub repo
- [ ] Konfigurer DNS (domæne peger til Vercel)
- [ ] Verificer SSL-certifikat er aktivt
- [ ] Sæt Resend op til contact form

### Design-fasen (FØR du koder en linje)
- [ ] Lav 2-3 mockup-screenshots i Figma eller direkte i kode
- [ ] Send til kunden, vent på skriftlig godkendelse
- [ ] Aftal hvor mange revisioner der er inkluderet
- [ ] Skriv ned hvad der bliver lavet, så I begge har samme forventning

### Build-fasen
- [ ] Send kort dagligt update (én linje på SMS eller mail)
- [ ] Test mobile fra dag 1, ikke kun til sidst
- [ ] Implementer alt-text på alle billeder
- [ ] Test focus-states (tab-navigation)
- [ ] Brug Vercel preview links til at vise fremskridt

---

## 7. Pre-launch checkliste (intet må mangle)

### Funktionalitet
- [ ] Alle links virker (manuel klik-igennem)
- [ ] Contact form testet — mail sendt til både dig og kunden
- [ ] Alle CTA-knapper går til det rigtige sted
- [ ] Hvis betaling: lav et test-køb gennem hele flowet
- [ ] Hvis booking: lav en test-booking

### Performance
- [ ] Side loader på under 3 sekunder (test med PageSpeed Insights)
- [ ] Alle billeder er WebP-konverteret og under 200KB hver
- [ ] Lazy loading på billeder under fold
- [ ] Score over 90 på Lighthouse Performance

### SEO & metadata
- [ ] Title tag på hver side
- [ ] Meta description på hver side
- [ ] OG-image (1200x630) til sociale medier shares
- [ ] Favicon synlig i browser-tab
- [ ] Sitemap.xml genereret
- [ ] Robots.txt sat
- [ ] Canonical URLs sat
- [ ] Google Search Console submitted

### Mobile
- [ ] Testet på iPhone (mindst 1 model)
- [ ] Testet på Android
- [ ] Navigation virker på touch
- [ ] Tekst er læselig uden zoom
- [ ] Knapper er store nok til fingre (min 44px)

### Analytics
- [ ] Google Analytics aktivt og tracker korrekt
- [ ] Test event sendt og synlig i GA realtime
- [ ] Vercel Analytics aktiveret (hvis det er en Sahari hosting)

### Sikkerhed
- [ ] Ingen API-nøgler i frontend-koden
- [ ] Alle secrets er env vars i Vercel
- [ ] Contact form har honeypot mod bots
- [ ] CORS-headers er sat hvis der er en backend

### Final test
- [ ] Kunden klikker igennem hele siden — får skriftlig OK
- [ ] Du klikker igennem som en bruger der aldrig har set den før
- [ ] Tjek staveligheden af hver eneste tekst

---

## 8. Launch-dag

- [ ] Switch DNS til production (hvis ikke allerede)
- [ ] Verificer https://siden.dk virker uden warnings
- [ ] Test contact form på live siden
- [ ] Send "go live" email til kunden med:
  - [ ] Link til den live side
  - [ ] Hvad de skal teste hjemmefra
  - [ ] Hvordan de når dig hvis noget er galt
  - [ ] Hvad der nu er deres ansvar (passwords, opdateringer)
- [ ] Send faktura for resterende 50%
- [ ] Tilbud om month-to-month maintenance hvis relevant
- [ ] Tag screenshots til din portfolio

---

## 9. Efter launch

### Uge 1
- [ ] Tjek 2 gange om siden kører normalt (Vercel dashboard)
- [ ] Tjek at Google Analytics modtager trafik
- [ ] Spørg kunden: "Har du nogen feedback?"

### Uge 4 (30-dages check-in)
- [ ] Send personlig email: "Hvordan går det med siden?"
- [ ] Anmod om kort skriftlig testimonial (med tilladelse til portfolio)
- [ ] Spørg om referencer: "Kender du nogen der har brug for det her?"
- [ ] Tilbud om månedlig vedligeholdelses-abonnement (495 kr/md+)

### Måned 3
- [ ] Tjek analytics — har de fået leads gennem siden?
- [ ] Send opfølgning med konkrete tal: "Du har haft X besøgende og Y
      formular-udfyldelser"
- [ ] Brug det til at lave case study på dit portfolio
- [ ] Spørg om en LinkedIn-anbefaling

---

## 10. Hvis projektet glider

- [ ] Hvis kunden ikke leverer indhold til tiden: send venlig rykker efter
      7 dage, derefter en bestemt deadline efter 14 dage
- [ ] Hvis projektet glider mere end 1 uge: send revideret tidslinje
      skriftligt så I er enige
- [ ] Hvis kunden bliver vanskelig: tag en pause på en dag, læs kontrakten,
      beslut om I fortsætter eller opsiger
- [ ] Hvis du selv glider: vær ærlig om hvorfor og hvornår det er klart
- [ ] Hvis kunden ikke betaler: påmind én gang, send rykker med
      renteberegning efter 30 dage, evt. inkasso efter 60

---

## Værktøjer du skal have klar fra start

- [ ] 1Password Teams (delt vault per kunde — IKKE samme vault for alle)
- [ ] Notion til projekt-tracking + skabeloner
- [ ] Cal.com / Mokio til at booke kunde-møder
- [ ] Figma til mockups
- [ ] PDF-skabelon til tilbud (kort, en side)
- [ ] PDF-skabelon til faktura (med CVR, kontonr, betalingsbetingelser)
- [ ] Email-skabeloner du genbruger:
  - [ ] Introduktion efter første kontakt
  - [ ] Tilbud
  - [ ] Information-request (det du har brug for fra dem)
  - [ ] Daglig status under projekt
  - [ ] Pre-launch test invitation
  - [ ] Go-live announcement
  - [ ] 30-dages follow-up
  - [ ] Anmodning om testimonial

---

## Regler du holder for dig selv

1. **Svar inden for 24 timer på enhver kundebesked**, også hvis det bare
   er "jeg vender tilbage i morgen"
2. **Send altid skriftlig opsummering** efter et opkald — så der ikke er
   tvivl om hvad I blev enige om
3. **Lov aldrig noget du ikke har checket på listen** først
4. **Forskellige Vercel-teams per kunde** — gør det nemmere at overdrage
5. **Logins går i 1Password**, ikke i mails eller chats
6. **Estimater er ALDRIG endelige før de er skrevet på papir**
7. **Hvis du tvivler om scope, så spørg** — det er bedre at virke
   grundig end at gætte forkert

---

Sidst opdateret: Juni 2025
