function StatCard({ title, value, icon, color }) {
  return (
    <div className="col-md-3 mb-4">
      <div
        className={`card border-0 shadow h-100 border-start border-4 border-${color}`}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-muted">{title}</h6>

              <h3 className="fw-bold">{value}</h3>
            </div>

            <i className={`${icon} fs-1 text-${color}`}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
