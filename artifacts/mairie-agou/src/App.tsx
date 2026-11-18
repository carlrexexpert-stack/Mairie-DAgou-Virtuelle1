import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter, Link } from 'wouter';
import { ArrowRight, ChevronDown, ExternalLink, Facebook, FileText, MapPin, Menu, Newspaper, Sprout, UsersRound, X } from 'lucide-react';

const queryClient = new QueryClient();
const base = import.meta.env.BASE_URL;
const emblem = `${base}images/agou-emblem.jpg`;
const townHall = `${base}images/agou-town-hall.jpg`;
const mayorPortrait = `${base}images/mayor-yapo.jpg`;
const articles = {
  flood: 'https://www.aip.ci/cote-divoire-aip-le-maire-dagou-appelle-les-populations-a-la-vigilance-apres-des-inondations/',
  women: 'https://www.aip.ci/cote-divoire-aip-agou-la-faitiere-des-femmes-placee-sous-le-signe-de-la-solidarite-et-de-lautonomisation/',
  mayor: 'https://www.fratmat.info/article/232219/elections-locales-2023/elections-locales-2023/agou-yapo-euloge-determine-a-achever-les-chantiers-entames',
};
const facebookPage = 'https://www.facebook.com/p/Mairie-dAGOU-officiel-61557142105836';
const mapSearch = 'https://www.google.com/maps/search/?api=1&query=Mairie+d%27Agou+C%C3%B4te+d%27Ivoire';
const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services', children: [{ href: '/services', label: 'Démarches administratives' }, { href: '/faq', label: 'Questions fréquentes' }] },
  { href: '/conseil-municipal', label: 'Conseil municipal', children: [{ href: '/conseil-municipal', label: 'Le maire & les actions' }] },
  { href: '/actualites', label: 'Actualités' },
  { href: '/vivre-a-agou', label: 'Vivre à Agou', children: [{ href: '/vivre-a-agou', label: 'Territoire & villages' }] },
  { href: '/contacts', label: 'Contacts' },
  { href: '/faq', label: 'FAQ' },
];

function SiteHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <div className="topline">
      <div className="topline-inner">
        <span className="flash-label">À la une</span>
        <div className="ticker" aria-label="Actualités locales">
          <span>Agou — vigilance après les inondations, appel relayé par l’AIP • Solidarité et autonomisation au cœur d’une rencontre des femmes d’Agou • Commune de la région de La Mé, département d’Adzopé</span>
        </div>
        <div className="top-social"><a href={facebookPage} target="_blank" rel="noreferrer" aria-label="Consulter la page Facebook officielle de la mairie" data-testid="link-facebook-header"><Facebook size={12}/></a></div>
      </div>
    </div>
    <div className="masthead">
      <div className="masthead-inner">
        <Link href="/" className="brand" onClick={() => setMenuOpen(false)} data-testid="link-brand-home">
          <img src={emblem} alt="Emblème de la Commune d’Agou" data-testid="img-agou-emblem"/>
          <span className="brand-copy"><strong>Mairie d’Agou</strong><span>Commune de la région de La Mé</span></span>
        </Link>
        <div className="masthead-note"><MapPin size={16}/><span>Département d’Adzopé<br/><b>République de Côte d’Ivoire</b></span></div>
      </div>
    </div>
    <nav className="main-nav" aria-label="Navigation principale">
      <div className="nav-inner">
        <button className="mobile-toggle" aria-expanded={menuOpen} aria-controls="main-menu" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={19}/> : <Menu size={19}/>} <span>{menuOpen ? 'Fermer' : 'Menu'}</span>
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="main-menu">
          {navItems.map((item) => <div className="nav-group" key={item.href}>
            <Link href={item.href} className={`nav-link ${location === item.href ? 'active' : ''}`} onClick={() => setMenuOpen(false)} data-testid={`link-nav-${item.href.slice(1) || 'accueil'}`}>
              {item.label}{'children' in item && <ChevronDown size={12} aria-hidden="true"/>}
            </Link>
            {'children' in item && item.children && <div className="nav-submenu">{item.children.map((child) => <Link key={child.href} href={child.href} onClick={() => setMenuOpen(false)} data-testid={`link-subnav-${child.href.slice(1)}`}>{child.label}</Link>)}</div>}
          </div>)}
          <a className="nav-cta" href={facebookPage} target="_blank" rel="noreferrer" data-testid="link-facebook-nav">Suivre les informations <ArrowRight size={13}/></a>
        </div>
      </div>
    </nav>
  </>;
}

