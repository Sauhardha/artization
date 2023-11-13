import React, { useState } from 'react';

const FaqSection = () => {
  const [visibleAnswers, setVisibleAnswers] = useState(Array(5).fill(false));

  const toggleAnswer = (index) => {
    const newVisibleAnswers = [...visibleAnswers];
    newVisibleAnswers[index] = !newVisibleAnswers[index];
    setVisibleAnswers(newVisibleAnswers);
  };

  return (
    <div className="w-full p-16 h-auto bgDark text-white">
      <h1 className="text-5xl font-bold mb-4 headFont tracking-tight">FREQUENTLY ASKED QUESTIONS</h1>
      <ul>
        {faqData.map((faq, index) => (
          <li key={index} className="flex flex-col space-y-2 border-b p-6 mx-20 ">
            <span
              className="lg:text-3xl text-xl font-bold cursor-pointer "
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </span>
            <p 
            className='bodyFont lg:text-lg text-sm'
            style={{ 
                opacity: visibleAnswers[index] ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                
                }}>
              {faq.answer}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const faqData = [
  {
    question: 'How does the app collect data?',
    answer: "Artization uses strategically placed cameras with facial scanning AI in galleries to capture viewer's facial expressions and behaviours as they engage with each piece.",
  },
  {
    question: 'What kind of visual information does the app provide?',
    answer: 'Detailed visual analytics such as view time per artwork and emotional engagement levels are all used to understand the patterns of audience attention.',
  },
  {
    question: 'How does the AI facial scanning technology work?',
    answer: 'The AI facial scanning technology uses advanced algorithms to analyze facial expressions and determine emotional responses such as joy, surprise, or melancholiness.',
  },
  {
    question: 'Can users access real-time data analytics through the app?',
    answer: 'Yes, the app provides real-time data analytics, allowing users to track audience engagement as it happens in the gallery.',
  },
  {
    question: 'How secure is the app in terms of user privacy and data protection?',
    answer: 'Ensuring user privacy and data protection is a top priority. The app complies with industry-standard security protocols and regulations. Facial data is encrypted, and personally identifiable data is not extracted at all.',
  },
];

export default FaqSection;
