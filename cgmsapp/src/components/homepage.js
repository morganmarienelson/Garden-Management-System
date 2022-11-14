import React, { useEffect, useState } from "react";
import garden from "../Img/garden.jpg";
import garden2 from "../Img/garden2.jpg";
import plants from "../Img/plants.jpg";
import community from "../Img/community.gif";
import plots from "../Img/plots.png";
import shovel from "../Img/shovel.png";
import styled from "styled-components";

const homepage = () => {
  return (
    <div>
      <ImgWrapper>
        <Textdiv>
          <h2>Welcome to the Southside community garden</h2>
          <p>
            We are a place where folks can get their hands dirty, grow healthy
            and nutritious food for themselves, plus build community while
            gardening. We have gardeners from a multitude of nationalities. This
            now demonstrates itself in a large diversity of plant varieties and
            gardening techniques not normally seen in local gardens.
          </p>
        </Textdiv>
        <Imgdiv>
          <img src={garden2} alt="" />
        </Imgdiv>
      </ImgWrapper>
      <ImgWrapper2>
        <Imgdiv>
          <img src={plots} alt="" />
        </Imgdiv>
        <Textdiv className="text">
          <p>
            Plots will be assigned on a first come first served basis until sold
            out
            <br />
            Plots are 10' by 20' ($30) or 20' by 20' ($40) annually. There are a
            total of 49 plots.
          </p>
        </Textdiv>
      </ImgWrapper2>
      <ImgWrapper>
        <Textdiv>
          <p>
            Current gardeners are guaranteed the right to renewal of their plot
            until Dec 1 annually. <br /> Typically about 15 plots are vacated.
            <br /> 
            After Dec 1st, these are then assigned on a first come first served
            basis until sold out:
          </p>
        </Textdiv>
        <Imgdiv>
          <img src={garden} alt="" />
        </Imgdiv>
      </ImgWrapper>
      <ImgWrapper2>
        <Imgdiv>
          <img src={shovel} alt="" />
        </Imgdiv>
        <Textdiv className="text">
          <p>
            Water is provided as well as hoses to provide water to each garden
            plot. <br /> All gardening tools such as forks, shovels, hoes,
            wheelbarrows, etc. are provided.
          </p>
        </Textdiv>
      </ImgWrapper2>
    </div>
  );
};

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  img {
    border-radius: 1rem;
  }
`;

const ImgWrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  h2 {
    margin-right: 4rem;
  }
  img {
    border-radius: 1rem;
  }
  .text {
    margin-right: 15rem;
  }
`;

const Textdiv = styled.div`
  font-family: "Inter", sans-serif;
  padding-left: 1.5rem;

  h2 {
    font-weight: bold;
    text-align: center;
  }
  h3 {
    font-size: 1.3rem;
  }
  p {
    font-size: 1.3rem;
    text-align: center;
  }
  flex: 1;
`;
const Imgdiv = styled.div`
  padding: 1rem 1rem 1rem 3rem;
  flex: 1;
`;

export default homepage;
