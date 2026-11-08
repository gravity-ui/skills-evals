# Results

pass@k over the latest run of every experiment (`runs` per eval, all counted — no early exit). Runs that hit the
harness timeout, a gateway limit or whose runner was killed are excluded from the rate and shown as `+n t/o`.

## claude-subscription--claude-code

| Model | Baseline | + gravity-ui skill | Δ | Mean eval time (base → skill) |
| --- | --- | --- | --- | --- |
| claude-fable-5-1 | 68% (46/68) | 96% (65/68) | 28 pp | 928s → 779s |
| claude-opus-5-5 | 72% (49/68) | 94% (64/68) | 22 pp | 677s → 677s |
| claude-sonnet-5-5 | 65% (44/68) | 99% (67/68) | 34 pp | 508s → 562s |

## codex-subscription--codex

| Model | Baseline | + gravity-ui skill | Δ | Mean eval time (base → skill) |
| --- | --- | --- | --- | --- |
| gpt-6-astra | 28% (19/68) | 91% (62/68) | 63 pp | 1306s → 723s |
| gpt-6-luna | 15% (10/68) | 85% (58/68) | 70 pp | 973s → 646s |
| gpt-6.1-sol | 25% (17/68) | 85% (58/68) | 60 pp | 1228s → 793s |

## opencode-go--claude-code

| Model | Baseline | + gravity-ui skill | Δ | Mean eval time (base → skill) |
| --- | --- | --- | --- | --- |
| claude-haiku-5-5 | 66% (45/68) | 88% (60/68) | 22 pp | 543s → 390s |
| kimi-k3 | 50% (34/68) | 79% (54/68) | 29 pp | 546s → 498s |

## opencode-go--codex

| Model | Baseline | + gravity-ui skill | Δ | Mean eval time (base → skill) |
| --- | --- | --- | --- | --- |
| deepseek-v4-pro | 56% (38/68) | 88% (60/68) | 32 pp | 468s → 542s |
| glm-5.3-flash | 48% (32/67) +1 t/o | 85% (58/68) | 37 pp | 428s → 486s |
