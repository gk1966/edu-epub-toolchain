# Historical proposed protocol translated into English

This is a translation of a planning document, not a record of completed trials. Its references to RQ4, independent timed evaluations and proposed Apple/VoiceOver combinations belong to the original plan. They are not claimed as completed methods or results in the revised article. See protocol_and_prompts_en.md for the current evidence scope. The Greek original is retained in the unmodified original ZIP.

# Evaluation protocol and prompts

> **English translated derivative (en-GB) — requires verification.** Translated from `protocol_and_prompts_el.md`, which is kept unchanged alongside this file. The prompts below are English translations for reference only; the prompts actually given to the AI systems were the Greek originals.

Evaluation by the three authors acting as experts, without participants; each evaluator carries out all the tasks separately, and the results are compared afterwards. The results support RQ2 and RQ4.

## Set-up

| Combination | Software | Who |
| --- | --- | --- |
| Screen reader, Windows | NVDA (current version) + Thorium and + Chrome | [anonymised] |
| Screen reader, Apple | VoiceOver + Apple Books (macOS or iPad) | [anonymised] |
| Keyboard only, no mouse | Chrome or Edge, EPUB v3.0 in Edu Ebook Reader | [anonymised] |
| Without JavaScript | Thorium with scripts disabled, or Chrome without JavaScript | all |

For each task we record: the outcome, the time in minutes and anything that caused difficulty. Before starting: software versions, date, voice settings.

## Tasks and recording sheet

One copy of this table per evaluator (copy it and add your name). On pages with more than one model (12), T2 refers to the π bond of ethene.

| Task | 02 | 04 | 06 | 07 | 12 | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| T1. Finds and listens to the model description | ☐ | ☐ | ☐ | ☐ | ☐ |  |
| T2. Shows only the π bonds (or the requested part) | ☐ | ☐ | ☐ | ☐ | ☐ |  |
| T3. Goes to the “along the axis” view and says what it shows | ☐ | ☐ | ☐ | ☐ | ☐ |  |
| T4. Rotates 45° with the arrow keys and resets (0) | ☐ | ☐ | ☐ | ☐ | ☐ |  |
| T5. Answers: how many σ and π bonds? what angle? | ☐ | ☐ | ☐ | ☐ | ☐ |  |
| T6. Finds the same information without JavaScript | ☐ | ☐ | ☐ | ☐ | ☐ |  |
| T7. In the CVD-simulated screenshot, distinguishes the planes / the π bonds | ☐ | ☐ | ☐ | ☐ | ☐ |  |

Inter-rater agreement: percentage of matching outcomes per task and Fleiss’ κ for the three evaluators; disagreements are discussed and recorded, not “corrected”.

## Comparison of strategies: prompts

Same GLB (07), same day, 2–3 AI systems. We record the model name and version, the number of rounds until axe and GLB Lab are passed, the time, and the outcome of tasks T1–T6.

**Prompt A: as in the original EPUB (no accessibility requirements).**

```text
Create an interactive HTML page for EPUB 3 that displays this 3D GLB model of ethyne (attached).
The student should be able to rotate and zoom the model and show or hide the σ bonds, the π bonds
and the two planes. Add a short text about σ and π bonds. Chemistry, final year of the Greek Lyceum (Γ΄ Λυκείου), in Greek.
```

**Prompt B: accessibility from the outset.**

```text
Create an interactive HTML page for EPUB 3 that displays this 3D GLB model of ethyne (attached),
for students in the final year of the Greek Lyceum (Γ΄ Λυκείου), in Greek. Requirements:
1. Semantic map: every part of the model (σ bonds, sp lobes, π bonds, plane 1, plane 2, hydrogen atoms, axes)
   has a name and a description of one or two sentences; write the map as JSON and use it in the page.
2. A list of parts in HTML, with a visibility checkbox and a highlight button for each one.
3. Keyboard: arrow keys to rotate, + and − to zoom, preset views (side, along the axis, from above).
4. An aria-live region that states what is visible in each view and what has changed.
5. WCAG 2.2 AA: 1.4.1 (not colour alone: a pattern or outline on the planes), 1.4.11 (3:1 contrast of each role against the background,
   also after transparency), 2.1.1, 2.4.7, 4.1.2. Report the contrast ratios that you calculated.
6. A palette that remains distinguishable under protanopia, deuteranopia and tritanopia, in dark and light themes.
7. Without JavaScript, the page shows the list, the description and static images.
8. No external library from a CDN: everything inside the EPUB.
```

| AI system | Version | Prompt | Rounds | Time (minutes) | axe | GLB Lab (roles below 3:1 / minimum ΔE₀₀ under CVD) | T1–T6 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Claude |  | A |  |  |  |  |  |
| Claude |  | B |  |  |  |  |  |
|  |  | A |  |  |  |  |  |
|  |  | B |  |  |  |  |  |
