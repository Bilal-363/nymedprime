# -*- coding: utf-8 -*-
"""Generates /blog/ and every article page from one source of truth.

Run from the site root:  python tools/build_blog.py
Add an article by appending to tools/blog_content.py (and FAQS below), then re-run.
"""
import os, re, json, html

SITE  = "https://nymedprime.pages.dev"
TODAY = "2026-09-08"
PHONE = "(917) 905-8140"
TEL   = "+19179058140"
EMAIL = "info@nymedcare.com"
ADDR  = "15 E 40th St, Suite 201, New York, NY 10016"

ns = {}
exec(open(os.path.join(os.path.dirname(__file__), 'blog_content.py'), encoding='utf-8').read(), ns)
ARTICLES, CTA = ns['ARTICLES'], ns['CTA']

# Per-article FAQs. Deliberately none of these duplicate the 13 on the homepage,
# so the two FAQPage blocks never compete for the same query.
FAQS = {
 "immigration-medical-exam-nyc": [
   ("What if I already had a physical with my own doctor?",
    "It cannot be used for Form I-693 unless that physician holds a USCIS designation as a civil "
    "surgeon. The examination has to be repeated by a designated civil surgeon, who then completes "
    "and signs the form."),
   ("Can I bring someone with me?",
    "Yes. Bring an interpreter if you would be more comfortable with one, and families are routinely "
    "scheduled back to back so everyone is finished in one trip. Each applicant still needs their own "
    "examination and their own form."),
   ("How far ahead of filing should I book?",
    "The visit is about an hour and laboratory results typically return in 3 to 5 business days, so "
    "plan for at least a week from appointment to sealed envelope. How that fits your filing deadline "
    "is a question for your immigration attorney, not for us."),
 ],
 "form-i-693-requirements-checklist": [
   ("Can I show the form on my phone instead of printing it?",
    "No. Bring it printed, with Part 1 already completed by you. The civil surgeon completes the rest "
    "on paper and seals it."),
   ("What if I do not have an A-number yet?",
    "Bring it only if one has been issued to you. Not having one does not stop the examination."),
   ("Can a relative fill in Part 1 for me?",
    "Part 1 is the applicant's own section, so complete it yourself. If language is a barrier, bring "
    "an interpreter to the appointment."),
 ],
 "uscis-vaccination-requirements": [
   ("Do I still need to document a COVID-19 vaccination?",
    "No. USCIS removed the COVID-19 vaccination requirement effective 22 January 2025, so it no longer "
    "needs to be recorded on Form I-693."),
   ("Are vaccination records in another language acceptable?",
    "Bring them. Childhood records from your country of origin are frequently usable, whatever language "
    "they are in and however old they are. If they turn out to be incomplete, blood titers remain "
    "available as a fallback."),
   ("How long do titer results take?",
    "Titers are processed by the same outside laboratory as the rest of your required testing, so "
    "expect the same 3 to 5 business day turnaround."),
 ],
 "tb-blood-test-igra-immigration": [
   ("Will a BCG vaccination make my result positive?",
    "The IGRA blood test is not affected by prior BCG vaccination in the way a PPD skin test can be. "
    "That is one of the reasons it is now the required initial screen."),
   ("Do children under two need the blood test?",
    "The IGRA requirement applies from age 2. For younger children the tuberculosis assessment is "
    "handled differently, and the civil surgeon will explain what applies at the visit."),
   ("Where do I go for the blood draw?",
    "The order is written at your appointment and you are told exactly which collection site to use, "
    "so you are not left to arrange it yourself."),
 ],
 "does-form-i-693-expire": [
   ("Does the sealed envelope show the signature date?",
    "You do not need to open it to find out. The unsealed duplicate copy you are given carries the "
    "same information, and opening the sealed envelope would cause USCIS to reject the form."),
   ("Can I reuse an examination signed by a different civil surgeon?",
    "The form is the form, whoever signed it, and validity turns on the signature date under the "
    "guidance in force. Whether a particular form can be used for a particular filing is a question "
    "for USCIS or your immigration attorney."),
   ("If my form is still valid, do I need a new exam for a new application?",
    "That depends on the filing rather than on the medicine, so confirm it with USCIS or your "
    "immigration attorney before assuming either way."),
 ],
}

