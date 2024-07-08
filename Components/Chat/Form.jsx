import React from "react";
import { BiMenu } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { AiFillAudio, AiFillPicture } from "react-icons/ai";

const Form = ({ close, proMember, address, freeTrail }) => {
  const today = Date.now();
  let data = new Date(today);
  const expiredDate = data.toLocaleDateString("en-US");

  return (
    <form id="form_input_data" className="msger-inputarea">
      {proMember?.addressUser == address &&
        proMember?.expireDate !== expiredDate && (
          <>
            <button
              className="navbar-toggler d-lg-none d-block msger-send-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <BiMenu className="icon_size" />
            </button>
            <input
              type="text"
              name="prompt"
              className="msger-input"
              placeholder="Ask any question here..."
              rows="1"
              cols="1"
            />
            <a href="" className="scan-icon">
              <AiFillPicture className="icon_size" />
            </a>
            <a href="" className="mic-icon">
              <AiFillAudio className="icon_size" />
            </a>
            <button
              className="msger-send-btn"
              type="submit"
              onClick={(e) => close(e)}                            
            >
              <MdSend className="icon_size" />
            </button>
          </>
        )}

      {freeTrail <= 4 && (
        <>
          <button
            className="navbar-toggler d-lg-none d-block msger-send-btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <BiMenu className="icon_size" />
          </button>
          <input
            name="prompt"
            type="text"
            class="msger-input"
            placeholder="Ask any question here..."
            rows="1"
            cols="1"
          />
          <a href="" className="scan-icon">
            <AiFillPicture className="icon_size" />
          </a>
          <a href="" className="mic-icon">
            <AiFillAudio className="icon_size" />
          </a>
          <button
            onClick={(e) => close(e)}
            type="submit"
            className="msger-send-btn"
          >
            <MdSend className="icon_size" />
          </button>
        </>
      )}
    </form>
  );
};

export default Form;
