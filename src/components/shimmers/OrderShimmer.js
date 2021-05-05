import { Navbar } from "../../components/Navbar";

export const OrderShimmer = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="order-list-section-shimmer container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">
            <div className="lines shine"></div>
          </h4>
          <div className="row order-section">
            <div className="col-sm-8">
              <div className="card mb-1">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-7 col-xl-12">
                      <div className="media align-item-center mb-1">
                        <div className="position-relative">
                          <div className="box shine"></div>
                        </div>
                        <div className="media-body ml-3">
                          <div className="lines shine"></div>
                          <div></div>
                          <div className="lines shine w-25"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <hr />
                    </div>
                    <div className="col-sm-12">
                      <div className="lines shine w-25"></div>
                      <div></div>
                      <div className="lines shine w-25"></div>
                    </div>
                    <div className="col-sm-12">
                      <hr />
                    </div>
                    <div className="col-sm-12">
                      <div className="lines shine w-100"></div>
                    </div>
                    <div className="col-sm-12">
                      <div className="lines shine w-100"></div>
                    </div>
                    <div className="col-sm-12">
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-1">
                <div className="card-body">
                  <div className="action-buttons shine"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="card-title">
                    <div className="lines shine"></div>
                  </div>
                  <div className="contact-content">
                    <div className="position-relative">
                      <div className="box shine"></div>
                    </div>
                    <div className="contact-content-about">
                      <div className="lines shine w-100"></div>
                      <div></div>
                      <div className="lines shine w-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
