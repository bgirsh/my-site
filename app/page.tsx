export const dynamic = 'force-dynamic';
import { wpQuery } from '@/lib/wordpress';
import HomeClient from '@/components/HomeClient';
import SectionHeader from '@/components/SectionHeader';

export default async function Home() {
  const data = await wpQuery(`
    query {
      page(id: "home", idType: URI) {
        title
        flexiblePageBuilder {
          pageSections {
            __typename

            ... on FlexiblePageBuilderPageSectionsHeroLayout {
              title
              highlight
              description
              primaryText
              primaryUrl
              secondaryText
              secondaryUrl

              chips {
                chipText
                isAccent
              }

              heroItems {
                itemTitle
                itemText
              }

              artCallouts {
                topPosition
                rightPosition
                bottomPosition
                leftPosition
                direction
                calloutTitle
                calloutText
              }

              artCalloutSvg
            }
            ... on FlexiblePageBuilderPageSectionsStatsLayout {
              eyebrow
              title
              highlight
              description
              stats {
                statLabel
                statValue
                statSuffix
                statHint
              }
            }
            ... on FlexiblePageBuilderPageSectionsFeatureGridLayout {
              eyebrow
              title
              highlight
              description

              features {
                icon
                number
                title
                description
              }
            }
            ... on FlexiblePageBuilderPageSectionsSizesLayout {
              eyebrow
              title
              highlight
              description
              note

              sizes {
                sizeCode
                sizeMeta
              }
            }
            ... on FlexiblePageBuilderPageSectionsCtaLayout {
              eyebrow
              title
              highlight
              description
              primaryText
              primaryUrl
              secondaryText
              secondaryUrl
            }
          }
        }
      }
    }
  `);

  const sections = data?.page?.flexiblePageBuilder?.pageSections ?? [];

  return (
    <>
      <HomeClient />
      <main id="overview" className="mt-5">
        {sections.map((section: any, index: number) => {
          switch (section.__typename) {
            case 'FlexiblePageBuilderPageSectionsHeroLayout':
              return (
                <section key={index} className="hero">
                  <div className="hero__bg" aria-hidden="true"></div>
                  <div className="container hero__inner mx-auto px-6">
                    <div>
                      {section.chips?.length > 0 && (
                        <div className="hero__meta">
                          {section.chips.map((chip: any, chipIndex: number) => (
                            <span
                              key={chipIndex}
                              className={chip.isAccent ? 'chip chip--accent' : 'chip'}
                            >
                              {chip.isAccent && <span className="dot"></span>}
                              {chip.chipText}
                            </span>
                          ))}
                        </div>
                      )}

                      <h1 className="hero__title">
                        {section.title}
                        {section.highlight && (
                          <>
                            <br />
                            <span className="slash">
                              {section.highlight}
                            </span>
                          </>
                        )}
                      </h1>

                      {section.description && (
                        <p className="hero__lede">
                          {section.description}
                        </p>
                      )}

                      <div className="hero__cta">
                        {section.primaryText && section.primaryUrl && (
                          <a
                            href={section.primaryUrl}
                            className="btn btn--primary"
                          >
                            {section.primaryText}
                            <svg className="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"></path></svg>
                          </a>
                        )}

                        {section.secondaryText && section.secondaryUrl && (
                          <a
                            href={section.secondaryUrl}
                            className="btn btn--ghost"
                          >
                            {section.secondaryText}
                          </a>
                        )}
                      </div>
                      <dl className="hero__strip">
                        {section.heroItems?.map((item: any, itemIndex: number) => (
                          <div key={itemIndex} className="hero__strip-item">
                            <dt>{item.itemTitle}</dt>
                            <dd>{item.itemText}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div className="hero__art">
                      <div className="hero__ticks" aria-hidden="true">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      {section.artCallouts?.length > 0 &&
                      section.artCallouts.map((callout: any, calloutIndex: number) => (
                        <div
                          key={calloutIndex}
                          className="callout"
                          style={{
                            top: callout.topPosition,
                            right: callout.rightPosition,
                            bottom: callout.bottomPosition,
                            left: callout.leftPosition,
                            flexDirection: callout.direction,
                          }}
                        >
                          <span>
                            <strong>{callout.calloutTitle}</strong>
                            <br />
                            {callout.calloutText}
                          </span>
                          <span className="callout__line"></span>
                        </div>
                      ))}
                      {section.artCalloutSvg && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: section.artCalloutSvg,
                          }}
                        />
                      )}
                    </div>
                  </div>
                  
                </section>
              );
            
            case 'FlexiblePageBuilderPageSectionsStatsLayout':
              return (
                <section key={index} className="section scorecard" id="performance">
                  <div className="container">
                    <SectionHeader
                      eyebrow={section.eyebrow}
                      title={section.title}
                      highlight={section.highlight}
                      description={section.description}
                    />

                    {section.stats?.length > 0 && (
                      <div className="grid grid--4" data-counters="">
                        {section.stats.map((stat: any, statIndex: number) => (
                          <article key={statIndex} className="stat reveal">
                            {stat.statLabel && (
                              <span className="stat__label">
                                {stat.statLabel}
                              </span>
                            )}

                            <div className="stat__value">
                              <span data-counter data-from="0" data-to={stat.statValue} data-duration="1400">
                                0
                              </span>

                              {stat.statSuffix && (
                                <span className="stat__suffix">
                                  {stat.statSuffix}
                                </span>
                              )}
                            </div>

                            {stat.statHint && (
                              <p className="stat__hint">
                                {stat.statHint}
                              </p>
                            )}
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              );

            case 'FlexiblePageBuilderPageSectionsFeatureGridLayout':
              return (
                <section key={index} className="section" id="tech">
                  <div className="container">
                    <SectionHeader
                      eyebrow={section.eyebrow}
                      title={section.title}
                      highlight={section.highlight}
                      description={section.description}
                    />

                    {section.features?.length > 0 && (
                      <div className="grid grid--2 tech__grid">
                        {section.features.map((feature: any, featureIndex: number) => (
                          <article key={featureIndex} className="feature reveal is-revealed">
                            {feature.icon && (
                              <div className="feature__icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: feature.icon }} />
                            )}
                            {feature.number && (
                              <span className="feature__num">
                                {(featureIndex + 1).toString().padStart(2, '0')}
                                {' · '}
                                {feature.number}
                              </span>
                            )}
                            {feature.title && (
                              <h3 className="feature__title">{feature.title}</h3>
                            )}
                            {feature.description && (
                              <p className="feature__body">{feature.description}</p>
                            )}
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              );

            case 'FlexiblePageBuilderPageSectionsSizesLayout':
              return (
                <section key={index} className="section" id="sizes">
                  <div className="container">
                    <div className="sizes__head mb-0">
                      <SectionHeader
                        eyebrow={section.eyebrow}
                        title={section.title}
                        highlight={section.highlight}
                        description={section.description}
                      />
                      {section.note && (
                        <p className="sizes__note">{section.note}</p>
                      )}
                    </div>

                    {section.sizes?.length > 0 && (
                      <div className="grid grid--sizes" role="list">
                        {section.sizes.map((size: any, sizeIndex: number) => (
                          <button key={sizeIndex} className="size" role="listitem">
                            {size.sizeCode && (
                              <span className="size__code">{size.sizeCode}</span>
                            )}
                            {size.sizeMeta && (
                              <span className="size__meta">{size.sizeMeta}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              );

            case 'FlexiblePageBuilderPageSectionsCtaLayout':
              return (
                <section key={index} className="container" id="dealer">
                  <div className="cta">
                    <div className="cta__inner">
                      {section.title && (
                        <h2
                          className="cta__title"
                          dangerouslySetInnerHTML={{
                            __html: section.highlight
                              ? section.title.replace(
                                  section.highlight,
                                  `<em>${section.highlight}</em>`
                                )
                              : section.title,
                          }}
                        />
                      )}
                      <div className="cta__actions">
                        {section.primaryText && section.primaryUrl && (
                          <a
                            href={section.primaryUrl}
                            className="btn btn--primary"
                          >
                            {section.primaryText}
                            <svg className="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"></path></svg>
                          </a>
                        )}
                        {section.secondaryText && section.secondaryUrl && (
                          <a
                            href={section.secondaryUrl}
                            className="btn btn--ghost"
                          >
                            {section.secondaryText}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              );
              
            default:
              return null;
          }
        })}
      </main>
    </>
  );
}