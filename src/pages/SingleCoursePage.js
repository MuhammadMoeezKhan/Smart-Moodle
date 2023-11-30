import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import StarRating from '../components/StarRating';
import { MdInfo } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa";
import { RiClosedCaptioningFill } from "react-icons/ri";
import { BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useCartContext } from '../context/cart_context';
import { useCoursesContext } from '../context/courses_context'; 
import CourseTimeline from '../components/CourseTimeline';
import db from '../firebase/init.js';
import { doc, getDoc } from 'firebase/firestore'; 
import TextSummarizer from '../components/TextSummarizer.js';

const weeksData = [
  {
    title: "AUGUST 23",
    videoUrl: "https://www.youtube.com/embed/9TlHvipP5yA?si=SJaMN-EYnLqSTLhE",
    text: "Day 1: Introduction to Data Structures and Algorithms in Python. On the first day, we will embark on our journey into the fascinating world of data structures and algorithms. We'll discuss the critical importance of these topics in computer science and software development. You'll gain a clear understanding of basic terminology, including what time complexity and space complexity mean. These foundational concepts will set the stage for your exploration of Python data structures and algorithms throughout this course.",
    summary: "Summary: Introduction to data structures and algorithms in Python with a focus on fundamental concepts and terminology.",
  },
  {
    title: "AUGUST 25",
    videoUrl: "https://www.youtube.com/embed/wAy6nDMPYAE?si=keXEWxT2gl1Z8SX8&amp",
    text: "Day 2: Arrays and List. On the second day, we'll delve into the world of arrays and linked lists in Python. You'll learn not only how to implement and manipulate these data structures but also gain insights into their advantages and disadvantages. We'll explore real-world use cases for arrays and linked lists, preparing you to make informed decisions when choosing data structures for your coding projects. Through hands-on exercises, you'll get a solid grasp of the practical applications of arrays and linked lists in Python.",
    summary: "Summary: Exploration of arrays and linked lists in Python, including their implementation and characteristics."
  },
  {
    title: "AUGUST 27",
    videoUrl: "https://www.youtube.com/embed/RGB-wlatStc?si=KlwSowAha31clxjl&amp",
    text: "Day 3: Stacks and Queues. As we progress, we'll dive into the concepts of stacks and queues on the third day. These fundamental data structures have broad applications in algorithm design. You'll not only understand their theoretical foundations but also implement them efficiently in Python. We'll explore the principles of stack and queue operations, laying the groundwork for solving various real-world problems that rely on these data structures. This day's content equips you with the essential tools for algorithmic problem-solving.",
    summary: "Summary: In-depth study of stack and queue data structures, their concepts, and their efficient implementation."
  },
  {
    title: "AUGUST 29",
    videoUrl: "https://www.youtube.com/embed/HqPJF2L5h9U?si=AHXqjy26JVRtMOwh&amp",
    text: "Day 4: Trees and Graphs. On the fourth day, we'll immerse ourselves in the world of trees, with a particular focus on binary trees and binary search trees. You'll grasp the intricate concepts behind tree structures and their role in data organization. Additionally, we'll explore the fascinating realm of graph theory, where you'll learn about adjacency lists and adjacency matrices. This knowledge is crucial for tackling problems that involve hierarchical relationships, network analysis, and more.",
    summary: "Summary: Exploration of trees, binary trees, and graph theory in Python, including key concepts."
  },
  {
    title: "AUGUST 31",
    videoUrl: "https://www.youtube.com/embed/HqPJF2L5h9U?si=AHXqjy26JVRtMOwh&amp",
    text: "Day 5: Sorting Algorithms. The fifth day is dedicated to a detailed exploration of sorting algorithms. You'll be introduced to a variety of sorting methods, such as Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort. We'll not only cover their implementation but also dive into the critical aspect of analyzing their time complexity. This knowledge will empower you to make informed decisions about which sorting algorithm to use for optimal performance in your projects.",
    summary: "Summary: In-depth discussion of various sorting algorithms and their time complexity analysis."
  },
  {
    title: "SEPTEMBER 2",
    videoUrl: "https://www.youtube.com/embed/HqPJF2L5h9U?si=AHXqjy26JVRtMOwh&amp",
    text: "Day 6: Searching Algorithms. On the sixth day, we'll explore various searching algorithms that are fundamental to data retrieval. You'll dive into linear search, binary search, and hashing techniques. We'll discuss the advantages and disadvantages of each method and provide insights into when to apply them for efficient searching. This knowledge is invaluable for finding information in data sets, databases, and more.",
    summary: "Summary: Comprehensive exploration of linear search, binary search, and hashing techniques for efficient searching."
  },
  {
    title: "SEPTEMBER 5",
    videoUrl: "https://www.youtube.com/embed/HqPJF2L5h9U?si=AHXqjy26JVRtMOwh&amp",
    text: "Day 7: Dynamic Programming. Day seven marks the beginning of your journey into dynamic programming. We'll delve into the core concepts and problem-solving techniques of dynamic programming. You'll learn how to solve complex problems through memoization and bottom-up approaches. Additionally, we'll discuss the practical applications of dynamic programming in various real-world scenarios. This content will enhance your problem-solving skills and enable you to tackle a wide range of challenges efficiently.",
    summary: "Summary: In-depth study of dynamic programming, including problem-solving techniques and real-world applications."
  },
  {
    title: "SEPTEMBER 7",
    videoUrl: "https://www.youtube.com/embed/HqPJF2L5h9U?si=AHXqjy26JVRtMOwh&amp",
    text: "Day 8: Recursion and Divide-and-Conquer - The eighth day will lead you into the world of recursive problem-solving techniques. You'll understand the power of recursion and how to apply it to solve problems efficiently. We'll also explore the strategy of divide-and-conquer, a technique used for tackling complex problems by breaking them down into simpler subproblems. By the end of this day, you'll have a strong foundation in these problem-solving approaches.",
    summary: "Summary: Exploration of recursive problem-solving and divide-and-conquer strategies for complex problems."
  },
  {
    title: "SEPTEMBER 9",
    videoUrl: "https://www.youtube.com/embed/HqPJF2L5h9U?si=AHXqjy26JVRtMOwh&amp",
    text: "Day 9: Hashing and Hash Tables. Day nine delves into the fascinating world of hashing and hash tables. You'll learn about hash functions and how they work, including collision resolution techniques to ensure efficient data storage. We'll also discuss the design of efficient hash tables and explore their applications in data storage and retrieval. This knowledge is fundamental for optimizing data access and management in your projects.",
    summary: "Summary: In-depth study of hashing, hash functions, and efficient hash table design, including applications in data storage."
  },
  {
    title: "SEPTEMBER 11",
    videoUrl: "https://www.youtube.com/embed/HqPJF2L5h9U?si=AHXqjy26JVRtMOwh&amp",
    text: "Day 10: Advanced Data Structures. On the tenth day, we'll dive into advanced data structures that extend your problem-solving capabilities. You'll explore structures like heaps, priority queues, and balanced search trees. These advanced data structures enable you to solve complex problems efficiently. We'll provide insights into when and how to use these structures in your algorithms, equipping you with the tools to tackle sophisticated programming challenges.",
    summary: "Summary: Exploration of advanced data structures, including heaps, priority queues, and balanced search trees."
  }
];

