import React, { useState } from 'react';
import './css/Team.css';
import team1 from '../../images/team/team-1.jpg';
import team2 from '../../images/team/team-2.jpg';
import team3 from '../../images/team/team-3.jpg';
import team4 from '../../images/team/team-4.jpg';
import team5 from '../../images/team/team-5.jpg';
import team6 from '../../images/team/team-6.jpg';

const teamMembers = [
  { name: 'Athart Rachel', role: 'Gym Trainer', img: team1 },
  { name: 'John Doe', role: 'Fitness Coach', img: team2 },
  { name: 'Jane Smith', role: 'Nutritionist', img: team3 },
  { name: 'Lucy Green', role: 'Personal Trainer', img: team5 },
];

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  

  const getVisibleMembers = () => {
    const start = currentIndex * 4;
    return teamMembers.slice(start, start + 4);
  };

  return (
    <section className="team-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="team-title">
              <div className="section-title">
                <span>Our Team</span>
                <h2>TRAIN WITH EXPERTS</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="carousel">
              {getVisibleMembers().map((member, index) => (
                <div key={index} className="ts-item set-bg" style={{ backgroundImage: `url(${member.img})` }}>
                  <div className="ts_text">
                    <h4>{member.name}</h4>
                    <span>{member.role}</span>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
