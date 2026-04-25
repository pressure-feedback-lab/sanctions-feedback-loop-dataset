# Sanctions Feedback Loop Dataset v0.1

This repository contains a small reproducible observation dataset for examining whether external pressure always weakens authoritarian regimes, or whether under certain conditions it may reinforce internal survival narratives and delay transition.

## Purpose

The dataset is designed as a lightweight structure for observing pressure-feedback patterns.

It is not a final political judgment, forecasting model, or policy recommendation.

## Scope

- Countries: Iran, Venezuela, North Korea
- Period: 2016–2025
- Records: 30 country-year observations
- Format: CSV
- Phase rule: v1.1

## Repository Structure

```text
.
├── data/
│   └── sanctions_feedback_loop_dataset_v0_1_phase_v1_1.csv
├── docs/
│   ├── index.html
│   ├── sanctions_feedback_loop_phase_map_v0_1.png
│   ├── phase_rule_v1_1_report.md
│   └── visualization_report_v0_1.md
├── scripts/
│   └── calculate_sanctions_feedback_metrics_v1_1.mjs
├── LICENSE
└── README.md
```

## Variables

Core variables use a 0–3 ordinal scale.

| Column | Meaning |
|---|---|
| `sanction_intensity` | Intensity of sanctions |
| `military_pressure` | Degree of military pressure |
| `external_threat_narrative` | Strength of external-threat framing |
| `protest_frequency` | Frequency or scale of protests |
| `repression_intensity` | Intensity of internal repression |
| `economic_stress` | Degree of economic stress |
| `elite_fragmentation` | Degree of elite fragmentation |
| `civilian_relief_access` | Access to civilian relief channels |

## Derived Metrics

```text
B-index = sanction_intensity + military_pressure + external_threat_narrative

R-fracture = elite_fragmentation - repression_intensity
```

## Phase Rule v1.1

Priority order:

1. `S4_transition`: `r_fracture >= 1 AND b_index <= 4`
2. `R_transition`: `r_fracture >= 0 AND protest_frequency >= 2`
3. `L_pressure`: `economic_stress >= 2 AND protest_frequency >= 1`
4. `B_dominant`: default

## Recalculate Metrics

```bash
node scripts/calculate_sanctions_feedback_metrics_v1_1.mjs \
  data/sanctions_feedback_loop_dataset_v0_1_phase_v1_1.csv \
  data/sanctions_feedback_loop_dataset_v0_1_phase_v1_1_recalculated.csv
```

## GitHub Pages

Use `/docs` as the GitHub Pages source.

The Pages entry file is:

```text
docs/index.html
```

## Limitations

This v0.1 release is a small hand-labeled observation dataset for schema validation and phase-rule testing.

It should not be treated as definitive empirical measurement.
