import React from 'react';
import './custom.css';

// Child Component 1: Header
const Header = () => {
  return (
    <div className="header">
      <h1>Portofolio Saya</h1>
      <p>Web Developer | UI/UX Enthusiast</p>
    </div>
  );
};

// Child Component 2: ProfileImage
const ProfileImage = () => {
  return (
    <div className="profile-image-container">
      <img 
        src="/img/foto.jpg"
        alt="Foto Bunga"
        className="profile-image"
      />
    </div>
  );
};

// Child Component 3: PersonalInfo
const PersonalInfo = ({ name, age, email, phone }) => {
  return (
    <div className="personal-info">
      <h2>Informasi Pribadi</h2>
      <ul>
        <li><strong>Nama:</strong> {name}</li>
        <li><strong>Usia:</strong> {age} tahun</li>
        <li><strong>Email:</strong> {email}</li>
        <li><strong>Telepon:</strong> {phone}</li>
      </ul>
    </div>
  );
};

// Child Component 4: Skills
const Skills = ({ skills }) => {
  return (
    <div className="skills">
      <h2>Keahlian</h2>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <span key={index} className="skill-badge">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

// Child Component 5: Education
const Education = ({ education }) => {
  return (
    <div className="education">
      <h2>Pendidikan</h2>
      {education.map((edu, index) => (
        <div key={index} className="education-item">
          <h3>{edu.degree}</h3>
          <p>{edu.institution} | {edu.year}</p>
        </div>
      ))}
    </div>
  );
};

// Child Component 6: SocialLinks
const SocialLinks = () => {
  return (
    <div className="social-links">
      <h2>Media Sosial</h2>
      <div className="social-icons">
        <a href="#" className="social-icon">GitHub</a>
        <a href="#" className="social-icon">LinkedIn</a>
        <a href="#" className="social-icon">Twitter</a>
        <a href="#" className="social-icon">Instagram</a>
      </div>
    </div>
  );
};

// MAIN COMPONENT: BiodataDiri (INI NAMA YANG ANDA BUAT)
const BiodataDiri = () => {
  // Data untuk komponen
  const personalData = {
    name: "Bunga Lestari",
    age: 19,
    email: "bunga24si@mahasiswa.pcr.ac.id",
    phone: "+62 812 3456 7890"
  };

  const skillsList = ["React", "JavaScript", "HTML/CSS", "Node.js", "Python", "UI/UX Design"];
  
  const educationList = [
    {
      degree: "Sistem informasi",
      institution: "Politeknik Caltek Riau",
      year: "2024-sekarang"
    },
    {
      degree: "SMA IPA",
      institution: "SMA Negeri 1 palembang",
      year: "2021-2024"
    }
  ];

  return (
    <div className="biodata-container">
      <Header />
      <div className="content-wrapper">
        <div className="left-column">
          <ProfileImage />
          <SocialLinks />
        </div>
        <div className="right-column">
          <PersonalInfo 
            name={personalData.name}
            age={personalData.age}
            email={personalData.email}
            phone={personalData.phone}
          />
          <Skills skills={skillsList} />
          <Education education={educationList} />
        </div>
      </div>
    </div>
  );
};

export default BiodataDiri;