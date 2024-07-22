import { describe, it } from "jsr:@std/testing/bdd";
import { assertSnapshot } from "jsr:@std/testing/snapshot";
import { s } from "./sitemap.ts";
import { renderXMLDocument } from "./render_xml.ts";

describe("sitemap", () => {
  it("works", async (t) => {
    const sitemap = s.document(
      s.doctype(),
      s.stylesheet("/styles.xsl", "text/xsl"),
      s.urlset(
        s.url(s.loc("https://example.com")),
        s.url(s.loc("https://example.com/about")),
        s.url(s.loc("https://example.com/contact")),
      ),
    );

    await assertSnapshot(t, renderXMLDocument(sitemap));
  });

  it("sitemap index", async (t) => {
    const sitemap = s.document(
      s.doctype(),
      s.sitemapindex(
        s.sitemap(s.loc("https://example.com/sitemap1.xml")),
        s.sitemap(s.loc("https://example.com/sitemap2.xml")),
      ),
    );

    await assertSnapshot(t, renderXMLDocument(sitemap));
  });

  it("sample works", async (t) => {
    const sitemap = s.document(
      s.doctype(),
      s.urlset(
        s.url(
          s.loc("http://www.example.com/"),
          s.lastmod(new Date("2005-01-01")),
          s.changefreq("monthly"),
          s.priority(0.8),
        ),
        s.url(
          s.loc("http://www.example.com/catalog?item=12&desc=vacation_hawaii"),
          s.changefreq("weekly"),
        ),
        s.url(
          s.loc("http://www.example.com/catalog?item=73&desc=vacation_new_zealand"),
          s.lastmod(new Date("2004-12-23")),
          s.changefreq("weekly"),
        ),
        s.url(
          s.loc("http://www.example.com/catalog?item=74&desc=vacation_newfoundland"),
          s.lastmod(new Date("2004-12-23T18:00:15Z")),
          s.priority(0.3),
        ),
        s.url(
          s.loc("http://www.example.com/catalog?item=83&desc=vacation_usa"),
          s.lastmod(new Date("2004-11-23")),
        ),
      ),
    );

    await assertSnapshot(t, renderXMLDocument(sitemap));
  });

  it("sitemap index sample works", async (t) => {
    const sitemap = s.document(
      s.doctype(),
      s.sitemapindex(
        s.sitemap(
          s.loc("http://www.example.com/sitemap1.xml.gz"),
          s.lastmod(new Date("2004-10-01T18:23:17Z")),
        ),
        s.sitemap(
          s.loc("http://www.example.com/sitemap2.xml.gz"),
          s.lastmod(new Date("2005-01-01")),
        ),
      ),
    );

    await assertSnapshot(t, renderXMLDocument(sitemap));
  });
});
