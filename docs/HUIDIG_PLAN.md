# Study Notes - huidig product- en bouwplan

## 1. Doel van de app

Study Notes is een eenvoudige studietool waarmee gebruikers verbanden kunnen vastleggen en terugvinden tussen:

- hoofdthema's en subthema's;
- notities en citaten;
- Bijbelgedeelten;
- personen en gebeurtenissen;
- boeken en andere bronnen.

De app is bedoeld voor inhoudelijke studie, niet voor technisch beheer. De gebruiker moet snel iets kunnen opslaan, later gemakkelijk kunnen zoeken en vanuit een notitie kunnen doorklikken naar verwant materiaal.

Een belangrijk voorbeeld is een project rond **rechtvaardiging**. Daarbinnen kan een gebruiker een citaat van Luther koppelen aan Romeinen 1:17, een notitie over Kohlbrugge en een bronverwijzing naar een studieboek. Bij iedere koppeling kan kort worden uitgelegd waarom die bestaat.

## 2. Uitgangspunten

1. **Inhoud eerst.** De app moet studeren ondersteunen en mag geen doel op zichzelf worden.
2. **Eenvoudige invoer.** Een notitie of citaat moet zonder ingewikkelde formulieren kunnen worden toegevoegd.
3. **Lijstweergaven als basis.** Verbanden worden vooral overzichtelijk onder elkaar getoond. Een visuele netwerkweergave hoort niet bij de eerste versie.
4. **Betekenisvolle koppelingen.** Een link krijgt een type en kan een korte toelichting bevatten.
5. **Rustige interface.** De taal en bediening zijn begrijpelijk voor niet-technische gebruikers.
6. **Desktop en mobiel.** De app wordt desktop-first gebouwd en is volledig responsive.
7. **Geleidelijke uitbreiding.** Nieuwe mogelijkheden worden alleen toegevoegd als ze het studeren aantoonbaar eenvoudiger maken.

## 3. Structuur van studiemateriaal

De gebruiker werkt vanuit een hiërarchie die lijkt op `epic > feature > backlog-item`, maar in begrijpelijke studietaal:

```text
Hoofdthema
└── Subthema
    └── Item
```

Voorbeeld:

```text
Rechtvaardiging
├── Rechtvaardiging door het geloof
│   ├── Citaat uit Luthers commentaar op Galaten
│   └── Notitie bij Romeinen 1:17
└── Wet en evangelie
    └── Bronverwijzing naar Kohlbrugge
```

Subthema's mogen later verder worden onderverdeeld, maar de interface toont steeds maar één duidelijk niveau tegelijk. Zo blijft de structuur begrijpelijk.

## 4. Inhoudstypen in het MVP

Het MVP gebruikt drie itemtypen:

### Notitie

Voor eigen observaties, samenvattingen en uitleg.

### Citaat

Voor een letterlijk tekstgedeelte uit een boek, preek, artikel of andere bron.

### Bronverwijzing

Voor een verwijzing naar materiaal zonder dat een volledig citaat nodig is.

Een Bijbelgedeelte is in het MVP een veld binnen een item. Het wordt nog geen apart zwaar inhoudstype.

## 5. Velden van een item

Niet ieder veld is verplicht. De gebruiker vult alleen in wat voor de betreffende notitie nuttig is.

- titel;
- type: notitie, citaat of bronverwijzing;
- inhoud of citaat;
- auteur of persoon;
- boek of bron;
- pagina en/of hoofdstuk;
- Bijbelgedeelte;
- korte eigen toelichting;
- bovenliggend hoofdthema of subthema;
- datum van aanmaken en laatste wijziging;
- maker van het item.

Voorbeeld:

```text
Type: Citaat
Titel: Geloof en toegerekende gerechtigheid
Auteur: Maarten Luther
Bron: Commentaar op Galaten
Hoofdstuk: 2
Pagina: 117
Bijbelgedeelte: Galaten 2:16
Citaat: "..."
Toelichting: Luther verbindt hier het geloof direct aan de vreemde gerechtigheid van Christus.
```

## 6. Verbanden tussen items

Een gebruiker kan twee items aan elkaar koppelen. Een koppeling bevat:

- het eerste item;
- het tweede item;
- een koppelingstype;
- een korte, optionele toelichting;
- de maker en aanmaakdatum.

Het MVP begint met vijf duidelijke koppelingstypen:

