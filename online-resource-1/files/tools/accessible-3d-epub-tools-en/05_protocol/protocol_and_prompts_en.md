# Task protocol and evidence scope

This document describes the task types used in the stored technical runs and provides a blank template for a future documented check of the English derivative. It does not create new observations. The authors personally checked the materials, but detailed human results were not retained separately for each evaluator, page and task. The published task matrix therefore reports the stored AI-operated, author-reviewed technical runs of the Greek version.

## Pages and task types

P1 is the ethyne ball-and-stick page; P2 shows sp orbitals and two π bonds; P3 shows axes and symmetry planes; P4 explores σ and π bonds; P5 compares ethane, ethene and ethyne.

| Task | Instruction | Applicability and outcome rule |
| --- | --- | --- |
| T1 | Reach and read the model description using the keyboard. | All pages; record whether the relevant description is reachable. |
| T2 | Show only the π bonds using the available controls. | All pages; record design-unavailable when the representation does not support this distinction. |
| T3 | Select the view along the molecular axis. | All pages; record the visible and announced response. |
| T4 | Rotate by 45° using three 15° steps, then reset with 0. | All pages; verify the reset and any announcement. |
| T5 | Identify the σ/π bond totals and the relevant bond angle from the material. | All pages; distinguish a total for the whole molecule from the C–C bond alone. |
| T6 | Obtain the relevant information without the interactive 3D view. | All pages; record the actual static or text route used, without assuming equivalence for every learner. |
| T7 | Distinguish the two planes under simulated colour vision deficiency. | P4 only; simulation is exploratory and does not replace evaluation with people with CVD. |

Use done, partial, design-unavailable or not applicable. The historical matrix has 27 done, two partial, two design-unavailable and four not applicable combinations. P2 and P3 summaries were subsequently revised; those tasks were not rerun. The original records are retained without alteration.

## Future English-version recording template

Record the exact package SHA-256, date, evaluator, browser/reader and version, operating system, input method, assistive technology and version, voice/language settings, page, task, observed behaviour and any difficulty. If task times are collected, define their start and stop rules before testing. No historical human task times are reported in this article.

| Date and package hash | Evaluator and environment | Page and task | Outcome | Observed response and difficulty |
| --- | --- | --- | --- | --- |
| To be completed in an actual future check | | | | |

Runtime checks should explicitly confirm that the viewer has loaded before assessing its controls. Report automated violations, incomplete items requiring manual decisions and the manual decisions separately. Check focus order, focus visibility, keyboard operation, announcements, zoom and the direct text alternative in each environment actually named in the report. Contrast calculations against the stage background alone do not establish contrast against every adjacent rendered surface.

## Prompting materials

The original experiment used Greek prompts. Their English translations are in `ai_prompts_en/` at the supplementary root. English reference copies of the five output variants are in `ai_reference_en/`; they are reading aids and were not used to generate the historical results. Model mode, repair history and human interventions differed between conditions. The exercise does not isolate a causal effect of prompting or establish a ranking of AI services.

The original proposed protocol, including combinations that were planned but not documented as completed, is translated separately in `historical_proposed_protocol_en.md`. It must not be treated as an executed study protocol.
