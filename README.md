<div align="center">

# 🛡️ DataRivQ

### Data Reliability & Quality Monitoring Platform

**A Django-based data reliability platform for ingesting, validating, monitoring, and diagnosing data pipelines.**

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge\&logo=github)](https://github.com/chauhan-prachi/DataRivQ)

</div>

---

## 📌 Overview

**DataRivQ** is a data reliability platform built with **Python, Django, PostgreSQL, and Pandas**.

It processes datasets through an end-to-end reliability workflow:

```text
Data Source
     ↓
Ingestion
     ↓
Profiling & Schema Detection
     ↓
Quality Checks
     ↓
Schema Drift + Anomaly Detection
     ↓
Pipeline Run
     ↓
Reliability Score
     ↓
RCA + Alerts
     ↓
Observability Dashboard
```

The project focuses on detecting data problems early and turning failures into structured, explainable reliability signals.

## ✨ Key Features

| Feature                        | Description                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------- |
| 📥 **Multi-Format Ingestion**  | CSV, JSON, Excel, Parquet, TSV, XML, PostgreSQL, and remote CSV                 |
| 🔍 **Dataset Profiling**       | Row counts, data types, nulls, uniqueness, and duplicates                       |
| 🧠 **Schema Detection**        | Identifies identifiers, emails, numerics, dates, booleans, and categorical data |
| ⚙️ **Automatic Rules**         | Suggests quality checks based on detected column characteristics                |
| ✅ **Data Quality Engine**      | NOT NULL, UNIQUE, EMAIL, DATE, NUMERIC, RANGE, and DUPLICATE checks             |
| 🔄 **Schema Drift**            | Detects added, removed, and changed columns or data types                       |
| 📊 **Anomaly Detection**       | Monitors row counts, null rates, and numeric mean changes                       |
| 🚀 **Pipeline Execution**      | Coordinates ingestion, validation, detection, and persistence                   |
| 📈 **Reliability Scoring**     | Combines quality, schema, anomaly, and pipeline signals                         |
| 🔎 **Automated RCA**           | Produces structured findings, evidence, impact, and recommendations             |
| 🚨 **Alerts**                  | Detects quality failures, anomalies, schema drift, and pipeline failures        |
| 📊 **Observability Dashboard** | Tracks reliability, quality trends, incidents, and pipeline history             |

## 🧪 Data Quality Engine

Current validation checks:

```text
NOT_NULL
UNIQUE
VALID_EMAIL
VALID_DATE
NUMERIC_VALIDITY
RANGE
DUPLICATE
```

Each check produces structured results:

```text
Check
├── PASS / FAIL
├── Rows Checked
├── Rows Passed
├── Rows Failed
└── Diagnostic Details
```

## 📊 Reliability Engine

DataRivQ calculates pipeline reliability using multiple signals:

```text
Quality Score      → 50%
Schema Stability   → 20%
Anomaly Health     → 20%
Pipeline Status    → 10%
```

The resulting score is converted into a reliability grade:

| Grade |        Score |
| ----- | -----------: |
| A     | 90 and above |
| B     |        80–89 |
| C     |        70–79 |
| D     |        60–69 |
| F     |     Below 60 |

The scoring model is designed to be transparent and deterministic in v1.

## 🔎 Automated Root Cause Analysis

When reliability problems occur, DataRivQ analyzes signals from:

* Quality failures
* Schema drift
* Data anomalies
* Pipeline failures

It produces structured findings containing:

```text
Severity
Root Cause
Evidence
Impact
Recommendation
```

The current RCA engine is rule-based, providing a foundation for future ML/LLM-assisted investigation.

## 🏗️ Architecture

```text
                         DataRivQ
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          Ingestion      Profiling    PostgreSQL
              │             │
              └──────┬──────┘
                     ▼
                Quality Engine
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Quality     Schema     Anomaly
       Checks      Drift     Detection
          │          │          │
          └──────────┼──────────┘
                     ▼
                Pipeline Run
                     │
              ┌──────┼──────┐
              ▼      ▼      ▼
            Score   RCA   Alerts
              │
              ▼
          Dashboard
```

## 🛠️ Technology Stack

| Category               | Technologies                    |
| ---------------------- | ------------------------------- |
| **Backend**            | Python, Django                  |
| **Database**           | PostgreSQL, psycopg             |
| **Data Processing**    | Pandas, NumPy, PyArrow          |
| **File Processing**    | OpenPyXL, lxml                  |
| **Frontend**           | HTML, CSS, JavaScript, Chart.js |
| **Application Server** | Gunicorn                        |
| **Static Files**       | WhiteNoise                      |
| **Development**        | Git, GitHub, VS Code            |

## 📁 Project Structure

```text
DataRivQ/
│
├── accounts/
├── config/
├── core/
│   ├── models.py
│   ├── views.py
│   └── services/
│       ├── pipeline.py
│       ├── ingestion/
│       ├── quality/
│       ├── schema/
│       ├── anomaly/
│       ├── reliability/
│       ├── rca/
│       └── alerts/
│
├── templates/
├── static/
├── data/
├── manage.py
├── requirements.txt
└── README.md
```

## ⚙️ Run Locally

Clone the repository:

```powershell
git clone https://github.com/chauhan-prachi/DataRivQ.git
cd DataRivQ
```

Create and activate a virtual environment:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
python -m pip install -r requirements.txt
```

Configure your environment variables, including the appropriate PostgreSQL connection settings and Django secret key.

Apply migrations and start the development server:

```powershell
python manage.py migrate
python manage.py runserver
```

Open the application at:

http://127.0.0.1:8000/

**Security:** Never commit `.env` files, database credentials, API keys, or OAuth secrets.

## ✅ Verification

Run the following checks:

```powershell
python manage.py check
python manage.py makemigrations --check
python manage.py test
```

Use the results from your current environment to document the project's actual verification status.

## 🚀 Roadmap

* [ ] Historical anomaly baselines
* [ ] Semantic data drift detection
* [ ] Advanced statistical and ML-based anomaly detection
* [ ] Incident correlation
* [ ] Data lineage
* [ ] Airflow orchestration
* [ ] PySpark large-scale processing
* [ ] Cloud data sources
* [ ] ML/LLM-assisted root cause analysis
* [ ] Production-grade alert routing

## 👩‍💻 About

**Prachi Chauhan**

MCA | Python | SQL | Data Engineering | Backend Development | Data Reliability

DataRivQ is a practical exploration of data engineering, data quality, pipeline observability, and reliable data systems.

[![GitHub Profile](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge\&logo=github)](https://github.com/chauhan-prachi)
[![LinkedIn Profile](https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=for-the-badge\&logo=linkedin)](https://www.linkedin.com/in/prachi-chauhan-79a446226)