const SingleCoursePage = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { fetchSingleCourse, single_course } = useCoursesContext();
  const { addToCart } = useCartContext();
  const [expandedContentIndex, setExpandedContentIndex] = useState(-1);
  const [updatedWeeksData, setUpdatedWeeksData] = useState([]);
  const [weekLoading, setWeekLoading] = useState(Array(weeksData.length).fill(true));

  useEffect(() => {
    const fetchCourseData = async () => {
      const docRef = doc(db, 'courses', id);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCourseData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [id, fetchSingleCourse]);

  useEffect(() => {
    setUpdatedWeeksData(weeksData.map((week) => ({ ...week, summarizedText: '' })));
  }, []);

  const toggleContent = (index) => {
    if (expandedContentIndex === index) {
      setExpandedContentIndex(-1);
    } else {
      setExpandedContentIndex(index);
    }
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  const { id: courseID, category, image, course_name, description, rating_count, rating_star, students, creator, updated_date, lang, actual_price, discounted_price, what_you_will_learn: learnItems, content } = courseData;


  return (
    <SingleCourseWrapper>
      <div className="course-intro mx-auto grid">
        <div className="course-img">
          <img src={image} alt={course_name} />
        </div>
        <div className="course-details">
          <div className="course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block">
            {category}
          </div>
          <div className="course-head">
            <h5>{course_name}</h5>
          </div>
          <div className="course-body">
            <p className="course-para fs-18">{description}</p>
            <div className="course-rating flex">
              <span className="rating-star-val fw-8 fs-16">{rating_star}</span>
              <StarRating rating_star={rating_star} />
              <span className="rating-count fw-5 fs-14">({rating_count})</span>
              <span className="students-count fs-14">{students} students</span>
            </div>
  
            <ul className="course-info">
              <li>
                <span className="fs-14">
                  Taught by <span className="fw-6 opacity-08">{creator}</span>
                </span>
              </li>
              <li className="flex">
                <span>
                  <MdInfo />
                </span>
                <span className="fs-14 course-info-txt fw-5">
                  Last updated {updated_date}
                </span>
              </li>
              <li className="flex">
                <span>
                  <TbWorld />
                </span>
                <span className="fs-14 course-info-txt fw-5">{lang}</span>
              </li>
              <li className="flex">
                <span>
                  <RiClosedCaptioningFill />
                </span>
                <span className="fs-14 course-info-txt fw-5">
                  {lang} [Auto]
                </span>
              </li>
            </ul>
          </div>
  
          <div className="course-foot">
            <div className="course-price">
              <span className="new-price fs-26 fw-8">Slot Left: {discounted_price}</span>
              {/* <span className="old-price fs-26 fw-6">${actual_price}</span> */}
            </div>
          </div>
  
          <div className="course-btn">
            <Link
              to="/cart"
              className="add-to-cart-btn d-inline-block fw-7 bg-purple"
              onClick={() =>
                addToCart(courseID, image, course_name, creator, discounted_price, category)
              }
            >
              <FaGraduationCap /> Enroll Now
            </Link>
          </div>
        </div>
      </div>
  
      <div className="course-full bg-white text-dark">
        <div className="course-learn mx-auto">
          <div className="course-sc-title">What You'll Learn</div>
          <ul className="course-learn-list grid">
            {learnItems &&
              learnItems.map((learnItem, idx) => {
                return (
                  <li key={idx}>
                    <span>
                      <BiCheck />
                    </span>
                    <span className="fs-14 fw-5 opacity-09">{learnItem}</span>
                  </li>
                );
              })}
          </ul>
        </div>
  
        <div className="course-content mx-auto">
        <div className="course-sc-title">Course Content</div>
        <ul className="course-content-list">
          {weeksData.map((week, index) => (
            <li key={index}>
              <ContentItemHeader onClick={() => toggleContent(index)}>
                <span>{expandedContentIndex === index ? "-" : "+"}</span>
                <span>Week {index + 1}</span>
              </ContentItemHeader>
              {expandedContentIndex === index && (
                <>
                  <ContentItemBody>
                    <span>Week {index + 1}'s planned work: {week.text}</span>
                  </ContentItemBody>

                </>
              )}
            </li>
          ))}
        </ul>
      </div>
  
        <div className="course-content mx-auto">
        <div className="course-sc-title">Course Content</div>
        <ul className="course-content-list">
            <li>
                <CourseTimeline weeks={weeksData} />
            </li>
        </ul>
      </div>
      </div>
    </SingleCourseWrapper>
  );  
}

const SingleCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);

  .course-intro{
    padding: 40px 16px;
    max-width: 992px;

    .course-details{
      padding-top: 20px;
    }

    .course-category{
      padding: 0px 8px;
      border-radius: 6px;
    }

    .course-head{
      font-size: 38px;
      line-height: 1.2;
      padding: 12px 0 0 0;
    }
    .course-para{
      padding: 12px 0;
    }
    .rating-star-val{
      margin-right: 7px;
      padding-bottom: 5px;
      color: var(--clr-orange);
    }
    .students-count{
      margin-left: 8px;
    }
    .rating-count{
      margin-left: 6px;
      color: #d097f6;
    }
    .course-info{
      li{
        margin-bottom: 2px;
        &:nth-child(2){
          margin-top: 10px;
        }
      }
      .course-info-txt{
        text-transform: capitalize;
        margin-left: 8px;
        margin-bottom: 4px;
      }
    }
    .course-price{
      margin-top: 12px;
      .old-price{
        color: #eceb98;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .course-btn{
      margin-top: 16px;
      .add-to-cart-btn{
        padding: 12px 28px;
        span{
          margin-left: 12px;
        }
      }
    }

    @media screen and (min-width: 880px){
      grid-template-columns: repeat(2, 1fr);
      column-gap: 40px;
      .course-details{
        padding-top: 0;
      }
      .course-img{
        order: 2;
      }
    }

    @media screen and (min-width: 1400px){
      grid-template-columns: 60% 40%;
    }
  }

  .course-full{
    padding: 40px 16px;
    .course-sc-title{
      font-size: 22px;
      font-weight: 700;
      margin: 12px 0;
    }
    .course-learn{
      max-width: 992px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-learn-list{
        li{
          margin: 5px 0;
          display: flex;
          span{
            &:nth-child(1){
              opacity: 0.95;
              margin-right: 12px;
            }
          }
        }

        @media screen and (min-width: 992px){
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    .course-content{
      max-width: 992px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-content-list{
        li{
          background-color: #f7f9fa;
          padding: 12px 18px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 15px;
        }
      }
    }
  }

`;

const ContentItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background 0.3s, color 0.3s;

  span {
    font-size: 20px;
  }

  &:hover {
    background: #f0f0f0;
  }
`;

const ContentItemBody = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
`;

export default SingleCoursePage;
