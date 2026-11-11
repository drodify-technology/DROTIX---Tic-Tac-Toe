TIC TAC TOE - OFFICIAL WEBSITE (static HTML, no build step)

PAGES
index.html            landing page (hero, features, modes, app screens, crew, FAQ preview, launch sign-up)
features.html         full feature tour
how-to-play.html      rules, boards, coins, pro tips
faq.html              13 questions with accordion
about.html            story and values
contact.html          contact form
delete-account.html   account deletion page (Google Play asks for a web link for this)
press.html            logo downloads, colours, fact sheet
privacy.html          privacy policy TEMPLATE
terms.html            terms of use TEMPLATE
404.html              not-found page
+ sitemap.xml, robots.txt, assets/ (css, js, svg characters and logos, og-image.png)

BEFORE YOU PUBLISH - REPLACE THESE
1. assets/js/main.js  -> SITE.email (support address), SITE.formEndpoint (see below), SITE.playStore / SITE.appStore
2. Search all files for  YOUR-DOMAIN.com  and put your real domain (canonical links, og tags, sitemap.xml, robots.txt)
3. Search all files for  [  (square brackets) and fill: date, address, country/state, retention days, age rating, prices, story
4. privacy.html and terms.html are templates, have a lawyer check them and make them match what the app really does
5. Publisher name is written as "DiployLabs" in the footer, About and legal pages. Change it if your company name is different.
6. When the app is live, use the official Google Play and App Store badge artwork instead of the plain buttons.

CONTACT FORM
Out of the box the form opens the visitor's email app with the message filled in (works anywhere, no server).
For a proper form: create a free form on Formspree or Getform, paste its URL in SITE.formEndpoint. Done.
The contact, launch sign-up and account-deletion forms all use the same setting. A hidden field blocks simple spam bots.

HOSTING (free options)
Netlify (drag the folder onto app.netlify.com/drop), Cloudflare Pages, GitHub Pages or Vercel. Point your domain to it.
Add the website link as the "Privacy policy URL", "Account deletion URL" and "Support URL" in Play Console and App Store Connect.

NOTES
- Fonts: Outfit from Google Fonts (loads online). The site falls back to the system font if offline.
- Fully responsive, keyboard friendly (skip link, visible focus), respects "reduce motion".
- The app screens on the site are illustrative sample screens, replace them with real screenshots later.
- The FAQ states that coins are virtual with no cash value and no real-money prizes. Keep it only if that is true in your app.
- The site says the game is independent and not affiliated with any TV series. Do not add any show's name or logo.
