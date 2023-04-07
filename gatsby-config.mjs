import remarkGfm from 'remark-gfm';
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

const firstName = 'Аляксей';
const lastName = 'Бельскі';
const username = 'alxblsk';

const siteMetadata = {
  title: `${lastName}`,
  author: `${firstName} ${lastName}`,
  description: '',
  siteUrl: 'https://belski.page',
  username,
  firstName,
  lastName
}

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const config = {
  siteMetadata,
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 640,
            },
          },
          'gatsby-remark-copy-linked-files',
        ],
        mdxOptions: {
          remarkPlugins: [remarkGfm]
        }
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `./src/pages`,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `./src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `./src/content`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/fav-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                firstName
                lastName
              }

            }
            file(sourceInstanceName: {eq: "images"}, relativePath: {eq: "fav-icon.png"}) {
              logo_url: publicURL
            }
          }
        `,
        setup: ({
          query: {
              site: { siteMetadata},
              file: { logo_url },
              ...rest
          },
          }) => {
              const { site_url } = siteMetadata;
              const atomLink = `atom:link href="${site_url}/rss.xml" rel="self" type="application/rss+xml"`;
              return {
                  ...siteMetadata,
                  image_url: `${site_url}${logo_url}`,
                  ...rest,
                  custom_namespaces: { 
                    "source": "http://source.scripting.com/"
                  },
                  custom_elements: [
                    {
                      [atomLink]: null,
                    },
                  ],
              }
          },
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              const { nodes } = allMdx;
              const { siteUrl } = site.siteMetadata;

              return nodes.map((node) => {
                const { frontmatter, title, date, excerpt, fields, body } = node;
                let enclosure = null;
                
                if (frontmatter?.image?.childImageSharp?.fixed?.src) {
                  enclosure = {
                    url: siteUrl + frontmatter.image.childImageSharp.fixed.src,
                    //size: 0,
                    type: 'image/jpeg'
                  }
                }

                //console.log(node.fields.slug, file.publicURL);
                return Object.assign({}, {
                  title,
                  description: excerpt,
                  date,
                  url: siteUrl + fields.slug,
                  guid: siteUrl + fields.slug,
                  enclosure,
                  custom_elements: [{ "source:markdown": body }],
                })
              })
            },
            query: `
              {
                allMdx(sort: {frontmatter: {date: DESC}}) {
                  nodes {
                      body
                      excerpt
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        image {
                          childImageSharp {
                            fixed {
                              src
                            }
                          }
                        }
                      }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Бельскi || RSS",
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: { },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ["G-T60NCVTX7R"],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "G-T60NCVTX7R",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: [],
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/locales`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`be`],
        defaultLanguage: `be`,
        siteUrl: `http://localhost:8000/`,
        i18nextOptions: {
          interpolation: {
            escapeValue: false 
          },
          keySeparator: false,
          nsSeparator: false
        },
        pages: []
      }
    }
  ]
}

export default config;