function SiteFooter() {
  return <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <div className="footer-brand"><img src={emblem} alt="Emblème de la Commune d’Agou"/><div><strong>Mairie d’Agou</strong><br/><small>Union • Développement • Paix</small></div></div>
          <p>Informations publiques sur la commune d’Agou, ses villages et la vie municipale. Les éléments publiés ici sont datés et sourcés.</p>
        </div>
        <div><h3>La mairie</h3><ul><li><Link href="/conseil-municipal">Le maire</Link></li><li><Link href="/conseil-municipal">Conseil municipal</Link></li><li><Link href="/services">Démarches</Link></li><li><Link href="/contacts">Nous contacter</Link></li></ul></div>
        <div><h3>Découvrir Agou</h3><ul><li><Link href="/vivre-a-agou">La commune en bref</Link></li><li><Link href="/vivre-a-agou">Les sept villages</Link></li><li><Link href="/actualites">Actualités</Link></li><li><Link href="/faq">Questions fréquentes</Link></li></ul></div>
        <div><h3>Informations et sources</h3><ul><li><a href={mapSearch} target="_blank" rel="noreferrer">Localiser la mairie <ExternalLink size={11}/></a></li><li><a href={facebookPage} target="_blank" rel="noreferrer">Page Facebook officielle <ExternalLink size={11}/></a></li><li><a href="https://oidp-afrique.org/2020/03/18/presentation-de-la-commune-dagou" target="_blank" rel="noreferrer">Profil communal (OIDP Afrique) <ExternalLink size={11}/></a></li></ul></div>
      </div>
      <div className="footer-bottom"><span>© Commune d’Agou — Informations publiques</span><span>Population indiquée selon le RGPH 2014.</span></div>
    </div>
  </footer>;
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="site-shell"><SiteHeader/>{children}<SiteFooter/></div>;
}

function SectionHeading({ kicker, title, detail }: { kicker: string; title: string; detail?: string }) {
  return <div><p className="section-kicker">{kicker}</p><h2 className="section-title">{title}</h2>{detail && <p className="section-lede">{detail}</p>}</div>;
}

function NewsCard({ date, month, title, excerpt, href }: { date: string; month: string; title: string; excerpt: string; href: string }) {
  return <a className="news-card" href={href} target="_blank" rel="noreferrer" data-testid={`link-news-${date}-${month}`}>
    <div className="news-date">{date}<small>{month} 2026</small></div>
    <div><span className="source-tag">Reportage AIP</span><h3>{title}</h3><p>{excerpt}</p></div>
  </a>;
}

