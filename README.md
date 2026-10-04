# FINRA tutoring website — concept homepage

A one-page concept for a FINRA exam tutoring website, in plain HTML, CSS and
vanilla JavaScript. No frameworks, no build step, no backend. Open `index.html`
and it works.

> **Sample content.** "Seventy-Two Tutoring" is a made-up brand for this concept.
> The About and Reviews sections are left as marked placeholders on purpose:
> they should only ever hold the real tutor's details and real student reviews.

## What is on the page

| Section | What it does |
| --- | --- |
| Hero | Headline, two calls to action and an exam picker (SIE, Series 7, 63, 65, 66) showing questions, time allowed and passing score |
| Tutoring | Three services: one-to-one sessions, a study plan, mock exam review |
| How it works | Four steps from the first call to exam day |
| About | Placeholder for the tutor's photo, story and licences |
| Reviews | Three placeholder slots for real student reviews |
| Articles | Blog preview with three sample titles |
| Contact | Enquiry form that opens the visitor's email app with the message filled in |

## Files

```
index.html          the page (every section is labelled with a comment)
css/styles.css      all styling; colours and fonts are at the top
js/main.js          menu, exam picker tabs, contact form
fonts/              the two typefaces, hosted with the site
images/favicon.svg  browser tab icon
```

## Change things

- **Text:** open `index.html` in any text editor, type over the words, save.
- **Brand name and email:** find and replace `Seventy-Two Tutoring` and
  `hello@seventytwo.example`.
- **Colours:** edit the `:root { ... }` block at the top of `css/styles.css`.
- **Add an exam:** copy one tab button and one `<div class="exam">` panel in
  the hero, and give both a new id.
- **Remove the green note at the very top:** delete the `demo-note` block.

## Exam facts

Question counts, time limits and passing scores were checked in October 2026
against [FINRA](https://www.finra.org/registration-exams-ce/qualification-exams)
and [NASAA](https://www.nasaa.org/exams/). They can change, so re-check them
before publishing.

## Moving to WordPress

The page is built from plain sections, so it converts cleanly into a WordPress
theme: each section becomes a template part or block pattern, the Articles list
becomes the blog loop, and the contact form is replaced by a form plugin that
sends from the server.

## Built in

Responsive from phone to desktop, sticky navigation, smooth scrolling, semantic
HTML with one `<h1>`, structured data for search engines, keyboard-friendly tabs,
labelled form fields with clear error messages, and a no-JavaScript fallback.

## Licences

Fonts: Bricolage Grotesque and Public Sans, SIL Open Font License (texts in
`fonts/`). This concept is not affiliated with, sponsored by or endorsed by
FINRA or NASAA.
