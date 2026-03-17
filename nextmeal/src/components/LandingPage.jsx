import React, { useState } from "react";

function LandingPage({ goToFood }) {
  const [zipCode, setZipCode] = useState("");
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (zipCode.trim()) {
      // Pass the zip code to goToFood
      goToFood(zipCode);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.navbar}>
        <div style={styles.logo}>🍽️ NextMeal</div>
        <nav style={styles.navLinks}>
          <a href="#how-it-works" style={styles.link}>How It Works</a>
          <a href="#resources" style={styles.link}>Resources</a>
          <a href="#contact" style={styles.link}>Contact</a>
        </nav>
      </header>

      <main style={styles.hero}>
        <div style={styles.heroText}>
          <span style={styles.badge}>Hackathon Project</span>
          <h1 style={styles.title}>Find food support near you, fast.</h1>
          <p style={styles.subtitle}>
            NextMeal helps people quickly discover nearby food resources,
            community support, and essential meal access information.
          </p>

          <form onSubmit={handleSubmit} style={styles.searchForm}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter your zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                style={{
                  ...styles.zipInput,
                  ...(inputFocus ? styles.zipInputFocus : {})
                }}
                maxLength="5"
              />
              <button 
                type="submit" 
                style={{
                  ...styles.primaryButton,
                  ...(primaryHover ? styles.primaryButtonHover : {})
                }}
                onMouseEnter={() => setPrimaryHover(true)}
                onMouseLeave={() => setPrimaryHover(false)}
              >
                🔍 Find Food Banks
              </button>
            </div>
          </form>

          <button 
            style={{
              ...styles.secondaryButton,
              ...(secondaryHover ? styles.secondaryButtonHover : {})
            }}
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => setSecondaryHover(false)}
          >
            Learn More
          </button>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Quick Access</h3>
          <div style={styles.cardList}>
            <div style={styles.listItem}>🏦 Food banks near you</div>
            <div style={styles.listItem}>🚚 Meal pickup options</div>
            <div style={styles.listItem}>⚡ Emergency food support</div>
            <div style={styles.listItem}>🤝 Community resource info</div>
          </div>
        </div>
      </main>

      <section id="how-it-works" style={styles.section}>
        <h2 style={styles.sectionTitle}>How it works</h2>
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>1. Search</h3>
            <p style={styles.featureText}>
              Enter your location or choose the type of food support you need.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>2. Explore</h3>
            <p style={styles.featureText}>
              View nearby resources in a simple, easy-to-understand interface.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>3. Get Help</h3>
            <p style={styles.featureText}>
              Access important details fast so users can act with confidence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%)",
    color: "#1f2937",
    padding: "0",
    margin: "0",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 48px",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2563eb",
  },
  navLinks: {
    display: "flex",
    gap: "24px",
  },
  link: {
    textDecoration: "none",
    color: "#374151",
    fontWeight: "500",
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px",
    padding: "60px 48px 40px",
    flexWrap: "wrap",
  },
  heroText: {
    flex: "1",
    minWidth: "300px",
    maxWidth: "620px",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "18px",
  },
  title: {
    fontSize: "56px",
    lineHeight: "1.1",
    margin: "0 0 18px",
  },
  subtitle: {
    fontSize: "18px",
    lineHeight: "1.7",
    color: "#4b5563",
    marginBottom: "28px",
    maxWidth: "560px",
  },
  buttonRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  searchForm: {
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  zipInput: {
    padding: "14px 16px",
    fontSize: "16px",
    border: "2px solid #cbd5e1",
    borderRadius: "12px",
    outline: "none",
    width: "200px",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#ffffff",
  },
  zipInputFocus: {
    borderColor: "#2563eb",
    boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
  },
  primaryButton: {
    padding: "14px 24px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(37, 99, 235, 0.18)",
    transition: "all 0.3s ease",
  },
  primaryButtonHover: {
    backgroundColor: "#1d4ed8",
    boxShadow: "0 15px 30px rgba(37, 99, 235, 0.3)",
    transform: "translateY(-2px)",
  },
  secondaryButton: {
    padding: "14px 24px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#ffffff",
    color: "#2563eb",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  secondaryButtonHover: {
    backgroundColor: "#f8fafc",
    borderColor: "#2563eb",
    boxShadow: "0 5px 15px rgba(37, 99, 235, 0.1)",
  },
  card: {
    flex: "1",
    minWidth: "280px",
    maxWidth: "380px",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
  },
  cardTitle: {
    marginTop: "0",
    marginBottom: "18px",
    fontSize: "24px",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  listItem: {
    padding: "14px 16px",
    borderRadius: "14px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e5e7eb",
    fontWeight: "500",
  },
  section: {
    padding: "30px 48px 70px",
  },
  sectionTitle: {
    fontSize: "32px",
    marginBottom: "24px",
  },
  features: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  featureCard: {
    flex: "1",
    minWidth: "240px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
  },
  featureTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  featureText: {
    color: "#4b5563",
    lineHeight: "1.6",
    margin: 0,
  },
};

export default LandingPage;