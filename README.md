# Clinic Sharing Network

A prototype exploring incentive design for a B2B SaaS healthcare data-sharing network.

Built to resolve a prisoner's dilemma in a competitive clinic environment using a credit-based symmetric exchange model, a zero-knowledge Blind-Match Protocol, and behavioural nudges grounded in loss aversion and social proof theory.

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

### Fear 1 — Losing patients to competitors

Most clinics assume the causal chain is: share data → competitor gains advantage → patient gets poached. This mental model is wrong because it assumes sharing happens before the patient leaves.

The Blind-Match Protocol flips the timing entirely. Patient history is only ever requested at the exact moment a patient has already booked at a new clinic. The sequence is:

1. Patient independently decides to leave and books at a competitor
2. Only at the moment of booking does the network query fire
3. Northside Physio's data is released and they earn a credit

The patient's decision to leave had nothing to do with the data sharing. They were already gone. Sharing simply extracts a credit from a customer already lost rather than getting nothing at all.

It is structurally impossible for sharing to cause patient loss — not merely unlikely.

### Fear 2 — Peer judgement of clinical decisions

This fear has two distinct layers that need to be addressed separately.

**Layer 1 — Reputational risk**

The read-only constraint does not eliminate silent judgement — a competitor physio can still form a private opinion about your clinical decisions. But the system makes those opinions consequentially irrelevant. A competitor who accesses your shared history cannot file a complaint based on what they see in Kinetic, share your notes outside the network, use your clinical decisions as evidence in any dispute, or prove they accessed your records since all access is anonymised. The data is structurally inadmissible as evidence of anything. Competitors may form private opinions but cannot act on them in any way that affects your reputation or practice.

**Layer 2 — Professional liability**

The constrained data payload — diagnosis codes, treatment summaries, dates — is factual clinical record, not clinical opinion. This is equivalent to what clinics already share routinely through NHS referral letters and standard clinical handover. Kinetic does not expose anything beyond what is already standard practice in healthcare record sharing. No new liability is created that does not already exist.

The system does not pretend other physios will not form opinions. It makes those opinions consequentially irrelevant.

---

## Zero-Knowledge Blind-Match Protocol

The network never broadcasts raw patient identifiers. Doing so would constitute a direct PHI leak and violate UK GDPR and the Data Protection Act 2018.

Instead, patient identifiers are hashed using SHA-256 before any network query is broadcast. SHA-256 is a one-way cryptographic function — the same input always produces the same output, but the output cannot be reversed to recover the input.

**The query sequence:**

1. A patient books at Harbour Physio. Their system hashes the patient identifier locally:
   `SHA-256("John Smith" + "1980-05-12") → a7d9f2c3b1e4...`

2. Only the hash is broadcast across the network:
   `"Does anyone have a record matching hash: a7d9f2c3b1e4...?"`
   The raw identifier is discarded from memory immediately. It is never transmitted.

3. Northside Physio independently hashes their own patient records. If the hashes match, they respond with a confirmation. No raw patient data is exchanged at this stage.

4. Only after match confirmation is the constrained read-only payload released — diagnosis code, treatment summary, dates. Nothing else. Northside earns a credit.

The querying clinic learns only that a match exists and receives the payload. The confirming clinic learns only that a query was made. Neither clinic ever sees the other's raw patient identifiers. The match happens cryptographically, not by sharing identifiable information.

---

## Onboarding Architecture — Behavioural Nudges

Four specific mechanisms drive activation:

**Loss aversion over gain framing**
The landing screen shows blurred, locked patient records with a padlock. The value proposition is not "access new histories." It is "you are currently missing context on 3 of your active patients." Loss aversion is roughly twice as powerful as equivalent gain framing. Showing the locked data visually makes the loss tangible rather than abstract.

**Social proof as baseline**
The landing screen immediately shows local adoption rate — 84% of clinics in your postcode area are sharing. This reframes opting out from the safe default to the conspicuous anomaly. Non-participation becomes the unusual choice.

**Radical simplification of configuration**
The onboarding flow presents exactly one configurable setting — time delay. The data payload is locked. Clinics cannot opt out of sharing diagnosis codes or treatment summaries because doing so would degrade network quality for everyone. Removing the choice removes the friction of making it.

