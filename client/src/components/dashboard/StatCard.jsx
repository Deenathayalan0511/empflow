function StatCard({ title, value, icon, color }) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
      <div
        className={`card border-0 shadow-sm h-100 border-start border-5 border-${color}`}
        style={{
          transition: "0.3s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 .8rem 1.5rem rgba(0,0,0,.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";
        }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-muted mb-2 fw-semibold">{title}</h6>

              <h2 className="fw-bold mb-0">{value}</h2>
            </div>

            <div
              className={`bg-${color} bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center`}
              style={{
                width: "65px",
                height: "65px",
              }}
            >
              <i
                className={`${icon} text-${color}`}
                style={{
                  fontSize: "2rem",
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
