import React, { useState } from 'react';
import styled from 'styled-components';
import { FaVideo } from 'react-icons/fa';
import TextSummarizer from '../components/TextSummarizer.js';

const CourseTimeline = ({ weeks }) => {
  const [activeWeek, setActiveWeek] = useState(null);
  const [summary, setSummary] = useState("");
  const [weekLoading, setWeekLoading] = useState(Array(weeks.length).fill(true));

  const toggleWeek = (weekIndex) => {
    if (activeWeek === weekIndex) {
      setActiveWeek(null);
    } else {
      setActiveWeek(weekIndex);
    }
  };

  return (
    <TimelineWrapper>
      
      {weeks.map((week, index) => (
        <div key={index}>
          
          <TimelineHeader onClick={() => toggleWeek(index)}>
            <span>DAY {index + 1}: {week.title}</span>
            <FaVideo />
          </TimelineHeader>
          {activeWeek === index && (
            <WeekContent>
              <VideoWrapper>
                <iframe
                  title="video"
                  src={week.videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoWrapper>
              <TextContent>
                {week.text}
              </TextContent>
              <TextContent>
                <TextSummarizer sharedText={week.text} onSummarized={(summarizedText) => setSummary(summarizedText)}/>
                {"Summary: " + summary}
              </TextContent>
            </WeekContent>
          )}
        </div>
      ))}
    </TimelineWrapper>
  );
};

const TimelineWrapper = styled.div`
  background: #f5f5f5;
  padding: 20px;
`;

const TimelineHeader = styled.div`
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

  &:hover {
    background: #f0f0f0;
  }

  svg {
    font-size: 20px;
  }
`;

const WeekContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 0px 200px;
`;

const VideoWrapper = styled.div`
  iframe {
    width: 100%;
    height: 360px;
  }
`;

const TextContent = styled.div`
  margin-top: 10px;
`;

export default CourseTimeline;