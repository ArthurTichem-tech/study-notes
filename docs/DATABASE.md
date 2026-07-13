# Databasefundament

Study Notes gebruikt PostgreSQL met Drizzle ORM. Dit past bij de relationele kern van de applicatie: studie-items hebben controleerbare relaties met dossiers, vragen, thema's, bronnen, Bijbelgedeelten en schrijfsecties.

## Huidige status

Het schema en de eerste SQL-migratie zijn aanwezig. Voor lokale ontwikkeling gebruikt het project PGlite: een ingebedde PostgreSQL-database die zonder Docker of aparte database-installatie werkt. Een beheerde PostgreSQL-database voor productie wordt later gekoppeld.

## Tabellen

| Tabel | Doel |
| --- | --- |
| `users` | Persoonlijke eigenaar van dossiers en herbruikbare bronnen. |
| `research_dossiers` | Centraal onderzoeksdossier met onderzoeksvraag en beoogd eindproduct. |
| `themes` | Hiërarchische thema's en subthema's binnen een dossier. |
| `research_questions` | Deelvragen, eventueel gekoppeld aan een thema. |
| `study_items` | Notities, citaten, stellingen, argumenten en andere inhoudstypen. |
| `sources` | Herbruikbare bibliografische bronnen van een gebruiker. |
| `source_references` | Concrete bronlocatie bij een studie-item. |
| `bible_references` | Een of meer Bijbelgedeelten bij een studie-item. |
| `connections` | Getypeerde relatie met toelichting tussen twee studie-items. |
| `writing_sections` | Hiërarchische hoofdstukken en secties van de schrijfstructuur. |
| `writing_section_items` | Geordende plaats van een studie-item in een schrijfsectie. |

## Belangrijke regels

- Inhoud wordt gearchiveerd via een status in plaats van direct verwijderd.
- Studie-items, vragen, thema's, verbanden en schrijfsecties zijn aan een dossier gekoppeld.
- Samengestelde foreign keys blokkeren relaties tussen items uit verschillende dossiers.
- Een item mag niet met zichzelf worden verbonden.
- Dezelfde getypeerde relatie tussen twee items mag niet dubbel worden opgeslagen.
- Hoofdstukken, verzen, jaartallen en sorteerposities hebben databasecontroles.
- Paginavelden zijn tekstvelden, zodat ook Romeinse of afwijkende paginanummers mogelijk blijven.
- Bronnen kunnen door meerdere studie-items worden hergebruikt.
- Eén studie-item kan in meerdere schrijfsecties worden gebruikt zonder duplicatie van de inhoud.

## Lokale database

Maak de lokale database aan en voer alle openstaande migraties uit:

```bash
npm run db:local:setup
```

De databasebestanden komen standaard in `.data/postgres`. Deze map staat in `.gitignore`, zodat lokale onderzoeksdata nooit per ongeluk wordt gecommit. Het commando mag veilig vaker worden uitgevoerd: alleen nog niet geregistreerde migraties worden toegepast.

De opslaglocatie kan optioneel worden aangepast in `.env.local`:

```env
PGLITE_DATA_DIR=.data/postgres
```

PGlite is bedoeld voor lokale ontwikkeling en tests. De uiteindelijke applicatie gebruikt een gewone PostgreSQL-verbinding. Vul daarvoor later een geldige verbinding in:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/study_notes
```

Geheime verbindingsgegevens worden niet in Git opgenomen.

## Commando's

```bash
# Genereer een migratie nadat het schema is gewijzigd
npm run db:generate

# Controleer de migratiemetadata
npm run db:check

# Maak de ingebedde lokale database aan of werk deze bij
npm run db:local:setup

# Voer nog niet uitgevoerde migraties uit op de ingestelde database
npm run db:migrate

# Open de lokale database-inspectie
npm run db:studio
```

## Bestanden

- `src/db/schema.ts`: tabellen, enums, indexen en beperkingen.
- `src/db/client.ts`: kleine databasefactory zonder globale verbinding.
- `src/db/local-migrations.ts`: transactionele migratierunner voor de lokale database.
- `scripts/setup-local-db.ts`: lokaal installatiecommando met blijvende opslag.
- `drizzle.config.ts`: configuratie van migratiegeneratie en databasecommando's.
- `drizzle/`: versiebeheer van gegenereerde SQL en Drizzle-metadata.

## Volgende technische stap

De database en migraties zijn lokaal bruikbaar en automatisch getest. De volgende productstap is de frontend omzetten naar echte onderzoeksdossiers; daarna kiezen en implementeren we authenticatie voor de persoonlijke omgeving.
