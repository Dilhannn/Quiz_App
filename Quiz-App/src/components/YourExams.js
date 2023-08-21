import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function YourExams() {
  const [examResults, setExamResults] = useState([]);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('examResults')) || [];
    setExamResults(storedResults);
  }, []);

  return (
    <div>
      <h1>Your Exams</h1>
      {examResults.length > 0 ? (
        <TableContainer component={Paper} style={{ backgroundColor: 'white' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examResults.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{result.categoryName}</TableCell>
                  <TableCell>{result.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No exam results found.</p>
      )}
      <Button
        sx={{
          backgroundColor: '#CD96D1',
          color: 'white',
          float: 'right',
          marginTop: '20px',
          marginBottom: '30px',
        }}
        component={NavLink}
        to={`/main`}
        style={{ color: '#9c27b0' }}
      >
        Start new quiz
      </Button>
    </div>
  );
}

export default YourExams;
