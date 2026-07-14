import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container py-5">

            {/* Hero Section */}

            <div className="bg-primary text-white rounded-4 p-5 text-center shadow">

                <h1 className="display-4 fw-bold">
                    Employee Management System
                </h1>

                <p className="lead mt-3">
                    A simple and efficient application to manage employee records.
                    Add, update, delete, search, and organize employees with ease.
                </p>

                <div className="mt-4">

                    <Link
                        to="/working"
                        className="btn btn-light btn-lg me-3"
                    >
                        Manage Employees
                    </Link>

                    <Link
                        to="/filter"
                        className="btn btn-outline-light btn-lg"
                    >
                        Search Employees
                    </Link>

                </div>

            </div>


            {/* About */}

            <div className="mt-5">

                <h2 className="text-center fw-bold mb-4">
                    About This Project
                </h2>

                <p className="text-center fs-5 text-secondary">
                    This Employee Management System is designed to simplify employee
                    record management. Users can easily maintain employee
                    information through an intuitive interface built with modern
                    web technologies.
                </p>

            </div>


            {/* Features */}

            <div className="mt-5">

                <h2 className="text-center fw-bold mb-4">
                    Features
                </h2>

                <div className="row g-4">

                    <div className="col-md-4">

                        <div className="card h-100 shadow border-0">

                            <div className="card-body text-center">

                                <h1>👨‍💼</h1>

                                <h4 className="mt-3">
                                    Employee Management
                                </h4>

                                <p className="text-muted">
                                    Add, edit, delete, and view employee
                                    records quickly and easily.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="card h-100 shadow border-0">

                            <div className="card-body text-center">

                                <h1>🔍</h1>

                                <h4 className="mt-3">
                                    Search & Filter
                                </h4>

                                <p className="text-muted">
                                    Search employees by name and filter
                                    using department or gender.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="card h-100 shadow border-0">

                            <div className="card-body text-center">

                                <h1>📱</h1>

                                <h4 className="mt-3">
                                    Responsive Design
                                </h4>

                                <p className="text-muted">
                                    Built using Bootstrap for desktop,
                                    tablet, and mobile devices.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* Technology */}

            <div className="mt-5">

                <h2 className="text-center fw-bold mb-4">
                    Technology Stack
                </h2>

                <div className="text-center">

                    <span className="badge bg-primary fs-6 m-2 p-3">
                        React
                    </span>

                    <span className="badge bg-success fs-6 m-2 p-3">
                        Node.js
                    </span>

                    <span className="badge bg-warning text-dark fs-6 m-2 p-3">
                        Express.js
                    </span>

                    <span className="badge bg-danger fs-6 m-2 p-3">
                        MySQL
                    </span>

                    <span className="badge bg-info text-dark fs-6 m-2 p-3">
                        Bootstrap
                    </span>

                </div>

            </div>


            {/* Footer */}

            <footer className="mt-5 text-center border-top pt-4">

                <h5 className="fw-bold">
                    Employee Management System
                </h5>

                <p className="text-muted">
                    Built with React, Node.js, Express.js, MySQL and Bootstrap.
                </p>

                <p className="text-secondary">
                    © 2026 All Rights Reserved.
                </p>

            </footer>

        </div>
    );
}

export default Home;