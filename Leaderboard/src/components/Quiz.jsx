import React, { useState, useEffect } from 'react';
import { question } from './questions.js'; // Ensure this is your questions data

const TIME_LIMIT = 5;

const Quiz = () => {
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [timerInterval, setTimerInterval] = useState(null);

    useEffect(() => {
        // Shuffle and set questions when the component mounts
        const shuffled = shuffleArray([...question]);
        setShuffledQuestions(shuffled);
        startTimer();
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const startTimer = () => {
        setTimeLeft(TIME_LIMIT);
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    nextQuestion();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setTimerInterval(interval);
    };

    const nextQuestion = () => {
        clearInterval(timerInterval);
        if (currentQuestionIndex + 1 < shuffledQuestions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
            startTimer();
        } else {
            endQuiz();
        }
    };

    const handleOptionClick = (option) => {
        if (option === shuffledQuestions[currentQuestionIndex].correct) {
            setScore(prev => prev + 1);
        }
        nextQuestion();
    };

    const endQuiz = () => {
        clearInterval(timerInterval);
        setIsQuizFinished(true);
    };

    if (isQuizFinished) {
        return (
            <div className="quiz-container">
                <h2>Quiz Finished!</h2>
                <p>Your score is: {score}/{shuffledQuestions.length}</p>
            </div>
        );
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    if (!currentQuestion) {
        return <div>Loading...</div>; // Fallback if the question is not available
    }

    return (
        <div className="quiz-container">
            <h3>{currentQuestion.ques}</h3>
            <div className="options">
                {currentQuestion.option.map((opt, index) => (
                    <p key={index} className="option" onClick={() => handleOptionClick(opt)}>
                        {opt}
                    </p>
                ))}
            </div>
            <p className="timer">Time left: <span id="timer">{timeLeft}</span> seconds</p>
        </div>
    );
};

export default Quiz;
