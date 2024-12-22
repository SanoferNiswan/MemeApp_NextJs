'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

const JokesPage = ({ categoryId }) => {
  const [jokes, setJokes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('All');

  useEffect(() => {
    const fetchCategoriesAndJokes = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:3001/categories');
        const categoriesData = categoriesResponse.data;

        setCategories([{ id: 0, name: 'All' }, ...categoriesData]);

        let url = 'http://localhost:3001/jokes';
        if (categoryId && categoryId !== '0') {
          url = `http://localhost:3001/jokes/category/${categoryId}`;
        }

        const jokesResponse = await axios.get(url);
        setJokes(jokesResponse.data);

        const selectedCategory = categoriesData.find((cat) => cat.id === parseInt(categoryId));
        setCategoryName(selectedCategory ? selectedCategory.name : 'All');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategoriesAndJokes();
  }, [categoryId]);

  return (
    <Layout>
      <section className="p-10 text-center text-white min-h-screen">
        <h2 className="text-4xl mb-8 font-bold">{categoryName} Jokes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {jokes.length > 0 ? (
            jokes.map((joke) => (
              <div key={joke.jokeId} className="card bg-darkBlue p-4 rounded shadow-lg">
                <img src={joke.img} alt="Joke" className="rounded mb-4 w-full h-40 object-cover" />
                <div className="card-content text-left">
                  <p className="setup font-semibold text-lg">{joke.setup}</p>
                  <p className="punchline text-sm text-gray-300 mt-2">{joke.punchline}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-300">No jokes available.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default JokesPage;
