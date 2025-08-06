const Home = () => {
  return (
    <>
      <section className="hero">
        <h1>Welcome to BugetItWiser</h1>
        <p>
          Smarter budgeting starts here. Track, plan, and achieve your financial
          goals with clarity and confidence.
        </p>
        <a href="/budgets" className="cta-button">
          Start Budgeting
        </a>
      </section>
      <section className="features">
        <h2>What You Can Do</h2>
        <ul>
          <li>
            <strong>Track Expenses:</strong> Visualize your spending with
            animated, accessible charts.
          </li>
          <li>
            <strong>Create Budgets:</strong> Set monthly limits and monitor
            progress automatically.
          </li>
          <li>
            <strong>Insights & Analytics:</strong> Understand your habits with
            dynamic reports.
          </li>
        </ul>
      </section>
      <section className="tagline">
        <p>
          <em>Budget smarter. Live wiser.</em>
        </p>
      </section>
      <section className="cta">
        <h3>Get Started in Minutes</h3>
        <p>Create your free account and take control of your finances today.</p>
        <a href="/signin" className="cta-button">
          Sign in Now
        </a>
      </section>
    </>
  );
};

export default Home;
