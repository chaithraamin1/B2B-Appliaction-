import React, { useState, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "../CompanyDetails/CompanyDetails.css";

const CompanyDetails = () => {
  const { companyData } = useContext(StoreContext);
  var CompanyDetails = companyData;
  console.log("CompanyDetails", CompanyDetails);

  if (!CompanyDetails) {
    <div>Loading</div>;
  }

  return (
    <>
      <h2 className="title">Company Details</h2>

      <ul>
        {CompanyDetails?.map((item) => (
          <div className="card">
            <li> {item.company_name}</li>
            <li> {item.company_address}</li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default CompanyDetails;
