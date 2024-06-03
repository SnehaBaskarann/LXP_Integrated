import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchallquizfeedbackRequest } from "../../../actions/Quiz And Feedback Module/GetAllQuizFeedbackAction";
import QuizFeedback from "./QuizFeedback";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";
import { fetchquizfeedbackRequest } from "../../../actions/Quiz And Feedback Module/GetByIDFeedbackAction";
import { updatequizfeedbackRequest } from "../../../actions/Quiz And Feedback Module/UpdateQuizFeedbackAction";
import Alert from "@mui/material/Alert";
import { deletequizfeedbackRequest } from "../../../actions/Quiz And Feedback Module/DeleteQuizFeedbcakAction";

export const GetAllFeedbacks = () => {
  const { quizfeedbackId } = useParams();
  const getallfeedback = useSelector(
    (state) => state.fetchfeedback.quizfeedback[0]
  );
  //  const [error, setError] = useState('');
  const [errorfb, setErrorfb] = useState("");
  // const [loading, setLoading] = useState('');
  const [showAddfbModal, setShowAddfbModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [errors, setErrors] = useState("");
  const [showEditfbQuestionModal, setShowEditfbQuestionModal] = useState(false);
  // const selectorState = useSelector((state) => state.fetchquizfeedbackid);
  const quizId = sessionStorage.getItem("quizId");
  console.log("edit feed", quizId);
  // const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  // const [showQuizEditModal, setShowQuizEditModal] = useState(false);
  // const [showQuizDeleteModal, setShowQuizDeleteModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fbQuestion, setFbQuestion] = useState([]);
  const [editedQuestion, setEditedQuestion] = useState({
    question: "",
    questionType: "",
    options: [],
  }); /// going to store the value of edit

  const getfeedback = useSelector(
    (state) => state.fetchquizfeedbackid.quizfeedback
  );

  //  const [selectedfbType, setSelectedfbType] = useState('');

  useEffect(() => {
    dispatch(fetchallquizfeedbackRequest(quizId));
  }, [quizId]);

  const handleSaveQuestion = () => {
    let tempfbErrors = { question: "", questionType: "", optionText: "" };

    if (!fbQuestion.question) {
      tempfbErrors.question = "Question is required";
    }
    if (!fbQuestion.questionType) {
      tempfbErrors.questionType = "Question type is required";
    }
    if (fbQuestion.options.length === 0 && fbQuestion.questionType == "MCQ") {
      tempfbErrors.optionText = "At least one option is required";
    }
    setErrorfb(tempfbErrors);
    if (
      tempfbErrors.question ||
      tempfbErrors.questionType ||
      tempfbErrors.optionText
    ) {
      return;
    }
    handleCloseAddfbQuestionModal();
  };

  // const handleTypeChange = () => {
  //     setShowAddModal(true);
  // };
  // const handleModal = () => {
  //     setShowAddfbModal(true);

  // };

  const handleCloseAddfbQuestionModal = () => {
    setShowAddfbModal(false);
  };
  const handleCloseEditQuestionModal = () => {
    setShowEditfbQuestionModal(false);
  };

  const validateField = (fieldName, value, index = null) => {
    let tempErrors = { ...errors };
    switch (fieldName) {
      case "question":
        tempErrors.question = value ? "" : "Question is required";
        break;
      case "options":
        if (index !== null) {
          if (!tempErrors.individualOptions) {
            tempErrors.individualOptions = [];
          }
          tempErrors.individualOptions[index] = value
            ? ""
            : `Option ${index + 1} is required`;
        }
        tempErrors.options = editedQuestion.options.some((option) => option)
          ? ""
          : "option is required";
        break;
      case "correctOptions":
        if (index !== null) {
          if (!tempErrors.individualCorrectOptions) {
            tempErrors.individualCorrectOptions = [];
          }
          tempErrors.individualCorrectOptions[index] = value
            ? ""
            : `Correct Option ${index + 1} is required`;
        }
        tempErrors.correctOptions = editedQuestion.correctOptions.some(
          (option) => option
        )
          ? ""
          : "correct option is required";
        break;
      default:
        break;
    }

    setErrors(tempErrors);
  };

  const handleUpdateQuestion = () => {
    const { quizFeedbackQuestionId, questionType, ...updatedQuestion } =
      editedQuestion;
    const updatedOptions = updatedQuestion.options.map((optionText, index) => ({
      optionText,
    }));

    const requestBody = {
      ...updatedQuestion,
      questionType: questionType,
      quizId: quizId,
      options: updatedOptions,
    };
    console.log("requestBody", requestBody);
    //   if (validateUpdateQuestion()) {
    dispatch(updatequizfeedbackRequest(quizFeedbackQuestionId, requestBody));
    //       handleCloseEditQuestionModal();
    //   }
    //  setEditedQuestion(requestBody);
  };

  const validUpdatedQuestion = (event) => {
    event.preventDefault();

    //   if (validateUpdateQuestion()) {
    handleUpdateQuestion();
    setShowEditfbQuestionModal(false);
    // window.location.reload();
    //   }
  };

  // const handleOpenEditQuestionModal = async (quizfeedbackId) => {
  //   console.log("handleopen",quizfeedbackId)
  //   if(getfeedback){
  //     setShowEditfbQuestionModal(true);
  //   }
  //   dispatch(fetchquizfeedbackRequest(quizfeedbackId));
  //   // const individualfeedback = fetchquizfeedbackRequest(quizfeedbackId);

  //   //updatequizfeedbackRequest(quizfeedbackId);
  //   // const getfeedback = response;
  //   console.log("ki", getfeedback.options);

  //   setEditedQuestion({
  //     quizFeedbackQuestionId: quizfeedbackId,
  //     question: getfeedback.question,
  //     questionType: getfeedback.questionType,
  //     options: getfeedback.options.map((option) => option.optionText),
  //   });
  //   console.log(editedQuestion)

  //   // setShowEditQuestionModal(true);
  // };

  const handleOpenEditQuestionModal = async (quizfeedbackId) => {
    console.log("handleopen", quizfeedbackId);
    dispatch(fetchquizfeedbackRequest(quizfeedbackId));
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (getfeedback && getfeedback.options) {
      setShowEditfbQuestionModal(true);
      setEditedQuestion({
        quizFeedbackQuestionId: quizfeedbackId,
        question: getfeedback.question,
        questionType: getfeedback.questionType,
        options: getfeedback.options.map((option) => option.optionText),
      });
      console.log(editedQuestion);
    }
  };

  const handleDeletefbQuestion = (quizFeedbackQuestionId) => {
    dispatch(deletequizfeedbackRequest(quizFeedbackQuestionId));
    // <Alert severity="success">Deleted quiz feedback question</Alert>;
    // setTimeout(window.location.reload(),1500);
    // debugger;
  };
  const handleNavigate = () => {
    navigate("/");
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleTypeChange = () => {
    setShowAddModal(true);
  };

  return (
    <div>
      <QuizFeedback />
      <div className="question template container">
        <div>
          <h5>
            <b>Review Feedback Questions</b>
          </h5>
          {getallfeedback &&
            getallfeedback.length > 0 &&
            getallfeedback.map((feedback, index) => (
              <div
                key={index}
                className="card mt-3"
                style={{ backgroundColor: "rgb(237, 231, 231)" }}
              >
                <div className="d-flex justify-content-end">
                  <a
                    onClick={() => {
                      handleOpenEditQuestionModal(
                        feedback.quizFeedbackQuestionId
                      );
                    }}
                    className="m-2 me-2"
                  >
                    <AiFillEdit
                      id="edit"
                      style={{ fontSize: "30", color: "#365486" }}
                    />
                  </a>
                  <a
                    onClick={() => {
                      handleDeletefbQuestion(feedback.quizFeedbackQuestionId);
                    }}
                    className="m-2 ms-3"
                  >
                    <FaTrashCan
                      id="delete"
                      style={{ fontSize: "25", color: "#365486" }}
                    />
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Question {feedback.questionNo}:
                  </h5>
                  <input value={feedback.question} className="form-control" />
                  <div className="form-group">
                    <label>Options:</label>
                    {feedback.options.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        className="form-control mt-2"
                        value={option.optionText}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <button
          onClick={handleTypeChange}
          className="btn btn-light mt-3 mb-5 float-right"
          style={{
            backgroundColor: "#365486",
            color: "white",
            marginLeft: "85%",
          }}
        >
          Submit
        </button>
        <Modal show={showAddModal} onHide={handleCloseModal}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#23275c" }}
          ></Modal.Header>
          <Modal.Body style={{ backgroundColor: "rgb(237, 231, 231)" }}>
            <div onClick={handleTypeChange}>
              <Alert severity="success" color="info">
                QuizFeedback Published successfully !
              </Alert>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "rgb(237, 231, 231)" }}>
            <Button
              className="btn btn-light mt-1 mb-5"
              style={{
                backgroundColor: "#365486",
                color: "white",
                marginLeft: "55%",
              }}
              onClick={() => {
                handleCloseModal();
                handleNavigate();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Modal
        show={showEditfbQuestionModal}
        onHide={handleCloseEditQuestionModal}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#23275c", color: "whitesmoke" }}
        >
          <Modal.Title>
            <h5>Edit Question</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgb(237, 231, 231)" }}>
          <div className="form-group">
            <label>Question:</label>
            <input
              className="form-control"
              type="text"
              value={editedQuestion.question}
              onChange={(e) => {
                console.log("p", e.target.value);
                setEditedQuestion({
                  ...editedQuestion,
                  question: e.target.value,
                });

                validateField("question", e.target.value);
                //   setEditedQuestion (e.target.value)
                //                             setEditedQuestion(prevState => ({
                //   ...prevState,
                //   question: e.target.value
                //                             }))
              }}
            />
            {errors.question && (
              <div style={{ color: "red" }}>{errors.question}</div>
            )}
          </div>

          {editedQuestion &&
            editedQuestion.options &&
            editedQuestion.options.map((option, index) => (
              <div className="form-group" key={index}>
                <label>Option {index + 1}:</label>
                <input
                  className="form-control"
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...editedQuestion.options];
                    updatedOptions[index] = e.target.value;
                    setEditedQuestion({
                      ...editedQuestion,
                      options: updatedOptions,
                    });
                    // validateField('options', e.target.value);
                  }}
                />

                {errors.individualoptions &&
                  errors.individualOptions[index] && (
                    <div style={{ color: "red" }}>
                      {errors.individualOptions[index]}
                    </div>
                  )}
              </div>
            ))}
          {errors.options && (
            <div style={{ color: "red" }}>{errors.options}</div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "rgb(237, 231, 231)" }}>
          <Button variant="secondary" onClick={handleCloseEditQuestionModal}>
            Close
          </Button>
          <Button variant="primary" onClick={validUpdatedQuestion}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GetAllFeedbacks;
