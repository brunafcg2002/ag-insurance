import { translations } from "../i18n/translations.js";
import SiteRuntime from "./SiteRuntime.jsx";

export default function Homepage({ language }) {
  const locale = translations[language];
  const { home } = locale;
  return (<>

    <noscript><p className="noscript-notice">Ative o JavaScript para usar as funcionalidades interativas / Enable JavaScript for interactive features. <a href="mailto:seguros@agoncalves.com.pt">seguros@agoncalves.com.pt</a> · <a href="tel:+351255820960">255 820 960</a></p></noscript>
    <a className="skip-link" href="#main">{home["saltar_para_o_conteudo"]}</a>
    <header className="navbar">
      <div className="container nav-container">
        <a
          href="#inicio"
          className="brand"
          aria-label={home["a_goncalves_seguros_inicio"]}
          ><img
            className="brand-symbol"
            src="/assets/brand/logo-blue.svg"
            alt=""
            width="35"
            height="36"
          /><span className="brand-wordmark"
            ><span className="brand-name">{home["a_goncalves"]}</span><span className="brand-descriptor">{home["seguros"]}</span></span></a>
        <details className="language-picker">
          <summary aria-label={locale.ui.chooseLanguage}><img className="language-current-flag" src={`/assets/flags/${language}.svg`} width="24" height="16" alt="" /><span className="language-current-code">{language.toUpperCase()}</span><svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m5 7.5 5 5 5-5"/></svg></summary>
          <div className="language-options">
            <a href="/" data-language="pt" lang="pt-PT" hrefLang="pt-PT" aria-current={language === "pt" ? "true" : undefined}><img src="/assets/flags/pt.svg" width="24" height="16" alt="" />{locale.ui["portuguese"]}</a>
            <a href="/en" data-language="en" lang="en-GB" hrefLang="en-GB" aria-current={language === "en" ? "true" : undefined}><img src="/assets/flags/en.svg" width="24" height="16" alt="" />{locale.ui["english"]}</a>
          </div>
        </details>
        <button
          className="menu-toggle"
          aria-controls="navigation"
          aria-expanded="false"
          aria-label={home["abrir_menu"]}
        >
          <span></span><span></span>
        </button>
        <nav id="navigation" aria-label={home["navegacao_principal"]}>
          <a className="nav-link active" href="#campanhas">{home["campanhas"]}</a>
          <a className="nav-link" href="#seguros">{home["os_nossos_seguros"]}</a>
          <a className="nav-link" href="#protecao">{home["a_sua_protecao"]}</a>
          <a className="nav-link" href="#sobre">{home["quem_somos"]}</a>
          <a className="nav-link" href="#perguntas-frequentes">{home["perguntas_frequentes"]}</a>
          <button className="button nav-button" data-contact>
            {home["vamos_conversar"]}
          </button>
        </nav>
      </div>
    </header>
    <main id="main">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-background">
          <img
            src="/assets/images/bruno.jpg"
            alt={home["equipa_da_a_goncalves_seguros_no_escritorio_em_lousada"]}
            width="2048"
            height="1536"
            fetchPriority="high"
           />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-container">
          <div className="hero-content">
            <h1 id="hero-title">
              {home["o_nosso_legado"]}<br />{home["e_proteger"]} <span>{home["o_seu"]}</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="carousel-section" id="campanhas" aria-label={home["campanhas_zurich"]}>
        <div className="container carousel-container">
          <div
            className="carousel"
            id="insurance-carousel"
            tabIndex="0"
            aria-roledescription="carrossel"
            aria-label={home["explore_as_campanhas_zurich_deslize_ou_utilize_os_pontos_de_pagin"]}
          >
            <div className="carousel-track">
              <article className="carousel-slide" aria-roledescription="diapositivo" aria-label={home["1_de_3"]}>
                <button className="campaign-card" data-campaign="lar-flex" aria-label={home["zurich_lar_flex_ate_15_de_desconto_ver_condicoes"]}>
                  <div className="slide-content">
                    <span className="slide-category">{home["zurich_lar_flex"]}</span>
                    <h2 className="slide-title">{home["ate_15_de_desconto"]}</h2>
                    <p className="campaign-summary">{home["z4u_debito_direto_seguro_zurich_auto"]}</p>
                    <p className="campaign-validity">{home["valida_ate"]} <time datetime="2026-12-31">{home["31_12_2026"]}</time></p>
                    <span className="campaign-more">{home["ver_condicoes"]} <svg className="link-out-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span>
                  </div>
                  <div className="slide-image-holder"><img className="slide-image" src="/assets/images/zurich-campanha-casa.jpg" alt={home["familia_em_casa_durante_uma_mudanca_na_campanha_zurich_lar_flex"]} width="1000" height="1000"  /></div>
                </button>
              </article>
              <article className="carousel-slide" aria-roledescription="diapositivo" aria-label={home["2_de_3"]}>
                <button className="campaign-card" data-campaign="auto" aria-label={home["zurich_auto_ate_10_de_desconto_ver_condicoes"]}>
                  <div className="slide-content">
                    <span className="slide-category">{home["zurich_auto"]}</span>
                    <h2 className="slide-title">{home["ate_10_de_desconto"]}</h2>
                    <p className="campaign-summary">{home["adesao_ao_z4u_e_pagamento_por_debito_direto"]}</p>
                    <p className="campaign-validity">{home["valida_ate"]} <time datetime="2026-12-31">{home["31_12_2026"]}</time></p>
                    <span className="campaign-more">{home["ver_condicoes"]} <svg className="link-out-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span>
                  </div>
                  <div className="slide-image-holder"><img className="slide-image" src="/assets/images/zurich-campanha-auto.jpg" alt={home["casal_a_trocar_as_chaves_junto_ao_automovel_na_campanha_zurich_au"]} width="1000" height="1000"  /></div>
                </button>
              </article>
              <article className="carousel-slide" aria-roledescription="diapositivo" aria-label={home["3_de_3"]}>
                <button className="campaign-card" data-campaign="saude" aria-label={home["zurich_saude_opcao_3_oferta_de_2_mensalidades_ver_condicoes"]}>
                  <div className="slide-content">
                    <span className="slide-category">{home["zurich_saude_opcao_3"]}</span>
                    <h2 className="slide-title">{home["oferta_de_2_mensalidades"]}</h2>
                    <p className="campaign-summary">{home["as_duas_primeiras_com_pagamento_mensal"]}</p>
                    <p className="campaign-validity">{home["valida_ate"]} <time datetime="2026-12-31">{home["31_12_2026"]}</time></p>
                    <span className="campaign-more">{home["ver_condicoes"]} <svg className="link-out-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span>
                  </div>
                  <div className="slide-image-holder"><img className="slide-image" src="/assets/images/zurich-campanha-saude.jpg" alt={home["pulseira_whoop_e_aplicacao_na_campanha_zurich_saude"]} width="1000" height="1000"  /></div>
                </button>
              </article>
            </div>
          </div>
          <div className="carousel-controls">
            <div
              className="carousel-pagination"
              role="group"
              aria-label={home["paginas_das_campanhas"]}
            ></div>
            <span className="carousel-status sr-only" aria-live="polite"></span>
          </div>
        </div>
      </section>

      <section className="section" id="seguros" aria-labelledby="solutions-title">
        <div className="container">
          <div className="section-heading reveal">
            <h2 id="solutions-title">
              {home["ha_um_seguro_para_cada_necessidade"]}
            </h2>
            <div className="section-description">
              <p>
                {home["trabalhamos_com_varias_seguradoras_para_apresentar_solucoes_de_pr"]}
              </p>
            </div>
          </div>
          <aside className="insurers-strip" aria-labelledby="insurers-title">
            <div className="insurers-strip-heading">
              <h3 id="insurers-title">{home["seguradoras_com_que_trabalhamos"]}</h3>
            </div>
            <div className="insurers-window"><div className="insurers-track">
              <ul className="insurers-group" role="list" aria-label={home["seguradoras_com_que_trabalhamos"]}><li><span className="insurer-mark"><img src="/assets/brand/insurers/allianz-blue.svg?v=ce214bdbbae6" alt={home["allianz"]} width="160" height="48"  /></span></li><li><span className="insurer-mark"><img src="/assets/brand/insurers/zurich-blue.svg?v=8ab1b11a5ada" alt={home["zurich"]} width="160" height="48"  /></span></li><li><span className="insurer-mark"><img src="/assets/brand/insurers/lusitania-blue.png?v=a4533e538d8e" alt={home["lusitania"]} width="160" height="48"  /></span></li><li><span className="insurer-mark"><img src="/assets/brand/insurers/real-vida-blue.svg?v=9d4323c709e0" alt={home["real_vida_seguros"]} width="160" height="48"  /></span></li></ul>
              <ul className="insurers-group" aria-hidden="true" inert><li><span className="insurer-mark"><img src="/assets/brand/insurers/allianz-blue.svg?v=ce214bdbbae6" alt="" width="160" height="48" /></span></li><li><span className="insurer-mark"><img src="/assets/brand/insurers/zurich-blue.svg?v=8ab1b11a5ada" alt="" width="160" height="48" /></span></li><li><span className="insurer-mark"><img src="/assets/brand/insurers/lusitania-blue.png?v=a4533e538d8e" alt="" width="160" height="48" /></span></li><li><span className="insurer-mark"><img src="/assets/brand/insurers/real-vida-blue.svg?v=9d4323c709e0" alt="" width="160" height="48" /></span></li></ul>
            </div></div>
          </aside>
          <div className="services-grid" id="solucoes">
            <button className="service-card" data-solution="auto">
              <svg
                className="service-icon"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path
                  d="m9 20 5-12h20l5 12M6 20h36v18H6zM11 38v5m26-5v5M7 29h8m18 0h8"
                />
                <path className="accent" d="M20 29h8M15 8l-3 12h24L33 8" />
              </svg>
              <h3><span className="service-title-full">{home["seguro_automovel"]}</span><span className="service-title-short">{home["automovel"]}</span></h3>
              <div className="service-details"><p>{home["protecao_para_cada_viagem"]}</p><span className="service-more">{home["saber_mais"]} <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4"/></svg></span></div>
            </button>
            <button className="service-card" data-solution="saude">
              <svg
                className="service-icon"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M17 6h14v12h12v14H31v12H17V32H5V18h12Z" />
                <path className="accent" d="M20 12h8M12 24h8m8 0h8M24 20v16" />
              </svg>
              <h3><span className="service-title-full">{home["seguro_de_saude"]}</span><span className="service-title-short">{home["saude"]}</span></h3>
              <div className="service-details"><p>{home["a_sua_saude_merece_atencao"]}</p><span className="service-more">{home["saber_mais"]} <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4"/></svg></span></div>
            </button>
            <button className="service-card" data-solution="casa">
              <svg
                className="service-icon"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 23 19-17 19 17M11 20v22h26V20M20 42V28h9v14" />
                <path className="accent" d="M32 8v8M18 20h12" />
              </svg>
              <h3><span className="service-title-full">{home["seguro_habitacao"]}</span><span className="service-title-short">{home["habitacao"]}</span></h3>
              <div className="service-details"><p>{home["a_sua_casa_devidamente_protegida"]}</p><span className="service-more">{home["saber_mais"]} <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4"/></svg></span></div>
            </button>
            <button className="service-card" data-solution="vida">
              <svg
                className="service-icon"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M24 42S6 31 6 18a10 10 0 0 1 18-6 10 10 0 0 1 18 6c0 13-18 24-18 24Z"
                />
                <path className="accent" d="M13 25h7l4-8 4 16 4-8h5" />
              </svg>
              <h3><span className="service-title-full">{home["seguro_de_vida"]}</span><span className="service-title-short">{home["vida"]}</span></h3>
              <div className="service-details"><p>{home["seguranca_para_si_e_para_os_seus"]}</p><span className="service-more">{home["saber_mais"]} <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4"/></svg></span></div>
            </button>
            <button className="service-card" data-solution="trabalho">
              <svg
                className="service-icon"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M5 43V19h16v24M21 43V6h21v37M1 43h46M10 25h5m-5 7h5m12-18h9m-9 8h9m-9 8h9"
                />
                <path className="accent" d="M28 43v-6h7v6M26 6V2h11v4" />
              </svg>
              <h3><span className="service-title-full">{home["seguro_de_acidentes_de_trabalho"]}</span><span className="service-title-short">{home["acidentes_de_trabalho"]}</span></h3>
              <div className="service-details"><p>{home["proteja_a_sua_equipa_e_o_seu_negocio"]}</p><span className="service-more">{home["saber_mais"]} <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4"/></svg></span></div>
            </button>
            <button className="service-card" data-solution="poupanca">
              <svg className="service-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 42h36M10 35V25h7v10M21 35V18h7v17M32 35V10h7v25"/><path className="accent" d="m8 18 12-8 8 3L40 3M32 3h8v8"/></svg>
              <h3><span className="service-title-full">{home["poupanca_e_investimento"]}</span><span className="service-title-short">{home["poupanca_e_investimento_2"]}</span></h3>
              <div className="service-details"><p>{home["o_seu_futuro_comeca_a_construir_se_hoje"]}</p><span className="service-more">{home["saber_mais"]} <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4"/></svg></span></div>
            </button>
          </div>
        </div>
      </section>

      <section
        className="section protection-section"
        id="protecao"
        aria-labelledby="protection-title"
      >
        <div className="container">
          <div className="center-heading reveal">
            <h2 id="protection-title">
              {home["ha_imprevistos_que_custam_mais_do_que_imagina"]}
            </h2>
            <p>
              {home["e_se_amanha_fosse_consigo_ja_pensou_no_impacto_que_teria_na_sua_v"]}
            </p>
          </div>
          <div className="showcase-grid mobile-card-carousel" id="scenario-carousel">
            <button className="showcase-card reveal" data-scenario="0">
              <div className="showcase-image"><img src="/assets/images/car.jpg" alt={home["automovel_numa_estrada"]} loading="lazy" width="800" height="720"  /></div>
              <div className="showcase-caption"><span>{home["01_automovel"]}</span><h3>{home["o_carro_desapareceu_as_prestacoes_ficaram"]}</h3><p>{home["imagine_continuar_a_pagar_por_um_carro_que_ja_nao_tem"]}</p><span className="showcase-arrow"><svg className="link-out-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></div>
            </button>
            <button className="showcase-card reveal" data-scenario="1">
              <div className="showcase-image"><img src="/assets/images/home-modern.jpg" alt={home["moradia_contemporanea_branca"]} loading="lazy" width="800" height="720"  /></div>
              <div className="showcase-caption"><span>{home["02_habitacao"]}</span><h3>{home["o_problema_comecou_em_sua_casa_a_conta_chegou_ao_vizinho"]}</h3><p>{home["uma_simples_fuga_de_agua_pode_transformar_se_numa_despesa_de_milh"]}</p><span className="showcase-arrow"><svg className="link-out-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></div>
            </button>
            <button className="showcase-card reveal" data-scenario="2">
              <div className="showcase-image"><img src="/assets/images/business.jpg" alt={home["espaco_de_trabalho"]} loading="lazy" width="800" height="720"  /></div>
              <div className="showcase-caption"><span>{home["03_empresas"]}</span><h3>{home["a_empresa_parou_as_despesas_nao"]}</h3><p>{home["um_incendio_uma_avaria_ou_outro_imprevisto_pode_comprometer_a_con"]}</p><span className="showcase-arrow"><svg className="link-out-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></div>
            </button>
          </div>
        </div>
      </section>

      <section
        className="section about-section"
        id="sobre"
        aria-labelledby="about-title"
      >
        <div className="container">
          <div className="section-heading reveal">
            <h2 id="about-title">
              {home["conhecemos_os_seguros_mas_acima_de_tudo_conhecemos_as_pessoas"]}
            </h2>
            <div className="section-description">
              <p>
                {home["na_a_goncalves_cada_cliente_tem_necessidades_diferentes_por_isso_"]}
              </p>
            </div>
          </div>
          <div className="about-grid reveal">
            <div className="about-photo">
              <img
                src="/assets/images/quem_somos.jpg"
                alt={home["familia_goncalves_reunida"]}
                loading="lazy"
                width="4000"
                height="6000"
               />
              <div className="photo-label">
                <span>{home["a_goncalves_seguros"]}</span><span>{home["pessoas_reais_acompanhamento_real"]}</span>
              </div>
            </div>
            <div className="approach">
              <div className="approach-item">
                <span className="step-number">{home["01"]}</span>
                <div>
                  <h3>{home["mais_de_40_anos_de_experiencia"]}</h3>
                  <p>
                    {home["uma_historia_construida_com_confianca_e_responsabilidade_conhecim"]}
                  </p>
                </div>
              </div>
              <div className="approach-item">
                <span className="step-number">{home["02"]}</span>
                <div>
                  <h3>{home["uma_historia_familiar"]}</h3>
                  <p>
                    {home["diferentes_geracoes_o_mesmo_compromisso_a_proximidade_faz_parte_d"]}
                  </p>
                </div>
              </div>
              <div className="approach-item">
                <span className="step-number">{home["03"]}</span>
                <div>
                  <h3>{home["acompanhamento_proximo"]}</h3>
                  <p>
                    {home["antes_durante_e_depois_de_cada_contratacao_esclarecemos_duvidas_e"]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section advice-section"
        id="perguntas-frequentes"
        aria-labelledby="advice-title"
      >
        <div className="container">
          <div className="section-heading reveal">
            <h2 id="advice-title">
              {home["tem_duvidas_comecamos_por_esclarecer"]}
            </h2>
            <div className="section-description">
              <p>
                {home["reunimos_algumas_das_perguntas_mais_frequentes_sobre_os_nossos_se"]}
              </p>
            </div>
          </div>
          <div className="blog-grid mobile-card-carousel" id="guias">
            <article className="blog-card reveal"><button className="blog-link" data-faq="0">
              <div className="blog-image"><img src="/assets/images/analise-seguros.jpg" alt={home["analise_de_documentos_de_seguros_no_escritorio"]} loading="lazy" width="1067" height="1600"  /></div>
              <div className="blog-content"><div className="blog-meta"><span>{home["os_nossos_servicos"]}</span><span>{home["perguntas_frequentes"]}</span></div><h3>{home["ja_tenho_seguros_noutra_seguradora_posso_passar_para_a_a_goncalve"]}</h3><span className="blog-more">{home["ver_resposta"]} <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4"/></svg></span></div>
            </button></article>
            <article className="blog-card reveal"><button className="blog-link" data-faq="1">
              <div className="blog-image"><img src="/assets/images/bruno_photo.jpg" alt={home["bruno_goncalves_ao_telefone_no_escritorio"]} loading="lazy" width="1067" height="1600"  /></div>
              <div className="blog-content"><div className="blog-meta"><span>{home["as_nossas_parcerias"]}</span><span>{home["perguntas_frequentes"]}</span></div><h3>{home["conseguem_apresentar_propostas_de_diferentes_seguradoras"]}</h3><span className="blog-more">{home["ver_resposta"]} <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4"/></svg></span></div>
            </button></article>
            <article className="blog-card reveal"><button className="blog-link" data-faq="2">
              <div className="blog-image"><img src="/assets/images/atendimento.jpg" alt={home["colaboradora_da_a_goncalves_a_trabalhar_ao_computador"]} loading="lazy" width="1067" height="1600"  /></div>
              <div className="blog-content"><div className="blog-meta"><span>{home["atendimento"]}</span><span>{home["perguntas_frequentes"]}</span></div><h3>{home["tenho_de_me_deslocar_a_loja_para_contratar_um_seguro"]}</h3><span className="blog-more">{home["ver_resposta"]} <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4"/></svg></span></div>
            </button></article>
          </div>
        </div>
      </section>

      <section
        className="section location-section"
        id="localizacao"
        aria-labelledby="location-title"
      >
        <div className="container">
          <div className="section-heading reveal">
            <h2 id="location-title">{home["estamos_em_lousada"]}<br />{home["e_a_distancia_de_uma_conversa"]}</h2>
            <div className="section-description">
              <p>
                {home["visite_nos_na_praca_das_pocinhas_em_lousada_estamos_disponiveis_p"]}
              </p>
            </div>
          </div>
          <div className="location-panel">
            <div
              className="map-canvas"
              id="office-map"
              role="region"
              aria-label={home["mapa_da_localizacao_na_praca_das_pocinhas_lousada"]}
            ></div>
            <aside className="location-card" aria-label={home["morada_e_direcoes"]}>
              <span className="location-eyebrow">{home["o_nosso_espaco"]}</span>
              <img
                className="location-logo"
                src="/assets/brand/logo-blue.svg"
                alt=""
                width="44"
                height="46"
              />
              <h3>{home["a_goncalves"]}<span>{home["seguros"]}</span></h3>
              <address>
                {home["praca_das_pocinhas"]}<br />{home["edificio_jardim_163_loja_h"]}<br />{home["4620_674_lousada"]}
              </address>
              <a
                className="button location-directions"
                href="https://www.google.com/maps/dir/?api=1&amp;destination=41.278481%2C-8.282931"
                target="_blank"
                rel="noopener noreferrer"
                >{home["como_chegar"]}
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 19 19 5M5 5h14v14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  /></svg></a>
            </aside>
            <div className="map-toolbar" aria-label={home["vista_do_mapa"]} hidden>
              <button
                type="button"
                className="map-mode is-active"
                data-map-mode="street"
                aria-pressed="true"
              >
                {home["mapa"]}</button><button
                type="button"
                className="map-mode"
                data-map-mode="satellite"
                aria-pressed="false"
              >
                {home["satelite"]}
              </button>
            </div>
            <div className="map-navigation" aria-label={home["controlos_do_mapa"]} hidden>
              <button
                type="button"
                data-map-action="locate"
                aria-label={home["voltar_a_localizacao"]}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <path
                    d="M12 2v4m0 12v4M2 12h4m12 0h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg></button><button
                type="button"
                data-map-action="in"
                aria-label={home["aproximar_mapa"]}
              >
                {home["text"]}</button><button
                type="button"
                data-map-action="out"
                aria-label={home["afastar_mapa"]}
              >
                {home["text_2"]}
              </button>
            </div>
            <p className="map-status sr-only" role="status" aria-live="polite"></p>
            <noscript
              ><p className="map-fallback">
                {home["consulte_a_localizacao_atraves_do_botao_como_chegar"]}
              </p></noscript>
          </div>
        </div>
      </section>

    </main>
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-title">
              {home["o_nosso_legado_e_proteger_o_seu"]}
            </p>
            <button className="footer-contact" data-contact>
              <span className="footer-contact-icon"
                ><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 12h15M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  /></svg></span>
              {home["fale_connosco"]}
            </button>
          </div>
          <div className="footer-navigation">
          <div className="footer-column footer-explore">
            <h2><button className="footer-insurance-toggle" type="button" aria-expanded="true" aria-controls="footer-explore-links" disabled>{home["explore"]}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button></h2>
            <div className="footer-explore-links" id="footer-explore-links">
            <a href="#campanhas">{home["campanhas"]}</a>
            <a href="#seguros">{home["os_nossos_seguros"]}</a>
            <a href="#protecao">{home["a_sua_protecao"]}</a>
            <a href="#sobre">{home["quem_somos"]}</a>
            <a href="#perguntas-frequentes">{home["perguntas_frequentes"]}</a>
            </div>
          </div>
          <div className="footer-column footer-insurances">
            <h2><button className="footer-insurance-toggle" type="button" aria-expanded="true" aria-controls="footer-insurance-links" disabled>{home["os_nossos_seguros"]}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button></h2>
            <div className="footer-insurance-links" id="footer-insurance-links">
            <button data-solution="auto">{home["seguro_automovel"]}</button>
            <button data-solution="saude">{home["seguro_de_saude"]}</button>
            <button data-solution="casa">{home["seguro_habitacao"]}</button>
            <button data-solution="vida">{home["seguro_de_vida"]}</button>
            <button data-solution="trabalho">{home["seguro_de_acidentes_de_trabalho"]}</button>
            <button data-solution="poupanca">{home["poupanca_e_investimento"]}</button>
            </div>
          </div>
          </div>
          <div className="footer-column footer-contacts">
            <h2><button className="footer-insurance-toggle" type="button" aria-expanded="true" aria-controls="footer-contact-links" disabled>{home["contacte_nos"]}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button></h2>
            <div className="footer-contact-links" id="footer-contact-links">
            <a className="phone-link" href="tel:+351255820960"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 10h14l2 10H3l2-10Z"/><path d="M8 10V7h8v3M3 7V4c5-3 13-3 18 0v3h-5V5H8v2H3Z"/><circle cx="12" cy="15" r="2"/></svg><span><small>{home["telefone_fixo"]}</small>{home["255_820_960"]}</span></a>
                <a className="phone-link" href="tel:+351963667526"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 5h4M11 19h2"/></svg><span><small>{home["telemovel"]}</small>{home["963_667_526"]}</span></a>
            <a className="email-link" href="mailto:seguros@agoncalves.com.pt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><span><small>{home["email"]}</small>{home["seguros_agoncalves_com_pt"]}</span></a>
            <a className="social-link" href="https://www.instagram.com/seguros_agoncalves/" target="_blank" rel="noopener noreferrer" aria-label={home["instagram_da_a_goncalves_seguros_abre_num_novo_separador"]}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg><span>{home["instagram"]}</span></a>
            <a className="social-link" href="https://www.facebook.com/p/A-Gon%C3%A7alves-Seguros-Bruno-Gon%C3%A7alves-100057382392863/" target="_blank" rel="noopener noreferrer" aria-label={home["facebook_da_a_goncalves_seguros_abre_num_novo_separador"]}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d="M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8h4Z"/></svg><span>{home["facebook"]}</span></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <a
            href="#inicio"
            className="brand"
            aria-label={home["a_goncalves_seguros_voltar_ao_inicio"]}
            ><img
              className="brand-symbol"
              src="/assets/brand/logo-blue.svg"
              alt=""
              width="35"
              height="36"
            /><span className="brand-wordmark"
              ><span className="brand-name">{home["a_goncalves"]}</span><span className="brand-descriptor">{home["seguros"]}</span></span></a>
          <div className="footer-legal">
            <nav className="footer-legal-links" aria-label={home["informacao_legal"]}>
              <button type="button" data-privacy aria-haspopup="dialog">{home["politica_de_privacidade"]}</button>
              <button type="button" data-legal="cookies" aria-haspopup="dialog">{home["politica_de_cookies"]}</button>
              <button type="button" data-legal="terms" aria-haspopup="dialog">{home["termos_de_utilizacao"]}</button>
              <button type="button" data-legal="disclaimer" aria-haspopup="dialog">{home["aviso_legal"]}</button>
              <button type="button" className="footer-complaints-info" data-legal="complaints" aria-haspopup="dialog">{home["reclamacoes_e_litigios"]}</button>
              <a className="footer-complaints-book" href="https://www.livroreclamacoes.pt/INICIO/" target="_blank" rel="noopener noreferrer" aria-label={home["livro_de_reclamacoes_eletronico_abre_num_novo_separador"]}>{home["livro_de_reclamacoes"]}</a>
            </nav>
          </div>
        </div>
        <p className="footer-registration">{home["agente_de_seguros_certificado_pelo_isp_instituto_de_seguros_de_po"]} <a href="https://www.asf.com.pt/" target="_blank" rel="noopener noreferrer">{home["asf_autoridade_de_supervisao_de_seguros_e_fundos_de_pensoes"]}</a>{home["text_3"]}</p>
        <p className="footer-copyright">{home["2026_a_goncalves_seguros"]}</p>
      </div>
    </footer>
    <dialog id="detail-dialog" aria-labelledby="dialog-title">
      <button className="dialog-close" aria-label={home["fechar_janela"]}>{home["text_4"]}</button>
      <div className="dialog-content"></div>
    </dialog>

<SiteRuntime language={language} />
</>);
}
