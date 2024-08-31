'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


const Teachers = ({params}) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {

    const loadTeachers = async () => {
      try {
        const institute = params.institute
        const department = params.department
        const response = await fetch(`http://localhost:4000/teachers?department=${department}&institute=${institute}`);

        const result = await response.json();

        setTeachers(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadTeachers();
  }, []);

 

  return (
    <div className='page'>
      <h1>Log In</h1>
      <div id="teacherList" className='links'>
      <h2>Choose your name</h2>
        {teachers.map(teacher => (
          <Link
          href={`/login/${params.institute}/${params.department}/${teacher.fullname}-${teacher.id}`}
            key={teacher.id}
            className='link'
          >
            {teacher.fullname}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
