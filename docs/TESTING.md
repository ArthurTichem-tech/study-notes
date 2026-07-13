# Teststrategie

Tests zijn een standaardonderdeel van iedere Study Notes-feature en worden in dezelfde pull request toegevoegd of aangepast.

## Vaste regels

1. Nieuwe functionaliteit krijgt tests voor het normale gebruik en de belangrijkste foutpaden.
2. Een bugfix krijgt eerst of gelijktijdig een regressietest die het probleem aantoont.
3. Databasewijzigingen krijgen integratietests tegen de echte gegenereerde SQL-migraties.
4. Belangrijke schermen krijgen tests op zichtbare inhoud, acties en toegankelijke namen.
5. Een pull request slaagt minimaal voor tests, linting, databasecontrole en productiebuild.
6. Wanneer een onderdeel redelijkerwijs niet automatisch testbaar is, wordt de reden en de handmatige controle in de PR beschreven.

## Testlagen

### Unit- en componenttests

Vitest voert snelle tests uit voor logica en React-componenten. Testing Library controleert schermen vanuit het perspectief van een gebruiker en selecteert bij voorkeur op rollen, labels en zichtbare tekst.

### Database-integratietests

PGlite draait lokaal een ingebedde PostgreSQL-omgeving. De tests voeren de echte SQL-migraties uit en controleren onder andere:

- of alle tabellen kunnen worden aangemaakt;
- of verbanden met hetzelfde item worden geweigerd;
- of verbanden niet over dossiergrenzen heen kunnen lopen;
- of dubbele relaties worden geweigerd;
- of ongeldige Bijbelverwijzingen worden geweigerd.

Er zijn hiervoor geen externe database en geen geheime gegevens nodig.

### End-to-endtests

Zodra dossiers en invoerformulieren functioneel zijn, voegen we browsergebaseerde end-to-endtests toe voor de belangrijkste gebruikersroutes. Die horen bij de feature-PR waarin de route wordt gebouwd.

## Commando's

```bash
# Alle tests eenmalig uitvoeren
npm test

# Tests tijdens ontwikkeling automatisch herhalen
npm run test:watch

# Overige verplichte PR-controles
npm run db:check
npm run lint
npm run build
```

## Huidige dekking

- frontend-smoketests voor startscherm, navigatie en primaire acties;
- migratie-smoketest voor het volledige databaseschema;
- integriteitstests voor verbanden en Bijbelverwijzingen.

Testdekking groeit per feature mee. Een algemeen dekkingspercentage is niet het doel op zichzelf; belangrijke gebruikers- en gegevensregels moeten aantoonbaar beschermd zijn.
