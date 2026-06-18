# Rashish Portfolio

Frontend-only portfolio. Push to GitHub → import on Vercel → done.

## Deploy to Vercel (2 steps)
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import repo → Deploy ✅

No build settings needed. `vercel.json` handles SPA routing automatically.

## Personalize before pushing
| File | What to update |
|------|---------------|
| `src/pages/Home.jsx` | Bio, skills, stats |
| `src/pages/ProjectsPage.jsx` | Your projects array |
| `src/pages/CoursesPage.jsx` | Courses + add more certs to `VERIFIED_CERTS` |
| `src/pages/ContactPage.jsx` | Your email, social links, optional Formspree ID |
| `src/components/Footer.jsx` | Social links |
| `src/assets/Rashish.png` | Your photo |

## Contact form options
- **With Formspree (recommended):** Sign up at formspree.io → create form → paste the ID in `ContactPage.jsx`
- **Without Formspree:** Form opens the visitor's mail client automatically (zero setup)

## Local dev
```bash
npm install
npm run dev
```
