'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios"; 

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/categories');
        setCategories([{ id: 0, name: 'All' }, ...response.data]); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    if (categoryId === '') {
      router.push('/');
    } else if (categoryId === '0') {
      router.push('/jokes');
    } else {
      router.push(`/jokes/${categoryId}`);
    }
  };

  return (
    <nav className="bg-darkBlue dark:bg-gray-900 p-4 h-[5rem] flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          Humour Hive
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-accentBlue transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-accentBlue transition">
            About
          </Link>
          <Link href="/addJoke" className="hover:text-accentBlue transition">
            Add Joke
          </Link>
          <Link href="/jokes" className="hover:text-accentBlue transition">
            Jokes
          </Link>
          <Link href="/contact" className="hover:text-accentBlue transition">
            Contact
          </Link>

          <div className="relative z-10">
            <select
              id="category-dropdown"
              className="bg-transparent text-white border border-white rounded p-2 hover:bg-darkBlue focus:bg-darkBlue transition"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="" className="bg-darkBlue text-white">Categories</option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="bg-darkBlue text-white"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