- `hoort bij`;
- `ondersteunt`;
- `verwijst naar`;
- `werkt uit`;
- `contrasteert met`.

Voorbeeld:

```text
Luthers citaat "ondersteunt" de notitie bij Romeinen 1:17.

Toelichting: Beide benadrukken dat de rechtvaardiging niet op werken maar op geloof berust.
```

De toelichting is belangrijk omdat een verzameling losse links anders snel onduidelijk wordt.

## 7. Werkruimtes en samenwerking

Er zijn twee soorten werkruimtes:

- **Persoonlijke werkruimte:** alleen voor de eigenaar.
- **Gedeelde werkruimte:** meerdere uitgenodigde gebruikers werken samen.

Iedere gedeelde werkruimte heeft een beheerder die gebruikers kan uitnodigen en rollen kan toekennen.

## 8. Rollen en rechten

### Zichtbare rollen

| Rol | Lezen | Schrijven | Gebruikers beheren | Werkruimte beheren |
| --- | --- | --- | --- | --- |
| Lezer | Ja | Nee | Nee | Nee |
| Schrijver | Ja | Ja | Nee | Nee |
| Werkruimtebeheerder | Ja | Ja | Ja | Ja |

Het MVP gebruikt rechten op werkruimteniveau. Rechten per thema of per afzonderlijk item worden nog niet gebouwd, omdat dit de bediening en techniek onnodig zwaar maakt.

### Verborgen global admin

Er is één verborgen rol `global admin`, uitsluitend voor de eigenaar van het platform.

Deze rol is bedoeld voor herstel en ondersteuning wanneer een omgeving vastloopt, bijvoorbeeld wanneer:

- een werkruimte geen actieve beheerder meer heeft;
- toegangsrechten verkeerd zijn ingesteld;
- een gebruiker ondersteuning vraagt bij verloren toegang;
- technisch onderzoek naar een probleem nodig is.

Gewone gebruikers zien deze rol, bijbehorende menu's en technische functies niet. Gebruik van global-adminrechten moet later worden vastgelegd in een auditlog.

## 9. Belangrijkste schermen van het MVP

### 1. Inloggen

Eenvoudig aanmelden en toegang krijgen tot de eigen werkruimtes.

### 2. Werkruimte-overzicht

Overzicht van persoonlijke en gedeelde werkruimtes.

### 3. Startscherm

Toont hoofdthema's, recente notities, een zoekveld en een snelle knop om iets toe te voegen.

### 4. Thema-overzicht

Lijst met hoofdthema's en bijbehorende subthema's.

### 5. Themadetail

Toont onderliggende subthema's en items in een rustige lijstweergave.

### 6. Item toevoegen of bewerken

Een eenvoudig formulier waarvan alleen titel, type en inhoud de kern vormen. Bronvelden kunnen naar behoefte worden ingevuld.

### 7. Itemdetail

Toont de volledige inhoud, brongegevens, Bijbelgedeelten en alle gekoppelde items met toelichting.

### 8. Koppeling maken

De gebruiker kiest een bestaand item, een koppelingstype en eventueel een korte uitleg.

### 9. Zoeken

Eén centrale zoekfunctie voor alle toegankelijke studiematerialen.

### 10. Gebruikers en rechten

De werkruimtebeheerder nodigt gebruikers uit en wijzigt hun rol.

### 11. Verborgen beheeromgeving

Alleen toegankelijk voor de global admin en bedoeld voor herstel, ondersteuning en auditinformatie.

## 10. Zoeken

Zoeken is een kernfunctie en doorzoekt binnen de werkruimtes waartoe de gebruiker toegang heeft:

- titels;
- inhoud van notities;
- citaten;
- auteurs en personen;
- boeken en bronvermeldingen;
- pagina's en hoofdstukken;
- Bijbelgedeelten;
- thema- en subthemanamen;
- toelichtingen bij koppelingen.

De eerste versie gebruikt eenvoudige tekstzoeking en een beperkt aantal filters, zoals werkruimte, thema en itemtype. Slimme of semantische zoeksuggesties volgen pas later.

## 11. Wat bewust niet in het MVP zit

- een interactieve netwerk- of graafweergave;
- automatische theologische conclusies door AI;
- automatische import uit boeken, PDF's of websites;
- veel verschillende itemtypen;
- ingewikkelde filterbouwers;
- rechten per afzonderlijk thema of item;
- uitgebreide technische dashboards;
- automatische koppelingen zonder bevestiging van de gebruiker;
- volledige Bijbeltekstintegraties waarvoor licenties nodig zijn.

