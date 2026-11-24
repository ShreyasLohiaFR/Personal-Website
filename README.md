# Shreyas Prakash Lohia — personal portfolio

A restrained, responsive engineering portfolio, built with semantic HTML, CSS and a small progressive-enhancement script. Custom SVG illustrations are explicitly labeled as schematics; they are not fabricated product screenshots. No analytics, cookies, external fonts, or framework runtime.

## Run locally

```sh
python -m http.server 8080 --directory public
```

Open http://localhost:8080. Use Node.js 22 or later to run `node --check public/site.js` and `node scripts/check.mjs`.

## Content and maintenance

- `public/index.html`: personal introduction, projects, evidence, education, skills and links.
- `public/resume.html`: printable public résumé, without private contact details.
- `public/styles.css`: typography, layout, responsive rules and reduced-motion behavior.
- `public/site.js`: accessible progressive scroll enhancement and print action.

Update project facts only after verified tests; keep résumé content aligned. Add certifications and experience only after completion and confirmation. Do not publish private application data or unverified credentials. The current Nexus metrics are from [CI run 45387632217](https://github.com/ShreyasLohiaFR/Nexus-Distributed-Task-Execution-ML-Inference-Platform/actions/runs/45387632217), not production traffic. Both benchmark workloads were 1,000 jobs; zero failed, cancelled or unfinished. Throughput measurements are environment-dependent.

Deploy the `public/` directory as a static site. Automatic deployments should track main.