function Home() {
  return <Shell>
    <main>
      <section className="hero" aria-label="Bienvenue dans la Commune d’Agou">
        <img className="hero-img" src={townHall} alt="Bâtiment de la mairie de la Commune d’Agou" data-testid="img-town-hall-hero"/>
        <div className="hero-inner"><div className="hero-copy">
          <span className="eyebrow">La mairie vous informe</span>
          <h1>Bienvenue<br/>à <em>Agou.</em></h1>
          <p>Au cœur de la région de La Mé, la Commune d’Agou rassemble ses villages autour d’un territoire vivant et agricole.</p>
          <div className="hero-actions"><Link className="button" href="/vivre-a-agou" data-testid="button-discover-agou">Découvrir la commune <ArrowRight size={15}/></Link><Link className="button outline" href="/contacts" data-testid="button-contact-hero">Accès & contacts</Link></div>
        </div></div>
        <span className="hero-location">Agou · Côte d’Ivoire</span>
      </section>

      <div className="quickbar" aria-label="Accès rapides">
        <Link href="/services" className="quick-item" data-testid="link-quick-services"><span className="quick-icon"><FileText size={19}/></span><span><b>Démarches</b><small>Repères pour vos demandes</small></span></Link>
        <Link href="/actualites" className="quick-item" data-testid="link-quick-news"><span className="quick-icon"><Newspaper size={19}/></span><span><b>Actualités</b><small>Suivre les nouvelles d’Agou</small></span></Link>
        <Link href="/conseil-municipal" className="quick-item" data-testid="link-quick-municipal"><span className="quick-icon"><UsersRound size={19}/></span><span><b>Conseil municipal</b><small>Le maire et la vie publique</small></span></Link>
        <Link href="/contacts" className="quick-item" data-testid="link-quick-contact"><span className="quick-icon"><MapPin size={19}/></span><span><b>Localiser la mairie</b><small>Itinéraire sur la carte</small></span></Link>
      </div>

      <section className="section">
        <div className="container welcome-grid">
          <div className="welcome-copy">
            <SectionHeading kicker="La commune en bref" title="Un territoire, sept villages." detail="Agou se situe dans la Région de La Mé, au sein du Département d’Adzopé."/>
            <p>Le profil communal publié en 2020 présente une commune de 190 km² et recense sept villages. Les chiffres de population disponibles ici sont ceux du Recensement général de la population et de l’habitat de 2014, et ne constituent pas une estimation actuelle.</p>
            <div className="welcome-meta">
              <div><span className="meta-number">26 692</span><span className="meta-label">habitants · RGPH 2014</span></div>
              <div><span className="meta-number">190 km²</span><span className="meta-label">superficie communale</span></div>
              <div><span className="meta-number">7</span><span className="meta-label">villages recensés</span></div>
            </div>
            <p><a className="text-link" href="https://oidp-afrique.org/2020/03/18/presentation-de-la-commune-dagou" target="_blank" rel="noreferrer" data-testid="link-source-profile">Voir le profil communal <ExternalLink size={13}/></a></p>
          </div>
          <div className="town-photo-wrap"><img className="town-photo" src={townHall} alt="La mairie d’Agou" loading="lazy"/><span className="photo-caption">Mairie de la Commune d’Agou</span></div>
        </div>
      </section>

      <section className="section news-band">
        <div className="container">
          <div className="section-head"><SectionHeading kicker="Le fil d’Agou" title="À la une" detail="Des sujets locaux relayés par l’Agence Ivoirienne de Presse. Ces articles ne sont pas des communiqués de la mairie."/><Link href="/actualites" className="text-link" data-testid="link-all-news">Toutes les actualités <ArrowRight size={14}/></Link></div>
          <div className="news-grid">
            <NewsCard date="14" month="juin" title="Solidarité et autonomisation au cœur d’une rencontre des femmes d’Agou" excerpt="L’AIP rapporte une rencontre de la faitière des femmes placée sous le signe de la solidarité et de l’autonomisation." href={articles.women}/>
            <NewsCard date="05" month="juin" title="Après des inondations, appel à la vigilance dans la commune" excerpt="Le maire d’Agou appelle les populations à la vigilance, selon un article de l’AIP." href={articles.flood}/>
          </div>
        </div>
      </section>

      <section className="section mayor-section">
        <div className="container mayor-grid">
          <img className="mayor-photo" src={mayorPortrait} alt="Yapo Euloge Servais, maire d’Agou" loading="lazy" data-testid="img-mayor-portrait"/>
          <div className="mayor-copy">
            <p className="section-kicker">Le premier magistrat</p><h2 className="section-title">Yapo Euloge Servais</h2>
            <p>Le maire actuel de la Commune d’Agou est Yapo Euloge Servais. En 2023, candidat à la mairie, il déclarait vouloir poursuivre les projets de développement déjà engagés. Cette présentation se limite aux éléments rapportés par la presse.</p>
            <a className="text-link" href={articles.mayor} target="_blank" rel="noreferrer" data-testid="link-mayor-source">Lire l’article de FratMat du 31 août 2023 <ExternalLink size={13}/></a>
            <div className="fact-strip"><div className="fact"><strong>2023</strong><span>Déclaration rapportée par FratMat</span></div><div className="fact"><strong>5 juin 2026</strong><span>Appel à la vigilance rapporté par l’AIP</span></div><div className="fact"><strong>Agou</strong><span>Commune de la région de La Mé</span></div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container villages-grid">
          <div><SectionHeading kicker="Vivre le territoire" title="Des villages qui font Agou." detail="Le profil communal 2020 identifie sept villages au sein de la commune."/><div className="village-list">{['Agou','Ayalo','N’Guessankoi','Diapé','Andé','Grand-Akoudzin','Boudépé'].map(v => <span className="village-chip" key={v} data-testid={`text-village-${v.toLowerCase().replace(/[^a-z]/g,'-')}`}>{v}</span>)}</div><p><Link className="text-link" href="/vivre-a-agou" data-testid="link-discover-villages">En savoir plus sur Agou <ArrowRight size={13}/></Link></p></div>
          <div className="agri-card"><Sprout size={20} color="#20573f"/><h3>Une économie agricole</h3><p>Le profil de 2020 décrit une agriculture comprenant notamment les cultures suivantes.</p><div className="crop-tags">{['Cacao','Café','Hévéa','Palmier à huile','Manioc','Igname','Banane'].map(crop => <span key={crop}>{crop}</span>)}</div></div>
        </div>
      </section>

      <section className="container" style={{paddingBottom: '80px'}}><div className="cta-panel"><div><h2>Une question sur une démarche ?</h2><p>Les modalités pouvant varier, rapprochez-vous de la mairie ou consultez le canal Facebook officiel.</p></div><Link href="/services" className="button" data-testid="button-services-guide">Consulter les repères <ArrowRight size={14}/></Link></div></section>
    </main>
  </Shell>;
}

