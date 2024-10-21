/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Exercise.css';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Breadcrumb from '../Breadcrumb';
import {  useNavigate } from 'react-router-dom';

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const breadcrumbLinks = [{ href: '/', text: 'Home' }];
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Check if user is logged in
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      fetchExercises();
    }
  }, [searchQuery, categoryFilter, currentPage, userId]);

  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/exercise/api/find_exercises/', {
        params: {
          name: searchQuery,
          category: categoryFilter,
          page: currentPage
        }
      });
      setExercises(response.data.exercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on search
    fetchExercises();
  };

  const handleClearFilters = () => {
    setSearchQuery(''); // Clear the search query
    setCategoryFilter(''); // Reset the category filter
    setCurrentPage(1); // Reset to the first page
    fetchExercises(); // Fetch all exercises
  };
  const handle=()=>{
    if (!userId){
      return true
    }
    else{
      return false
    }
  }
  
  
  return (
    <>
     {handle &
      navigate('/login')
    }
      <Navbar />
      <Breadcrumb title="Exercise" links={breadcrumbLinks} />

      <div className="exercise-page">
        <div className="exercise-page__header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search exercise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Exercise search"
            />
            <button onClick={handleSearch}>Search</button>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Category filter"
            >
              <option value="">All Categories</option>
              {Array.from(new Set(exercises.map(exercise => exercise.category)))
                .filter(category => category) // Filter out empty categories
                .map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <button onClick={handleClearFilters} style={{ marginLeft: '10px' }}>Clear Filters</button>
          </div>
        </div>

        <div className="exercise-page__list">
          {exercises.map(exercise => (
            <div className="exercise-card" key={exercise.name}>
              <img 
                src={exercise.image ? `http://127.0.0.1:8000${exercise.image}` : 'no-logo.png'}
                alt={exercise.name}
                className="exercise-card__image"
              />
              <div className="exercise-card__name">
                <h3>{exercise.name}</h3>
              </div>

              {/* Details shown on hover */}
              <div className="exercise-card__details">
                <p>{exercise.description}</p>
                {exercise.category && <p><strong>Category: </strong>{exercise.category}</p>}
                {exercise.sets && <p><strong>Sets: </strong>{exercise.sets}</p>}
                {exercise.count && <p><strong>Count: </strong>{exercise.count}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination buttons */}
        <div className="exercise-page__pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button 
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Exercise;
