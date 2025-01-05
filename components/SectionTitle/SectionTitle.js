import React from "react";

const SectionTitle = (props) => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-12">
        <div className="wpo-section-title">
          <h2>{props.Title}</h2>
          {/* <p>
            A seasoned technology professional with progressive experience in
            web development, IT infrastructure, and full-stack solutions. From
            multimedia development to enterprise software architecture, my
            journey represents a commitment to delivering innovative digital
            solutions that drive impact.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
