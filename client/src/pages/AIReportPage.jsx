import { useEffect, useState } from "react";

import api from "../services/api";

const getAIReport = async () => {
  return await api.get("/ai/report");
};

function AIReportPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const res = await getAIReport();

      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!data && loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            style={{
              width: "4rem",
              height: "4rem",
            }}
          ></div>

          <h4 className="mt-4 fw-bold">🤖 AI is analyzing your workforce...</h4>

          <p className="text-muted">
            Please wait while Gemini AI generates your report.
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const report = data.report;

  return (
    <div className="container-fluid py-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold text-primary">
            <i className="bi bi-robot me-2"></i>
            AI Workforce Analytics
          </h2>

          <p className="text-muted mb-0">
            AI-powered workforce insights and recommendations
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={fetchReport}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Generating...
            </>
          ) : (
            <>
              <i className="bi bi-arrow-repeat me-2"></i>
              Regenerate Report
            </>
          )}
        </button>
      </div>

      {/* Health Score */}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">
              <i className="bi bi-heart-pulse-fill text-success me-2"></i>
              Workforce Health Score
            </h4>

            <span
              className={`badge fs-6 ${
                report.healthScore >= 80
                  ? "bg-success"
                  : report.healthScore >= 60
                    ? "bg-warning text-dark"
                    : "bg-danger"
              }`}
            >
              {report.healthStatus}
            </span>
          </div>

          <h1 className="display-2 fw-bold text-success">
            {report.healthScore}%
          </h1>

          <div
            className="progress mt-3"
            style={{
              height: "15px",
              borderRadius: "30px",
            }}
          >
            <div
              className={`progress-bar ${
                report.healthScore >= 80
                  ? "bg-success"
                  : report.healthScore >= 60
                    ? "bg-warning"
                    : "bg-danger"
              }`}
              style={{
                width: `${report.healthScore}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Executive Summary */}

        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h4 className="text-primary fw-bold">
                <i className="bi bi-clipboard-data me-2"></i>
                Executive Summary
              </h4>

              <ul className="list-group list-group-flush mt-3">
                {report.executiveSummary.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Key Insights */}

        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h4 className="text-success fw-bold">
                <i className="bi bi-bar-chart-line-fill me-2"></i>
                Key Insights
              </h4>

              <ul className="list-group list-group-flush mt-3">
                {report.keyInsights.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Risks */}

        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0 border-start border-5 border-danger h-100">
            <div className="card-body">
              <h4 className="text-danger fw-bold">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Risks
              </h4>

              <ul className="list-group list-group-flush mt-3">
                {report.risks.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendations */}

        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0 border-start border-5 border-success h-100">
            <div className="card-body">
              <h4 className="text-success fw-bold">
                <i className="bi bi-lightbulb-fill me-2"></i>
                Recommendations
              </h4>

              <ul className="list-group list-group-flush mt-3">
                {report.recommendations.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="card shadow-sm border-0">
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
          <div className="fw-semibold">
            <i className="bi bi-clock-history me-2 text-secondary"></i>
            Last Generated
          </div>

          <span className="badge bg-primary fs-6">
            {data.generatedAtDisplay}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AIReportPage;
