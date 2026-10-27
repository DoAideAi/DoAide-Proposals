import { Link, Outlet, useLocation } from "react-router-dom";
import { BLOG_ARTICLES } from "../data/blogArticles";
import ProposalWritingGuide from "./blog/ProposalWritingGuide";
import PricingStrategies from "./blog/PricingStrategies";
import ClientManagement from "./blog/ClientManagement";
import WinningProposalStructure from "./blog/WinningProposalStructure";
import ProposalFollowUp from "./blog/ProposalFollowUp";
import BusinessProposalFormat from "./blog/BusinessProposalFormat";
import ProjectProposalGuide from "./blog/ProjectProposalGuide";
import GovernmentTenderProposal from "./blog/GovernmentTenderProposal";

// Article pages, keyed by slug; titles and descriptions live in data/blogArticles.
const COMPONENTS = {
  "how-to-write-business-proposal": ProposalWritingGuide,
  "pricing-strategies-service-business": PricingStrategies,
  "client-management-best-practices": ClientManagement,
  "proposal-structure-breakdown": WinningProposalStructure,
  "proposal-follow-up-guide": ProposalFollowUp,
  "business-proposal-format-india": BusinessProposalFormat,
  "winning-project-proposal-guide": ProjectProposalGuide,
  "government-tender-proposal-msme": GovernmentTenderProposal,
};

const ARTICLES = BLOG_ARTICLES.map((a) => ({ ...a, component: COMPONENTS[a.slug] }));

export { ARTICLES };

export default function BlogLayout() {
  // Posts render their own h1, so the blog name is only the h1 on /blog.
  const isIndex = useLocation().pathname.replace(/\/+$/, "") === "/blog";
  const Title = isIndex ? "h1" : "p";
  return (
    <div className="blog-layout">
      <header className="blog-header">
        <Link to="/" className="blog-home-link">← Back to DoAide Proposals</Link>
        <Title className="blog-title">DoAide Proposals Blog</Title>
        <p className="blog-subtitle">Guides and resources for winning more business</p>
      </header>
      <Outlet />
    </div>
  );
}

export function BlogIndex() {
  return (
    <div className="blog-index">
      {ARTICLES.map((a) => (
        <Link key={a.slug} to={`/blog/${a.slug}`} className="blog-card">
          <h2>{a.title}</h2>
          <p>{a.description}</p>
          <span className="blog-read-more">Read more →</span>
        </Link>
      ))}
    </div>
  );
}
