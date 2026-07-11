import {
  ArrowRight,
  BookOpenText,
  CaretRight,
  ClockCounterClockwise,
  FolderSimple,
  House,
  LinkSimple,
  MagnifyingGlass,
  NotePencil,
  Plus,
  Users,
} from "@phosphor-icons/react/dist/ssr";

const themes = [
  { title: "Rechtvaardiging", meta: "4 subthema's · 18 notities", accent: "clay" },
  { title: "Romeinenbrief", meta: "6 subthema's · 31 notities", accent: "sage" },
  { title: "Luther", meta: "3 subthema's · 12 notities", accent: "ochre" },
];

const recentNotes = [
  {
    type: "Citaat",
    title: "Geloof en toegerekende gerechtigheid",
    source: "Maarten Luther · Commentaar op Galaten",
    detail: "Hoofdstuk 2 · pagina 117",
  },
  {
    type: "Bijbelgedeelte",
    title: "De rechtvaardige zal uit het geloof leven",
    source: "Romeinen 1:16-17",
    detail: "Verbonden met Rechtvaardiging",
  },
  {
    type: "Notitie",
    title: "Wet en evangelie bij Kohlbrugge",
    source: "Eigen aantekening",
    detail: "Gisteren bijgewerkt",
  },
];

export default function Home() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Studiearchief startpagina">
          <span className="brand-mark"><BookOpenText size={24} weight="duotone" /></span>
          <span><strong>Studie</strong>archief</span>
        </a>

        <nav className="main-nav" aria-label="Hoofdnavigatie">
          <a className="active" href="#"><House size={20} /> Overzicht</a>
          <a href="#themas"><FolderSimple size={20} /> Mijn thema&apos;s</a>
          <a href="#recent"><ClockCounterClockwise size={20} /> Recent bekeken</a>
          <a href="#"><Users size={20} /> Gedeeld met mij</a>
        </nav>

        <div className="sidebar-footer">
          <div className="workspace-label">Werkruimte</div>
          <button className="workspace-switcher">
            <span className="avatar">AT</span>
            <span><strong>Persoonlijk</strong><small>Arthur Tichem</small></span>
            <CaretRight size={16} />
          </button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="mobile-brand"><BookOpenText size={22} /><strong>Studiearchief</strong></div>
          <label className="search">
            <MagnifyingGlass size={19} />
            <input type="search" placeholder="Zoek in thema's, citaten en bronnen..." />
            <kbd>⌘ K</kbd>
          </label>
          <button className="primary-button"><Plus size={18} weight="bold" /> Nieuwe notitie</button>
        </header>

        <div className="content">
          <section className="intro">
            <div>
              <p className="eyebrow">Zaterdag 11 juli</p>
              <h1>Goedemorgen, Arthur.</h1>
              <p>Waar wil je vandaag verder over nadenken?</p>
            </div>
            <div className="ornament" aria-hidden="true">Soli Deo Gloria</div>
          </section>

          <section id="themas" className="section-block">
            <div className="section-heading">
              <div><p className="eyebrow">Jouw verzameling</p><h2>Hoofdthema&apos;s</h2></div>
              <a href="#">Alle thema&apos;s <ArrowRight size={17} /></a>
            </div>
            <div className="theme-grid">
              {themes.map((theme) => (
                <a className="theme-card" href="#" key={theme.title}>
                  <span className={`folder-icon ${theme.accent}`}><FolderSimple size={25} weight="duotone" /></span>
                  <span><strong>{theme.title}</strong><small>{theme.meta}</small></span>
                  <CaretRight className="card-arrow" size={18} />
                </a>
              ))}
              <button className="theme-card add-card"><Plus size={22} /><span><strong>Nieuw hoofdthema</strong><small>Begin een nieuwe studie</small></span></button>
            </div>
          </section>

          <section id="recent" className="section-block recent-section">
            <div className="section-heading">
              <div><p className="eyebrow">Ga verder waar je was</p><h2>Recente notities</h2></div>
            </div>
            <div className="notes-list">
              {recentNotes.map((note, index) => (
                <a className="note-row" href="#" key={note.title}>
                  <span className="note-icon">{index === 0 ? <NotePencil size={21} /> : index === 1 ? <BookOpenText size={21} /> : <LinkSimple size={21} />}</span>
                  <span className="note-content"><span className="note-type">{note.type}</span><strong>{note.title}</strong><small>{note.source}</small></span>
                  <span className="note-detail">{note.detail}</span>
                  <CaretRight size={18} />
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      <nav className="mobile-nav" aria-label="Mobiele navigatie">
        <a className="active" href="#"><House size={21} /><span>Overzicht</span></a>
        <a href="#themas"><FolderSimple size={21} /><span>Thema&apos;s</span></a>
        <button aria-label="Nieuwe notitie"><Plus size={23} weight="bold" /></button>
        <a href="#recent"><ClockCounterClockwise size={21} /><span>Recent</span></a>
        <a href="#"><Users size={21} /><span>Gedeeld</span></a>
      </nav>
    </div>
  );
}
