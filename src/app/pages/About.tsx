import React from 'react';

const About = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`${className} page`}>
      <h1 className="page__header">About</h1>
    </div>
  );
};

export default About;
