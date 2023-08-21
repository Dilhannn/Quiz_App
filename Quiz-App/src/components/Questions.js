import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Card, CircularProgress, Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import whatNext from '../assets/whatNext.png';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Questions() {
  const { categoryLink, categoryName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [showYourExamsButton, setShowYourExamsButton] = useState(false);
  const [examResults, setExamResults] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`https://opentdb.com/api.php?amount=10&category=${categoryLink}&type=multiple`)
        .then((response) => {
          const questions = response.data.results.map((q) => ({
            ...q,
            selectedOption: null,
            question: q.question.replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'")
              .replace(/&eacute;/g, 'É')
              .replace(/&ecirc;/g, 'ê')
              .replace(/&Uuml;/g, 'Ü')
              .replace(/&iacute;/g, 'í')
              .replace(/&ccaron;/g, 'č')
              .replace(/&rsquo;/g, "'")
              .replace(/&amp;/g, "&")
              .replace(/&prime;/g, "'")
              .replace(/&euml;/g, "ë")
              .replace(/&ldquo;/g, "“")
              .replace(/&hellip;/g, "…")
              .replace(/&rdquo;/g, "”")
          }));
          setQuestions(questions);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, 500); // Wait for 5 seconds before making the API request
  }, [categoryLink]);

  useEffect(() => {
    const storedResults = localStorage.getItem('examResults');
    if (storedResults) {
      setExamResults(JSON.parse(storedResults));
    }
  }, []);

  function handleFinishClick() {
    const storedEmail = localStorage.getItem('email');
    const currentEmail = JSON.parse(localStorage.getItem('formData')).email;

    const score = calculateScore();
    const result = {
      categoryName: categoryName,
      score: score,
    };

    let updatedExamResults;

    if (storedEmail !== currentEmail) {
      // Email değiştiği durumda examResults sıfırlanır ve yeni sonuç eklenir
      updatedExamResults = [result];
      localStorage.setItem('email', currentEmail);
    } else {
      // Email değişmediği durumda examResults'e yeni sonuç eklenir
      const storedResults = JSON.parse(localStorage.getItem('examResults')) || [];
      updatedExamResults = [...storedResults, result];
    }

    localStorage.setItem('examResults', JSON.stringify(updatedExamResults));

    setShowResults(true);
    setShowYourExamsButton(true);
    setExamResults(updatedExamResults);
  }




  if (isLoading) {
    return (
      <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="secondary" />
      </Stack>
    );
  }

  function renderChoice(questionIndex, choice) {
    const isSelected = questions[questionIndex].selectedOption === choice;

    return (
      <FormControlLabel
        key={choice}
        control={
          <Checkbox
            defaultChecked
            sx={{
              color: '#9F009F',
              '&.Mui-checked': {
                color: '#9F009F',
              },
            }}
            checked={isSelected}
            disabled={showResults}
            onChange={() => handleAnswerClick(questionIndex, choice)}
          />
        }
        label={choice
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&eacute;/g, "é")
          .replace(/&ecirc;/g, "ê")
          .replace(/&Uuml;/g, "Ü")
          .replace(/&iacute;/g, "í")
          .replace(/&ccaron;/g, "č")
          .replace(/&rsquo;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&prime;/g, "'")
          .replace(/&euml;/g, "ë")
          .replace(/&ldquo;/g, "“")
          .replace(/&hellip;/g, "…")
          .replace(/&rdquo;/g, "”")
          .replace(/&Prime;/g, "″")
        }
      />
    );
  }

  function handleAnswerClick(questionIndex, choice) {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedOption = choice;
    setQuestions(updatedQuestions);
    setSelectedOption(choice);
  }

  function calculateScore() {
    const correctAnswers = questions.filter((q) => q.selectedOption === q.correct_answer).length;
    const score = correctAnswers * 10;
    return score;
  }



  function handleGoToYourExams() {
    navigate('/yourExams', { state: { categoryName: categoryName } });
  }

  function handleNextClick() {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOption(null);
  }

  function handlePrevClick() {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setSelectedOption(null);
  }

  function renderResultList(questions) {
    const modifiedQuestions = questions.map((q) => ({
      ...q,
      question: q.question
        ? q.question
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&eacute;/g, "É")
          .replace(/&ecirc;/g, "ê")
          .replace(/&Uuml;/g, "Ü")
          .replace(/&iacute;/g, "í")
          .replace(/&ccaron;/g, "č")
          .replace(/&rsquo;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&prime;/g, "'")
          .replace(/&euml;/g, "ë")
          .replace(/&ldquo;/g, "“")
          .replace(/&hellip;/g, "…")
          .replace(/&rdquo;/g, "”")
          .replace(/&Prime;/g, "″")
        : "",
      selectedOption: q.selectedOption
        ? q.selectedOption
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&eacute;/g, "É")
          .replace(/&ecirc;/g, "ê")
          .replace(/&Uuml;/g, "Ü")
          .replace(/&iacute;/g, "í")
          .replace(/&ccaron;/g, "č")
          .replace(/&rsquo;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&prime;/g, "'")
          .replace(/&euml;/g, "ë")
          .replace(/&ldquo;/g, "“")
          .replace(/&hellip;/g, "…")
          .replace(/&rdquo;/g, "”")
          .replace(/&Prime;/g, "″")
        : "",
      correct_answer: q.correct_answer
        ? q.correct_answer
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&eacute;/g, "É")
          .replace(/&ecirc;/g, "ê")
          .replace(/&Uuml;/g, "Ü")
          .replace(/&iacute;/g, "í")
          .replace(/&ccaron;/g, "č")
          .replace(/&rsquo;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&prime;/g, "'")
          .replace(/&euml;/g, "ë")
          .replace(/&ldquo;/g, "“")
          .replace(/&hellip;/g, "…")
          .replace(/&rdquo;/g, "”")
          .replace(/&Prime;/g, "″")
        : "",
    }));

    return (
      <Card style={{ border: "0.5px " }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Questions</TableCell>
                <TableCell>Your Answer</TableCell>
                <TableCell>Correct Answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modifiedQuestions.map((q) => (
                <TableRow key={q.question}>
                  <TableCell>{q.question}</TableCell>
                  <TableCell
                    style={{
                      color: q.selectedOption === q.correct_answer ? 'green' : 'red',
                      fontStyle: "italic",
                      fontSize: "20px",
                    }}
                  >
                    {q.selectedOption}
                  </TableCell>
                  <TableCell>{q.correct_answer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    );
  }




  if (showResults) {
    const score = calculateScore();

    const correctQuestions = questions
      .filter((q) => q.selectedOption === q.correct_answer)
      .map((q) => ({
        ...q,
        question: q.question
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&eacute;/g, "É")
          .replace(/&ecirc;/g, "ê")
          .replace(/&Uuml;/g, "Ü")
          .replace(/&iacute;/g, "í")
          .replace(/&ccaron;/g, "č")
          .replace(/&rsquo;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&prime;/g, "'")
          .replace(/&euml;/g, "ë")
          .replace(/&ldquo;/g, "“")
          .replace(/&hellip;/g, "…")
          .replace(/&rdquo;/g, "”")
          .replace(/&Prime;/g, "″")
      }));

    const incorrectQuestions = questions
      .filter((q) => q.selectedOption !== q.correct_answer)
      .map((q) => ({
        ...q,
        question: q.question
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&eacute;/g, "É")
          .replace(/&ecirc;/g, "ê")
          .replace(/&Uuml;/g, "Ü")
          .replace(/&iacute;/g, "í")
          .replace(/&ccaron;/g, "č")
          .replace(/&rsquo;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&prime;/g, "'")
          .replace(/&euml;/g, "ë")
          .replace(/&ldquo;/g, "“")
          .replace(/&hellip;/g, "…")
          .replace(/&rdquo;/g, "”")
          .replace(/&Prime;/g, "″")
      }));

    return (
      <div>
        <Button
          sx={{
            backgroundColor: '#CD96D1',
            color: 'white',
            float: "right",
            marginTop: "20px",
            marginBottom: "30px"
          }}
          onClick={handleGoToYourExams}
          style={{ color: '#9c27b0' }}
        >
          Your Exams
        </Button>
        {score >= 50 ? <h2 style={{ color: '#9c27b0' }}>Congratulations! Good job !</h2> : <h2 style={{ color: '#9c27b0' }}>You are not in the MOOD.</h2>}

        <div>
          {score >= 50 ? <img src={process.env.PUBLIC_URL + '/img/giphy.gif'} alt="Animated GIF" /> : <img src={process.env.PUBLIC_URL + '/img/gif2.gif'} alt="Animated GIF" />}


        </div>
        <p style={{ fontSize: "18px", fontFamily: "italic" }}>Your result: {score}/100</p>
        <h3 style={{ color: "green", fontSize: "22px", fontFamily: "italic" }}>Correct answers:</h3>
        {renderResultList(correctQuestions)}
        <h3 style={{ color: "red", fontSize: "22px", fontFamily: "italic" }}>Incorrect answers:</h3>
        {renderResultList(incorrectQuestions)}
        <Button
          sx={{ backgroundColor: '#CD96D1', color: 'white', float: "right", marginTop: "20px", marginBottom: "30px" }}
          component={NavLink}
          to={`/main`}
          style={{ color: '#9c27b0' }}
        >
          Start new quiz
        </Button>
      </div>
    );
  }


  const currentQuestion = questions[currentQuestionIndex];



  return (

    <div style={{ display: 'flex', justifyContent: 'center', marginTop: "200px" }}>
      <Card style={{ padding: "40px" }}>
        {currentQuestion && (
          <div >
            <h3>Question {currentQuestionIndex + 1}: {currentQuestion.question}</h3>
            <ButtonGroup color="primary" variant="contained">
              {renderChoice(currentQuestionIndex, currentQuestion.correct_answer, true)}
              {currentQuestion.incorrect_answers.map((choice) =>
                renderChoice(currentQuestionIndex, choice, false)
              )}
            </ButtonGroup>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button
            variant="outlined"
            disabled={currentQuestionIndex === 0}
            style={{
              color: currentQuestionIndex === 0 ? 'gray' : 'green',
              borderColor: currentQuestionIndex === 0 ? 'gray' : 'green'
            }}
            onClick={handlePrevClick}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            style={{
              color: currentQuestionIndex === 0 ? 'gray' : 'green',
              borderColor: currentQuestionIndex === 0 ? 'gray' : 'green'
            }} onClick={handleFinishClick}>
            Finish Exam
          </Button>
          <Button
            disabled={currentQuestionIndex === questions.length - 1}
            id="whatNext"
            onClick={handleNextClick}
            style={{
              color: currentQuestionIndex === questions.length - 1 ? 'gray' : 'green',
              borderColor: currentQuestionIndex === questions.length - 1 ? 'gray' : 'green',
              maxWidth: '15%',
              maxHeight: '50%',
              padding: 0,
              boxShadow: '0px 0px 10px 2px rgba(138, 43, 226, 0.5)',
              borderRadius: '8px'
            }}
          >
            <img src={whatNext} style={{ width: '100%', height: '100%' }} />
          </Button>



        </div>
      </Card>
    </div>
  );
}


export default Questions;