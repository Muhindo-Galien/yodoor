import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import "./newhotel.css"
import { useAlert } from 'react-alert'
import { MdOutlineDownloading } from 'react-icons/md';

const Verification = () => {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    images: "",
  });
  const { images} = values;
  const alert = useAlert();

  const handelImageChange = (e) => {
    console.log(e.target.files);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, images: e.target.files });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let hotelData = new FormData();
      if (images) {
        for (let i = 0; i < images.length; i++) {
          hotelData.append("images", images[i]);
        }
      }
      // console.log([...hotelData]);
      const res = await fetch(`/api/verify-hotel`, {
        method: "POST",
        body: hotelData,
        headers: { Authorization: token },
      });

      if (res.ok) {
        setLoading(false);
        setValues({});
        setTimeout(() => {
          navigate("/dashboard/seller");
        }, 1000);
        alert.success("Details sent, wait for verification");
        setValues({         
          images: "",
        });
      }
      console.log(res);
    } catch (error) {
      alert.error(error.massage);
      setLoading(false);
      console.log(error);
    }
  };

  const handelChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(values);
  };

  const handelForm = () => (
    // Upload
    <form
      id="form-group"
      className="uploader"
      onSubmit={handelSubmit}
      method="post"
    >
      <input
        id="file-upload"
        type="file"
        name="images"
        accept="image/*"
        multiple
        onChange={handelImageChange}
      />

      <label for="file-upload" id="file-drag">
        {preview === "" ? (
          ""
        ) : (
          <img
            id="file-image"
            src={preview}
            alt="Preview"
            className=" img img-fluid"
          />
        )}
        <div id="start">
          {preview === "" && (
            <>
              <div>Select a file (png,jpeg,jpg)</div>
              <MdOutlineDownloading className="download" aria-hidden="true" />
            </>
          )}
          <span id="file-upload-btn" className="btn btn-primary">
            {preview === "" ? "Select a file" : "change image"}
          </span>
        </div>
      </label>
      {/* added */}
      <div className="lol">
        {
        !images ||
        loading ? (
          <button
            disabled
            className="btn btn-outline-primary m-2"
            type="submit"
          >
            Save
          </button>
        ) : (
          <button className="btn btn-outline-primary m-2" type="submit">
            Save
          </button>
        )}
      </div>
    </form>
  );

  return ( 
    <div className="hotel">
      <div className="dashboard-text" style={{background:"Red"}}>
        <h1>Send your hotel license and identity card
          so that your room can be visible to everyone
        </h1>
      </div>
      {handelForm()}
    </div>
  );
};

export default Verification;