import { Link } from "react-router-dom";
import { DynamicTyping } from "../components";

const testimonials = [
  {
    name: "Micheal",
    job: "Software Engineer",
    text: "Genius is the best AI tool I have ever used. It is so easy to use and the results are amazing.",
  },
  {
    name: "Sara",
    job: "Content Creator",
    text: "I love Genius! It has helped me create content 10x faster.",
  },
  {
    name: "Mark",
    job: "Product Manager",
    text: "Genius is a game changer. It has helped me automate a lot of my work.",
  },
  {
    name: "Jessica",
    job: "Designer",
    text: "I am so impressed with Genius. It has helped me save so much time.",
  },
  {
    name: "John",
    job: "Entrepreneur",
    text: "Genius is amazing. It has helped me grow my business faster.",
  },
];

export const Home = () => {
  return (
    <main className="home-page">
      <nav className="navbar">
        <a href="/">
          <div className="logo">
            <img src="/logo.webp" alt="genius" />
            Genius
          </div>
        </a>
        <Link to={"/sign-up"} className="button _secondary _rounded">
          Get Started
        </Link>
      </nav>

      <section className="hero-section">
        <h1>The Best AI Tool for</h1>

        <DynamicTyping
          phrases={[
            "Chatbot.",
            "Image Generation.",
            "Video Generation.",
            "Music Generation.",
            "Code Generation.",
          ]}
        />

        <div className="call-to-action-wrapper">
          <h2>Create content using AI 10x faster.</h2>
          <Link to={"/sign-up"} className="button _primary _rounded">
            Start Generating For Free
          </Link>
          <h2>No credit card required.</h2>
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="section-title">Testimonials</h2>
        <ul className="testimonials">
          {testimonials.map((t, i) => (
            <li key={i} className="testimonial-card">
              <div className="-author">
                <h3>{t.name}</h3>
                <h4>{t.job}</h4>
              </div>
              <p className="-text">{t.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
