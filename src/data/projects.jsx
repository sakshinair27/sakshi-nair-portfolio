// Single source of truth for all project content — used by both the homepage
// project list and the individual case-study pages. Edit here, everything
// that displays project data updates automatically.

const projects = [
  {
    slug: "juno-memory-assistant",
    number: "01",
    title: "Juno — Memory Assistant",
    subtitle: "A voice/chat assistant that treats memory as a correctness problem",
    category: "AI / Agentic Systems",
    description:
      "A LangGraph-orchestrated voice and chat assistant with long-term memory — atomic-fact extraction, pgvector conflict resolution, relevance-filtered retrieval, and an LLM-judge screen against prompt-injection memory poisoning.",
    cardSummary:
      "Built a long-term memory pipeline that stores atomic facts instead of raw transcripts, resolves conflicts with a pgvector similarity search plus an LLM judge (ADD/UPDATE/DELETE/NOOP), and screens every candidate fact for prompt-injection poisoning before it's ever written.",
    cardMetric: (
      <>
        <strong className="text-ink">9/10 contradictions resolved</strong>{" "}
        <span className="text-ink-soft">
          on a held-out set (0/10 for an append-only baseline), with a 44% latency cut from backgrounding memory writes.
        </span>
      </>
    ),
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "LangChain",
      "Claude Opus 5.5",
      "Claude Haiku 4.5",
      "PostgreSQL · pgvector",
      "React 19 · TypeScript",
      "Langfuse",
      "Docker",
    ],
    stackShort: ["LangGraph", "pgvector", "FastAPI", "React · TypeScript", "Langfuse"],
    problem:
      "Storing whole chat transcripts and re-retrieving them later is noisy and goes stale fast — and plain similarity search misses things like style preferences ('I prefer concise answers') because they aren't semantically close to the questions they should actually affect. Every write to memory is a correctness problem, not just a storage problem.",
    approach:
      "A LangGraph agent orchestrates extraction, storage, conflict resolution, and retrieval. Claude Haiku 4.5 pulls candidate facts from each message and scores them for durability, dropping transient states and questions. Similar stored facts are pulled from pgvector and a judge decides ADD, UPDATE, DELETE, or NOOP — with two fast paths (no similar facts → ADD; near-duplicates at cosine ≥ 0.985 → NOOP) skipping the LLM call entirely, so only the genuinely ambiguous middle band costs a judge call. Every change is logged to a memory_events audit table. The reply returns to the user first, with extraction and reconciliation running afterward on a background worker that preserves message order. Retrieval uses an absolute similarity floor plus a margin against the best hit, and a separate Haiku judge screens every candidate fact for prompt-injection memory poisoning (STORE vs. QUARANTINE) before anything reaches pgvector.",
    finding:
      "On a held-out set written after tuning and run once (to keep the number honest), Juno resolved 9/10 contradictions correctly versus 0/10 for an append-only baseline — the one failure was an extraction miss, not a conflict-resolution miss, and was left unfixed rather than patched to inflate the score. Backgrounding memory writes cut time-to-first-reply from 14.2s to 8.0s (44% faster). The poisoning screen blocked 14/14 plain attacks with 0 false positives, and raised the catch rate on attacks disguised as user preferences from 2/5 to 4/5 — though it has a known gap: an instruction to relay something to a third party slipped through, since the screening rules don't yet cover instructions about people other than the user.",
    metricValue: "9/10 held-out · 44% faster",
    metricLabel: "Contradiction resolution on a held-out set, and the latency cut from backgrounding memory writes.",
    role: "Solo — LangGraph orchestration, the extraction/conflict-resolution/retrieval pipeline, the poisoning screen, Langfuse tracing, and the eval suites.",
    repoUrl: "https://github.com/sakshinair27/juno-memory-assistant",
    demoUrl: null,
    stats: [
      { value: "9/10", label: "contradictions resolved on a held-out set — 0/10 for an append-only baseline" },
      { value: "44%", label: "faster time-to-first-reply after backgrounding memory writes (14.2s → 8.0s)" },
      { value: "14/14", label: "plain prompt-injection attacks blocked by the poisoning screen, 0 false positives" },
      { value: "4/5", label: "attacks disguised as preferences caught by the screen, up from 2/5 without it" },
    ],
    note: "The one held-out failure was an extraction miss, not a conflict-resolution miss — left unfixed rather than patched, to keep the number honest.",
  },
  {
    slug: "churn-prediction-mlops-platform",
    number: "02",
    title: "Churn Prediction MLOps Platform",
    subtitle: "The other 80% of the job: serving, deployment, and monitoring",
    category: "MLOps / Production ML",
    description:
      "A production-shaped churn classifier — MLflow tracking and model registry, FastAPI serving, Docker + Kubernetes with autoscaling, and Prometheus/Grafana monitoring with automated drift detection, trained on real IBM Telco churn data.",
    cardSummary:
      "Took a churn classifier past the notebook stage into a full production system: MLflow-tracked training runs, a FastAPI serving layer, Kubernetes deployment with autoscaling, and Evidently AI drift detection wired into CI so a bad retrain can't silently ship.",
    cardMetric: (
      <>
        <strong className="text-ink">79% recall</strong> <span className="text-ink-soft">at</span>{" "}
        <strong className="text-ink">F1 = 0.62</strong>{" "}
        <span className="text-ink-soft">
          — chosen over a higher-ROC-AUC run because catching more at-risk customers matters more than raw accuracy.
        </span>
      </>
    ),
    stack: ["Python", "scikit-learn", "MLflow", "FastAPI", "Docker", "Kubernetes", "Prometheus", "Grafana", "Evidently AI", "GitHub Actions"],
    stackShort: ["MLflow", "FastAPI", "Kubernetes", "Evidently AI"],
    problem:
      "Most entry-level ML portfolios stop at a notebook with an accuracy_score printed at the bottom. The actual job is what happens after the model works: how it gets served, deployed, scaled, and monitored once it's making real predictions.",
    approach:
      "Built the full lifecycle around a churn classifier trained on the real IBM Telco Customer Churn dataset (7,043 customers, 26.5% real churn rate): MLflow tracks every training run and registers the winning model to a Model Registry, a FastAPI service exposes /predict, /predict/batch, /health, and /metrics behind Pydantic schemas, Docker and Kubernetes (3 replicas, readiness/liveness probes, a HorizontalPodAutoscaler scaling 3–10 pods on CPU/memory) handle deployment, and a Prometheus/Grafana dashboard tracks prediction volume, latency, and error rate. A GitHub Actions pipeline runs training, 17 pytest checks, and a drift-detection gate on every change.",
    finding:
      "A 6-run MLflow hyperparameter sweep surfaced a real tradeoff: the highest-ROC-AUC runs (up to 0.84) only caught about 51% of actual churners, while using sample_weight to upweight the minority class (real class imbalance ≈3.5:1) traded some precision for 79% recall at F1 = 0.62 — deliberately promoted to Production in the Model Registry because a missed churner costs more than an unnecessary retention offer. Evidently AI's drift monitor flagged 6 of 15 features (40%) as drifted on a later traffic sample without triggering a full dataset-drift alert, and a CI-gated prediction-sanity test (0.91 vs. 0.065 probability on known high/low-risk samples) guards against a bad retrain silently shipping a directionally wrong model.",
    metricValue: "79% recall · F1 = 0.62",
    metricLabel: "Best MLflow-registered run by business cost, not by raw ROC-AUC (0.84 available, but only ~51% recall).",
    role: "Solo — training pipeline, MLflow registry, FastAPI serving layer, Kubernetes manifests, drift detection, and CI/CD.",
    repoUrl: "https://github.com/sakshinair27/churn-prediction-mlops-platform",
    demoUrl: null,
  },
  {
    slug: "marketpulse-ai",
    number: "03",
    title: "MarketPulse AI",
    subtitle: "Multi-agent competitive intelligence system",
    category: "AI / Agentic Systems",
    description:
      "A LangGraph multi-agent pipeline that researches a company watchlist, cross-verifies claims across two independent sources, and gates Slack alerts behind human approval.",
    cardSummary:
      "An autonomous LangGraph pipeline that researches a company watchlist on a schedule, verifies every claim against two independent sources, and halts on a real interrupt() checkpoint until a human approves the report by Slack or CLI.",
    cardMetric: (
      <>
        <strong className="text-ink">60% run success rate</strong>{" "}
        <span className="text-ink-soft">at</span>{" "}
        <strong className="text-ink">≈$0.0048/run</strong>{" "}
        <span className="text-ink-soft">
          — an isolated branch failure under a simulated API outage still produced a usable report.
        </span>
      </>
    ),
    stack: ["Python", "LangGraph", "GPT-4o / GPT-4o-mini", "Tavily API", "FastAPI", "Slack", "SQLite", "Docker", "GitHub Actions"],
    stackShort: ["LangGraph", "GPT-4o", "Tavily API", "FastAPI", "Docker"],
    problem:
      "Competitive-intelligence research on a company watchlist doesn't scale as a manual task, and a single-pass LLM summarizer risks shipping an unverified or hallucinated claim straight into an executive report with no human check before it goes out.",
    approach:
      "Orchestrated a LangGraph pipeline that decomposes a watchlist into per-company research queries with GPT-4o, fans out parallel research agents that search and summarize sources via the Tavily API using GPT-4o-mini (~12x cheaper than the planning model for high-volume, low-reasoning work), then runs a verification stage that only marks a claim verified once 2+ independent sources corroborate it — before GPT-4o synthesizes the final report. The graph halts on a genuine interrupt() checkpoint, persists state to SQLite, and waits for explicit human approval via Slack or CLI before anything sends by email, with retries (tenacity, exponential backoff) wrapping every external call.",
    finding:
      "Two things stood out once I started running this for real. First, LangGraph re-executes a paused node's function on resume, so the approval-stage Slack alert was firing twice per run — caught by comparing log timestamps across a resumed vs. fresh run, fixed by moving that side effect out of the resumable node into the once-only synthesis step, and locked in with a pytest suite (DEMO_MODE, deterministic fixtures, zero API cost) asserting delivery only happens after explicit approval and never after rejection. Second, under a simulated API outage, 1 of 3 parallel competitor research branches failed even after retries — but because failures are isolated per branch instead of aborting the whole graph, the other two completed and the run still produced a usable report.",
    metricValue: "60% success · $0.0048/run",
    metricLabel:
      "5 pipeline runs (3 successful, 1 human rejection, 1 graceful failure recovery) — ≈$1.04/month on a weekday schedule.",
    role: "Sole designer and builder — graph architecture, the two-source verification gate, the FastAPI approval webhook, CI via GitHub Actions, and the test suite.",
    repoUrl: "https://github.com/sakshinair27/marketpulse-ai",
    demoUrl: null,
  },
  {
    slug: "realtime-payments-analytics",
    number: "04",
    title: "Real-Time Payments Analytics",
    subtitle: "Kafka → Snowflake → dbt → a live dashboard, plus a real A/B test",
    category: "Data Engineering",
    description:
      "A streaming payments pipeline — Kafka ingestion, Snowflake (Snowpipe) or Postgres storage, dbt transformation, and a live Streamlit dashboard — built around a pre-registered A/B test on decline-retry strategies.",
    cardSummary:
      "Simulated card-payment traffic through Kafka into Snowflake (or Postgres locally), built per-minute dbt marts with dedup and reconciliation tests, and ran a pre-registered, hash-randomized A/B test comparing retry strategies for declined payments.",
    cardMetric: (
      <>
        <strong className="text-ink">+9.3pp recovery lift</strong>{" "}
        <span className="text-ink-soft">
          (28.9% → 38.2%, p = 0.0002) from smart backoff vs. immediate retry, with 23% fewer retries sent.
        </span>
      </>
    ),
    stack: ["Python", "Apache Kafka", "Snowflake · Snowpipe", "PostgreSQL", "dbt", "Streamlit", "Docker Compose", "Jupyter"],
    stackShort: ["Kafka", "Snowflake", "dbt", "Streamlit"],
    problem:
      "A payments team needs to watch approval rates, decline reasons, and processing lag as they happen — not after a nightly batch job — and needs to know, with statistical rigor rather than a gut call, whether a different retry strategy actually recovers more declined transactions.",
    approach:
      "A generator produces seeded synthetic transactions (~300/min) including duplicate sends, late-arriving events, and periodic processor outages, fed through a 3-partition Kafka topic into either Snowflake via Snowpipe or a local Postgres sink. dbt builds a deduplicated staging table and three per-minute marts (overall metrics, declines by reason, merchant category), tested for grain, accepted values, and reconciliation across warehouses. A Streamlit dashboard reads marts only, deliberately excluding the newest minute from trend lines since late events can still revise it. Alongside the pipeline, a notebook runs a pre-registered A/B test — sample size fixed in advance for 80% power, hash-based arm assignment, a two-proportion z-test, and sample-ratio-mismatch plus A/A checks — comparing immediate retry against a smart-backoff strategy for declined payments.",
    finding:
      "Smart backoff recovered 38.2% of declines (270/707) versus 28.9% for immediate retry (207/717) — a +9.3 percentage-point lift (95% CI +4.4 to +14.2, z = 3.73, p = 0.0002) — while sending 23% fewer retries overall. The pre-registration checks held up: sample-ratio mismatch p = 0.79, and the A/A false-positive rate sat at 5.2% across 2,000 simulated splits, in line with the 5% expected. The README is explicit that the transactions are simulated, so the result validates the analysis pipeline itself rather than claiming anything about real card issuers.",
    metricValue: "+9.3pp recovery · p = 0.0002",
    metricLabel: "Smart backoff vs. immediate retry on declined-payment recovery rate, pre-registered A/B test.",
    role: "Solo — pipeline architecture, Kafka/Snowpipe/dbt build, the Streamlit dashboard, and the A/B test design and analysis.",
    repoUrl: "https://github.com/sakshinair27/realtime-payments-analytics",
    demoUrl: null,
  },
  {
    slug: "commercelens",
    number: "05",
    title: "CommerceLens",
    subtitle: "E-commerce SQL data warehouse",
    category: "Data Engineering",
    description:
      "A production-grade PostgreSQL data warehouse with two independently verified ETL paths and a documented query-optimization case study cutting lookup latency 7×.",
    cardSummary:
      "Built a star-schema warehouse in PostgreSQL with two parallel ETL paths — hand-written SQL and dbt (20 models, 50 tests) — verified against each other by a harness that diffs row counts and checksums on every run.",
    cardMetric: (
      <>
        <strong className="text-ink">2.16ms → 0.31ms (7×)</strong>{" "}
        <span className="text-ink-soft">
          on a high-selectivity order lookup, via a targeted bitmap index proven with EXPLAIN ANALYZE.
        </span>
      </>
    ),
    stack: ["PostgreSQL", "PL/pgSQL", "dbt", "Docker", "Metabase"],
    stackShort: ["PostgreSQL", "dbt", "Docker", "Metabase"],
    problem:
      "An ETL pipeline that runs without errors isn't the same as one that's correct — a silent transformation bug can ship wrong numbers to a dashboard for weeks before anyone notices. I wanted a warehouse built on realistically messy data with a real way to prove the numbers are right.",
    approach:
      "Designed a star-schema warehouse in PostgreSQL and built two parallel ETL paths for the same data — a hand-written SQL pipeline and an equivalent dbt project (20 models, 50 schema tests) — loading 25,000 orders and 74,859 line items. Since a bug in either pipeline would surface as a silent mismatch rather than an error, I wrote a verification harness that diffs row counts and checksums between both outputs on every run.",
    finding:
      "I initially assumed indexing fact_returns would speed up a broad refund-by-state-and-reason report — it barely moved the needle, because Postgres correctly preferred a sequential scan across most of both tables for that query shape. The real payoff showed up on a high-selectivity single-order lookup (roughly 1-in-5,000 rows): a targeted bitmap index cut it from 2.16ms to 0.31ms (Seq Scan → Bitmap Index Scan), which I proved with an EXPLAIN ANALYZE case study rather than just assuming the index helped.",
    metricValue: "2.16ms → 0.31ms (7×)",
    metricLabel: "High-selectivity order lookup latency, proven via EXPLAIN ANALYZE.",
    role: "Solo — schema design, both ETL implementations, the row/checksum verification harness, and the Docker Compose deployment.",
    repoUrl: "https://github.com/sakshinair27/Commerce-Lens",
    demoUrl: null,
  },
  {
    slug: "northwind-retail-analytics",
    number: "06",
    title: "Northwind Retail Analytics",
    subtitle: "One data model, three BI tools, zero drift",
    category: "Business Intelligence",
    description:
      "A star-schema retail warehouse rebuilt as an identical analytics suite across Power BI, Looker, and Tableau, validated dashboard-by-dashboard against SQL ground truth.",
    cardSummary:
      "Designed a star-schema warehouse and rebuilt an identical 4-view analytics suite across Power BI, Looker, and Tableau — then validated every dashboard at the monthly grain against SQL ground truth.",
    cardMetric: (
      <>
        <strong className="text-ink">12/12 dashboards at exact parity</strong>{" "}
        <span className="text-ink-soft">
          after catching a timezone bug in Looker's date bucketing that silently shifted month-end orders.
        </span>
      </>
    ),
    stack: ["SQL", "PostgreSQL", "Power BI · DAX", "Looker · LookML", "Tableau"],
    stackShort: ["PostgreSQL", "Power BI · DAX", "Looker · LookML", "Tableau"],
    problem:
      "Most BI portfolios show one dashboard in one tool. Recruiters and teams need to know a candidate can reason about the underlying data model, not just one vendor's drag-and-drop interface — and that the same metric actually means the same thing no matter which tool renders it.",
    approach:
      "Designed a star-schema warehouse (1 fact + 5 dimension tables, 77K+ transaction records across 45,000 orders), then rebuilt an identical 4-view analytics suite across Power BI, Looker, and Tableau, authoring 15+ tool-specific measures in DAX, LookML, and calculated fields. Instead of trusting each tool's lifetime totals, I validated every published dashboard at the monthly grain directly against SQL ground-truth queries.",
    finding:
      "That validation step surfaced a real bug: Looker's dimension_group defaulted to UTC and silently shifted month-end orders into the following month — a mismatch Power BI and Tableau's naive date bucketing didn't share, so the three tools quietly disagreed. I traced it to the timezone mismatch and fixed it by aligning LookML's model timezone to the source data, re-validating until all three tools matched exactly.",
    metricValue: "12/12 dashboards at exact parity",
    metricLabel: "All 4 views × 3 BI tools matched SQL ground truth after the timezone fix.",
    role: "Solo — data modeling, warehouse build, and all three BI implementations (DAX, LookML, Tableau calculated fields).",
    repoUrl: "https://github.com/sakshinair27/Northwind-retail-analytics",
    demoUrl: null,
  },
  {
    slug: "ipl-match-prediction",
    number: "07",
    title: "IPL Match Outcome & Score Prediction",
    subtitle: "14 years of cricket data, three prediction targets",
    category: "Machine Learning",
    description:
      "Regression and classification models predicting IPL match outcomes and team scores from 14 years of ball-by-ball and match-level data.",
    cardSummary:
      "Combined 14 years of ball-by-ball IPL data with match-level context and trained three model families — Random Forest, Logistic Regression, and XGBoost — to isolate which factors actually predict victory versus which are popularly assumed to.",
    cardMetric: (
      <>
        <strong className="text-ink">75% win/loss accuracy</strong> <span className="text-ink-soft">·</span>{" "}
        <strong className="text-ink">R² = 0.92</strong>{" "}
        <span className="text-ink-soft">on team-score prediction (RMSE ≈ 8.77).</span>
      </>
    ),
    stack: ["Python", "Pandas", "Scikit-learn", "XGBoost", "Matplotlib", "Seaborn"],
    stackShort: ["Python", "Pandas", "Scikit-learn", "XGBoost"],
    problem:
      "Sports outcome data is noisy and high-variance by nature — the interesting question isn't just 'can a model predict the winner' but which factors actually carry predictive signal versus which are popularly assumed to (like toss result or venue).",
    approach:
      "Combined 14 years of IPL ball-by-ball events (2008–2022) with match-level context and trained three separate model families for three targets: a Random Forest Regressor for team total runs, Logistic Regression for match win/loss, and an XGBoost Classifier for predicting wins from player statistics — comparing them against a venue-only baseline to isolate how much signal location alone provides.",
    finding:
      "Strike rate, boundaries, and run rate turned out to be the strongest predictors of victory — while toss result, popularly treated as a meaningful edge, showed close to none. Venue alone explained only 38% of outcomes, confirming that contextual, in-game factors dominate over fixed conditions like ground or team history.",
    metricValue: "75% accuracy · R² = 0.92",
    metricLabel: "Logistic Regression win/loss accuracy; Random Forest R² on team-score prediction (RMSE ≈ 8.77).",
    role: "Solo — data cleaning, feature engineering, and all three modeling pipelines.",
    repoUrl: "https://github.com/sakshinair27/-IPL-Match-Outcome-Prediction",
    demoUrl: null,
  },
  {
    slug: "syn-flood-detection",
    number: "08",
    title: "SYN Flood Attack Detection",
    subtitle: "Lightweight, host-based intrusion detection",
    category: "Systems / Security",
    description:
      "A rule-based host intrusion detection system that identifies SYN flood attacks in real time from raw TCP handshake analysis — no ML, no enterprise tooling required.",
    cardSummary:
      "Built a rule-based detection engine analyzing raw TCP handshake behavior to catch single-source and distributed SYN floods in real time — no ML, no enterprise tooling required.",
    cardMetric: (
      <>
        <strong className="text-ink">1–3s detection</strong> <span className="text-ink-soft">at up to 3,000 packets/sec,</span>{" "}
        <strong className="text-ink">0% false positives</strong>
        <span className="text-ink-soft">, under 10% CPU.</span>
      </>
    ),
    stack: ["Python", "Bash", "Scapy", "tcpdump", "Wireshark"],
    stackShort: ["Python", "Bash", "Scapy", "tcpdump"],
    problem:
      "Enterprise DDoS protection tools are expensive and often overkill for a single host that just needs to know, in real time, when it's under a SYN flood — without the false-positive noise that makes teams start ignoring alerts.",
    approach:
      "Built a rule-based detection engine analyzing raw TCP handshake behavior (SYN sent vs. SYN-ACK completed ratios) captured via tcpdump/Scapy, tuned against both live traffic and offline packet captures to distinguish single-source and distributed attack patterns from normal traffic bursts, without relying on machine learning.",
    finding:
      "Rule-based detection on raw handshake state was enough to catch both single-source and distributed SYN floods at meaningful attack volumes, while keeping CPU overhead low enough to run continuously on the host it's protecting — validated against normal traffic to confirm the rules don't fire on legitimate load.",
    metricValue: "1–3s detection · 0% false positives",
    metricLabel: "Detected up to 3,000 SYN packets/sec while keeping CPU usage under 10%.",
    role: "Solo — detection engine, packet-capture tooling, and the final methodology report.",
    repoUrl: "https://github.com/sakshinair27/-SYN-Flood-Attack-Detection",
    demoUrl: null,
  },
  {
    slug: "employee-tracker-dashboard",
    number: "09",
    title: "Employee Tracker & Analytics Dashboard",
    subtitle: "Full-stack HR analytics, replacing manual Excel",
    category: "Full-Stack / BI",
    description:
      "A Flask + PostgreSQL HR analytics system with role-based access and six interactive dashboards, built to replace a manual Excel-based HR workflow.",
    cardSummary:
      "Designed a normalized 5-table schema and built a Flask app on top of it with role-based access control and six interactive dashboards covering headcount, demographics, and compensation.",
    cardMetric: (
      <>
        <strong className="text-ink">6 dashboards</strong> <span className="text-ink-soft">·</span>{" "}
        <strong className="text-ink">5 normalized tables</strong>{" "}
        <span className="text-ink-soft">with query-layer role enforcement, not just UI hiding.</span>
      </>
    ),
    stack: ["Python · Flask", "PostgreSQL", "HTML/CSS/JS", "Google Charts"],
    stackShort: ["Flask", "PostgreSQL", "Google Charts"],
    problem:
      "HR teams tracking headcount, compensation, and demographics in spreadsheets hit the same wall every quarter: manual pivot tables that don't scale, no access control, and no single source of truth for reporting.",
    approach:
      "Designed a normalized 5-table relational schema (user profiles, role/access mapping, and employee records) and built a Flask application on top of it with role-based access control separating Admin and general User views, plus six interactive Google Charts dashboards covering marital status, gender ratio, employment type, grade levels, designations, and department-vs-compensation, all filterable by quarter or full year.",
    finding:
      "Team project for Indiana University's Applied Database Technologies course — the design constraint that shaped the schema most was making sure role permissions were enforced at the query layer (via the rolemenu mapping table), not just hidden in the UI, so a user without access genuinely can't reach that data.",
    metricValue: "6 dashboards · 5 normalized tables",
    metricLabel: "Real-time SQL-backed reporting with role-based admin/user access control.",
    role: "Backend schema design, Flask routing/MVC architecture, and role-based access control (team project).",
    repoUrl: "https://github.com/sakshinair27/Employee-Tracker-Analytics-Dashboard",
    demoUrl: null,
  },
  {
    slug: "food-delivery-eda",
    number: "10",
    title: "Food Delivery EDA & Regression",
    subtitle: "What actually predicts delivery time",
    category: "Statistics",
    description:
      "Exploratory data analysis and regression modeling of 1,000 food deliveries in R, isolating which factors genuinely drive delivery time.",
    cardSummary:
      "Ran EDA and regression modeling across 1,000 deliveries in R, comparing standard linear regression against robust regression and LOESS smoothing to isolate which factors genuinely drive delivery time.",
    cardMetric: (
      <>
        <strong className="text-ink">45% RMSE improvement</strong>{" "}
        <span className="text-ink-soft">(10.4 min → 5.74 min) by switching to robust regression; R² = 0.78 overall.</span>
      </>
    ),
    stack: ["R", "tidyverse", "ggplot2", "MASS"],
    stackShort: ["R", "tidyverse", "ggplot2", "MASS"],
    problem:
      "Delivery-time delays get blamed on whatever's most visible — traffic, weather, a slow courier — but without statistical testing it's guesswork which factors actually move the number and by how much.",
    approach:
      "Ran exploratory data analysis across 1,000 deliveries, then fit and compared standard multiple linear regression against robust regression and LOESS smoothing to handle outliers in the data, testing distance, preparation time, weather, traffic, courier experience, and vehicle type as candidate predictors.",
    finding:
      "A standard linear model was thrown off by outliers (RMSE ≈ 10.4 minutes); switching to robust regression cut that to 5.74 minutes — a 45% improvement — and revealed that distance was by far the strongest predictor (r = 0.78, ~2.8 minutes added per km), while courier experience and vehicle type had negligible effect once distance and prep time were accounted for.",
    metricValue: "45% RMSE improvement",
    metricLabel: "10.4 min → 5.74 min by switching to robust regression; R² = 0.78 overall.",
    role: "Solo — EDA, regression modeling, and residual diagnostics.",
    repoUrl: "https://github.com/sakshinair27/Food-Delivery-EDA-Regression",
    demoUrl: null,
  },
];

export default projects;

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
