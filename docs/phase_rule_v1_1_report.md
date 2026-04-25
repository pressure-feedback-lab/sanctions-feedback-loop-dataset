# Sanctions Feedback Loop Dataset｜Phase Rule v1.1 Report

## Summary

- Records: 30
- Countries: Iran, North Korea, Venezuela
- Period: 2016–2025
- Phase changes from original labels: 9

## Phase Rule v1.1

Priority order:

1. `S4_transition`: `r_fracture >= 1 AND b_index <= 4`
2. `R_transition`: `r_fracture >= 0 AND protest_frequency >= 2`
3. `L_pressure`: `economic_stress >= 2 AND protest_frequency >= 1`
4. `B_dominant`: default

## Phase Counts

- B_dominant: 10
- L_pressure: 18
- R_transition: 2
- S4_transition: 0

## Phase Counts by Country

### Iran
- B_dominant: 0
- L_pressure: 10
- R_transition: 0
- S4_transition: 0

### North Korea
- B_dominant: 10
- L_pressure: 0
- R_transition: 0
- S4_transition: 0

### Venezuela
- B_dominant: 0
- L_pressure: 8
- R_transition: 2
- S4_transition: 0

## Changed Labels

| id | country | year | original | phase_v1_1 |
|---|---:|---:|---|---|
| IRN-2016 | Iran | 2016 | B_dominant | L_pressure |
| IRN-2020 | Iran | 2020 | B_dominant | L_pressure |
| VEN-2016 | Venezuela | 2016 | L_pressure | R_transition |
| VEN-2019 | Venezuela | 2019 | L_pressure | R_transition |
| VEN-2020 | Venezuela | 2020 | B_dominant | L_pressure |
| VEN-2021 | Venezuela | 2021 | B_dominant | L_pressure |
| VEN-2022 | Venezuela | 2022 | B_dominant | L_pressure |
| VEN-2023 | Venezuela | 2023 | B_dominant | L_pressure |
| VEN-2025 | Venezuela | 2025 | B_dominant | L_pressure |

## Interpretation

Phase v1.1 is not designed as a final political judgment. It is a reproducible coordinate system for detecting pressure-feedback patterns and transition windows.