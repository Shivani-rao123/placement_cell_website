"use client"

import React, { useState } from "react"
import supabase from "@/data/supabase";

const create = () => {
  const [submitData, setSubmitData] = useState({
    name: "",
    company: "",
    description: "",
    date: "",


  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSubmitData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubmitData((prev) => ({
      ...prev,
      pdfFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Data to be submitted:", submitData);

    try {
      const { data, error } = await supabase
        .schema("placements")
        .from("drive")
        .insert([
          {
            name: submitData.name,
            company: submitData.company,
            description: submitData.description,
            date: submitData.date,




          },
        ]);

      if (error) {
        console.error('Error saving placement:', error.message);
        return;
      }

      console.log('Placement saved successfully:', data);
      setSubmitData({
        name: "",
        company: "",
        description: "",
        date: "",
        pdfFile: "",
      });

    } catch (error) {
      console.error('Error saving placement:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-auto py-10 mb-10">
      <section className="w-10/12  sm:w-sm md:w-md lg:w-lg h-auto p-4 sm:p-8 md:p-12 bg-primary-card rounded-md">
        <h2 className="font-inter text-2xl sm:text-3xl md:text-4xl font-bold text-divider-color mb-8">
          Create a Draft
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="name"
          >
            Placement Name
          </label>
          <input
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 placeholder-plcholder-text text-white"
            type="text"
            id="name"
            name="name"
            placeholder="Enter Placement Name"
            value={submitData.name}
            onChange={handleInputChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="company"
          >
            Company Name
          </label>
          <input
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 placeholder-plcholder-text text-white"
            type="text"
            id="company"
            name="company"
            placeholder="Enter Company Name"
            value={submitData.company}
            onChange={handleInputChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="description"
          >
            Company Description
          </label>
          <textarea
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 placeholder-plcholder-text text-white resize-none"
            rows={6}
            type="text"
            id="description"
            name="description"
            placeholder="Enter Company Description"
            value={submitData.description}
            onChange={handleInputChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 text-white"
            type="date"
            id="date"
            name="date"
            value={submitData.date}
            onChange={handleInputChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="pdfFile"
          >
            Upload PDF
          </label>
          <input

            className="mb-5 rounded-md"
            type="file"
            id="pdfFile"
            name="pdfFile"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <div className="flex justify-center w-32 h-10">
            <button



              className="font-medium bg-logo-bg w-32 h-10 rounded-md "
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default create