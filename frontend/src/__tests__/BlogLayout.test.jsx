import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: vi.fn() }));

import BlogLayout, { BlogIndex, ARTICLES } from "../pages/BlogLayout";

describe("BlogIndex", () => {
  it("renders all article cards", () => {
    render(
      <MemoryRouter>
        <BlogIndex />
      </MemoryRouter>
    );
    ARTICLES.forEach((a) => {
      expect(screen.getByText(a.title)).toBeInTheDocument();
    });
  });
});

describe("BlogLayout", () => {
  it("renders blog header", () => {
    render(
      <MemoryRouter>
        <BlogLayout />
      </MemoryRouter>
    );
    expect(screen.getByText("DoAide Proposals Blog")).toBeInTheDocument();
  });
});

describe("Blog articles", () => {
  it("ProposalWritingGuide renders", async () => {
    const { default: ProposalWritingGuide } = await import("../pages/blog/ProposalWritingGuide");
    render(
      <MemoryRouter>
        <ProposalWritingGuide />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("PricingStrategies renders", async () => {
    const { default: PricingStrategies } = await import("../pages/blog/PricingStrategies");
    render(
      <MemoryRouter>
        <PricingStrategies />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("ClientManagement renders", async () => {
    const { default: ClientManagement } = await import("../pages/blog/ClientManagement");
    render(
      <MemoryRouter>
        <ClientManagement />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});

describe("BlogLayout headings", () => {
  const renderAt = (path) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<p>index</p>} />
            <Route path="post" element={<h1>Post title</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

  it("uses the blog name as the h1 on the index", () => {
    renderAt("/blog");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("DoAide Proposals Blog");
  });

  it("leaves the only h1 to the post on article pages", () => {
    renderAt("/blog/post");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Post title");
  });
});
