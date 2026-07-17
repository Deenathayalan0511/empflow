import { useEffect, useState } from "react";
import axios from "axios";

function AIReportPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/ai/report");

      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>

        <h4 className="mt-3">🤖 AI is analyzing your workforce...</h4>
      </div>
    );
  }

  if (!data) return null;

  const report = data.report;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-robot text-primary me-2"></i>
        AI Workforce Analytics
      </h2>

      {/* Health Score */}

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h4>
              <i className="bi bi-heart-pulse-fill text-success me-2"></i>
              Workforce Health Score
            </h4>

            <span className="badge bg-success fs-6">{report.healthStatus}</span>
          </div>

          <h1 className="display-3 fw-bold">{report.healthScore} %</h1>

          <div className="progress" style={{ height: "12px" }}>
            <div
              className="progress-bar bg-success"
              style={{ width: `${report.healthScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Executive */}

        <div className="col-lg-6 mb-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="text-primary">
                <i className="bi bi-clipboard-data me-2"></i>
                Executive Summary
              </h4>

              <ul className="mt-3">
                {report.executiveSummary.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Insights */}

        <div className="col-lg-6 mb-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="text-success">
                <i className="bi bi-bar-chart-line-fill me-2"></i>
                Key Insights
              </h4>

              <ul className="mt-3">
                {report.keyInsights.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Risks */}

        <div className="col-lg-6 mb-4">
          <div className="card shadow h-100 border-danger">
            <div className="card-body">
              <h4 className="text-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Risks
              </h4>

              <ul className="mt-3">
                {report.risks.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendation */}

        <div className="col-lg-6 mb-4">
          <div className="card shadow h-100 border-success">
            <div className="card-body">
              <h4 className="text-success">
                <i className="bi bi-lightbulb-fill me-2"></i>
                Recommendations
              </h4>

              <ul className="mt-3">
                {report.recommendations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="card shadow">
        <div className="card-body d-flex justify-content-between">
          <div>
            <i className="bi bi-clock-history me-2 text-secondary"></i>
            Last Generated
          </div>

          <strong>{data.generatedAtDisplay}</strong>
        </div>
      </div>
    </div>
  );
}

export default AIReportPage;
