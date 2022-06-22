import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = "https://course-api.com/react-tabs-project";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [job, setJob] = useState({});
  const [swithToggle, setSwithToggle] = useState(1);

  useEffect(() => {
    async function getFetchUrl() {
      setLoading(true);
      try {
        const response = await fetch(url);
        const responseUrl = await response.json();
        console.log(responseUrl);
        setLoading(false);
        setData(responseUrl);
        setJob(responseUrl[0]);
      } catch (error) {
        console.log("loiii!!!!!!");
        setLoading(false);
      }
    }
    getFetchUrl();
  }, []);

  const handleClick = (getItem) => {
    const result = data.filter((item) => {
      return item.company === getItem;
    });
    setValue(result);
    setJob({});
    if(getItem === "TOMMY")
      setSwithToggle(1)
    else if(getItem === "BIGDROP")
      setSwithToggle(2)
    else
      setSwithToggle(3)
  };

  if (loading) {
    return (
      <section className="section">
        <h1 className="loading"> Hiii !!! Chào cậu -_- .....</h1>
      </section>
    );
  }

  console.log("data: ", data);
  console.log("job: ", job);
  console.log("value: ", value);

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          <button
            onClick={() => handleClick("TOMMY")}  
            className={swithToggle === 1 ? " job-btn active-btn" : "job-btn"}
          >
            TOMMY
          </button>
          <button
            onClick={() => handleClick("BIGDROP")}
            className={swithToggle === 2 ? " job-btn active-btn" : "job-btn"}
          >
            BIGDROP
          </button>
          <button 
            onClick={() => handleClick("CUKER")}  
            className={swithToggle === 3 ? " job-btn active-btn" : "job-btn"}
          >
            CUKER
          </button>
        </div>
        <div>
          {Object.keys(job).length !== 0 ? (
            <div key={job.id} className="job-info">
              <h3>{job.title}</h3>
              <h4>{job.company}</h4>
              <div className="job-date">{job.dates}</div>
              <div className="job-desc">
                <div>
                  {job?.duties?.map((text) => (
                    <div key={text.id} className="job-info">
                      <div className="job-desc">
                        <FaAngleDoubleRight className="job-icon" />
                        <p>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            value.map((list) => (
              <div key={list.id} className="job-info">
                <h3>{list.title}</h3>
                <h4>{list.company}</h4>
                <div className="job-date">{list.dates}</div>
                <div className="job-desc">
                  <div>
                    {value[0]?.duties?.map((text) => (
                      <div key={text.id} className="job-info">
                        <div className="job-desc">
                          <FaAngleDoubleRight className="job-icon" />
                          <p>{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <button type="button" className="btn">
        More Info
      </button>
    </section>
  );
}

export default App;
