# Databasefundament

Study Notes gebruikt PostgreSQL met Drizzle ORM. Dit past bij de relationele kern van de applicatie: studie-items hebben controleerbare relaties met dossiers, vragen, thema's, bronnen, Bijbelgedeelten en schrijfsecties.

## Huidige status

Het schema en de eerste SQL-migratie zijn aanwezig. Er is nog geen lokale of beheerde PostgreSQL-database gekoppeld en er staat nog geen echte gebruikersdata in de applicatie.

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

## Configuratie

Maak lokaal een `.env.local` op basis van `.env.example` en vul een geldige PostgreSQL-verbinding in:

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

# Voer nog niet uitgevoerde migraties uit op de ingestelde database
npm run db:migrate

# Open de lokale database-inspectie
npm run db:studio
```

## Bestanden

- `src/db/schema.ts`: tabellen, enums, indexen en beperkingen.
- `src/db/client.ts`: kleine databasefactory zonder globale verbinding.
- `drizzle.config.ts`: configuratie van migratiegeneratie en databasecommando's.
- `drizzle/`: versiebeheer van gegenereerde SQL en Drizzle-metadata.

## Volgende technische stap

De eerste migratie moet op een echte ontwikkel-PostgreSQL-database worden uitgevoerd. Daarna voegen we geautomatiseerde tests toe voor de belangrijkste integriteitsregels en kiezen we authenticatie voor de persoonlijke onderzoeksomgeving.
