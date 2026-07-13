# Ontwikkelstatus Study Notes

Laatst bijgewerkt: **13 juli 2026**

Dit document is de vaste voortgangsregistratie van Study Notes. Het wordt bijgewerkt wanneer een onderdeel start, een pull request wordt geopend of werk in `main` wordt gemergd.

## Statuslegenda

| Status | Betekenis |
| --- | --- |
| Niet gestart | Er is nog geen ontwerp of implementatie begonnen. |
| In voorbereiding | Scope, onderzoek of ontwerp wordt uitgewerkt. |
| In ontwikkeling | Er wordt actief gebouwd op een featurebranch. |
| In PR | Het onderdeel staat in een open pull request. |
| Afgerond | Het onderdeel is gecontroleerd en gemergd in `main`. |
| Geblokkeerd | Er is een concrete blokkade die voortgang verhindert. |

## Huidige positie

**Actieve productfase:** fase 1 - technisch fundament. Fase 0 is voor nu bewust overgeslagen om direct met de software te starten.

**Technische positie:** de responsive frontendbasis, het relationele databaseschema en de automatische testbasis staan in `main`. Op branch `agent/local-database` wordt een blijvende lokale ontwikkel-database toegevoegd. Authenticatie en de inhoudelijke onderzoeksworkflow zijn nog niet gebouwd.

**Eerstvolgende mijlpaal:** aantonen dat gebruikers de kernworkflow begrijpen en waardevol vinden:

```text
onderzoeksvraag
→ materiaal vastleggen
→ bronnen en Bijbelgedeelten koppelen
→ verbanden en argumenten ordenen
→ schrijfstructuur maken
→ exporteren
```

## Voortgang per fase

| Fase | Status | Voortgang | Eerstvolgende resultaat |
| --- | --- | --- | --- |
| 0. Probleemvalidatie en prototype | Uitgesteld | Op verzoek overgeslagen om direct met de software te starten. | Later alsnog uitvoeren vóór een brede marktintroductie. |
| 1. Technisch fundament | In ontwikkeling | Projectconfiguratie, responsive app-shell, PostgreSQL-model, eerste migratie en automatische testbasis zijn afgerond. De lokale ontwikkel-database wordt aangesloten. | Lokale database afronden, frontendtermen aanpassen en authenticatie kiezen. |
| 2. Account en persoonlijke omgeving | Niet gestart | Nog geen authenticatie, accountbeheer of onderzoeksdossiers. | Technische keuze voor authenticatie en persoonlijke dataopslag. |
| 3. Onderzoeksvragen, thema's en deelvragen | Niet gestart | Alleen illustratieve thema's in de frontend. | Functioneel dossier met onderzoeksvraag, deelvragen en themahiërarchie. |
| 4. Studie-items | Niet gestart | Alleen illustratieve notities in de frontend. | Items aanmaken, typeren, bewerken en archiveren. |
| 5. Bronnen en Bijbelverwijzingen | Niet gestart | Conceptueel beschreven in het productplan. | Herbruikbare bronnen en meerdere Bijbelverwijzingen per item. |
| 6. Betekenisvolle verbanden | Niet gestart | Relatietypen en regels zijn productmatig beschreven. | Getypeerde inkomende en uitgaande relaties met toelichting. |
| 7. Zoeken en terugvinden | Niet gestart | Alleen een niet-functioneel zoekveld in de frontend. | Tekstzoeking en filters binnen eigen dossiers. |
| 8. Argumentatieoverzicht | Niet gestart | Productworkflow en gewenste itemfuncties zijn beschreven. | Stellingen, argumenten, tegenargumenten en vragen per onderzoeksvraag. |
| 9. Schrijfstructuur en export | Niet gestart | Export is als verplicht MVP-onderdeel vastgelegd. | Ordenbare schrijfsecties en bruikbare Markdown-export. |
| 10. Eenvoudige import | Niet gestart | Gewenste importvormen zijn beschreven. | Tekst plakken en eerste Markdown- of CSV-import. |
| 11. Afronding individueel MVP | Niet gestart | Nog niet van toepassing. | Toegankelijke, veilige en gedocumenteerde testversie. |
| 12. Gesloten gebruikerstest | Niet gestart | Testdoelgroep en metrics zijn beschreven. | Test met 10-20 gebruikers en gemeten gebruik na 1 en 4 weken. |
| 13. Betaalde pilot | Niet gestart | Commerciële hypothese is beschreven. | Eenvoudig betaald aanbod en eerste retentiemeting. |
| 14. Samenwerking | Uitgesteld | Bewust buiten het individuele MVP geplaatst. | Alleen starten na aantoonbare waarde van de individuele workflow. |
| 15. Institutioneel beheer | Uitgesteld | Bewust buiten het individuele MVP geplaatst. | Alleen starten bij concrete organisatorische vraag. |

