# Results

pass@k over the latest run of every experiment (`runs` per eval, all counted — no early exit). Runs that hit the
harness timeout, a gateway limit or whose runner was killed are excluded from the rate and shown as `+n t/o`.

## claude-subscription--claude-code

| Model | Baseline | + gravity-ui skill | Δ | Mean eval time (base → skill) |
| --- | --- | --- | --- | --- |
| claude-fable-5-1 | 69% (50/72) | 96% (69/72) | 27 pp | 891s → 750s |
| claude-opus-5-5 | 74% (53/72) | 94% (68/72) | 20 pp | 656s → 654s |
| claude-sonnet-5-5 | 67% (48/72) | 99% (71/72) | 32 pp | 490s → 542s |

## codex-subscription--codex

| Model | Baseline | + gravity-ui skill | Δ | Mean eval time (base → skill) |
| --- | --- | --- | --- | --- |
| gpt-6-astra | 32% (23/72) | 92% (66/72) | 60 pp | 1265s → 700s |
| gpt-6-luna | 15% (11/72) | 86% (62/72) | 71 pp | 939s → 629s |
| gpt-6.1-sol | 29% (21/72) | 86% (62/72) | 57 pp | 1196s → 775s |

## opencode-go--claude-code

| Model | Baseline | + gravity-ui skill | Δ | Mean eval time (base → skill) |
| --- | --- | --- | --- | --- |
| claude-haiku-5-5 | 68% (49/72) | 89% (64/72) | 21 pp | 540s → 381s |
| kimi-k3 | 51% (37/72) | 79% (57/72) | 28 pp | 548s → 483s |

## opencode-go--codex

| Model | Baseline | + gravity-ui skill | Δ | Mean eval time (base → skill) |
| --- | --- | --- | --- | --- |
| deepseek-v4-pro | 53% (38/72) | 89% (64/72) | 36 pp | 456s → 528s |
| glm-5.3-flash | 45% (32/71) +1 t/o | 81% (58/72) | 36 pp | 417s → 470s |
