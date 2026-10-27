/**
 * SEO metadata for every public, indexable route. Shared by the useSEO hook
 * (wired in App) and scripts/prerender-routes.mjs (static HTML, sitemap,
 * serve.json), so keep it plain JS with no JSX or browser-only imports.
 * Signed-in pages and shared proposals (/p/:token) are deliberately absent.
 */

import { BLOG_ARTICLES } from './data/blogArticles.js'

export const SITE = {
  name: 'DoAide Proposals',
  baseUrl: 'https://proposals.doaide.com',
  ogImage: 'https://proposals.doaide.com/og-proposals.png',
}

const ORG = { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' }

// Product FAQ, home page only (index.html used to stamp it on every URL).
const HOME_FAQ = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of proposals can I create?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Business proposals, project quotes, consulting offers, freelance contracts, and more. Any document that needs professional formatting and client approval."
        }
      },
      {
        "@type": "Question",
        "name": "How does the AI generation work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Provide a brief description of the project and client. Our AI generates professional proposal content including scope, deliverables, timeline, and pricing — ready to review and send."
        }
      },
      {
        "@type": "Question",
        "name": "Can clients sign proposals digitally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Send a secure link and clients can review, comment, and sign directly in their browser. No app download needed."
        }
      },
      {
        "@type": "Question",
        "name": "Is DoAide Proposals free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The Free plan includes 10 proposals per month with AI generation, PDF export and e-signatures. Upgrade to Pro for unlimited proposals."
        }
      }
    ]
  }

// Fit "<title> | DoAide Proposals" into ~70 chars; long titles go without it.
const withSuffix = (title) => (`${title} | DoAide Proposals`.length <= 70 ? `${title} | DoAide Proposals` : title)

const tool = (path, h1, title, description) => ({ path, h1, title: withSuffix(title), description, kind: 'tool' })

export const routes = [
  {
    path: '/',
    kind: 'home',
    h1: 'Professional Proposals, Powered by AI',
    title: 'DoAide Proposals — AI Business Proposal Generator & Templates',
    description:
      'Create, send and track professional business proposals in minutes. AI writes the first draft; free proposal generator, templates and pricing tools.',
  },
  {
    path: '/pricing',
    kind: 'page',
    h1: 'Simple Pricing',
    title: withSuffix('Pricing — Free and Pro ($29/month)'),
    description: 'Start free, upgrade when you need more. Compare the Free and Pro plans of DoAide Proposals.',
  },
  {
    path: '/tools',
    kind: 'page',
    h1: 'Free Proposal Tools',
    title: withSuffix('Free Proposal Tools — No Sign-up Required'),
    description:
      'Free proposal generator, project cost estimator, pricing calculator, pricing table builder and win rate estimator. No sign-up required.',
  },
  tool(
    '/generator',
    'Proposal Generator',
    'Free Business Proposal Generator — Instant Outline',
    'Generate a professional business proposal outline instantly: executive summary, scope, timeline and pricing sections. No sign-up required.'
  ),
  tool(
    '/builder',
    'Proposal Builder',
    'Free Proposal Builder — Download as PDF',
    'Build a professional proposal step-by-step and download it as a PDF. Free proposal builder, no sign-up required.'
  ),
  tool(
    '/calculator',
    'Project Cost Estimator',
    'Project Cost Estimator — Calculate Project Budgets',
    'Estimate your project budget instantly from roles, hours and rates. Free project cost calculator for agencies and freelancers.'
  ),
  {
    path: '/templates-gallery',
    kind: 'page',
    h1: 'Proposal Templates',
    title: withSuffix('Free Business Proposal Templates'),
    description: 'Start with a proven structure. Pick a free proposal template and customise it for your client.',
  },
  tool(
    '/tools/pricing-calculator',
    'Pricing Calculator',
    'Project Pricing Calculator — Margin, Discount & Tax',
    'Calculate project pricing with margins, discounts and taxes for your proposals. Free pricing calculator, no sign-up required.'
  ),
  tool(
    '/tools/pricing-table',
    'Pricing Table Builder',
    'Pricing Table Builder — Line Items, Tax & Discount',
    'Build a professional pricing table with line items, tax and discount calculations, then copy it into your proposal. Free.'
  ),
  tool(
    '/tools/win-rate',
    'Win Rate Estimator',
    'Proposal Win Rate Estimator',
    'Rate key factors about your opportunity to estimate your proposal win probability, with tips to improve it. Free, no sign-up.'
  ),
  {
    path: '/embed',
    kind: 'page',
    h1: 'Embed Proposal Tools on Your Website',
    title: withSuffix('Embed Free Proposal Tools on Your Website'),
    description:
      'Add a free proposal generator, cost estimator or template gallery to your website with one line of code. No sign-up required.',
  },
  {
    path: '/blog',
    kind: 'blog',
    h1: 'DoAide Proposals Blog',
    title: withSuffix('Proposal Writing Blog — Guides & Templates'),
    description: 'Guides on writing business proposals, pricing services, following up and winning government tenders in India.',
  },
  ...BLOG_ARTICLES.map((a) => ({
    path: `/blog/${a.slug}`,
    kind: 'post',
    h1: a.title,
    title: withSuffix(a.title),
    description: a.description,
    published: a.published,
  })),
]

export const canonicalFor = (path) => `${SITE.baseUrl}${path}`

export const metaForPath = (path) => routes.find((r) => r.path === path)

export function jsonLdFor(route) {
  const url = canonicalFor(route.path)
  switch (route.kind) {
    case 'home':
      return {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareApplication',
            name: SITE.name,
            url,
            description: route.description,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: [
              { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
              { '@type': 'Offer', name: 'Pro', price: '29', priceCurrency: 'USD' },
            ],
            author: ORG,
          },
          HOME_FAQ,
        ],
      }
    case 'tool':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: route.h1,
        url,
        description: route.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: canonicalFor('/') },
      }
    case 'post':
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: route.h1,
        description: route.description,
        url,
        mainEntityOfPage: url,
        datePublished: route.published,
        author: ORG,
        publisher: ORG,
      }
    default:
      return {
        '@context': 'https://schema.org',
        '@type': route.kind === 'blog' ? 'Blog' : 'WebPage',
        name: route.h1,
        url,
        description: route.description,
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: canonicalFor('/') },
      }
  }
}
