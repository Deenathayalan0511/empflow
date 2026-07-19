import { Container, Row, Col, Card } from "react-bootstrap";

function Home() {
  return (
    <Container fluid className="py-4">

      {/* Hero Section */}

      <div
        className="rounded-4 shadow-lg text-white p-5 mb-5"
        style={{
          background:
            "linear-gradient(135deg, #0d6efd 0%, #4f46e5 100%)",
        }}
      >
        <Row className="align-items-center">

          <Col lg={7}>

            <h1
              className="fw-bold display-4 mb-4"
              style={{ lineHeight: "1.2" }}
            >
              HR Analytics Platform
            </h1>

            <p
              className="lead"
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.8",
              }}
            >
              Manage employee records, monitor workforce
              analytics, and generate AI-powered HR insights
              through a secure and modern web platform.
            </p>

          </Col>

          <Col
            lg={5}
            className="text-center mt-4 mt-lg-0"
          >

            <i
              className="bi bi-people-fill"
              style={{
                fontSize: "180px",
                opacity: 0.2,
              }}
            ></i>

          </Col>

        </Row>
      </div>

      {/* Welcome */}

      <Card className="border-0 shadow-sm mb-5">

        <Card.Body className="p-4">

          <h2 className="fw-bold text-primary mb-3">

            <i className="bi bi-house-heart-fill me-2"></i>

            Welcome

          </h2>

          <p
            className="text-secondary mb-0"
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.9",
            }}
          >
            HR Analytics Platform is designed to simplify
            employee management by combining workforce
            analytics, artificial intelligence, and secure
            employee record management into one centralized
            platform.

            Using interactive dashboards and AI-generated
            insights, organizations can make informed HR
            decisions while efficiently managing employee
            information.
          </p>

        </Card.Body>

      </Card>
            {/* About Platform */}

      <div className="mb-5">

        <h2 className="fw-bold text-center text-primary mb-4">
          <i className="bi bi-info-circle-fill me-2"></i>
          About the Platform
        </h2>

        <p
          className="text-center text-secondary mx-auto"
          style={{
            maxWidth: "900px",
            lineHeight: "1.9",
            fontSize: "1.05rem",
          }}
        >
          HR Analytics Platform is a modern workforce management
          solution that helps organizations securely maintain
          employee information, visualize workforce analytics,
          and generate AI-powered insights for smarter HR
          decision-making. The platform combines employee
          management, analytics, and artificial intelligence
          into one seamless application.
        </p>

      </div>

      {/* Core Features */}

      <div className="mb-5">

        <h2 className="fw-bold text-center text-primary mb-4">
          <i className="bi bi-grid-3x3-gap-fill me-2"></i>
          Core Features
        </h2>

        <Row className="g-4">

          {/* Employee Management */}

          <Col lg={4} md={6}>
            <Card className="h-100 shadow-sm border-0">

              <Card.Body className="text-center p-4">

                <i
                  className="bi bi-people-fill text-primary"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h4 className="mt-3 fw-bold">
                  Employee Management
                </h4>

                <p className="text-muted mt-3">
                  Easily add, edit, update and delete employee
                  records with a clean and user-friendly
                  interface.
                </p>

              </Card.Body>

            </Card>
          </Col>

          {/* Dashboard */}

          <Col lg={4} md={6}>
            <Card className="h-100 shadow-sm border-0">

              <Card.Body className="text-center p-4">

                <i
                  className="bi bi-bar-chart-fill text-success"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h4 className="mt-3 fw-bold">
                  Analytics Dashboard
                </h4>

                <p className="text-muted mt-3">
                  Visualize workforce statistics through
                  interactive charts, reports and department
                  analytics.
                </p>

              </Card.Body>

            </Card>
          </Col>

          {/* AI */}

          <Col lg={4} md={6}>
            <Card className="h-100 shadow-sm border-0">

              <Card.Body className="text-center p-4">

                <i
                  className="bi bi-robot text-danger"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h4 className="mt-3 fw-bold">
                  AI Workforce Report
                </h4>

                <p className="text-muted mt-3">
                  Generate AI-powered executive summaries,
                  insights, risks and recommendations using
                  Google Gemini AI.
                </p>

              </Card.Body>

            </Card>
          </Col>

          {/* Search */}

          <Col lg={4} md={6}>
            <Card className="h-100 shadow-sm border-0">

              <Card.Body className="text-center p-4">

                <i
                  className="bi bi-search text-warning"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h4 className="mt-3 fw-bold">
                  Smart Search
                </h4>

                <p className="text-muted mt-3">
                  Quickly search and filter employee records
                  using department, gender and other criteria.
                </p>

              </Card.Body>

            </Card>
          </Col>

          {/* Profile */}

          <Col lg={4} md={6}>
            <Card className="h-100 shadow-sm border-0">

              <Card.Body className="text-center p-4">

                <i
                  className="bi bi-person-badge-fill text-info"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h4 className="mt-3 fw-bold">
                  Employee Profiles
                </h4>

                <p className="text-muted mt-3">
                  Upload employee profile photos and maintain
                  complete employee information securely.
                </p>

              </Card.Body>

            </Card>
          </Col>

          {/* Security */}

          <Col lg={4} md={6}>
            <Card className="h-100 shadow-sm border-0">

              <Card.Body className="text-center p-4">

                <i
                  className="bi bi-shield-lock-fill text-secondary"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h4 className="mt-3 fw-bold">
                  Secure Authentication
                </h4>

                <p className="text-muted mt-3">
                  Protect user data with JWT-based authentication
                  and secure access control for every account.
                </p>

              </Card.Body>

            </Card>
          </Col>

        </Row>

      </div>
            {/* Technology Stack */}

      <div className="mb-5">

        <h2 className="fw-bold text-center text-primary mb-4">
          <i className="bi bi-cpu-fill me-2"></i>
          Technology Stack
        </h2>

        <Row className="g-4 justify-content-center">

          <Col lg={2} md={4} sm={6}>
            <Card className="border-0 shadow-sm h-100 text-center">
              <Card.Body>
                <i
                  className="bi bi-filetype-js text-warning"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h5 className="mt-3 fw-bold">React</h5>

                <p className="text-muted mb-0">
                  Frontend
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={2} md={4} sm={6}>
            <Card className="border-0 shadow-sm h-100 text-center">
              <Card.Body>
                <i
                  className="bi bi-hdd-network-fill text-success"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h5 className="mt-3 fw-bold">
                  Node.js
                </h5>

                <p className="text-muted mb-0">
                  Runtime
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={2} md={4} sm={6}>
            <Card className="border-0 shadow-sm h-100 text-center">
              <Card.Body>
                <i
                  className="bi bi-diagram-3-fill text-primary"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h5 className="mt-3 fw-bold">
                  Express
                </h5>

                <p className="text-muted mb-0">
                  Backend
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={2} md={4} sm={6}>
            <Card className="border-0 shadow-sm h-100 text-center">
              <Card.Body>
                <i
                  className="bi bi-database-fill text-danger"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h5 className="mt-3 fw-bold">
                  MySQL
                </h5>

                <p className="text-muted mb-0">
                  Database
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={2} md={4} sm={6}>
            <Card className="border-0 shadow-sm h-100 text-center">
              <Card.Body>
                <i
                  className="bi bi-shield-lock-fill text-dark"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h5 className="mt-3 fw-bold">
                  JWT
                </h5>

                <p className="text-muted mb-0">
                  Security
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={2} md={4} sm={6}>
            <Card className="border-0 shadow-sm h-100 text-center">
              <Card.Body>
                <i
                  className="bi bi-robot text-info"
                  style={{ fontSize: "3rem" }}
                ></i>

                <h5 className="mt-3 fw-bold">
                  Gemini AI
                </h5>

                <p className="text-muted mb-0">
                  AI Analytics
                </p>
              </Card.Body>
            </Card>
          </Col>

        </Row>

      </div>

      {/* Why Choose Platform */}

      <div className="mb-5">

        <div className="card border-0 shadow-sm">

          <div className="card-body p-5">

            <h2 className="fw-bold text-primary text-center mb-4">
              <i className="bi bi-award-fill me-2"></i>
              Why Choose HR Analytics Platform?
            </h2>

            <Row className="mt-4">

              <Col md={6}>

                <p className="fs-5">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Secure JWT Authentication
                </p>

                <p className="fs-5">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  AI-powered Workforce Insights
                </p>

                <p className="fs-5">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Interactive Analytics Dashboard
                </p>

              </Col>

              <Col md={6}>

                <p className="fs-5">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Employee Profile Management
                </p>

                <p className="fs-5">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Advanced Search & Filtering
                </p>

                <p className="fs-5">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Responsive Modern Interface
                </p>

              </Col>

            </Row>

          </div>

        </div>

      </div>
            {/* Footer */}

      <footer className="mt-5">

        <div className="card border-0 shadow-sm bg-dark text-white">

          <div className="card-body py-5">

            <Row>

              <Col lg={6} className="mb-4 mb-lg-0">

                <h3 className="fw-bold">
                  <i className="bi bi-building me-2"></i>
                  HR Analytics Platform
                </h3>

                <p
                  className="mt-3 text-light"
                  style={{
                    lineHeight: "1.8",
                  }}
                >
                  HR Analytics Platform is a modern workforce
                  management solution designed to help
                  organizations manage employee records,
                  visualize HR analytics, and generate
                  AI-powered workforce insights through a
                  secure and intuitive interface.
                </p>

              </Col>

              <Col lg={3} md={6}>

                <h5 className="fw-bold mb-3">
                  Core Modules
                </h5>

                <p className="mb-2">
                  <i className="bi bi-check-lg text-success me-2"></i>
                  Employee Management
                </p>

                <p className="mb-2">
                  <i className="bi bi-check-lg text-success me-2"></i>
                  Analytics Dashboard
                </p>

                <p className="mb-2">
                  <i className="bi bi-check-lg text-success me-2"></i>
                  AI Workforce Report
                </p>

                <p className="mb-2">
                  <i className="bi bi-check-lg text-success me-2"></i>
                  Search & Filter
                </p>

              </Col>

              <Col lg={3} md={6}>

                <h5 className="fw-bold mb-3">
                  Technologies
                </h5>

                <p className="mb-2">⚛ React</p>

                <p className="mb-2">🟢 Node.js</p>

                <p className="mb-2">🚀 Express.js</p>

                <p className="mb-2">🛢 MySQL</p>

                <p className="mb-2">🔐 JWT</p>

                <p className="mb-2">🤖 Gemini AI</p>

              </Col>

            </Row>

            <hr className="border-secondary my-4" />

            <div className="text-center">

              <h6 className="fw-bold">
                Smart Workforce Management with AI
              </h6>

              <p className="text-light mb-1">
                Built using React • Node.js • Express.js • MySQL • Bootstrap • JWT • Gemini AI
              </p>

              <small className="text-secondary">
                © 2026 HR Analytics Platform. All Rights Reserved.
              </small>

            </div>

          </div>

        </div>

      </footer>

    </Container>
  );
}

export default Home;