## 12. Technische richting

De huidige frontendbasis gebruikt:

- Next.js;
- React;
- TypeScript;
- responsive CSS;
- een Nederlandstalige interface.

Voor de verdere bouw ligt een eenvoudige relationele backend voor de hand, bijvoorbeeld PostgreSQL met een beheerde dienst voor authenticatie en databasebeheer. De definitieve keuze wordt gemaakt bij het onderdeel authenticatie en opslag.

Belangrijke technische voorwaarden:

- iedere databasevraag wordt begrensd door werkruimte en toegangsrechten;
- de global-adminrol wordt server-side afgedwongen en nooit alleen in de interface verborgen;
- koppelingen worden als eigen records opgeslagen, inclusief type en toelichting;
- wijzigingen aan rollen en gebruik van global-adminrechten worden later gelogd;
- formulieren en lijsten moeten goed werken met toetsenbord en mobiel scherm.

## 13. Bouwvolgorde

Ieder onderdeel krijgt een eigen branch en pull request.

### Fase 1 - Fundament

- responsive app-shell;
- basisstijl en navigatie;
- technische projectconfiguratie.

### Fase 2 - Authenticatie en werkruimtes

- registreren en inloggen;
- persoonlijke werkruimte;
- gedeelde werkruimte;
- basisrollen;
- verborgen global-adminfundament.

### Fase 3 - Thema's en subthema's

- hoofdthema aanmaken, wijzigen en archiveren;
- subthema's toevoegen;
- navigeren door de hiërarchie;
- rustige lijstweergaven.

### Fase 4 - Studie-items

- notitie, citaat en bronverwijzing toevoegen;
- bron- en Bijbelvelden;
- itemdetail en bewerken;
- validatie en eenvoudige lege toestanden.

### Fase 5 - Verbanden

- items koppelen;
- koppelingstype kiezen;
- toelichting toevoegen;
- gekoppelde items onder elkaar tonen;
- doorklikken tussen items.

### Fase 6 - Zoeken

- centrale tekstzoeking;
- zoeken binnen toegankelijke werkruimtes;
- filters voor werkruimte, thema en itemtype;
- doorklikken vanuit zoekresultaten.

### Fase 7 - Samenwerking en beheer

- gebruikers uitnodigen;
- rollen wijzigen;
- toegangscontrole volledig afdwingen;
- herstelacties voor global admin;
- auditlogging voor gevoelige acties.

### Fase 8 - Afronding MVP

- responsive en toegankelijkheidscontrole;
- duidelijke foutmeldingen en lege toestanden;
- beveiligingscontrole;
- gebruikershandleiding;
- gereedmaken voor een eerste kleine testgroep.

## 14. Definitie van een geslaagd MVP

Het MVP is geslaagd wanneer een gebruiker zonder technische uitleg:

1. kan inloggen en een persoonlijke of gedeelde werkruimte kan openen;
2. een hoofdthema en subthema kan aanmaken;
3. een notitie, citaat of bronverwijzing kan opslaan;
4. een boek, pagina, hoofdstuk en Bijbelgedeelte kan vermelden;
5. twee items met een begrijpelijk type en een toelichting kan koppelen;
6. via een lijst van het ene item naar het andere kan doorklikken;
7. eerder materiaal snel kan terugvinden met zoeken;
8. op desktop en mobiel prettig kan werken;
9. in een gedeelde werkruimte alleen acties kan uitvoeren die bij de toegewezen rol horen.

## 15. Mogelijke uitbreidingen na het MVP

Alleen na gebruikerstesten en wanneer de basis aantoonbaar prettig werkt:

- slimme suggesties voor mogelijke verbanden;
- tijdlijnen voor historische personen en gebeurtenissen;
- een optionele visuele verbandenkaart;
- export naar Markdown of PDF;
- import van eigen notities;
- uitgebreidere bronbibliografie;
- tags en opgeslagen zoekopdrachten;
- versiegeschiedenis van notities;
- publieke of alleen-lezen gedeelde verzamelingen.

## 16. Centrale productvraag

Bij iedere nieuwe functie wordt gevraagd:

> Helpt dit de gebruiker om inhoud sneller vast te leggen, een betekenisvol verband te begrijpen of bestaand studiemateriaal terug te vinden?

Als het antwoord niet duidelijk ja is, hoort de functie niet in het MVP.