function PageHero({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return <section className="page-hero"><div className="container"><p className="section-kicker">{kicker}</p><h1>{title}</h1><p>{text}</p></div></section>;
}

function ServicesPage() {
  return <Shell><main><PageHero kicker="Services municipaux" title="Vos démarches, en repères." text="Cette page fournit des indications générales. Les pièces à fournir, les modalités et les délais doivent être confirmés auprès de la mairie."/>
    <section className="page-body"><div className="container content-layout"><div>
      <div className="content-block"><h2>Avant de vous déplacer</h2><p>Pour une demande administrative, identifiez le service concerné et préparez les informations utiles à votre situation. Les exigences dépendent de la nature de la démarche et ne sont pas publiées ici faute de référence officielle vérifiée.</p><p>Confirmez les documents nécessaires et les modalités directement auprès de la mairie, ou via sa page Facebook officielle. Aucun service de demande d’acte en ligne ou de légalisation en ligne n’est confirmé pour Agou sur ce site.</p></div>
      <div className="content-block"><h2>État civil et formalités</h2><p>Pour une question concernant un acte ou une formalité, prenez contact ou rendez-vous auprès de la mairie d’Agou afin de vérifier la procédure applicable à votre situation. Pensez à préciser le type de demande lorsque vous sollicitez une information.</p></div>
      <div className="content-block"><h2>Associations, entreprises et habitants</h2><p>Pour orienter votre demande vers le bon interlocuteur municipal, indiquez clairement votre sujet et le village concerné. Les conditions de traitement sont à confirmer directement auprès de la mairie.</p></div>
      <div className="notice">Important : e-acte et les dispositifs en ligne cités sur des sites d’autres communes ne sont pas présentés comme des services de la Commune d’Agou.</div>
    </div><aside className="side-note"><h3>Confirmer les informations</h3><p>Les informations pratiques non vérifiées ne sont pas inventées. Utilisez les deux accès ci-dessous pour localiser la mairie ou consulter sa page Facebook officielle.</p><p><a href={mapSearch} target="_blank" rel="noreferrer" data-testid="link-services-map">Rechercher la mairie sur la carte <ExternalLink size={12}/></a></p><p><a href={facebookPage} target="_blank" rel="noreferrer" data-testid="link-services-facebook">Consulter la page Facebook officielle <ExternalLink size={12}/></a></p></aside></div></section>
  </main></Shell>;
}

function CouncilPage() {
  return <Shell><main><PageHero kicker="Gouvernance communale" title="Conseil municipal" text="Repères publics sur le maire de la Commune d’Agou et les informations disponibles sur son action."/>
    <section className="page-body"><div className="container content-layout"><div>
      <div className="content-block"><h2>Le maire : Yapo Euloge Servais</h2><p>Yapo Euloge Servais est le maire actuel de la Commune d’Agou, selon un article de l’Agence Ivoirienne de Presse publié le 5 juin 2026.</p><p>Les éléments biographiques présentés ici sont volontairement limités : en 2023, il a été candidat à la mairie et a publiquement déclaré vouloir poursuivre les projets de développement déjà engagés.</p><p><a className="text-link" href={articles.mayor} target="_blank" rel="noreferrer" data-testid="link-council-fratmat">Source : FratMat, 31 août 2023 <ExternalLink size={13}/></a></p></div>
      <div className="content-block"><h2>Du conseil aux actions</h2><p>Les informations vérifiées disponibles sur cette page proviennent d’articles de presse cités en source. Aucun organigramme, liste des adjoints ou compte rendu municipal n’est publié sans document communal confirmé.</p><p>Le 5 juin 2026, l’AIP rapporte un appel à la vigilance du maire à la suite d’inondations dans la commune. Cet article constitue une couverture de presse et non un communiqué municipal.</p><p><a className="text-link" href={articles.flood} target="_blank" rel="noreferrer" data-testid="link-council-aip">Lire le reportage de l’AIP <ExternalLink size={13}/></a></p></div>
      <div className="content-block"><h2>Transparence des sources</h2><p>La mairie encourage la consultation des publications identifiées comme telles. Les dates de publication et les médias sont indiqués afin de distinguer les sources externes des informations municipales.</p></div>
    </div><aside className="side-note"><h3>À propos du maire</h3><img src={mayorPortrait} alt="Portrait de Yapo Euloge Servais" style={{width:'100%',height:200,objectFit:'cover',objectPosition:'center 24%',marginBottom:12}}/><p>Maire actuel : Yapo Euloge Servais. Les seules informations biographiques affichées sont attribuées à leur source.</p><a href={articles.mayor} target="_blank" rel="noreferrer" data-testid="link-council-bio">Consulter FratMat <ExternalLink size={12}/></a></aside></div></section>
  </main></Shell>;
}

function NewsPage() {
  return <Shell><main><PageHero kicker="Vie locale" title="Actualités d’Agou" text="Articles de presse publiquement accessibles concernant la commune. Les contenus ci-dessous sont attribués à l’AIP et ne sont pas des communiqués de la mairie."/>
    <section className="page-body"><div className="container"><div className="news-list">
      <NewsCard date="14" month="juin" title="Agou : la faitière des femmes placée sous le signe de la solidarité et de l’autonomisation" excerpt="L’article de l’AIP porte sur une rencontre de la fédération des femmes autour de la solidarité et de l’autonomisation." href={articles.women}/>
      <NewsCard date="05" month="juin" title="Le maire d’Agou appelle les populations à la vigilance après des inondations" excerpt="L’AIP rapporte un appel à la vigilance du maire après des inondations dans la commune." href={articles.flood}/>
      <NewsCard date="31" month="août" title="Agou : Yapo Euloge déterminé à achever les chantiers entamés" excerpt="En 2023, Yapo Euloge déclarait vouloir poursuivre les projets de développement déjà engagés, selon FratMat." href={articles.mayor}/>
    </div><div className="notice">Dates des deux articles AIP : 5 et 14 juin 2026. L’article FratMat est daté du 31 août 2023. Les liens ouvrent les publications originales.</div></div></section>
  </main></Shell>;
}

function LivingPage() {
  const villages = ['Agou','Ayalo','N’Guessankoi','Diapé','Andé','Grand-Akoudzin','Boudépé'];
  return <Shell><main><PageHero kicker="Territoire & vie locale" title="Vivre à Agou" text="Découvrir la commune à travers ses villages, son ancrage dans la région de La Mé et les activités agricoles décrites dans le profil communal."/>
    <section className="page-body"><div className="container content-layout"><div>
      <div className="content-block"><h2>Agou en bref</h2><p>La Commune d’Agou se trouve dans la Région de La Mé et le Département d’Adzopé. Le profil communal indique une superficie de 190 km² et une population de 26 692 habitants au RGPH 2014. Ce chiffre est ancien et ne doit pas être interprété comme la population actuelle.</p><p>Source de ces données territoriales : profil de la commune publié par l’OIDP Afrique en 2020, qui reprend les chiffres de population du recensement de 2014.</p><a className="text-link" href="https://oidp-afrique.org/2020/03/18/presentation-de-la-commune-dagou" target="_blank" rel="noreferrer" data-testid="link-living-profile">Consulter le profil communal <ExternalLink size={13}/></a></div>
      <div className="content-block"><h2>Les sept villages</h2><div className="village-list">{villages.map((village, i) => <span className="village-chip" key={village} data-testid={`text-living-village-${i}`}>{village}</span>)}</div></div>
      <div className="content-block"><h2>Une agriculture diversifiée</h2><p>Le profil communal de 2020 décrit une agriculture comprenant le cacao, le café, l’hévéa, le palmier à huile, le manioc, l’igname et la banane.</p><div className="crop-tags">{['Cacao','Café','Hévéa','Palmier à huile','Manioc','Igname','Banane'].map(item => <span key={item}>{item}</span>)}</div></div>
    </div><aside className="side-note"><h3>Repères territoriaux</h3><p><b>Région</b><br/>La Mé</p><p><b>Département</b><br/>Adzopé</p><p><b>Superficie</b><br/>190 km²</p><p><b>Population</b><br/>26 692 · RGPH 2014</p><p>Source : profil OIDP Afrique, 2020.</p></aside></div></section>
  </main></Shell>;
}

function ContactsPage() {
  return <Shell><main><PageHero kicker="Nous trouver" title="Contacts & accès" text="Les canaux d’information confirmés sont la localisation cartographique de la mairie et sa page Facebook officielle."/>
    <section className="page-body"><div className="container">
      <div className="contact-cards">
        <div className="contact-card"><MapPin size={21}/><h3>Localiser la mairie</h3><p>Ouvrez une recherche cartographique pour « Mairie d’Agou, Côte d’Ivoire » et vérifiez le résultat avant votre déplacement.</p><a href={mapSearch} target="_blank" rel="noreferrer" data-testid="link-contact-map">Ouvrir la recherche sur la carte <ExternalLink size={12}/></a></div>
        <div className="contact-card"><Facebook size={21}/><h3>Page Facebook officielle</h3><p>Consultez les publications de la page officielle de la Commune d’Agou.</p><a href={facebookPage} target="_blank" rel="noreferrer" data-testid="link-contact-facebook">Voir la page officielle <ExternalLink size={12}/></a></div>
      </div>
      <div className="notice">Aucun numéro de téléphone, courriel, horaire d’ouverture ou formulaire de contact n’a été vérifié pour cette page. Ces coordonnées ne sont donc pas affichées.</div>
    </div></section>
  </main></Shell>;
}

function FaqPage() {
  const questions = [
    ['Où se trouve la Commune d’Agou ?', 'Agou se situe dans la Région de La Mé, dans le Département d’Adzopé. Source : profil communal publié par l’OIDP Afrique en 2020.'],
    ['Combien de villages compte la commune ?', 'Le profil communal de 2020 en liste sept : Agou, Ayalo, N’Guessankoi, Diapé, Andé, Grand-Akoudzin et Boudépé.'],
    ['Combien d’habitants vivent à Agou ?', 'Le chiffre disponible est de 26 692 habitants au RGPH 2014. Il s’agit d’un chiffre de recensement daté, pas d’une estimation de la population actuelle.'],
    ['Qui est le maire d’Agou ?', 'Le maire actuel est Yapo Euloge Servais, mentionné dans un article AIP daté du 5 juin 2026.'],
    ['Peut-on demander un acte ou légaliser un document en ligne ?', 'Aucun portail e-acte ni système de légalisation en ligne n’a été confirmé pour Agou. Contactez la mairie ou consultez sa page Facebook officielle pour vérifier les démarches. Les services en ligne d’autres communes ne s’appliquent pas automatiquement à Agou.'],
    ['Où vérifier les pièces requises pour une démarche ?', 'Les pièces et modalités doivent être confirmées auprès de la mairie ou via sa page Facebook officielle, car elles dépendent de la demande et ne sont pas vérifiées sur ce site.'],
    ['Comment contacter la mairie ?', 'Utilisez la recherche cartographique pour localiser la mairie ou consultez sa page Facebook officielle. Aucun numéro ni courriel vérifié n’est publié ici.'],
  ];
  return <Shell><main><PageHero kicker="Aide & informations" title="Questions fréquentes" text="Réponses limitées aux faits publiquement documentés. Pour les informations pratiques non confirmées, adressez-vous à la mairie."/>
    <section className="page-body"><div className="container content-layout"><div className="faq-list">{questions.map(([question, answer], i) => <details className="faq-item" key={question} data-testid={`faq-item-${i}`}><summary>{question}</summary><div className="faq-answer">{answer}</div></details>)}</div><aside className="side-note"><h3>Une information pratique ?</h3><p>Confirmez les modalités directement via les canaux disponibles.</p><p><a href={facebookPage} target="_blank" rel="noreferrer" data-testid="link-faq-facebook">Page Facebook officielle <ExternalLink size={12}/></a></p><p><a href={mapSearch} target="_blank" rel="noreferrer" data-testid="link-faq-map">Localiser la mairie <ExternalLink size={12}/></a></p></aside></div></section>
  </main></Shell>;
}

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Home}/>
    <Route path="/services" component={ServicesPage}/>
    <Route path="/conseil-municipal" component={CouncilPage}/>
    <Route path="/actualites" component={NewsPage}/>
    <Route path="/vivre-a-agou" component={LivingPage}/>
    <Route path="/contacts" component={ContactsPage}/>
    <Route path="/faq" component={FaqPage}/>
    <Route component={NotFound}/>
  </Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router/></WouterRouter><Toaster/></TooltipProvider></QueryClientProvider>;
}

export default App;