## Fase 0 - concrete checklist

- [ ] Vijf tot tien gebruikers selecteren uit de primaire doelgroep.
- [ ] Interviewvragen en observatieformulier voorbereiden.
- [ ] Bestaande onderzoeksprocessen laten zien en analyseren.
- [ ] Terugkerende problemen en huidige hulpmiddelen samenvatten.
- [ ] Betalingsbereidheid voorzichtig toetsen.
- [ ] Prototype aanpassen aan de belangrijkste waargenomen workflow.
- [ ] Een dossier met onderzoeksvraag kunnen openen.
- [ ] Citaten, notities, bronnen en Bijbelgedeelten kunnen toevoegen.
- [ ] Items als argument en tegenargument kunnen typeren.
- [ ] Betekenisvolle verbanden met toelichting kunnen leggen.
- [ ] Een eenvoudige schrijfstructuur kunnen maken.
- [ ] Een controleerbare proefexport kunnen genereren.
- [ ] Kernworkflow met gebruikers testen en bevindingen vastleggen.

## Fase 1 - technische checklist

- [x] Next.js-, React- en TypeScript-project configureren.
- [x] Responsive desktop- en mobiele app-shell bouwen.
- [x] Basisstijl en Nederlandstalige navigatie toevoegen.
- [x] Linting en productiebuild laten slagen.
- [x] Productie-afhankelijkheden op bekende kwetsbaarheden controleren.
- [x] Relationeel PostgreSQL-datamodel en eerste migratie toevoegen.
- [x] Testfundament met frontend- en database-integratietests toevoegen.
- [ ] Frontendtermen aanpassen van algemene thema's naar onderzoeksdossiers.
- [x] PostgreSQL en Drizzle als databasebasis vastleggen.
- [x] Blijvende lokale ontwikkel-database zonder Docker toevoegen.
- [x] Eerste migratie lokaal en herhaalbaar uitvoeren.
- [ ] Definitieve authenticatiekeuze vastleggen.
- [ ] Server-side toegangscontrole voorbereiden.
- [x] Automatische testbasis toevoegen.
- [ ] Centrale foutafhandeling en logging toevoegen.

## Afgeronde pull requests

| PR | Onderdeel | Resultaat |
| --- | --- | --- |
| [#1](https://github.com/ArthurTichem-tech/study-notes/pull/1) | Responsive app foundation | Gemergd. Technische frontendbasis, startscherm en mobiele navigatie toegevoegd. |
| [#2](https://github.com/ArthurTichem-tech/study-notes/pull/2) | Eerste MVP-plan | Gemergd en met deze planwijziging vervangen door de individuele onderzoeksworkflow. |
| [#3](https://github.com/ArthurTichem-tech/study-notes/pull/3) | Vernieuwd productplan en ontwikkelstatus | Gemergd. Individuele onderzoeksworkflow en vaste voortgangsregistratie toegevoegd. |
| [#4](https://github.com/ArthurTichem-tech/study-notes/pull/4) | Database- en testfundering | Gemergd. Relationeel PostgreSQL-model, eerste migratie en frontend- en database-integratietests toegevoegd. |

## Actieve pull requests

De lokale ontwikkel-database is in ontwikkeling op branch `agent/local-database`. Er zijn geen andere actieve functionele pull requests.

## Belangrijke koersbesluiten

1. Het eerste MVP richt zich op één individuele gebruiker, niet op samenwerking.
2. Het centrale object is een onderzoeksdossier met een onderzoeksvraag, niet alleen een los hoofdthema.
3. Argumentatie, schrijfstructuur en export horen bij de kernwaarde van het MVP.
4. Samenwerking, rollen en global-adminbeheer worden pas na validatie van de individuele workflow gebouwd.
5. AI is niet nodig voor het MVP en mag controleerbare brongegevens nooit vervangen.
6. Fase 0 met gebruikersvalidatie en een workflowprototype gaat vóór uitgebreide backendontwikkeling.

## Eerstvolgende ontwikkelbeslissingen

1. De bestaande startpagina inhoudelijk aanpassen van thema-overzicht naar onderzoeksdossiers.
2. Authenticatie voor de persoonlijke onderzoeksomgeving kiezen en implementeren.
3. Daarna onderzoeksdossiers functioneel maken, inclusief tests voor iedere gebruikersroute.

## Werkwijze voor voortgang

- Ieder afgebakend onderdeel krijgt een eigen branch en pull request.
- De voortgang wordt bij iedere PR bijgewerkt in dit document.
- Een onderdeel is pas **afgerond** nadat het in `main` is gemergd.
- Na een geslaagde merge worden de remote en lokale featurebranch verwijderd.
- Nieuwe ideeën worden eerst aan de drie centrale productvragen uit het productplan getoetst.
