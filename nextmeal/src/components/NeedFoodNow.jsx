import React, { useState, useEffect } from "react";

function NeedFoodNow({ zipCode: initialZipCode, goBack }) {
  const [zipCode, setZipCode] = useState(initialZipCode);
  const [foodBanks, setFoodBanks] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load food banks data based on zip code
  useEffect(() => {
    // Mock food banks data based on zip code
    const mockFoodBanks = [
      {
        name: "Community Food Bank",
        address: "123 Main St, Anytown, 12345",
        phone: "(555) 123-4567",
        hours: "Mon-Fri 9am-5pm",
        distance: "0.5 miles"
      },
      {
        name: "Local Pantry",
        address: "456 Oak Ave, Somewhere, 67890",
        phone: "(555) 987-6543",
        hours: "Tue-Sat 10am-4pm",
        distance: "1.2 miles"
      },
      {
        name: "Neighborhood Food Center",
        address: "789 Pine Rd, Elsewhere, 11111",
        phone: "(555) 456-7890",
        hours: "Wed-Sun 8am-6pm",
        distance: "2.1 miles"
      }
    ];
    setFoodBanks(mockFoodBanks);
  }, [zipCode]);

  const handleZipChange = (e) => {
    setZipCode(e.target.value);
  };

  const generateMockRecipe = (query) => {
    const recipes = {
      pasta: `**Classic Spaghetti Carbonara**

**Prep Time:** 10 minutes  
**Cook Time:** 15 minutes  
**Total Time:** 25 minutes  
**Servings:** 4

**Ingredients:**
- 200g spaghetti
- 100g pancetta or bacon, diced
- 2 large eggs
- 50g grated Parmesan cheese
- Freshly ground black pepper
- Salt

**Instructions:**
1. Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente (about 8-10 minutes).
2. While pasta cooks, heat a large skillet over medium heat. Add pancetta and cook until crispy (about 5 minutes).
3. In a bowl, whisk together eggs, Parmesan cheese, and plenty of black pepper.
4. Reserve 1 cup pasta water, then drain spaghetti.
5. Add hot spaghetti to the skillet with pancetta. Remove from heat.
6. Quickly pour in egg mixture, tossing constantly. Add pasta water as needed to create a creamy sauce.
7. Serve immediately with extra cheese and pepper.`,

      pizza: `**Homemade Margherita Pizza**

**Prep Time:** 20 minutes  
**Cook Time:** 15 minutes  
**Total Time:** 35 minutes  
**Servings:** 2-4

**Ingredients:**
- 1 lb pizza dough (store-bought or homemade)
- 1/2 cup tomato sauce
- 8 oz fresh mozzarella, sliced
- Fresh basil leaves
- 2 tbsp olive oil
- Salt and pepper

**Instructions:**
1. Preheat oven to 475°F (245°C). If using a pizza stone, place it in the oven to heat.
2. On a floured surface, roll out dough into a 12-inch circle.
3. Transfer to a pizza peel or baking sheet dusted with cornmeal.
4. Spread tomato sauce evenly, leaving a 1-inch border.
5. Add mozzarella slices and season with salt and pepper.
6. Bake for 12-15 minutes until crust is golden and cheese is bubbly.
7. Remove from oven, top with fresh basil and drizzle with olive oil.
8. Let cool for 2-3 minutes before slicing.`,

      salad: `**Classic Caesar Salad**

**Prep Time:** 15 minutes  
**Cook Time:** 10 minutes (for chicken)  
**Total Time:** 25 minutes  
**Servings:** 4

**Ingredients:**
- 1 head romaine lettuce, chopped
- 1 cup croutons
- 1/2 cup grated Parmesan cheese
- 1/4 cup Caesar dressing
- 2 chicken breasts (optional)
- Salt and pepper

**Instructions:**
1. If using chicken, season with salt and pepper. Grill or pan-fry for 6-8 minutes per side until cooked through (internal temp 165°F). Let rest, then slice.
2. Wash and dry lettuce, then chop into bite-sized pieces.
3. In a large bowl, toss lettuce with Caesar dressing until well coated.
4. Add croutons and half the Parmesan cheese.
5. Top with sliced chicken if using, and remaining cheese.
6. Serve immediately for best texture.`
    };

    const lowerQuery = query.toLowerCase();
    for (const key in recipes) {
      if (lowerQuery.includes(key)) {
        return recipes[key];
      }
    }

    return `**${query.charAt(0).toUpperCase() + query.slice(1)} Recipe**

**Prep Time:** 15 minutes  
**Cook Time:** 20 minutes  
**Total Time:** 35 minutes  
**Servings:** 4

**Ingredients:**
- Main ingredients for ${query}
- Basic seasonings (salt, pepper, herbs)
- Oil or butter for cooking

**Instructions:**
1. Prepare your main ingredients (15 minutes prep)
2. Heat oil or butter in a pan over medium heat
3. Cook ingredients according to your recipe (about 20 minutes)
4. Season to taste and adjust cooking time as needed
5. Serve hot and enjoy!

*Note: Times are estimates. Adjust based on your cooking method and ingredient quantities.*`;
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { text: chatInput, sender: "user" };
    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = chatInput; // Save the input before clearing
    setChatInput("");
    setIsLoading(true);

    try {
      console.log('Attempting NVIDIA API call for:', currentInput);
      const apiKey = process.env.REACT_APP_NVIDIA_API_KEY;
      const response = await fetch('/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "meta/llama3-8b-instruct",
          messages: [
            { role: "system", content: "You are a helpful recipe assistant. Provide detailed, step-by-step recipes with ingredients and instructions. Keep responses concise but complete." },
            { role: "user", content: `Please provide a recipe for: ${currentInput}` }
          ],
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 1,
          stream: false
        })
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      let botText = data.choices?.[0]?.message?.content;
      if (!botText || botText.trim() === '') {
        console.log('API returned empty content, using mock recipe');
        throw new Error('Empty API response');
      }
      
      console.log('Using AI response');
      const botMessage = { text: botText, sender: "bot" };
      setChatMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('API failed, using mock recipe:', error);
      // Always fallback to mock recipe
      const mockRecipe = generateMockRecipe(currentInput);
      console.log('Generated mock recipe for:', currentInput);
      const botMessage = { text: mockRecipe, sender: "bot" };
      setChatMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <button onClick={goBack} style={styles.backButton}>← Back</button>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Food Resources Near</h1>
          <input
            type="text"
            value={zipCode}
            onChange={handleZipChange}
            placeholder="Enter zip code"
            style={styles.zipInput}
            maxLength="5"
          />
        </div>
      </header>

      <div style={styles.content}>
        <section style={styles.foodBanksSection}>
          <h2 style={styles.sectionTitle}>Nearby Food Banks</h2>
          <div style={styles.foodBanksList}>
            {foodBanks.map((bank, index) => (
              <div key={index} style={styles.foodBankCard}>
                <h3 style={styles.bankName}>{bank.name}</h3>
                <p style={styles.bankDetail}>📍 {bank.address}</p>
                <p style={styles.bankDetail}>📞 {bank.phone}</p>
                <p style={styles.bankDetail}>🕒 {bank.hours}</p>
                <p style={styles.bankDetail}>📏 {bank.distance}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.chatSection}>
          <h2 style={styles.sectionTitle}>Recipe Chatbot 🤖</h2>
          <div style={styles.chatContainer}>
            <div style={styles.chatMessages}>
              {chatMessages.map((msg, index) => (
                <div key={index} style={{ ...styles.message, ...(msg.sender === "user" ? styles.userMessage : styles.botMessage) }}>
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} style={styles.chatForm}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask for a recipe..."
                style={styles.chatInput}
                disabled={isLoading}
              />
              <button type="submit" style={styles.chatButton} disabled={isLoading}>
                {isLoading ? "..." : "Send"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%)",
    color: "#1f2937",
    padding: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
  },
  headerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  backButton: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 15px",
    cursor: "pointer",
    marginRight: "20px",
    transition: "background 0.3s",
  },
  title: {
    fontSize: "32px",
    margin: "0 0 10px 0",
  },
  zipInput: {
    padding: "8px 12px",
    border: "2px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    fontSize: "16px",
    width: "120px",
    transition: "border-color 0.3s",
  },
  content: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
  },
  foodBanksSection: {
    flex: 1,
    minWidth: "300px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  foodBanksList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  foodBankCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  bankName: {
    margin: "0 0 10px 0",
    fontSize: "20px",
  },
  bankDetail: {
    margin: "5px 0",
    fontSize: "14px",
  },
  chatSection: {
    flex: 1,
    minWidth: "300px",
  },
  chatContainer: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    height: "400px",
  },
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "15px",
  },
  message: {
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    maxWidth: "80%",
  },
  userMessage: {
    background: "#dbeafe",
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  botMessage: {
    background: "#f3f4f6",
  },
  chatForm: {
    display: "flex",
    gap: "10px",
  },
  chatInput: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
  },
  chatButton: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 15px",
    cursor: "pointer",
  },
};

export default NeedFoodNow;