BY_SLUG = {a['slug']: a for a in ARTICLES}


def head(title, desc, canon, depth, kw=None, ld_blocks=(), og_type="article"):
    up = "../" * depth
    kwtag = f'\n  <meta name="keywords" content="{html.escape(kw)}">' if kw else ""
    ld = "".join(
        '  <script type="application/ld+json">\n' + json.dumps(b, indent=2) + "\n  </script>\n"
        for b in ld_blocks
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{html.escape(title)}</title>
  <meta name="description" content="{html.escape(desc)}">{kwtag}
  <link rel="canonical" href="{canon}">
  <link rel="icon" type="image/png" href="{up}assets/favicon.png">
  <meta name="theme-color" content="#fbfaf7">
  <meta property="og:type" content="{og_type}">
  <meta property="og:title" content="{html.escape(title)}">
  <meta property="og:description" content="{html.escape(desc)}">
  <meta property="og:url" content="{canon}">
  <meta property="og:image" content="{SITE}/assets/og-image.jpg">
  <meta property="og:site_name" content="NY MedCare">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600&family=Instrument+Serif&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{up}assets/core.css">
  <link rel="stylesheet" href="{up}assets/blog.css">
{ld}</head>
<body style="background:#fbfaf7">
  <a class="skip" href="#main">Skip to content</a>

  <div class="topbar">
    <div class="topbar-items">
      <span>USCIS-Designated Civil Surgeon</span>
      <span>{ADDR.upper()}</span>
    </div>
    <div><a href="tel:{TEL}">{PHONE}</a></div>
  </div>

  <header class="hdr is-stuck">
    <div class="hdr-in">
      <a class="brand" href="/" aria-label="NY MedCare home">
        <img class="brand-logo" src="{up}assets/logo-lockup.png" width="560" height="133" alt="NY MedCare" decoding="async">
      </a>
      <div class="hdr-right">
        <nav class="nav" aria-label="Primary">
          <a class="nav-link" href="/#included">Included</a>
          <a class="nav-link" href="/#process">Process</a>
          <a class="nav-link" href="/#vaccines">Vaccines</a>
          <a class="nav-link" href="/#doctor">Dr. Irshad</a>
          <a class="nav-link" href="/blog/">Guides</a>
          <a class="nav-link" href="/#faq">FAQ</a>
        </nav>
        <a class="ghost" href="tel:{TEL}">{PHONE}</a>
        <a class="pill" href="/#book">Book Your Exam</a>
      </div>
    </div>
  </header>
"""


def footer(depth):
    up = "../" * depth
    links = "".join(
        f'        <a href="/blog/{a["slug"]}/">{html.escape(a["cat"])}</a>\n' for a in ARTICLES
    )
    return f"""
  <footer class="ftr">
    <div class="ftr-grid">
      <div class="ftr-brand-col">
        <a class="brand brand--ftr" href="/" aria-label="NY MedCare home">
          <img class="brand-logo" src="{up}assets/logo-lockup.png" width="560" height="133" alt="NY MedCare" loading="lazy" decoding="async">
        </a>
        <p>USCIS-designated civil surgeon in Manhattan, NY. Form I-693 immigration medical examinations: one exam appointment, every lab and vaccine order written for you, and a properly sealed form.</p>
      </div>
      <div class="ftr-col">
        <h4>Guides</h4>
        <a href="/blog/">All guides</a>
{links}      </div>
      <div class="ftr-col">
        <h4>Practice</h4>
        <a href="/#doctor">About Dr. Irshad</a>
        <a href="/#location">Location &amp; Hours</a>
        <a href="/#book">Book an Appointment</a>
        <a href="/privacy-policy/">Privacy Policy</a>
        <a href="/terms/">Terms of Use</a>
      </div>
      <div class="ftr-col">
        <h4>Contact</h4>
        <p class="ftr-contact-p">
          <strong>Phone:</strong> <a href="tel:{TEL}">{PHONE}</a><br>
          <strong>Email:</strong> <a href="mailto:{EMAIL}">{EMAIL}</a><br>
          <strong>Address:</strong> {ADDR}<br>
          <strong>Hours:</strong> Mon–Fri 9:00–5:00
        </p>
        <p class="ftr-disclaimer">NY MedCare is not affiliated with U.S. Citizenship and Immigration Services. We do not provide legal advice.</p>
      </div>
    </div>
    <div class="ftr-bottom">
      <div>&copy; 2026 NY MedCare. All rights reserved.</div>
      <div>USCIS Form I-693 Designated Civil Surgeon</div>
    </div>
  </footer>
</body>
</html>
"""


PUBLISHER = {
    "@type": "Organization",
    "name": "NY MedCare",
    "url": SITE + "/",
    "logo": {"@type": "ImageObject", "url": SITE + "/assets/logo-lockup.png"},
}


def read_minutes(a):
    words = len(re.sub(r"<[^>]+>", " ", a["body"]).split())
    words += sum(len((q + b).split()) for q, b in FAQS.get(a["slug"], []))
    return max(2, round(words / 200))


def crumbs(extra=None):
    items = [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
             {"@type": "ListItem", "position": 2, "name": "Guides", "item": SITE + "/blog/"}]
    if extra:
        items.append({"@type": "ListItem", "position": 3, "name": extra[0], "item": extra[1]})
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items}


# ------------------------------------------------------------------ articles --
os.makedirs("blog", exist_ok=True)
made = []

for a in ARTICLES:
    slug, canon = a["slug"], f"{SITE}/blog/{a['slug']}/"
    faqs = FAQS.get(slug, [])

    posting = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {"@type": "WebPage", "@id": canon},
        "headline": a["h1"],
        "description": a["desc"],
        "url": canon,
        "datePublished": TODAY,
        "dateModified": TODAY,
        "author": PUBLISHER,
        "publisher": PUBLISHER,
        "image": SITE + "/assets/og-image.jpg",
        "inLanguage": "en-US",
        "isPartOf": {"@type": "Blog", "@id": SITE + "/blog/#blog", "name": "NY MedCare Guides"},
        "about": {"@type": "MedicalTest", "name": "USCIS Immigration Medical Examination (Form I-693)"},
    }
    blocks = [posting, crumbs((a["h1"], canon))]
    if faqs:
        blocks.append({
            "@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": q,
                            "acceptedAnswer": {"@type": "Answer", "text": ans}} for q, ans in faqs]
        })

    glance = "".join(f"          <li>{g}</li>\n" for g in a["glance"])
    faq_html = ""
    if faqs:
        rows = "".join(
            f"""        <details>
          <summary>{html.escape(q)}<svg class="chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 4.5 6 8.5l4-4"/></svg></summary>
          <div class="ans"><div><p>{html.escape(ans)}</p></div></div>
        </details>\n""" for q, ans in faqs)
        faq_html = f"""
      <section class="post-faq" aria-labelledby="post-faq-h">
        <h2 id="post-faq-h">Questions we get about this</h2>
{rows}      </section>
"""

    rel = "".join(
        f"""          <a class="rel-card" href="/blog/{r}/">
            <span class="rel-cat">{html.escape(BY_SLUG[r]['cat'])}</span>
            <span class="rel-title">{html.escape(BY_SLUG[r]['h1'])}</span>
          </a>\n""" for r in a["related"])

    page = head(a["title"], a["desc"], canon, 2, kw=a["kw"], ld_blocks=blocks) + f"""
  <main id="main" class="post-wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span aria-hidden="true">/</span>
      <a href="/blog/">Guides</a><span aria-hidden="true">/</span>
      <span aria-current="page">{html.escape(a['cat'])}</span>
    </nav>

    <article class="post">
      <header class="post-head">
        <p class="post-cat">{html.escape(a['cat'])}</p>
        <h1>{a['h1']}</h1>
        <p class="post-dek">{a['dek']}</p>
        <p class="post-meta">
          <span>Reviewed {TODAY}</span><span aria-hidden="true">·</span>
          <span>{read_minutes(a)} min read</span><span aria-hidden="true">·</span>
          <span>NY MedCare, Manhattan</span>
        </p>
      </header>

      <aside class="glance" aria-labelledby="glance-h">
        <h2 id="glance-h">At a glance</h2>
        <ul>
{glance}        </ul>
      </aside>

      <div class="post-body">
{a['body']}
      </div>
{faq_html}{CTA}
      <section class="related" aria-labelledby="rel-h">
        <h2 id="rel-h">Keep reading</h2>
        <div class="rel-grid">
{rel}        </div>
      </section>

      <p class="post-legal">This page is general information about a USCIS form, published by a medical
        practice. It is not legal advice, and NY MedCare is not affiliated with U.S. Citizenship and
        Immigration Services. Requirements and guidance change, so verify anything date-specific
        against uscis.gov or with your immigration attorney before you file.</p>
    </article>
  </main>
""" + footer(2)

    os.makedirs(f"blog/{slug}", exist_ok=True)
    open(f"blog/{slug}/index.html", "w", encoding="utf-8").write(page)
    made.append(f"blog/{slug}/index.html")

# --------------------------------------------------------------------- index --
idx_canon = SITE + "/blog/"
blog_ld = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": idx_canon + "#blog",
    "name": "NY MedCare Guides",
    "description": "Plain-language guides to the USCIS immigration medical examination and Form I-693, "
                   "written by a designated civil surgeon practice in Manhattan.",
    "url": idx_canon,
    "publisher": PUBLISHER,
    "inLanguage": "en-US",
    "blogPost": [
        {"@type": "BlogPosting", "headline": a["h1"], "url": f"{SITE}/blog/{a['slug']}/",
         "description": a["desc"], "datePublished": TODAY, "dateModified": TODAY,
         "author": PUBLISHER} for a in ARTICLES
    ],
}

feature, rest = ARTICLES[0], ARTICLES[1:]
rows = "".join(
    f"""        <li class="idx-row">
          <a class="idx-link" href="/blog/{a['slug']}/">
            <span class="idx-n">{i:02d}</span>
            <span class="idx-main">
              <span class="idx-cat">{html.escape(a['cat'])}</span>
              <span class="idx-title">{html.escape(a['h1'])}</span>
              <span class="idx-dek">{html.escape(a['dek'])}</span>
            </span>
            <span class="idx-meta">{read_minutes(a)} min</span>
          </a>
        </li>\n""" for i, a in enumerate(rest, start=2))

index = head("Immigration Medical Exam Guides | NY MedCare",
             "Plain-language guides to the USCIS immigration medical exam and Form I-693: requirements, "
             "vaccinations, the TB blood test and validity, from a Manhattan civil surgeon.",
             idx_canon, 1,
             kw="immigration medical exam guide, form i-693 help, uscis civil surgeon nyc",
             ld_blocks=[blog_ld, crumbs()], og_type="website") + f"""
  <main id="main" class="blog-wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span aria-hidden="true">/</span>
      <span aria-current="page">Guides</span>
    </nav>

    <header class="blog-head">
      <p class="eyebrow">Guides</p>
      <h1>Straight answers about the immigration medical exam</h1>
      <p class="blog-dek">The I-693 is not complicated once someone explains it in order. These guides
        cover what the exam involves, what to bring, which vaccinations apply and how long a completed
        form stays valid, written by the practice that performs them.</p>
    </header>

    <a class="feature" href="/blog/{feature['slug']}/">
      <span class="feature-cat">Start here &middot; {html.escape(feature['cat'])}</span>
      <span class="feature-title">{html.escape(feature['h1'])}</span>
      <span class="feature-dek">{html.escape(feature['dek'])}</span>
      <span class="feature-more">Read the guide<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4"/></svg></span>
    </a>

    <ol class="idx-list">
{rows}    </ol>
{CTA}
  </main>
""" + footer(1)

open("blog/index.html", "w", encoding="utf-8").write(index)
made.insert(0, "blog/index.html")

for m in made:
    print(f"  wrote {m:52s} {os.path.getsize(m) // 1024} KB")
print(f"\n{len(made)} pages generated")