**Frictionless proof before commitment**
Before confirming, every clinic sees a literal preview of exactly what a competitor would see when accessing their shared history. Removing ambiguity builds trust faster than any policy document or reassurance text.

---

## Time-Delay Protocol

Clinics concerned about sharing real-time data with local competitors can opt for a 14 or 30-day delay from the patient's last appointment before their record enters the network.

This replaces geographic blocking, which was considered and rejected. Geographic blocking would have prevented sharing with the clinics most likely to see the same patients — those in the same local area. This would have eliminated the core use case and earned zero credits for the cautious clinic, making opt-in economically irrational. The time delay preserves network liquidity for local patient journeys whilst addressing the legitimate fear of handing live data to a direct competitor.

---

## Scaling Gradient — 19% to 80%+

**Phase 1 — the hook**
Early adopters join to access immediate network value. The benefit is front-loaded — joining immediately unlocks histories for patients already in the network. Each clinic that joins makes the network marginally more valuable for the next.

**Phase 2 — the tipping point**
As local opt-in crosses roughly 40%, the asymmetry flips. Competitors are accessing clinical context the opted-out clinic is actively denied. The pain of missing out outweighs the activation energy of joining. The opted-out clinic is now at a clinical disadvantage, not just a data disadvantage.

**Phase 3 — the default**
Past 70%, social proof handles the rest. Non-participation becomes a visible competitive disadvantage. The default assumption shifts from "most clinics don't share" to "most clinics do — why doesn't yours?"

---

## Tradeoffs Made

**Credit expiry over permanence**
Forces active participation, accepting that some clinics will dislike time pressure. Network liquidity matters more than individual comfort. A network where credits are hoarded indefinitely stagnates — expiry keeps data flowing.

**Constrained read-only data model over comprehensive clinical notes**
Reduced data depth ensures higher initial opt-in. A sparse network with 80% participation is more valuable than a rich network with 19%. Depth can be added incrementally once trust is established. Breadth cannot be retrofitted once clinics have opted out.

**Data symmetry over point-of-care consent**
The system relies on clinics' existing overarching patient privacy agreements to share records within the secure Kinetic network, rather than requiring a patient to actively consent at the point of booking. This is consistent with how established healthcare data networks including NHS referral systems operate, and removes a critical drop-off point in the activation flow.

**Time-delay protocol over geographic blocking**
Geographic blocking would have killed network liquidity for the most valuable use case — local patients seeing multiple local physios. Time delay addresses the same fear without destroying the product's core value.

**One configurable setting over full user control**
Clinics cannot choose which data fields to share. This was a deliberate product decision — allowing clinics to exclude diagnosis codes or treatment summaries would fragment the data model and make the network unreliable for consuming clinics. Locked payload guarantees network quality. The tradeoff is less perceived control for individual clinics in exchange for a more trustworthy network for everyone.

---

## What I Would Build Next

**Network Logs terminal**
A real-time cryptographic audit log showing the SHA-256 hashing sequence as queries fire — making the zero-knowledge guarantee visible and auditable rather than theoretical.

**Fast-Forward simulation**
A time simulation showing credit expiry forcing liquidity across the network over 30, 60 and 90-day periods — demonstrating the second-order economic behaviour of the credit model dynamically rather than statically.

**Adversarial clinic view**
A toggle to view the network from a competitor's perspective — proving the system is fair under adversarial conditions and that the read-only constraint holds from both sides.

**Opt-out consequence flow**
Showing exactly what a clinic loses when they opt out — credits frozen, histories locked, a counter of histories accessed by competitors they can no longer see. Makes the cost of leaving visceral rather than theoretical.

**Reputation layer**
Clinics whose shared histories are frequently accessed and correlate with better patient outcomes earn a quality score — a second-order incentive beyond credits that drives referral volume independent of the history-sharing mechanic.

**Local leaderboard**
Opt-in rate by postcode area creates the final social pressure needed to close the gap between 70% and 80%+. Makes non-participation visible at a hyperlocal level.

---

## Tech Stack

- React + Vite
- Web Crypto API (SHA-256 — native browser, no external dependencies)
- CSS custom properties
- No external libraries — kept intentionally lean to focus on system behaviour over polish

---

## Running Locally
```bash
npm install
npm run dev
```

Visit `http://localhost:5173`
```
