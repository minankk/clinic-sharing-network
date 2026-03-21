# Clinic Sharing Network

A prototype exploring incentive design for a B2B SaaS healthcare data-sharing network.

Built to resolve a prisoner's dilemma in a competitive clinic environment using a credit-based symmetric exchange model, behavioural nudges and a Blind-Match Protocol.

**Live demo:** [link here]

---

## The Problem

71% of clinics want to receive patient history. 19% are willing to share it.

This is not a feature problem. It is a prisoner's dilemma. No amount of UX polish or persuasion fixes a fundamental misalignment of incentives. The architectural goal is therefore simple: do not rely on altruism. Make sharing the strictly selfish, mathematically rational choice.

---

## Core Mechanic — Symmetric Exchange (Credit Model)

Access to the network is tokenised to eliminate the free-rider problem entirely.

- Earn 1 credit when a history you share is accessed by another clinic
- Spend 1 credit to pull a history from the network
- Credits expire after 90 days — enforces liquidity, prevents large clinics hoarding tokens to starve smaller competitors
- Opt out and you get nothing. Participate and your return is proportional to the quality of your clinical records

---

## Neutralising the Two Fears — Architecturally, Not Rhetorically

We cannot reassure clinics out of their fears. We have to architect the fears out of the system.

**Fear 1 — losing patients to competitors**

Solved via a Blind-Match Protocol. Patient history is only ever requested at the moment a patient has already booked at a new clinic. The previous clinic has not lost the patient by sharing — the patient was already gone. Sharing simply extracts a network credit from a lost customer. The fear is structurally impossible, not just unlikely.

**Fear 2 — peer judgement of clinical decisions**

The data model is strictly constrained to read-only summaries: diagnosis codes, treatment codes, dates. There is no annotation layer. Competitors cannot comment on or critique your clinical decisions because the system does not support it. This is a structural guarantee, not a policy promise.

---

## Onboarding Architecture — Behavioural Nudges

Four specific mechanisms drive activation:

**Social proof as baseline** — the landing screen immediately shows local adoption rate. This reframes opting out from the safe default to the conspicuous anomaly.

**Loss aversion framing** — the value proposition is not "access new histories." It is "you are currently missing context on 3 of your active patients." Loss aversion is roughly twice as powerful as equivalent gain framing.

**Frictionless proof** — before confirming, every clinic sees a literal preview of exactly what a competitor would see when accessing their shared history. Removing ambiguity builds trust faster than any policy document.

**Time-delay protocol for cautious clinics** — clinics concerned about sharing real-time data with local competitors can opt for a 14-day delay from the patient's last appointment before their record enters the network. This preserves network liquidity for the local patient journeys where cross-clinic history is most valuable, whilst addressing the legitimate fear of handing live patient data to a competitor around the corner.

---

## Scaling Gradient — 19% to 80%+

**Phase 1 — the hook:** Early adopters join to access immediate network value. Each clinic that joins makes the network marginally more valuable for the next.

**Phase 2 — the tipping point:** As local opt-in crosses roughly 40%, the asymmetry flips. Competitors are accessing clinical context the opted-out clinic is actively denied. The pain of missing out outweighs the activation energy of joining.

**Phase 3 — the default:** Past 70%, social proof handles the rest. Non-participation becomes a visible competitive disadvantage rather than a cautious default.

---

## Tradeoffs Made

**Credit expiry over permanence** — forces active participation, accepting that some clinics will dislike time pressure. Network liquidity matters more than individual comfort.

**Constrained read-only data model over comprehensive clinical notes** — reduced data depth ensures higher initial opt-in. A sparse network with 80% participation is more valuable than a rich network with 19%.

**Data symmetry over point-of-care consent** — the system relies on clinics' existing overarching patient privacy agreements to share records within the secure Kinetic network, rather than requiring a patient to actively consent at the point of booking. This removes a critical drop-off point in the activation flow and is consistent with how established healthcare data networks operate.

**Time-delay protocol over geographic blocking** — clinics concerned about sharing real-time data with local competitors can opt for a 14-day delay. This preserves network liquidity for local patient journeys whilst addressing the legitimate fear of handing live data to a competitor around the corner.

---

## What I Would Build Next

**Reputation layer** — clinics whose shared histories are frequently accessed and correlate with better patient outcomes earn a quality score. This creates a second-order incentive beyond credits: status and referral volume.

**Local leaderboard** — opt-in rate by postcode area creates the final social pressure needed to close the gap between 70% and 80%+. Makes non-participation visible at a hyperlocal level.

**Scope expansion nudges** — clinics that started with the 14-day time delay are prompted to reduce or remove it once they have accumulated credits and trust in the system.

---

## Tech Stack

- React + Vite
- CSS custom properties
- No external dependencies — kept intentionally lean to focus on system behaviour over polish

---

## Running Locally
```bash
npm install
npm run dev
```

Visit `http://localhost:5173`
