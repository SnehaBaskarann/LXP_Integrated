import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoLogoHtml5 } from "react-icons/io5";
import { PiFileCssFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
// import { fetchQuizById } from "../../middleware/Quiz And Feedback Module/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizIdRequest } from "../../../actions/Quiz And Feedback Module/FetchQuizIdAction";

function CoursePage() {
  const [noQuizTopicId, setNoQuizTopicId] = useState(
    "c3d0f67b-17e1-4042-a835-d5cd2119aceb"
  );
  const [yesQuizTopicId, setYesQuizTopicId] = useState(
    "6c4bcc2f-535d-4792-a978-da9e75047120"
  );
  const quizId = useSelector((state) => state.quizId.quizId);
  const isSuccess = useSelector((state) => state.quizId.isSubmitted);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [topicId, setTopicId] = useState("");

  console.log("course page quizId", quizId, isSuccess);

  const handleAddQuiz = (topicId) => {
    console.log("handleAddQuiz called with topicId:", topicId, quizId);
    setTopicId(topicId);
    dispatch(fetchQuizIdRequest(topicId));
    sessionStorage.setItem("topicId", topicId);
    sessionStorage.setItem("quizId", quizId);
    if (isSuccess) {
      navigate(`/createquiz`);
    }
  };

  const handleFeedback = (topicId) => {
    try {
      sessionStorage.setItem("topicId", topicId);
      navigate(`/topicfeedback`);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  const handleQuizFeedback = async (topicId) => {
    // try {
    //   dispatch(fetchQuizIdRequest(topicId));

    //   navigate(`/quizfeedback`);
    // } catch (error) {
    //   console.error('Error navigating:', error);
    // }
    console.log("handleAddQuiz called with topicId:", topicId);
    setTopicId(topicId);
    dispatch(fetchQuizIdRequest(topicId));
    sessionStorage.setItem("topicId", topicId);
    sessionStorage.setItem("quizId", quizId);
    if (isSuccess) {
      navigate(`/quizfeedback`);
    }
  };

  return (
    <div>
      <h5
        style={{ marginTop: "5%", textAlign: "center", color: "midnightblue" }}
      >
        Course Page
      </h5>
      <Accordion id="accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <IoLogoHtml5 style={{ fontSize: "30px", color: "orange" }} />
            <b>Introduction to HTML</b>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              {[
                "HTML Basic",
                "HTML Elements",
                "Html Attributes",
                "Html Styles",
                "Html Tables",
              ].map((topic) => (
                <li key={topic}>
                  {topic}
                  <div className="topic-buttons">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        handleAddQuiz(yesQuizTopicId);
                      }}
                    >
                      Add Quiz
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        handleFeedback(yesQuizTopicId);
                      }}
                      style={{ marginLeft: "5px" }}
                    >
                      Add Feedback
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        handleQuizFeedback(yesQuizTopicId);
                      }}
                      style={{ marginLeft: "5px" }}
                    >
                      Add Quiz Feedback
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <PiFileCssFill
              style={{ fontSize: "30px", color: "midnightblue" }}
            />
            <b>CSS</b>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              {["Introduction to CSS", "CSS Elements", "CSS Selectors"].map(
                (topic) => (
                  <li key={topic}>
                    {topic}
                    <div className="topic-buttons">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          handleAddQuiz(noQuizTopicId);
                        }}
                      >
                        Add Quiz
                      </Button>
                      <Button
                        onClick={() => {
                          handleFeedback(noQuizTopicId);
                        }}
                        variant="secondary"
                        size="sm"
                        style={{ marginLeft: "5px" }}
                      >
                        Add Feedback
                      </Button>
                      <Button
                        onClick={() => {
                          handleQuizFeedback(noQuizTopicId);
                        }}
                        variant="secondary"
                        size="sm"
                        style={{ marginLeft: "5px" }}
                      >
                        Add Quiz Feedback
                      </Button>
                    </div>
                  </li>
                )
              )}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default CoursePage;
